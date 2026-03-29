import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    LayoutDashboard,
    Store,
    UtensilsCrossed,
    ClipboardList,
    LogOut,
    ChevronRight,
    UserCircle
} from "lucide-react";

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    const menuItems = [
        { title: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
        { title: "Restaurants", path: "/admin/restaurants", icon: <Store size={20} /> },
        { title: "Orders", path: "/admin/orders", icon: <ClipboardList size={20} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-72 bg-brand-secondary text-white flex flex-col fixed h-full shadow-2xl z-20">
                <div className="p-8 border-b border-white/5">
                    <Link to="/admin/dashboard" className="text-2xl font-black tracking-tighter flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
                            <UtensilsCrossed size={18} />
                        </div>
                        <span>ADMIN<span className="text-brand-primary">HUB</span></span>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 ml-2">Main Menu</p>
                    {menuItems.map((item) => (
                        <Link
                            key={item.title}
                            to={item.path}
                            className={`flex items-center justify-between p-4 rounded-2xl transition-all group font-semibold ${isActive(item.path)
                                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {isActive(item.path) && <ChevronRight size={16} />}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                            <UserCircle size={24} className="text-gray-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Admin User</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">System Root</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-4 rounded-2xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all font-semibold"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-10">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
