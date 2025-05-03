// routes/adminRoutes.js
const express = require("express");
const router  = express.Router();

// Auth middleware — authMiddleware.js içinde şu şekilde export ettiğimizden emin olun:
// module.exports = { protect: verifyToken, isAdmin };
const { protect, isAdmin } = require("../middleware/authMiddleware");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
} = require("../controllers/adminController");

// Development sırasında kontrol etmek için ekleyebilirsiniz:
// console.log("protect:",    protect);
// console.log("isAdmin:",    isAdmin);
// console.log("createProduct:", createProduct);

router.post(   "/admin/products",          protect, isAdmin, createProduct);
router.put(    "/admin/products/:id",      protect, isAdmin, updateProduct);
router.delete( "/admin/products/:id",      protect, isAdmin, deleteProduct);
router.get(    "/admin/users",             protect, isAdmin, getAllUsers);

module.exports = router;