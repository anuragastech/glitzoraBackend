const express = require("express");
const router = express.Router();

const {
  getProducts,
  addProduct,
  deleteProduct
} = require("../controllers/ProductController");

const multer = require("../config/multer"); // ✅ use your config file
const upload = multer.single("image");

// Routes
router.get("/", getProducts);
router.post("/", upload, addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;