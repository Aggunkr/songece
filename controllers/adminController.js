
const User    = require("../models/User");
const Product = require("../models/Product");

// Yeni ürün ekleme
async function createProduct(req, res) {
  if (req.file) { req.body.image = `/uploads/${req.file.filename}`; }
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
}

// Ürünleri güncelleme
async function updateProduct(req, res) {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Ürün bulunamadı" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}

// Ürün silme
async function deleteProduct(req, res) {
  try {
    const removed = await Product.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ msg: "Ürün bulunamadı" });
    res.json({ msg: "Ürün silindi" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}

// Tüm kullanıcıları listeleme
async function getAllUsers(req, res) {
  const users = await User.find().select("-password");
  return res.status(200).json(users);
}

module.exports = { createProduct, updateProduct, deleteProduct, getAllUsers };
