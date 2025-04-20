const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Tüm alanlar gereklidir" });
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ msg: "Bu kullanıcı adı veya e-posta zaten kullanılıyor" });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ msg: "Kayıt başarılı" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Geçersiz kimlik bilgileri" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Geçersiz kimlik bilgileri" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};
