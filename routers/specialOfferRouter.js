// external imports
const express = require("express");
const {
  getAllOfferProduct,
  addOfferProduct,
  getSingleOfferProduct,
  updateOfferProduct,
} = require("../controllers/specialOfferController");
const imageUpload = require("../middlewares/products/imageUpload");
const router = express.Router();

// get all offer product
router.get("/get", getAllOfferProduct);

// get single offer product
router.get("/get/:id", getSingleOfferProduct);

// add offer product
router.post("/post", addOfferProduct);

// update offer product
router.put("/update/:id", imageUpload, updateOfferProduct);

module.exports = router;
