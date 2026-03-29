import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import RestaurantMenu from "./pages/RestaurantMenu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import AdminFoods from "./pages/admin/AdminFoods";
import AdminOrders from "./pages/admin/AdminOrders";

const App = () => {
  return (<BrowserRouter> <Routes>
    {/* Auth */}
    <Route path="/login" element={<Login />} />


    {/* Temporary Home */}

    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Home />} />
    <Route path="/restaurant/:id" element={<RestaurantMenu />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/orders" element={<Orders />} />

    {/* Admin Routes */}
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="restaurants" element={<AdminRestaurants />} />
      <Route path="restaurants/:restaurantId/foods" element={<AdminFoods />} />
      <Route path="orders" element={<AdminOrders />} />
    </Route>
  </Routes>
  </BrowserRouter>
  );
};

export default App;
