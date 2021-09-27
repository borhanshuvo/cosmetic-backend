// external imports
const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    bid: {
      type: String,
      require: true,
    },
    quantity: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    imgURL: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
