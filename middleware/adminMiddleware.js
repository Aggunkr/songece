// İsteğe bağlı: ayrı adminMiddleware.js (ancak yukarıdaki 'isAdmin' fonksiyonu da kullanılabilir)
const { protect } = require("./authMiddleware");
const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  await protect(req, res, async () => {
    const user = req.user;
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ msg: "Admin yetkiniz yok" });
    }
  });
};

module.exports = adminMiddleware;
