// controllers/favoriteController.js
const User = require("../models/User");

async function addToFavorites(req, res) {
  const u = await User.findById(req.user.id);
  if (!u.favorites.includes(req.body.productId)) {
    u.favorites.push(req.body.productId);
    await u.save();
  }
  res.json(u.favorites);
}

async function getFavorites(req, res) {
  const u = await User.findById(req.user.id).populate("favorites");
  res.json(u.favorites);
}

async function removeFavorite(req, res) {
  const u = await User.findById(req.user.id);
  u.favorites = u.favorites.filter(
    id => id.toString() !== req.params.productId
  );
  await u.save();
  res.json(u.favorites);
}

module.exports = { addToFavorites, getFavorites, removeFavorite };
