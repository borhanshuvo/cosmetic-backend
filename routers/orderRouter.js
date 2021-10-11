// external imports
const express = require("express");
const {
  getOrders,
  addOrder,
  orderInfo,
  orderStatus,
  getTotalEarning,
  getStatisticsValue,
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

// get yearly statistics value
router.get("/statistics/:year", getStatisticsValue);

module.exports = router;
