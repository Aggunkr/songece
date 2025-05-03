// routes/productRoutes.js
const express = require("express");
const router  = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  res.json(await Product.find());
});

router.get("/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ msg:"Ürün yok" });
  res.json(p);
});

module.exports = router;