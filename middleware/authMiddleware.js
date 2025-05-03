// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ msg: "Token gerekli" });
  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token bulunamadı" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ msg: "Geçersiz token" });
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Yetkisiz erişim" });
  }
  next();
}

module.exports = { verifyToken, isAdmin };
