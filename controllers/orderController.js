const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    // Önce kullanıcının sepetini (Cart) buluyoruz. (Cart modelinin eksiksiz olduğunu varsayıyoruz.)
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Sepet boş" });
    }
    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const order = new Order({
      user: userId,
      items: cart.items,
      total,
      status: "pending"
    });
    await order.save();
    // Sipariş oluşturulduktan sonra sepeti temizleyelim
    cart.items = [];
    await cart.save();
    res.status(201).json({ msg: "Sipariş oluşturuldu", order });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

module.exports = { placeOrder, getOrders };
