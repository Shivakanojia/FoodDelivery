import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      login(res.data.token, res.data.role);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-500">
          <div className="px-8 pt-10 pb-6 text-center">
            <h2 className="text-3xl font-extrabold text-brand-secondary mb-2">Welcome Back</h2>
            <p className="text-gray-500">Log in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all-custom"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all-custom"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 shadow-lg shadow-brand-primary/30 transition-all-custom active:scale-[0.98]"
            >
              Log In
            </button>

            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-brand-primary font-bold hover:underline">
                Sign up for free
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
