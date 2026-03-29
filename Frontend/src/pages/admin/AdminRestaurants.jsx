import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import {
    Plus,
    Search,
    MapPin,
    Edit,
    Trash2,
    Utensils,
    MoreVertical,
    ChevronRight,
    X,
    Upload
} from "lucide-react";

const AdminRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingRestaurant, setEditingRestaurant] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        address: "",
        isActive: true,
    });
    const navigate = useNavigate();

    const fetchRestaurants = async () => {
        try {
            const res = await axiosInstance.get("/restaurants");
            setRestaurants(res.data);
        } catch (err) {
            console.log("Failed to load restaurants");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleOpenModal = (restaurant = null) => {
        if (restaurant) {
            setEditingRestaurant(restaurant);
            setFormData({
                name: restaurant.name,
                image: restaurant.image,
                description: restaurant.description,
                address: restaurant.address,
                isActive: restaurant.isActive,
            });
        } else {
            setEditingRestaurant(null);
            setFormData({
                name: "",
                image: "",
                description: "",
                address: "",
                isActive: true,
            });
        }
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this restaurant?")) return;
        try {
            await axiosInstance.delete(`/restaurants/${id}`);
            fetchRestaurants();
        } catch (err) {
            alert("Failed to delete restaurant");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingRestaurant) {
                await axiosInstance.put(`/restaurants/${editingRestaurant._id}`, formData);
            } else {
                await axiosInstance.post("/restaurants", formData);
            }
            setShowModal(false);
            fetchRestaurants();
        } catch (err) {
            alert("Failed to save restaurant");
        }
    };

    return (
        <div className="space-y-10">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-extrabold text-brand-secondary tracking-tight">Restaurants</h2>
                    <p className="text-gray-500 mt-2 text-lg">Manage your culinary partners</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus size={20} />
                    <span>Add New Restaurant</span>
                </button>
            </header>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white h-96 rounded-3xl animate-pulse shadow-sm border border-gray-100"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {restaurants.map((res) => (
                        <div key={res._id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all">
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src={res.image}
                                    alt={res.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => handleOpenModal(res)}
                                        className="p-3 bg-white/90 backdrop-blur-md text-brand-secondary rounded-xl hover:bg-brand-primary hover:text-white transition-all shadow-lg"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(res._id)}
                                        className="p-3 bg-white/90 backdrop-blur-md text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${res.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}>
                                    {res.isActive ? "Active" : "Inactive"}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-brand-secondary mb-3">{res.name}</h3>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                                    <MapPin size={16} className="text-brand-primary" />
                                    <span className="font-medium">{res.address}</span>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate(`/admin/restaurants/${res._id}/foods`)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-brand-secondary py-4 rounded-2xl font-bold hover:bg-brand-secondary hover:text-white transition-all border border-gray-100"
                                    >
                                        <Utensils size={18} />
                                        <span>Manage Menu</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-secondary/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
                        <header className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-brand-secondary">{editingRestaurant ? "Edit Restaurant" : "New Restaurant"}</h3>
                                <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-widest">General Information</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-3 hover:bg-white rounded-xl transition-all shadow-sm">
                                <X size={24} className="text-gray-400" />
                            </button>
                        </header>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Restaurant Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all font-bold text-brand-secondary"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                                    <select
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all font-bold text-brand-secondary appearance-none"
                                        value={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
                                    >
                                        <option value="true">Active & Visible</option>
                                        <option value="false">Inactive / Hidden</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Banner Image URL</label>
                                <div className="relative group">
                                    <Upload className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all font-bold text-brand-secondary"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Address</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all font-bold text-brand-secondary"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    rows="3"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all font-bold text-brand-secondary"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <footer className="pt-6 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-4 rounded-2xl font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] py-4 rounded-2xl font-bold bg-brand-primary text-white shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    {editingRestaurant ? "Save Changes" : "Confirm & Launch"}
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRestaurants;
