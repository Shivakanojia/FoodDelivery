import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/orders", {
        deliveryAddress: address,
        paymentMethod,
      });
      alert("🎉 Success! Your order has been placed.");
      navigate("/orders");
    } catch (err) {
      alert("Oops! Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-500">
          <div className="px-8 pt-10 pb-6 text-center border-b border-gray-50">
            <h2 className="text-3xl font-extrabold text-brand-secondary mb-2 tracking-tight">Checkout</h2>
            <p className="text-gray-500">Complete your details to finish the order</p>
          </div>

          <form onSubmit={placeOrder} className="p-8 lg:p-12 space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">Delivery Address</label>
                <textarea
                  placeholder="Enter your full address with landmark..."
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all-custom min-h-[120px] resize-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">Payment Method</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`
                    border-2 rounded-2xl p-5 cursor-pointer transition-all-custom flex items-center gap-3
                    ${paymentMethod === "COD" ? "border-brand-primary bg-brand-primary/5" : "border-gray-100 hover:border-gray-200"}
                  `}>
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-brand-primary w-5 h-5"
                    />
                    <div>
                      <p className="font-bold text-brand-secondary">Cash on Delivery</p>
                      <p className="text-xs text-gray-400">Pay when your food arrives</p>
                    </div>
                  </label>

                  <label className={`
                    border-2 rounded-2xl p-5 cursor-pointer transition-all-custom flex items-center gap-3
                    ${paymentMethod === "Online" ? "border-brand-primary bg-brand-primary/5" : "border-gray-100 hover:border-gray-200"}
                  `}>
                    <input
                      type="radio"
                      name="payment"
                      value="Online"
                      checked={paymentMethod === "Online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-brand-primary w-5 h-5"
                    />
                    <div>
                      <p className="font-bold text-brand-secondary">Online Payment</p>
                      <p className="text-xs text-gray-400">Credit, Debit or UPI</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex items-center justify-between gap-6">
              <Link to="/cart" className="text-gray-400 font-medium hover:text-brand-secondary transition-colors">
                Return to Cart
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 max-w-xs bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg hover:brightness-110 shadow-xl shadow-brand-primary/30 transition-all-custom disabled:opacity-50 active:scale-[0.98]"
              >
                {loading ? "Processing..." : "Finish My Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
