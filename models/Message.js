const mongoose = require("mongoose");

const MessageModal = mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    sender: {
      id: mongoose.Types.ObjectId,
      name: String,
      image: String,
    },
    receiver: {
      id: mongoose.Types.ObjectId,
      name: String,
      image: String,
    },
    date_time: {
      type: Date,
      default: Date.now,
    },
    conversation_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageModal);