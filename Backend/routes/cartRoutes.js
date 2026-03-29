const express = require("express");
const router = express.Router();

const {
addToCart,
getUserCart,
removeFromCart,
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");



// Add item to cart
router.post("/add", authMiddleware, addToCart);

// Get logged-in user's cart
router.get("/", authMiddleware, getUserCart);

// Remove item from cart
router.delete("/remove/:foodId", authMiddleware, removeFromCart);

module.exports = router;
