// external imports
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    streetAddress: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
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
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["deliverd", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
