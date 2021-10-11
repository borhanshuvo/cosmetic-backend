// external imports
const mongoose = require("mongoose");

const specialOfferSchema = mongoose.Schema(
  {
    product: {
      type: Object,
      required: true,
    },
    startingDate: {
      type: Number,
      required: true,
    },
    endingDate: {
      type: Number,
      required: true,
    },
    startingDateMiliSecond: {
      type: Number,
      required: true,
    },
    endingDateMiliSecond: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SpecialOffer = mongoose.model("SpecialOffer", specialOfferSchema);
module.exports = SpecialOffer;
