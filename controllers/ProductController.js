


const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// ✅ GET PRODUCTS (pagination)
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments();

    res.status(200).json({
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // 🔥 Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "glitzora_products", // optional (organize images)
    });

    const newProduct = new Product({
      name,
      price,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 Delete image from Cloudinary
    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 Delete image from Cloudinary
    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};