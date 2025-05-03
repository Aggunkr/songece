const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ msg: "Kullanıcı silindi" });
  } catch (error) {
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    res.json({ msg: "Ürün güncellendi", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.json({ msg: "Ürün silindi" });
  } catch (error) {
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, { status: req.body.status }, { new: true });
    res.json({ msg: "Sipariş durumu güncellendi", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};
