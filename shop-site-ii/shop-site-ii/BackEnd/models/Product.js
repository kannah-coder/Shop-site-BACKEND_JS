const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  cost: Number,
  brand: String,
  category: String,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);
