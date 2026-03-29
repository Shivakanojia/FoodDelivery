const express = require("express");
const router = express.Router();

const {
createRestaurant,
getAllRestaurants,
getRestaurantById,
updateRestaurant,
deleteRestaurant,
} = require("../controllers/restaurantController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

//

// Get all active restaurants
router.get("/", getAllRestaurants);

// Get single restaurant
router.get("/:id", getRestaurantById);

//

// Create restaurant
router.post("/", authMiddleware, adminMiddleware, createRestaurant);

// Update restaurant
router.put("/:id", authMiddleware, adminMiddleware, updateRestaurant);

// Delete restaurant
router.delete("/:id", authMiddleware, adminMiddleware, deleteRestaurant);

module.exports = router;
