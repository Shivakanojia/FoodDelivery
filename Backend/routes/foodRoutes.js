const express = require("express");
const router = express.Router();

const {
createFoodItem,
getFoodByRestaurant,
updateFoodItem,
deleteFoodItem,
} = require("../controllers/foodController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");



// Get food items by restaurant
router.get("/:restaurantId", getFoodByRestaurant);



// Create food item for a restaurant
router.post(
"/:restaurantId",
authMiddleware,
adminMiddleware,
createFoodItem
);

// Update food item
router.put("/:id", authMiddleware, adminMiddleware, updateFoodItem);

// Delete food item
router.delete("/:id", authMiddleware, adminMiddleware, deleteFoodItem);

module.exports = router;
