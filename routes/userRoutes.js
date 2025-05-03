// routes/userRoutes.js
const express = require("express");
const router  = express.Router();
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const { addToFavorites, getFavorites, removeFavorite } = require("../controllers/favoriteController");
const { verifyToken: protect } = require("../middleware/authMiddleware");

router.get("/profile",  protect, getUserProfile);
router.put("/profile",  protect, updateUserProfile);

router.post("/favorites",          protect, addToFavorites);
router.get("/favorites",           protect, getFavorites);
router.delete("/favorites/:productId", protect, removeFavorite);

module.exports = router;
