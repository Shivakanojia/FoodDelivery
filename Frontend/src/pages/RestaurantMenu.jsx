import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import Navbar from "../components/Navbar";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axiosInstance.get(`/foods/${id}`);
        setFoods(res.data);
      } catch (err) {
        console.log("Failed to load foods");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [id]);

  const addToCart = async (foodId) => {
    try {
      await axiosInstance.post("/cart/add", { foodId, quantity: 1 });
      alert("Delicious choice! Item added to your cart.");
    } catch (err) {
      alert("Please login to start ordering!");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar />

      <main className="container mx-auto px-6 py-12 flex-1">
        <Link to="/" className="text-gray-500 hover:text-brand-primary mb-8 inline-flex items-center gap-2 transition-colors font-medium">
          ← Back to Restaurants
        </Link>

        <header className="mb-12">
          <h2 className="text-4xl font-extrabold text-brand-secondary tracking-tight">Food Menu</h2>
          <p className="text-gray-500 mt-2 text-lg">Hand-picked selections of our finest dishes.</p>
        </header>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
            <p className="text-gray-400 font-medium">Preparing the menu...</p>
          </div>
        ) : foods.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 text-xl font-medium">No food items found in this menu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {foods.map((food) => (
              <div
                key={food._id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all-custom flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all-custom"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                    <span className="text-brand-secondary font-bold">₹{food.price}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-brand-secondary mb-2 group-hover:text-brand-primary transition-colors">
                    {food.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 flex-1">
                    Authentic ingredients, freshly prepared to satisfy your cravings.
                  </p>
                  <button
                    onClick={() => addToCart(food._id)}
                    className="w-full bg-brand-primary text-white py-3.5 rounded-2xl font-bold text-sm hover:brightness-110 transition-all-custom shadow-lg shadow-brand-primary/20 active:scale-[0.98]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RestaurantMenu;
