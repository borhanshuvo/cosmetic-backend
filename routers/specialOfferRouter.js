// external imports
const express = require("express");
const {
  getAllOfferProduct,
  addOfferProduct,
  getSingleOfferProduct,
} = require("../controllers/specialOfferController");
const router = express.Router();

// get all offer product
router.get("/get", getAllOfferProduct);

// get single offer product
router.get("/get/:id", getSingleOfferProduct);

// add offer product
router.post("/post", addOfferProduct);

module.exports = router;
