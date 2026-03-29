const express = require("express");
const router = express.Router();

const {
placeOrder,
getUserOrders,
getAllOrders,
updateOrderStatus,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// 

// Place order
router.post("/", authMiddleware, placeOrder);

// Get logged-in user's orders
router.get("/user", authMiddleware, getUserOrders);

//

// Get all orders
router.get("/admin", authMiddleware, adminMiddleware, getAllOrders);

// Update order status
router.put(
"/:id/status",
authMiddleware,
adminMiddleware,
updateOrderStatus
);

module.exports = router;
