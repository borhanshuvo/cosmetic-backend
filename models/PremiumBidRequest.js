// external imports
const mongoose = require("mongoose");

const premiumBidRequestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    img: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
    bidAmmount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Approved", "NotApproved", "Pending"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const PremiumBidRequest = mongoose.model(
  "PremiumBidRequest",
  premiumBidRequestSchema
);
module.exports = PremiumBidRequest;
