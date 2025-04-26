// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  imageUrl: String,
  category: String,
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
