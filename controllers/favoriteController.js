const Favorite = require("../models/Favorite");

const addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ msg: "ProductId gerekli" });
    }
    // Aynı ürün favorilerdeyse hata döndür
    const existing = await Favorite.findOne({ userId: req.user.id, productId });
    if (existing) {
      return res.status(400).json({ msg: "Bu ürün zaten favorilerde" });
    }
    const favorite = new Favorite({ userId: req.user.id, productId });
    await favorite.save();
    res.status(201).json({ msg: "Favorilere eklendi", favorite });
  } catch (error) {
    console.error("Favori ekleme hatası:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id }).populate("productId");
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Favori listeleme hatası:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleted = await Favorite.findOneAndDelete({ userId: req.user.id, productId });
    if (!deleted) {
      return res.status(404).json({ msg: "Favori bulunamadı" });
    }
    res.status(200).json({ msg: "Favoriden kaldırıldı" });
  } catch (error) {
    console.error("Favori silme hatası:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

module.exports = {
  addToFavorites,
  getFavorites,
  removeFavorite
};
