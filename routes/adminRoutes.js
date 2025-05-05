const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const original = path.parse(file.originalname).name;
    const safeName = original.replace(/\s+/g, "_").toLowerCase();
    const ext = path.extname(file.originalname);
    cb(null, safeName + "_" + Date.now() + ext);
  }
});
const upload = multer({ storage });

const { protect, isAdmin } = require("../middleware/authMiddleware");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
} = require("../controllers/adminController");

router.post('/products', protect, isAdmin, upload.single('image'), createProduct);
router.put("/products/:id", protect, isAdmin, updateProduct);
router.delete("/products/:id", protect, isAdmin, deleteProduct);
router.get("/users", protect, isAdmin, getAllUsers);

module.exports = router;
