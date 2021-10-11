// external imports
const express = require("express");
const {
  getAllOfferProduct,
  addOfferProduct,
} = require("../controllers/specialOfferController");
const router = express.Router();

// get all offer product
router.get("/get", getAllOfferProduct);

// add offer product
router.post("/post", addOfferProduct);

module.exports = router;
