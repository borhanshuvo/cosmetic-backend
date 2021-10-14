// external import
const { unlink } = require("fs");
const path = require("path");

// internal imports
const Product = require("../models/Product");
const User = require("../models/User");

// get products
async function getProducts(req, res, next) {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// get single products
async function getSingleProduct(req, res, next) {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// get product name
async function getProductName(req, res, next) {
  try {
    const result = await Product.find({});
    const productName = result.map((product) => {
      const { title, ...rest } = product._doc;
      return title;
    });
    res.status(200).json(productName);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
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
      imgURL: `/uploads/products/${req.files[0].filename}`,
    });
  }

  // save product
  try {
    const result = await newProduct.save();
    const users = await User.find({});

    users.map(async (user) => {
      const prevNotification = user.notification;
      const notification = [result, ...prevNotification];

      await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: { notification: notification } },
        { useFindAndModify: false }
      );
    });

    res.status(200).json({
      success: "Product was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// update product
async function updateProduct(req, res, next) {
  const id = req.params.id;
  // const product = await Product.find({ _id: id });
  if (req.files && req.files.length > 0) {
    // remove product image from directory
    // if (product[0].img !== "") {
    //   unlink(
    //     path.join(__dirname, `/../public/uploads/products/${product[0].img}`),
    //     (err) => {
    //       if (err) {
    //         console.log(err);
    //       }
    //     }
    //   );
    // }
    req.body.img = `${req.files[0].filename}`;
    req.body.imgURL = `/uploads/products/${req.files[0].filename}`;
  }
  // save product
  try {
    const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  getSingleProduct,
  getProductName,
};
