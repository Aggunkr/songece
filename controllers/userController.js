// controllers/userController.js
const User = require("../models/User");

async function getUserProfile(req, res) {
  const u = await User.findById(req.user.id).select("-password");
  res.json(u);
}

async function updateUserProfile(req, res) {
  const u = await User.findById(req.user.id);
  if (!u) return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
  const { username, email } = req.body;
  if (username) u.username = username;
  if (email)    u.email = email;
  await u.save();
  res.json(u);
}

module.exports = { getUserProfile, updateUserProfile };
