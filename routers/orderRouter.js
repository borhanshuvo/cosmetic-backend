// external imports
const express = require("express");
const {
  getOrders,
  addOrder,
  orderInfo,
} = require("../controllers/orderController");

// internal imports
const router = express.Router();

// get order info
router.get("/get", getOrders);

// add order info
router.post("/post", addOrder);

// get order by user email
router.post("/info", orderInfo);
// router.get("/info/:id", orderInfo);

module.exports = router;
