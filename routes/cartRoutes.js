const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addToCart, removeFromCart, getCart } = require("../controllers/cartController");

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:productId", protect, removeFromCart);

module.exports = router;
