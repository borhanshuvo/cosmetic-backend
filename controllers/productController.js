// internal imports
const Product = require("../models/Product");

// get products
async function getProducts(req, res, next) {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: "Unknown error occured!",
    });
  }
}

// add products
async function addProduct(req, res, next) {
  let newProduct;

  if (req.files && req.files.length > 0) {
    newProduct = new Product({
      ...req.body,
      avatar: `${process.env.URL}/uploads/products/${req.files[0].filename}`,
    });
  }

  // save product
  try {
    const result = await newProduct.save();
    res.status(200).json({
      message: "Product was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
}

module.exports = {
  getProducts,
  addProduct,
};
