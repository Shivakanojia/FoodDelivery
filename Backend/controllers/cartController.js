const Cart = require("../models/cart");
const FoodItem = require("../models/foodItem");

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
try {
const { foodId, quantity } = req.body;
const userId = req.user.id;


// find food
const food = await FoodItem.findById(foodId);
if (!food) {
  return res.status(404).json({ message: "Food item not found" });
}

// find user's cart
let cart = await Cart.findOne({ userId });

// if cart does not exist → create new cart
if (!cart) {
  cart = await Cart.create({
    userId,
    items: [{ foodId, quantity }],
    totalAmount: food.price * quantity,
  });

  return res.status(201).json(cart);
}

// check if item already in cart
const itemIndex = cart.items.findIndex(
  (item) => item.foodId.toString() === foodId
);

if (itemIndex > -1) {
  // item exists → increase quantity
  cart.items[itemIndex].quantity += quantity;
} else {
  // new item → push
  cart.items.push({ foodId, quantity });
}

// recalculate total
let total = 0;
for (const item of cart.items) {
  const f = await FoodItem.findById(item.foodId);
  total += f.price * item.quantity;
}

cart.totalAmount = total;
await cart.save();

res.json(cart);

} catch (error) {
res.status(500).json({ message: "Failed to add to cart" });
}
};

// ================= GET USER CART =================
const getUserCart = async (req, res) => {
try {
const cart = await Cart.findOne({ userId: req.user.id }).populate(
"items.foodId"
);

res.json(cart || { items: [], totalAmount: 0 });


} catch (error) {
res.status(500).json({ message: "Failed to fetch cart" });
}
};

// ================= REMOVE ITEM FROM CART =================
const removeFromCart = async (req, res) => {
try {
const { foodId } = req.params;


const cart = await Cart.findOne({ userId: req.user.id });
if (!cart) {
  return res.status(404).json({ message: "Cart not found" });
}

// remove item
cart.items = cart.items.filter(
  (item) => item.foodId.toString() !== foodId
);

// recalculate total after removal
let total = 0;
for (const item of cart.items) {
  const f = await FoodItem.findById(item.foodId);
  total += f.price * item.quantity;
}

cart.totalAmount = total;
await cart.save();

res.json(cart);


} catch (error) {
res.status(500).json({ message: "Failed to remove item" });
}
};

module.exports = {addToCart,getUserCart,removeFromCart,}

