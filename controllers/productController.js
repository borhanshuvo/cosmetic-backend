// external import
const { unlink } = require("fs");
const path = require("path");

// internal imports
const Product = require("../models/Product");

// get products
async function getProducts(req, res, next) {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

// add products
async function addProduct(req, res, next) {
  let newProduct;

  if (req.files && req.files.length > 0) {
    newProduct = new Product({
      ...req.body,
      img: `${req.files[0].filename}`,
      imgURL: `${process.env.URL}/uploads/products/${req.files[0].filename}`,
    });
  } else {
    newProduct = new Product({
      ...req.body,
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
      message: "Internal Server Error!",
    });
  }
}

// update product
async function updateProduct(req, res, next) {
  const id = req.params.id;
  const product = await Product.find({ _id: id });
  if (req.files && req.files.length > 0) {
    // remove product image from directory
    if (product[0].img !== "") {
      unlink(
        path.join(__dirname, `/../public/uploads/products/${product[0].img}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    req.body.img = `${req.files[0].filename}`;
    req.body.imgURL = `${process.env.URL}/uploads/products/${req.files[0].filename}`;
  }
  // save product
  try {
    const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
};
