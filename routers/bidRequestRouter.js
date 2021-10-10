// external imports
const express = require("express");
const {
  getBidRequest,
  addBidRequest,
  updateBidRequest,
  getSingleBidRequest,
} = require("../controllers/bidRequestController");

// internal imports
const router = express.Router();

// get bid request data
router.get("/get", getBidRequest);

// get bid request data by user
router.get("/get/:email", getSingleBidRequest);

// add bid request
router.post("/post", addBidRequest);

// update bid request
router.put("/update/:id", updateBidRequest);

module.exports = router;
