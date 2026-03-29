const Order = require("../models/order");
const Cart = require("../models/cart");


const placeOrder = async (req, res) => {
try {
const { deliveryAddress, paymentMethod } = req.body;
const userId = req.user.id;


// 1️ find user's cart
const cart = await Cart.findOne({ userId }).populate("items.foodId");

if (!cart || cart.items.length === 0) {
  return res.status(400).json({ message: "Cart is empty" });
}

// 2️ create snapshot of cart items
const orderItems = cart.items.map((item) => ({
  foodId: item.foodId._id,
  name: item.foodId.name,
  price: item.foodId.price,
  quantity: item.quantity,
}));

// 3️ create order
const order = await Order.create({
  userId,
  items: orderItems,
  totalAmount: cart.totalAmount,
  deliveryAddress,
  paymentMethod,
});

//  IMPORTANT — clear cart after order
cart.items = [];
cart.totalAmount = 0;
await cart.save();

res.status(201).json({
  message: "Order placed successfully",
  order,
});


} catch (error) {
res.status(500).json({ message: "Failed to place order" });
}
};


const getUserOrders = async (req, res) => {
try {
const orders = await Order.find({ userId: req.user.id }).sort({
createdAt: -1,
});


res.json(orders);


} catch (error) {
res.status(500).json({ message: "Failed to fetch orders" });
}
};

//GET ALL ORDERS (Admin) 
const getAllOrders = async (req, res) => {
try {
const orders = await Order.find().populate("userId").sort({
createdAt: -1,
});


res.json(orders);


} catch (error) {
res.status(500).json({ message: "Failed to fetch all orders" });
}
};

//UPDATE ORDER STATUS (Admin)
const updateOrderStatus = async (req, res) => {
try {
const { status } = req.body;


const order = await Order.findByIdAndUpdate(
  req.params.id,
  { status },
  { new: true }
);

if (!order) {
  return res.status(404).json({ message: "Order not found" });
}

res.json({
  message: "Order status updated",
  order,
});


} catch (error) {
res.status(500).json({ message: "Failed to update order status" });
}
};

module.exports = {
placeOrder,
getUserOrders,
getAllOrders,
updateOrderStatus,
};
