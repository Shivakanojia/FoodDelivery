import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import { Lock, Mail, Loader2, ShieldCheck } from "lucide-react";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axiosInstance.post("/auth/login", { email, password });
            if (res.data.role !== "admin") {
                setError("Access denied. Admin privileges required.");
                setLoading(false);
                return;
            }
            login(res.data.token, res.data.role);
            navigate("/admin/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary"></div>

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-primary">
                        <ShieldCheck size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-brand-secondary tracking-tight">Admin Portal</h2>
                    <p className="text-gray-400 mt-2">Enter credentials to manage FoodExpress</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 animate-shake">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                            <input
                                type="email"
                                placeholder="admin@foodexpress.com"
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all text-brand-secondary font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all text-brand-secondary font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-secondary text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                        {loading ? <Loader2 className="animate-spin" size={24} /> : "Unlock Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
