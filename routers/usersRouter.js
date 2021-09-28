// external imports
const express = require("express");
const {
  addUser,
  getUsers,
  updateUser,
  resetPasswordMail,
  checkVerificationCode,
  changePassword,
} = require("../controllers/usersController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidationHandler,
  addUserValidators,
} = require("../middlewares/users/usersValidators");

// internal imports
const router = express.Router();

// get user
router.get("/get", checkLogin, getUsers);

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
router.put("/changePassword", changePassword);

module.exports = router;
