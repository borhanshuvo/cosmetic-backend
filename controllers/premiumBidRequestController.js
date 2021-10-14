// internal imports
const PremiumBidRequest = require("../models/PremiumBidRequest");

// get premium bid request data
async function getPremiumBidRequest(req, res, next) {
  try {
    const premiumBidRequest = await PremiumBidRequest.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(premiumBidRequest);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
}

// get premium bid request data by user
async function getSinglePremiumBidRequest(req, res, next) {
  try {
    const email = req.params.email;
    const premiumBidRequest = await PremiumBidRequest.find({
      email: email,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(premiumBidRequest);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
}

// add premium bid request data
async function addPremiumBidRequest(req, res, next) {
  try {
    const premiumBidRequest = new PremiumBidRequest(req.body);
    const result = await premiumBidRequest.save();
    res.status(200).json({
      success: "Premium Bid was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
}

// update premium bid request
async function updatePremiumBidRequest(req, res, next) {
  try {
    const id = req.params.id;
    const result = await PremiumBidRequest.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
}

module.exports = {
  getPremiumBidRequest,
  getSinglePremiumBidRequest,
  addPremiumBidRequest,
  updatePremiumBidRequest,
};
