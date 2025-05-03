// controllers/reviewController.js
const Product = require("../models/Product");
const User    = require("../models/User");

// Yeni yorum ekle
async function addReview(req, res) {
  const { productId, rating, comment } = req.body;

  // Ürünü ve kullanıcıyı kontrol et
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ msg: "Ürün bulunamadı" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
  }

  // Yorum nesnesi
  const review = {
    user:    user._id,
    name:    user.name,
    rating:  Number(rating),
    comment: comment,
  };

  product.reviews.push(review);
  // Ortalama puanı güncelle
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.numReviews;

  await product.save();
  return res.status(201).json({ msg: "Yorum eklendi", review });
}

// Ürün yorumlarını getir
async function getReviews(req, res) {
  const product = await Product.findById(req.params.productId).populate({
    path: "reviews.user",
    select: "name email",
  });
  if (!product) {
    return res.status(404).json({ msg: "Ürün bulunamadı" });
  }
  return res.status(200).json(product.reviews);
}

// Yorum sil (yalnızca admin veya yorum sahibi)
async function deleteReview(req, res) {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return res.status(404).json({ msg: "Ürün bulunamadı" });
  }

  const review = product.reviews.id(req.params.reviewId);
  if (!review) {
    return res.status(404).json({ msg: "Yorum bulunamadı" });
  }

  // Sadece admin veya yorumun sahibi silebilir
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ msg: "Yetkisiz işlem" });
  }

  review.remove();
  // Puana göre tekrar hesapla
  product.numReviews = product.reviews.length;
  product.rating = product.numReviews
    ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.numReviews
    : 0;

  await product.save();
  return res.status(200).json({ msg: "Yorum silindi" });
}

module.exports = {
  addReview,
  getReviews,
  deleteReview,
};