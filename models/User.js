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
    category: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    imgURL: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      default: "",
    },
    notification: {
      type: Array,
      default: [],
    },
    premium: {
      type: String,
      enum: ["Premium", "NotPremium", "Pending"],
      default: "NotPremium",
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
