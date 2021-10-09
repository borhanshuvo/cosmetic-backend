// external imports
const express = require("express");
const {
  getOrders,
  addOrder,
  orderInfo,
  orderStatus,
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

module.exports = router;
