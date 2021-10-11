// external imports
const express = require("express");
const {
  getOrders,
  addOrder,
  orderInfo,
  orderStatus,
  getTotalEarning,
} = require("../controllers/orderController");

// internal imports
const router = express.Router();

// get order info
router.get("/get", getOrders);

// add order info
router.post("/post", addOrder);

// get order by user email
router.post("/info", orderInfo);

// update order status
router.put("/update/:id", orderStatus);

// get total earning
router.get("/totalEarning", getTotalEarning);

module.exports = router;
