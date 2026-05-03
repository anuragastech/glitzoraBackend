const Product = require("../models/Product");

// // GET all products
// exports.getProducts = async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// };



// GET products with pagination
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // newest first

    const total = await Product.countDocuments();

    res.json({
      products,
      total,
      page,
      pages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD product
exports.addProduct = async (req, res) => {
  const { name, price } = req.body;

  const newProduct = new Product({
    name,
    price,
    image: req.file.filename
  });

  await newProduct.save();
  res.json(newProduct);
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};