// middleware/upload.js
const multer = require("multer");
const path  = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random()*1e9);
    cb(null, file.fieldname + "-" + unique + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg","image/png","image/jpg"];
  cb(null, allowed.includes(file.mimetype));
};

module.exports = multer({ storage, fileFilter });
