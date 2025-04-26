// routes/adminRoutes.js
const express = require("express");
const router  = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const Product = require("../models/Product");

router.post(
  "/products",
  verifyToken,
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ msg:"Resim eksik" });
    const p = new Product({
      name:req.body.name,
      price:req.body.price,
      description:req.body.description,
      category:req.body.category,
      imageUrl:`/uploads/${req.file.filename}`
    });
    res.status(201).json(await p.save());
  }
);

module.exports = router;
