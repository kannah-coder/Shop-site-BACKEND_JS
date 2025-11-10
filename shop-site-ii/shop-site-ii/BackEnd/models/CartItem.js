// backend/models/CartItem.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  quantity: Number,
  totalPrice: Number
});

export default mongoose.model("CartItem", cartItemSchema);
