// external imports
const express = require("express");
const {
  getPremiumBidRequest,
  getSinglePremiumBidRequest,
  addPremiumBidRequest,
  updatePremiumBidRequest,
  pendingOrderStatus,
} = require("../controllers/premiumBidRequestController");
const { checkLogin } = require("../middlewares/common/checkLogin");

// internal imports
const router = express.Router();

// get premium bid request data
router.get("/get", checkLogin, getPremiumBidRequest);

// get premium bid request data by user
router.get("/get/:email", checkLogin, getSinglePremiumBidRequest);

// add premium bid request
router.post("/post", checkLogin, addPremiumBidRequest);

// update premium bid request
router.put("/update/:id", checkLogin, updatePremiumBidRequest);

// get bid request pending Order Status
router.get("/pendingOrderStatus", checkLogin, pendingOrderStatus);

module.exports = router;
