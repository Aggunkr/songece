const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
