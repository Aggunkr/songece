// app.js
require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const path     = require("path");

const authRoutes    = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes    = require("./routes/userRoutes");
const adminRoutes   = require("./routes/adminRoutes");
const reviewRoutes  = require("./routes/reviewRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

// Statik dosyaları servis et
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("✅ MongoDB Bağlandı"))
  .catch(e=>console.error("❌ MongoDB Hata:",e));

app.use("/api/auth",    authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/users",   userRoutes);
app.use("/api/admin",   adminRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req,res) => res.send("🚀 Aggun E-Ticaret API"));

const PORT = process.env.PORT||3000;
app.listen(PORT, ()=>console.log(`⚡️ Sunucu ${PORT} portunda`));
