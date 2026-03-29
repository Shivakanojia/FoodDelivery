import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import {
    Plus,
    ArrowLeft,
    Edit,
    Trash2,
    Tag,
    IndianRupee,
    X,
    Upload,
    CheckCircle2,
    XCircle
} from "lucide-react";

const AdminFoods = () => {
    const { restaurantId } = useParams();
    const [foods, setFoods] = useState([]);
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingFood, setEditingFood] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        category: "",
        isAvailable: true,
    });
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const [resFood, resRest] = await Promise.all([
                axiosInstance.get(`/foods/${restaurantId}`),
                axiosInstance.get(`/restaurants/${restaurantId}`),
            ]);
            setFoods(resFood.data);
            setRestaurant(resRest.data);
        } catch (err) {
            console.log("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [restaurantId]);

    const handleOpenModal = (food = null) => {
        if (food) {
            setEditingFood(food);
            setFormData({
                name: food.name,
                image: food.image,
                price: food.price,
                category: food.category,
                isAvailable: food.isAvailable,
            });
        } else {
            setEditingFood(null);
            setFormData({
                name: "",
                image: "",
                price: "",
                category: "Main Course",
                isAvailable: true,
            });
        }
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this food item?")) return;
        try {
            await axiosInstance.delete(`/foods/${id}`);
            fetchData();
        } catch (err) {
            alert("Failed to delete food");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingFood) {
                await axiosInstance.put(`/foods/${editingFood._id}`, formData);
            } else {
                await axiosInstance.post(`/foods/${restaurantId}`, formData);
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            alert("Failed to save food item");
        }
    };

    return (
        <div className="space-y-10">
            <header className="flex justify-between items-end">
                <div>
                    <button
                        onClick={() => navigate("/admin/restaurants")}
                        className="flex items-center gap-2 text-gray-400 font-bold hover:text-brand-primary mb-4 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to Restaurants
                    </button>
                    <h2 className="text-4xl font-extrabold text-brand-secondary tracking-tight">
                        Menu: <span className="text-brand-primary">{restaurant?.name || "Loading..."}</span>
                    </h2>
                    <p className="text-gray-500 mt-2 text-lg">Manage dishes and availability</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus size={20} />
                    <span>Add New Dish</span>
                </button>
            </header>

            {/* List */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50">
                            <th className="p-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Item Details</th>
                            <th className="p-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Category</th>
                            <th className="p-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Price</th>
                            <th className="p-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Status</th>
                            <th className="p-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {foods.length === 0 && !loading && (
                            <tr>
                                <td colSpan="5" className="p-20 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="p-6 bg-gray-50 rounded-full text-gray-300">
                                            <Utensils size={40} />
                                        </div>
                                        <p className="text-gray-400 font-bold text-lg">No dishes found in this menu.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {foods.map((food) => (
                            <tr key={food._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="p-8">
                                    <div className="flex items-center gap-6">
                                        <img src={food.image} alt={food.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm group-hover:scale-110 transition-transform" />
                                        <div>
                                            <p className="font-extrabold text-brand-secondary text-lg">{food.name}</p>
                                            <p className="text-xs text-brand-primary font-black uppercase tracking-widest mt-1">ID: #{food._id.slice(-6)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-8">
                                    <span className="px-4 py-2 bg-purple-50 text-purple-600 rounded-xl text-xs font-black uppercase tracking-widest">
                                        {food.category}
                                    </span>
                                </td>
                                <td className="p-8">
                                    <p className="font-black text-brand-secondary text-xl font-sans">
                                        ₹{food.price}
                                    </p>
                                </td>
                                <td className="p-8">
                                    <div className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest ${food.isAvailable ? "text-green-500" : "text-red-500"}`}>
                                        {food.isAvailable ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                        {food.isAvailable ? "Available" : "Sold Out"}
                                    </div>
                                </td>
                                <td className="p-8 text-right">
                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleOpenModal(food)}
                                            className="p-3 bg-white text-brand-secondary rounded-xl hover:bg-brand-primary hover:text-white transition-all shadow-sm border border-gray-100"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(food._id)}
                                            className="p-3 bg-white text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-gray-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-secondary/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
                        <header className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-3xl font-black text-brand-secondary">{editingFood ? "Edit Item" : "New Dish"}</h3>
                                <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-[0.2em]">Culinary Masterpiece</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm">
                                <X size={24} className="text-gray-400" />
                            </button>
                        </header>

                        <form onSubmit={handleSubmit} className="p-10 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Dish Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all font-bold text-brand-secondary"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                                    <div className="relative group">
                                        <Tag className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary" size={18} />
                                        <input
                                            type="text"
                                            required
                                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all font-bold text-brand-secondary"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Price (₹)</label>
                                    <div className="relative group">
                                        <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary" size={18} />
                                        <input
                                            type="number"
                                            required
                                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all font-bold text-brand-secondary"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Dish Image URL</label>
                                <div className="relative group">
                                    <Upload className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary" size={18} />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all font-bold text-brand-secondary"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <input
                                    type="checkbox"
                                    id="available"
                                    className="w-6 h-6 rounded-lg text-brand-primary focus:ring-brand-primary cursor-pointer border-gray-300 bg-white transition-all"
                                    checked={formData.isAvailable}
                                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                                />
                                <label htmlFor="available" className="font-bold text-brand-secondary cursor-pointer select-none">Mark as Currently Available</label>
                            </div>

                            <footer className="pt-6 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-4 rounded-2xl font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] py-4 rounded-2xl font-bold bg-brand-primary text-white shadow-xl shadow-brand-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    {editingFood ? "Update Item" : "Add to Menu"}
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminFoods;
