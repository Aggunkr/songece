// routes/reviewRoutes.js
const express = require("express");
const router  = express.Router();
const { createReview, getReviewsByProduct } = require("../controllers/reviewController");
const { verifyToken: protect } = require("../middleware/authMiddleware");

router.post("/", protect, createReview);
router.get("/:productId", getReviewsByProduct);

module.exports = router;
