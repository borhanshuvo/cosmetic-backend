// external imports
const express = require("express");
const {
  getProducts,
  addProduct,
  updateProduct,
  getSingleProduct,
  getProductName,
} = require("../controllers/productController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const imageUpload = require("../middlewares/products/imageUpload");

// internal imports
const router = express.Router();

// get product
router.get("/get", getProducts);

// get single product
router.get("/get/:id", getSingleProduct);

// get product name
router.get("/productName", getProductName);

// add product
router.post("/post", imageUpload, addProduct);

// update product
router.put("/update/:id", imageUpload, updateProduct);

module.exports = router;
