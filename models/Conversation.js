const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema(
  {
    creator: {
      id: mongoose.Types.ObjectId,
      name: String,
      email: String,
      image: String,
      backColor: {
        type: String,
        default: "#E1E9E9",
      },
    },
    participant: {
      id: mongoose.Types.ObjectId,
      name: String,
      email: String,
      image: String,
      backColor: {
        type: String,
        default: "#E1E9E9",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
