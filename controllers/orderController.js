// internal imports
const Order = require("../models/Order");

// get order list
async function getOrders(req, res, next) {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

// add order
async function addOrder(req, res, next) {
  try {
    const order = new Order(req.body);
    const result = order.save();
    res.status(200).json({
      message: "Order was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

module.exports = {
  getOrders,
  addOrder,
};
