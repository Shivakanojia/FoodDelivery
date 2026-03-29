const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
{
foodId: {
type: mongoose.Schema.Types.ObjectId,
ref: "FoodItem",
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

const cartSchema = new mongoose.Schema(
{
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
unique: true, // ensures one cart per user
},


items: [cartItemSchema],

totalAmount: {
  type: Number,
  default: 0,
  min: 0,
},


},
{
timestamps: true,
}
);

module.exports = mongoose.model("Cart", cartSchema);
