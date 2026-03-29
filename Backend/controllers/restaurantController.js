const Restaurant = require("../models/resturant");

// ================= CREATE RESTAURANT (Admin) =================
const createRestaurant = async (req, res) => {
try {
const { name, image, description, address, isActive } = req.body;
const restaurant = await Restaurant.create({name,image,description,address,isActive})

res.status(201).json({
  message: "Restaurant created successfully",
  restaurant,
});


} catch (error) {
res.status(500).json({ message: "Failed to create restaurant" });
}
};

// 
const getAllRestaurants = async (req, res) => {
try {
// only show active restaurants to users
const restaurants = await Restaurant.find({ isActive: true });


res.json(restaurants);


} catch (error) {
res.status(500).json({ message: "Failed to fetch restaurants" });
}
};

//
const getRestaurantById = async (req, res) => {
try {
const restaurant = await Restaurant.findById(req.params.id);


if (!restaurant) {
  return res.status(404).json({ message: "Restaurant not found" });
}

res.json(restaurant);


} catch (error) {
res.status(500).json({ message: "Error fetching restaurant" });
}
};

// 
const updateRestaurant = async (req, res) => {
try {
const restaurant = await Restaurant.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);


if (!restaurant) {
  return res.status(404).json({ message: "Restaurant not found" });
}

res.json({
  message: "Restaurant updated successfully",
  restaurant,
});


} catch (error) {
res.status(500).json({ message: "Failed to update restaurant" });
}
};


const deleteRestaurant = async (req, res) => {
try {
const restaurant = await Restaurant.findByIdAndDelete(req.params.id);


if (!restaurant) {
  return res.status(404).json({ message: "Restaurant not found" });
}

res.json({ message: "Restaurant deleted successfully" });


} catch (error) {
res.status(500).json({ message: "Failed to delete restaurant" });
}
};

module.exports = {createRestaurant,getAllRestaurants,getRestaurantById,updateRestaurant,deleteRestaurant,}
