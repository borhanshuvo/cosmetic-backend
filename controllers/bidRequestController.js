// internal imports
const BidRequest = require("../models/BidRequest");

// get bid request data
async function getBidRequest(req, res, next) {
  try {
    const bidRequest = await BidRequest.find({});
    res.status(200).json(bidRequest);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error!",
    });
  }
}

// add bid request data
async function addBidRequest(req, res, next) {
  try {
    const bidRequest = new BidRequest(req.body);
    const result = await bidRequest.save();
    res.status(200).json({
      message: "Bid was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error!",
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
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error!",
    });
  }
}

module.exports = { getBidRequest, addBidRequest, updateBidRequest };
