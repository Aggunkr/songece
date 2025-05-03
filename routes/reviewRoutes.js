// routes/reviewRoutes.js
const express = require("express");
const router  = express.Router();

// Auth middleware: authMiddleware.js içinde şu şekilde export edilmiş olmalı:
// module.exports = { protect: verifyToken, isAdmin };
const { protect } = require("../middleware/authMiddleware");

const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

// Test için geliştirme aşamasında ekleyebilirsiniz:
// console.log("protect:",   protect);
// console.log("addReview:", addReview);

router.post(   "/reviews",                     protect, addReview);
router.get(    "/reviews/:productId",          getReviews);
router.delete( "/reviews/:productId/:reviewId", protect, deleteReview);

module.exports = router;