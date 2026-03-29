import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import Navbar from "../components/Navbar";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.log("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (foodId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${foodId}`);
      fetchCart();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar />

      <main className="container mx-auto px-6 py-12 flex-1 max-w-5xl">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold text-brand-secondary tracking-tight">Your Cart</h2>
          <p className="text-gray-500 mt-2 text-lg">Review your items before we bring them to you.</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500 text-xl font-medium mb-8">Your cart is feeling a bit light.</p>
            <Link
              to="/"
              className="bg-brand-primary text-white px-8 py-3 rounded-2xl font-bold hover:brightness-110 transition-all-custom shadow-lg shadow-brand-primary/20"
            >
              Browse Restaurants
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.items.map((item) => (
                <div
                  key={item.foodId._id}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 transition-all-custom hover:shadow-md"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.foodId.image}
                      alt={item.foodId.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-secondary">{item.foodId.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">Quantity: {item.quantity}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold text-brand-primary">₹{item.foodId.price * item.quantity}</span>
                      <button
                        onClick={() => removeItem(item.foodId._id)}
                        className="text-gray-400 hover:text-red-500 font-medium text-sm transition-colors"
                      >
                        Remove item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-28">
                <h3 className="text-2xl font-bold text-brand-secondary mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{cart.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery Fee</span>
                    <span className="text-green-500 font-medium font-bold uppercase tracking-tight text-xs bg-green-50 px-2 py-1 rounded">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-extrabold text-brand-secondary pt-4 border-t border-gray-50">
                    <span>Total</span>
                    <span>₹{cart.totalAmount}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg hover:brightness-110 transition-all-custom shadow-xl shadow-brand-primary/30"
                >
                  Proceed to Checkout
                </button>
                <p className="text-xs text-center text-gray-400 mt-4">Safe and secure checkout powered by FoodExpress</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
