const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addProduct);
router.get('/', getProducts);

module.exports = router;
