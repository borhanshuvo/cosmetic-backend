// external imports
const express = require("express");
const {
  addUser,
  getUsers,
  updateUser,
  resetPasswordMail,
  checkVerificationCode,
  changePassword,
  deleteNotification,
  searchUser,
  getUserNotification,
  singleUser,
  getAdmins,
} = require("../controllers/usersController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const {
  addPassValidators,
  addPassValidationHandler,
} = require("../middlewares/forgetPassword/forgetPassValidator");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidationHandler,
  addUserValidators,
} = require("../middlewares/users/usersValidators");

// internal imports
const router = express.Router();

// get users
router.get("/get", checkLogin, getUsers);

// get admins
router.get("/get/admin", checkLogin, getAdmins);

// get user by id
router.get("/get/:id", checkLogin, singleUser);

// add user
router.post(
  "/post",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// update user
router.put("/update/:id", checkLogin, avatarUpload, updateUser);

// reset password mail
router.put("/resetPasswordMail", resetPasswordMail);

// check verification code
router.put("/checkVerificationCode", checkVerificationCode);

// change password
router.put(
  "/changePassword",
  addPassValidators,
  addPassValidationHandler,
  changePassword
);

// remove notification
router.delete("/deleteNotification/:id", checkLogin, deleteNotification);

// search user
router.post("/search", checkLogin, searchUser);

// get user notification
router.post("/getUserNotification", checkLogin, getUserNotification);

module.exports = router;
