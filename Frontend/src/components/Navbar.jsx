import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";
import { ShoppingCart, Package, Home, PhoneCall, LogOut, User, ShieldCheck } from "lucide-react";

const Navbar = () => {
  const { token, role, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartCount = async () => {
      if (token && role === "user") {
        try {
          const res = await axiosInstance.get("/cart");
          const totalItems = res.data.items.reduce((acc, item) => acc + item.quantity, 0);
          setCartCount(totalItems);
        } catch (err) {
          console.log("Failed to fetch cart count");
        }
      }
    };
    fetchCartCount();
  }, [token, role]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { title: "Home", path: "/", icon: <Home size={18} /> },
    { title: "Contact Us", path: "/contact", icon: <PhoneCall size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 glass shadow-md px-6 py-4 flex justify-between items-center bg-white/80">
      <Link to="/" className="text-2xl font-bold text-brand-primary tracking-tight flex items-center gap-2">
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/30">
          <Package size={24} />
        </div>
        <span>Food<span className="text-brand-secondary">Express</span></span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.title}
            to={link.path}
            className="text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-all-custom flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-brand-primary/5"
          >
            {link.icon}
            {link.title}
          </Link>
        ))}
        {token && role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="text-sm font-black text-brand-primary hover:brightness-110 transition-all-custom bg-brand-primary/5 px-4 py-2 rounded-xl border border-brand-primary/20 flex items-center gap-2"
          >
            <ShieldCheck size={18} />
            Admin Panel
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative p-2.5 text-brand-secondary hover:text-brand-primary transition-all-custom bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md group"
            title="Cart"
          >
            <ShoppingCart size={22} strokeWidth={2.5} />
            {token && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/orders"
            className="p-2.5 text-brand-secondary hover:text-brand-primary transition-all-custom bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md group"
            title="My Orders"
          >
            <Package size={22} strokeWidth={2.5} />
          </Link>
        </div>

        {!token ? (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-bold text-brand-secondary hover:text-brand-primary transition-all-custom px-4 py-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-brand-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all-custom shadow-lg shadow-brand-primary/25 active:scale-95"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-brand-secondary border border-gray-200">
              <User size={20} />
            </div>
            <button
              onClick={handleLogout}
              className="p-2.5 text-white bg-brand-secondary rounded-full hover:bg-red-500 transition-all-custom shadow-md hover:shadow-red-500/20 group"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
