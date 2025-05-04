const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../Middleware/auth');
const Rating = require('../Models/Rating');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { productId, score } = req.body;
    const userId = req.user.id;
    let rating = await Rating.findOne({ product: productId, user: userId });
    if (rating) {
      rating.score = score;
      await rating.save();
    } else {
      rating = await Rating.create({ product: productId, user: userId, score });
    }
    const agg = await Rating.aggregate([
      { $match: { product: mongoose.Types.ObjectId(productId) } },
      { $group: { _id: '$product', avgScore: { $avg: '$score' }, count: { $sum: 1 } } }
    ]);
    res.json({ avgScore: agg[0]?.avgScore || score, count: agg[0]?.count || 1 });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const agg = await Rating.aggregate([
      { $match: { product: mongoose.Types.ObjectId(productId) } },
      { $group: { _id: '$product', avgScore: { $avg: '$score' }, count: { $sum: 1 } } }
    ]);
    res.json({ avgScore: agg[0]?.avgScore || 0, count: agg[0]?.count || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
