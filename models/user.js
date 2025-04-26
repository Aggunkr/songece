// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, default: "user" },
  favorites:[{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
