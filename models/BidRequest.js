// external imports
const mongoose = require("mongoose");

const bidRequestSchema = mongoose.Schema(
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
      enum: ["Deliverd", "Pending", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const BidRequest = mongoose.model("BidRequest", bidRequestSchema);
module.exports = BidRequest;
