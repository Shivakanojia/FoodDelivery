import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import {
    Store,
    Utensils,
    ShoppingBag,
    TrendingUp,
    Clock,
    CheckCircle2,
    XCircle,
    Truck
} from "lucide-react";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalRestaurants: 0,
        totalFoods: 0,
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [resRest, resFood, resOrders] = await Promise.all([
                    axiosInstance.get("/restaurants"),
                    axiosInstance.get("/restaurants"), // Backend doesn't have a direct "all foods" yet, we'll estimate or fetch per restaurant if needed
                    axiosInstance.get("/orders/admin"),
                ]);

                setStats({
                    totalRestaurants: resRest.data.length,
                    totalFoods: 0, // Placeholder
                    totalOrders: resOrders.data.length,
                    pendingOrders: resOrders.data.filter(o => o.status === "Pending").length,
                    deliveredOrders: resOrders.data.filter(o => o.status === "Delivered").length,
                });
            } catch (err) {
                console.log("Failed to load dashboard stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { title: "Restaurants", value: stats.totalRestaurants, icon: <Store className="text-blue-500" />, color: "bg-blue-50" },
        { title: "Food Items", value: "...", icon: <Utensils className="text-orange-500" />, color: "bg-orange-50" },
        { title: "Total Orders", value: stats.totalOrders, icon: <ShoppingBag className="text-purple-500" />, color: "bg-purple-50" },
        { title: "Growth", value: "+12%", icon: <TrendingUp className="text-green-500" />, color: "bg-green-50" },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header>
                <h2 className="text-4xl font-extrabold text-brand-secondary tracking-tight">Dashboard Overview</h2>
                <p className="text-gray-500 mt-2 text-lg">System-wide performance and quick actions</p>
            </header>

            {/* Primary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {statCards.map((card, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group overflow-hidden relative">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
                        <div className="relative">
                            <div className={`${card.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                                {card.icon}
                            </div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{card.title}</p>
                            <h3 className="text-4xl font-black text-brand-secondary mt-1">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Status Breakdown */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-brand-secondary mb-8">Order Logistics Flow</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl bg-yellow-50 border border-yellow-100 flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl text-yellow-600 shadow-sm"><Clock size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-yellow-700 uppercase tracking-tighter">Preparing</p>
                            <p className="text-2xl font-black text-yellow-900">{stats.pendingOrders}</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm"><Truck size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-blue-700 uppercase tracking-tighter">Out for Delivery</p>
                            <p className="text-2xl font-black text-blue-900">0</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-green-50 border border-green-100 flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl text-green-600 shadow-sm"><CheckCircle2 size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-green-700 uppercase tracking-tighter">Delivered</p>
                            <p className="text-2xl font-black text-green-900">{stats.deliveredOrders}</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl text-red-600 shadow-sm"><XCircle size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-red-700 uppercase tracking-tighter">Cancelled</p>
                            <p className="text-2xl font-black text-red-900">0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
