const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      console.error("Token Hatası:", error);
      return res.status(401).json({ msg: "Geçersiz token" });
    }
  }
  if (!token) {
    return res.status(401).json({ msg: "Yetkisiz erişim, token gerekli" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ msg: "Admin yetkiniz yok" });
};

module.exports = { protect, isAdmin };
