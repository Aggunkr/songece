// controllers/userController.js
const User = require("../models/User");
const jwt  = require("jsonwebtoken");

// Kullanıcı kaydı
async function registerUser(req, res) {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: "E-posta zaten kayıtlı" });
  }
  const user = await User.create({ name, email, password });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return res.status(201).json({ 
    id:    user._id, 
    name:  user.name, 
    email: user.email, 
    token 
  });
}

// Kullanıcı girişi (login)
async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ msg: "Geçersiz kimlik bilgileri" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return res.status(200).json({
    id:    user._id,
    name:  user.name,
    email: user.email,
    token
  });
}

// Mevcut kullanıcının profili
async function getUserProfile(req, res) {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
  }
  return res.status(200).json(user);
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};