const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
{
foodId: {
type: mongoose.Schema.Types.ObjectId,
required: true,
},


name: {
  type: String, 
  required: true,
},

price: {
  type: Number,
  required: true,
},

quantity: {
  type: Number,
  required: true,
  min: 1,
},


},
{ _id: false }
);

const orderSchema = new mongoose.Schema(
{
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},


items: {
  type: [orderItemSchema],
  required: true,
},

totalAmount: {
  type: Number,
  required: true,
  min: 0,
},

deliveryAddress: {
  type: String,
  required: true,
  trim: true,
},

paymentMethod: {
  type: String,
  enum: ["COD", "Online"],
  required: true,
},

status: {
  type: String,
  enum: [
    "Pending",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ],
  default: "Pending",
},


},
{
timestamps: true,
}
);

module.exports = mongoose.model("Order", orderSchema);
