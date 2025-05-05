
const User = require("../models/User");

// Favori ekle
async function addToFavorites(req, res) {
  const u = await User.findById(req.user.id);
  if (!u) return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
  if (!u.favorites.includes(req.body.productId)) {
    u.favorites.push(req.body.productId);
    await u.save();
  }
  return res.status(200).json(u.favorites);
}

// Favorileri listele
async function getFavorites(req, res) {
  const u = await User.findById(req.user.id).populate('favorites');
  if (!u) return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
  res.json(u.favorites);
}

// Favori çıkar
async function removeFavorite(req, res) {
  const u = await User.findById(req.user.id);
  if (!u) return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
  u.favorites = u.favorites.filter(id => id.toString() !== req.params.productId);
  await u.save();
  res.json(u.favorites);
}

module.exports = { addToFavorites, getFavorites, removeFavorite };
