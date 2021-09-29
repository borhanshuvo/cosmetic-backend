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
    quantity: {
      type: String,
      required: true,
    },
    product: {
      type: Array,
      required: true,
    },
    bidAmmount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "not approved", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const BidRequest = mongoose.model("BidRequest", bidRequestSchema);
module.exports = BidRequest;
