const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    aboutMe: {
      type: String,
      require: true,
    },
    instagramUsername: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
