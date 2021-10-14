// external imports
const express = require("express");
const {
  getAllOfferProduct,
  addOfferProduct,
  getSingleOfferProduct,
  updateOfferProduct,
} = require("../controllers/specialOfferController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const imageUpload = require("../middlewares/products/imageUpload");
const router = express.Router();

// get all offer product
router.get("/get", checkLogin, getAllOfferProduct);

// get single offer product
router.get("/get/:id", checkLogin, getSingleOfferProduct);

// add offer product
router.post("/post", checkLogin, addOfferProduct);

// update offer product
router.put("/update/:id", checkLogin, imageUpload, updateOfferProduct);

module.exports = router;
