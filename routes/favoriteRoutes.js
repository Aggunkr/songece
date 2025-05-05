// routes/favoriteRoutes.js
const express = require("express");
const router  = express.Router();

// protect alias’ı verifyToken fonksiyonuna işaret ediyor
const { protect } = require("../middleware/authMiddleware");

const {
  addToFavorites,
  getFavorites,
  removeFavorite,
} = require("../controllers/favoriteController");

// Test amaçlı (geliştirme sırasında kaldırabilirsiniz)
// console.log("protect:", protect);
// console.log("addToFavorites:", addToFavorites);

router.post(   "\/",             protect, addToFavorites);
router.get(    "\/",             protect, getFavorites);
router.delete( "\/:productId",  protect, removeFavorite);

module.exports = router;