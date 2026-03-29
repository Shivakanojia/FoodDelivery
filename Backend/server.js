const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// import routes
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// ================= GLOBAL MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= CONNECT DATABASE =================
connectDB();

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
res.send("Food Delivery API is running...");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(` Server running on port ${PORT}`);
});
