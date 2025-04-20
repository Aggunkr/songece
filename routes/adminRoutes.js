const express = require("express");
const router = express.Router();
const { getUsers, deleteUser, getProducts, updateProduct, deleteProduct, getOrders, updateOrderStatus } = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get('/users', protect, isAdmin, getUsers);
router.delete('/users/:userId', protect, isAdmin, deleteUser);

router.get('/products', protect, isAdmin, getProducts);
router.put('/products/:productId', protect, isAdmin, updateProduct);
router.delete('/products/:productId', protect, isAdmin, deleteProduct);

router.get('/orders', protect, isAdmin, getOrders);
router.put('/orders/:orderId', protect, isAdmin, updateOrderStatus);

module.exports = router;
