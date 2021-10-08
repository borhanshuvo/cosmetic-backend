// external imports
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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
      unique: true,
    },
    aboutMe: {
      type: String,
      required: true,
    },
    instagramUsername: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "profile_img-1632764376893.jpg",
    },
    imgURL: {
      type: String,
      default: "/uploads/avatars/profile_img-1632764376893.jpg",
    },
    password: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
    },
    notification: {
      type: Array,
      default: [],
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
