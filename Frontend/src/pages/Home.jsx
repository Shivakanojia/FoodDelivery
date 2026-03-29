import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // added
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axiosInstance.get("/restaurants");
        setRestaurants(res.data);
      } catch (err) {
        console.log("Failed to load restaurants");
      }
    };
    fetchRestaurants();
  }, []);

  //  filter logic
  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/food_hero_banner.png"
            alt="Delicious Food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter drop-shadow-2xl">
            Deliciousness{" "}
            <span className="text-brand-primary drop-shadow-[0_0_15px_rgba(255,71,87,0.5)]">
              Delivered
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium drop-shadow-lg">
            Find the best restaurants in your city and get your favorite food delivered fast to your doorstep.
          </p>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search for restaurants"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-secondary"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-brand-primary text-white px-6 rounded-full font-semibold hover:brightness-110 transition-all-custom">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant List */}
      <main className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-brand-secondary">
            Popular Restaurants
          </h2>
          <div className="flex gap-2">
            <span className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium border border-gray-100 cursor-pointer hover:bg-gray-50">
              Special Offers
            </span>
            <span className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium border border-gray-100 cursor-pointer hover:bg-gray-50">
              Ratings 4.5+
            </span>
          </div>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">
              No restaurants found at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((r) => (
              <div
                key={r._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all-custom border border-gray-100 cursor-pointer"
                onClick={() => navigate(`/restaurant/${r._id}`)}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all-custom"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-primary">
                    ★ 4.5
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-secondary mb-2 group-hover:text-brand-primary transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {r.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      30-40 mins
                    </span>
                    <button className="text-brand-primary font-bold text-sm hover:underline">
                      View Menu
                    </button>
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

export default Home;