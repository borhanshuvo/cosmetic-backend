// external imports
const express = require("express");
const {
  getProducts,
  addProduct,
  updateProduct,
  getSingleProduct,
  getProductName,
  deleteProduct,
} = require("../controllers/productController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const imageUpload = require("../middlewares/products/imageUpload");

// internal imports
const router = express.Router();

// get product
router.get("/get", checkLogin, getProducts);

// get single product
router.get("/get/:id", checkLogin, getSingleProduct);

// get product name
router.get("/productName", checkLogin, getProductName);

// add product
router.post("/post", checkLogin, imageUpload, addProduct);

// update product
router.put("/update/:id", checkLogin, imageUpload, updateProduct);

// delete product
router.delete("/delete/:id", checkLogin, deleteProduct);

module.exports = router;
