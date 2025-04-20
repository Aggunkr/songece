const express = require("express");
const router = express.Router();
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Favori işlemleri (varsa)
const { addToFavorites, getFavorites, removeFavorite } = require("../controllers/favoriteController");
router.post("/favorites", protect, addToFavorites);
router.get("/favorites", protect, getFavorites);
router.delete("/favorites/:productId", protect, removeFavorite);

// Profil işlemleri:
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
