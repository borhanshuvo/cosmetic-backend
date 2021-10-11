// external imports
const mongoose = require("mongoose");

const specialOfferSchema = mongoose.Schema(
  {
    product: {
      type: Object,
      required: true,
    },
    startingDate: {
      type: String,
      required: true,
    },
    endingDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Deactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const SpecialOffer = mongoose.model("SpecialOffer", specialOfferSchema);
module.exports = SpecialOffer;
