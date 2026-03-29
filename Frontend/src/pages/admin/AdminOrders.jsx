import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import {
    ShoppingBag,
    User,
    MapPin,
    Clock,
    CreditCard,
    RefreshCcw,
    CheckCircle2,
    ChevronRight,
    ClipboardList
} from "lucide-react";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await axiosInstance.get("/orders/admin");
            setOrders(res.data);
        } catch (err) {
            console.log("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axiosInstance.put(`/orders/${orderId}/status`, { status: newStatus });
            fetchOrders();
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "bg-yellow-50 text-yellow-600 border-yellow-200";
            case "Preparing": return "bg-blue-50 text-blue-600 border-blue-200";
            case "Out for Delivery": return "bg-purple-50 text-purple-600 border-purple-200";
            case "Delivered": return "bg-green-50 text-green-600 border-green-200";
            case "Cancelled": return "bg-red-50 text-red-600 border-red-200";
            default: return "bg-gray-50 text-gray-600 border-gray-200";
        }
    };

    return (
        <div className="space-y-10">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-extrabold text-brand-secondary tracking-tight">Live Orders</h2>
                    <p className="text-gray-500 mt-2 text-lg">Monitor and fulfill customer requests</p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="p-4 bg-white text-brand-secondary rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                >
                    <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                </button>
            </header>

            {/* Orders List */}
            {loading ? (
                <div className="space-y-6">
                    {[1, 2].map(i => (
                        <div key={i} className="bg-white h-64 rounded-[40px] animate-pulse shadow-sm"></div>
                    ))}
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.length === 0 && (
                        <div className="bg-white p-20 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center">
                            <div className="p-8 bg-gray-50 rounded-full text-gray-200 mb-6">
                                <ClipboardList size={64} />
                            </div>
                            <p className="text-xl font-bold text-gray-400 tracking-tight">No orders placed yet.</p>
                        </div>
                    )}
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                            {/* Header */}
                            <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-gray-50">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-brand-primary shadow-inner">
                                        <ShoppingBag size={28} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Order ID</span>
                                            <p className="font-extrabold text-brand-secondary text-lg">#{order._id.slice(-8).toUpperCase()}</p>
                                        </div>
                                        <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                                            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>{new Date(order.createdAt).toLocaleString()}</span></div>
                                            <div className="flex items-center gap-1.5"><CreditCard size={16} /> <span>{order.paymentMethod}</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="text-right mr-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Revenue</p>
                                        <p className="text-3xl font-black text-brand-primary font-sans">₹{order.totalAmount}</p>
                                    </div>
                                    <select
                                        className={`px-6 py-4 rounded-2xl border font-bold text-sm focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all cursor-pointer min-w-[180px] ${getStatusColor(order.status)}`}
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Preparing">Preparing</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-50/20">
                                {/* Items */}
                                <div>
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                        <ClipboardList size={14} className="text-brand-primary" />
                                        Bill of Materials
                                    </h4>
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm group-hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-4 text-brand-secondary font-bold">
                                                    <span className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary text-xs">x{item.quantity}</span>
                                                    <span>{item.name}</span>
                                                </div>
                                                <p className="font-extrabold text-brand-secondary font-sans text-sm">₹{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Customer Details */}
                                <div className="flex flex-col gap-8">
                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 h-full">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <User size={14} className="text-brand-primary" />
                                            Client Diagnostics
                                        </h4>
                                        <div className="space-y-6 pt-2">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 flex-shrink-0"><User size={20} /></div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Ordered By Project ID</p>
                                                    <p className="text-brand-secondary font-black text-sm">{order.userId?._id || "Registered User"}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 flex-shrink-0"><MapPin size={20} /></div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Delivery Coordinates</p>
                                                    <p className="text-brand-secondary font-black text-sm italic">{order.deliveryAddress}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
