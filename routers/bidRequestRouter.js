// external imports
const express = require("express");
const {
  getBidRequest,
  addBidRequest,
  updateBidRequest,
  getSingleBidRequest,
  pendingOrderStatus,
} = require("../controllers/bidRequestController");
const { checkLogin } = require("../middlewares/common/checkLogin");

// internal imports
const router = express.Router();

// get bid request data
router.get("/get", checkLogin, getBidRequest);

// get bid request data by user
router.get("/get/:email", checkLogin, getSingleBidRequest);

// add bid request
router.post("/post", checkLogin, addBidRequest);

// update bid request
router.put("/update/:id", checkLogin, updateBidRequest);

// get bid request pending Order Status
router.get("/pendingOrderStatus", checkLogin, pendingOrderStatus);

module.exports = router;
