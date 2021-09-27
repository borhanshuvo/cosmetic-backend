// external imports
const express = require("express");
const { getProducts, addProduct, updateProduct } = require("../controllers/productController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const imageUpload = require("../middlewares/products/imageUpload");

// internal imports
const router = express.Router();

// get product
router.get("/get",checkLogin, getProducts);

// add product
router.post("/post",checkLogin, imageUpload, addProduct);

// update product
router.put("/update/:id",checkLogin, imageUpload, updateProduct);

module.exports = router;