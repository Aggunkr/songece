const express = require("express");
const router = express.Router();
const { addToFavorites, getFavorites, removeFavorite } = require("../controllers/favoriteController");
// Burada bütün auth middleware nesnesini almak yerine yalnızca protect fonksiyonunu alıyoruz:
const { protect } = require("../middleware/authMiddleware");

router.post("/favorites", protect, addToFavorites);
router.get("/favorites", protect, getFavorites);
router.delete("/favorites/:productId", protect, removeFavorite);

module.exports = router;
