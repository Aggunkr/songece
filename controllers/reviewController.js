// controllers/reviewController.js
const Review = require("../models/Review");

async function createReview(req, res) {
  const { productId, rating, comment } = req.body;
  const r = new Review({
    user: req.user.id,
    product: productId,
    rating,
    comment
  });
  await r.save();
  res.status(201).json(r);
}

async function getReviewsByProduct(req, res) {
  const reviews = await Review
    .find({ product: req.params.productId })
    .populate("user", "username");
  res.json(reviews);
}

module.exports = { createReview, getReviewsByProduct };
