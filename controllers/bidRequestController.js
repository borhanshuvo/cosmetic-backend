// internal imports
const BidRequest = require("../models/BidRequest");
const User = require("../models/User");

// get bid request data
async function getBidRequest(req, res, next) {
  try {
    const bidRequest = await BidRequest.find({}).sort({ createdAt: -1 });
    res.status(200).json(bidRequest);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
}

// get bid request data by user
async function getSingleBidRequest(req, res, next) {
  try {
    const email = req.params.email;
    const bidRequest = await BidRequest.find({ email: email }).sort({
      createdAt: -1,
    });
    res.status(200).json(bidRequest);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
}

// add bid request data
async function addBidRequest(req, res, next) {
  try {
    const admin = await User.findOne({ role: "admin" });
    const bidRequest = new BidRequest(req.body);
    const result = await bidRequest.save();
    res.status(200).json({
      success: "Bid was added successfully!",
      adminPushToken: admin.pushToken,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
}

// update bid request
async function updateBidRequest(req, res, next) {
  try {
    const id = req.params.id;
    const result = await BidRequest.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const pushToken = await User.find({
      pushToken: { $exists: true, $ne: null },
    });
    res.status(200).json({ result, pushToken });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
}

// pending length
async function pendingOrderStatus(req, res, next) {
  try {
    const order = await BidRequest.find({ status: "Pending" });
    res.status(200).json(order.length);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

module.exports = {
  getBidRequest,
  addBidRequest,
  updateBidRequest,
  getSingleBidRequest,
  pendingOrderStatus
};
