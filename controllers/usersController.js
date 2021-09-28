// external import
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

// internal imports
const User = require("../models/User");
const e = require("express");

// get users
async function getUsers(req, res, next) {
  try {
    const result = await User.find({});
    const users = result.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

// add users
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: `${req.files[0].filename}`,
      imgURL: `${process.env.URL}/uploads/avatars/${req.files[0].filename}`,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

// update user
async function updateUser(req, res, next) {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  if (req.files && req.files.length > 0) {
    // remove avatar from directory
    if (user.avatar !== "") {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user[0].avatar}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    req.body.avatar = `${req.files[0].filename}`;
    req.body.imgURL = `${process.env.URL}/uploads/avatars/${req.files[0].filename}`;
  }
  // save user
  try {
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

// password reset mail
async function resetPasswordMail(req, res, next) {
  const email = req.body.email;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const randomNumber = Math.ceil(Math.random() * 1000000);
    const date = new Date().getDate();
    const hours = new Date().getHours();
    const seccond = new Date().getSeconds();
    const code = randomNumber + date + hours + seccond;
    const user = await User.findOne({ email: email });
    req.body.verificationCode = code;
    const result = await User.findByIdAndUpdate(user._id, req.body, {
      new: true,
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Reset Password",
      text: `Your verification code : ${code}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          message: `Check your mail - ${email} for reset password`,
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

// check verification code
async function checkVerificationCode(req, res, next) {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    const code = req.body.code;
    if (user.verificationCode === code) {
      res.status(200).json({
        message: "Verification code matched!",
      });
    } else {
      res.status(400).json({
        message: "Something went wrong!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

// change password
async function changePassword(req, res, next) {
  try {
    const code = req.body.code;
    const user = await User.findOne({ verificationCode: code });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const result = await User.findByIdAndUpdate(user._id, req.body, {
      new: true,
    });
    if (result) {
      res.status(200).json({
        message: "Password changed successfully!",
      });
    } else {
      res.status(400).json({
        message: "Something went wrong!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

// remove notification
async function deleteNotification(req, res, next) {
  try {
    const id = `${new mongoose.Types.ObjectId(req.params.id)}`;
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    const notification = user.notification.filter((nt) => `${nt._id}` !== id);
    await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: { notification: notification } },
      { useFindAndModify: false }
    );
    res.status(200).json({
      message: "Notification was deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error!",
    });
  }
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  resetPasswordMail,
  checkVerificationCode,
  changePassword,
  deleteNotification,
};
