// external imports
const mongoose = require("mongoose");

const saveNotificationSchema = mongoose.Schema(
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
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const SaveNotification = mongoose.model(
  "SaveNotification",
  saveNotificationSchema
);
module.exports = SaveNotification;
