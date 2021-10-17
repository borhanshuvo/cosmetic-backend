const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema(
  {
    creator: {
      id: mongoose.Types.ObjectId,
      name: String,
      email: String,
      image: String,
    },
    participant: {
      id: mongoose.Types.ObjectId,
      name: String,
      email: String,
      image: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
