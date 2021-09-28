// external imports
const express = require("express");
const { getOrders, addOrder } = require("../controllers/orderController");

// internal imports
const router = express.Router();

// get order info
router.get("/get", getOrders);

// add order info
router.post("/post", addOrder);

module.exports = router;
