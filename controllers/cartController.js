const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Ürün bulunamadı" });
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    const index = cart.items.findIndex(item => item.product.toString() === productId);
    if (index !== -1) {
      cart.items[index].quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }
    await cart.save();
    res.status(200).json({ msg: "Ürün sepete eklendi", cart });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json(cart);
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ msg: "Sepet bulunamadı" });
    const { productId } = req.params;
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.status(200).json({ msg: "Ürün sepetten çıkarıldı", cart });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};
