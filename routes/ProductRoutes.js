const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getProducts,
  addProduct,
  deleteProduct
} = require("../controllers/ProductController");

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.get("/", getProducts);
router.post("/", upload.single("image"), addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;