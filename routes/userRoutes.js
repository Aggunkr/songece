// routes/userRoutes.js
const express = require("express");
const router  = express.Router();

// Aşağıdaki satırın, protect middleware'ini doğru çektiğinden emin olun:
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

// Test için—geliştirme aşamasında şu satırları ekleyip kontrol edebilirsiniz:
// console.log("registerUser:",   registerUser);
// console.log("loginUser:",      loginUser);
// console.log("getUserProfile:", getUserProfile);

router.post( "/users/register", registerUser);
router.post( "/users/login",    loginUser);
// Burada protect middleware’inin fonksiyon olduğundan %100 emin olmalısınız:
router.get(  "/users/profile",  protect, getUserProfile);

module.exports = router;