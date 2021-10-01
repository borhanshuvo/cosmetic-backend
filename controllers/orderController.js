// internal imports
const Order = require("../models/Order");
const User = require("../models/User");

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

// get product by user email
async function orderInfo(req, res, next) {
  try {
    const id = req.params.id;
    const userInfo = await User.findOne({ _id: id });
    if (userInfo) {
      const { password, ...rest } = userInfo._doc;
      const email = userInfo.email;
      const orderInfo = await Order.find({ email: email });
      res.status(200).json({ orderInfo, userInfo: rest });
    } else {
      res.status(400).json({
        message: "User not found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

module.exports = {
  getOrders,
  addOrder,
  orderInfo,
};
