const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { authMiddleware } = require("../middleware/auth");
const { getPosts, addPost } = require("../controllers/communityController");

// Configuración de almacenamiento para las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // carpeta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get("/", getPosts);
router.post("/", authMiddleware, upload.single("image"), addPost);

module.exports = router;
