const FoodItem = require("../models/foodItem");
const Restaurant = require("../models/resturant");

// ================= CREATE FOOD (Admin) =================
const createFoodItem = async (req, res) => {
try {
const { restaurantId } = req.params;
const { name, image, price, category, isAvailable } = req.body;


// check restaurant exists
const restaurant = await Restaurant.findById(restaurantId);
if (!restaurant) {
  return res.status(404).json({ message: "Restaurant not found" });
}

const food = await FoodItem.create({restaurantId,name,image,price,category,isAvailable})

res.status(201).json({
  message: "Food item created successfully",
  food,
});


} catch (error) {
res.status(500).json({ message: "Failed to create food item" });
}
};


const getFoodByRestaurant = async (req, res) => {
try {
const { restaurantId } = req.params;

// show only available foods to users
const foods = await FoodItem.find({restaurantId,isAvailable: true,})

res.json(foods);


} catch (error) {
res.status(500).json({ message: "Failed to fetch food items" });
}
};


const updateFoodItem = async (req, res) => {
try {
const food = await FoodItem.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);


if (!food) {
  return res.status(404).json({ message: "Food item not found" });
}

res.json({
  message: "Food item updated successfully",
  food,
});


} catch (error) {
res.status(500).json({ message: "Failed to update food item" });
}
};


const deleteFoodItem = async (req, res) => {
try {
const food = await FoodItem.findByIdAndDelete(req.params.id);


if (!food) {
  return res.status(404).json({ message: "Food item not found" });
}

res.json({ message: "Food item deleted successfully" });


} catch (error) {
res.status(500).json({ message: "Failed to delete food item" });
}
};

module.exports = {createFoodItem,getFoodByRestaurant,updateFoodItem,deleteFoodItem}

