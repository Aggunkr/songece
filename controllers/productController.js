const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl, category } = req.body;
    if (!name || !price || !description || !imageUrl || !category) {
      return res.status(400).json({ msg: "Tüm alanlar gereklidir" });
    }
    const product = new Product({ name, price, description, imageUrl, category });
    await product.save();
    res.status(201).json({ msg: "Ürün eklendi", product });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};
