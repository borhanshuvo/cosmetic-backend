// external imports
const express = require("express");
const {
  getOrders,
  addOrder,
  orderInfo,
  orderStatus,
  getTotalEarning,
  getStatisticsValue,
  successPayment,
  cancelPayment,
} = require("../controllers/orderController");
const { checkLogin } = require("../middlewares/common/checkLogin");

// internal imports
const router = express.Router();

// get order info
router.get("/get", checkLogin, getOrders);

// payment success
router.get("/success", successPayment);

// payment cancel
router.get("/cancel", cancelPayment);

// add order info
router.post("/post", checkLogin, addOrder);

// get order by user email
router.post("/info", checkLogin, orderInfo);

// update order status
router.put("/update/:id", checkLogin, orderStatus);

// get total earning
router.get("/totalEarning", checkLogin, getTotalEarning);

// get yearly statistics value
router.get("/statistics/:year", checkLogin, getStatisticsValue);

module.exports = router;
