// routes/authRoutes.js
const express = require("express");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const User    = require("../models/User");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username||!email||!password) return res.status(400).json({ msg:"Alanlar boş" });
  if (await User.findOne({ email })) return res.status(400).json({ msg:"E-posta var" });
  const hash = await bcrypt.hash(password,10);
  const u = new User({ username, email, password:hash, role });
  await u.save();
  res.json({ msg:"Kayıt başarılı" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u) return res.status(400).json({ msg:"Geçersiz kimlik" });
  if (!await bcrypt.compare(password, u.password))
    return res.status(400).json({ msg:"Geçersiz kimlik" });
  const token = jwt.sign({ id:u._id, role:u.role }, process.env.JWT_SECRET, { expiresIn:"1h" });
  res.json({ token });
});

module.exports = router;
