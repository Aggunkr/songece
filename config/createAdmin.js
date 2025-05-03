const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

mongoose.connect("mongodb://127.0.0.1:27017/aggun", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = new User({
    username: "admin",
    password: hashedPassword
  });

  await admin.save();
  console.log("Admin hesabı oluşturuldu!");
  mongoose.connection.close();
};

createAdmin();
