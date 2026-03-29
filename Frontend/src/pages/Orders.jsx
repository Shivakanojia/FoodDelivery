import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Navbar from "../components/Navbar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/orders/user");
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar />

      <main className="container mx-auto px-6 py-12 flex-1 max-w-4xl">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold text-brand-secondary tracking-tight">Order History</h2>
          <p className="text-gray-500 mt-2 text-lg">Track and manage your delicious journey.</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-xl font-medium">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all-custom"
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50 bg-gray-50/50">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 text-2xl">
                      🍱
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Order ID</p>
                      <p className="font-bold text-brand-secondary">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Total Amount</p>
                      <p className="font-extrabold text-brand-primary text-xl">₹{order.totalAmount}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-colors ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">Items Ordered</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 group">
                        <div className="h-2 w-2 rounded-full bg-brand-primary/40 group-hover:bg-brand-primary"></div>
                        <p className="text-gray-600 font-medium">
                          <span className="font-bold text-brand-secondary">{item.name}</span>
                          <span className="text-gray-400 mx-2">×</span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-bold">0{item.quantity}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
