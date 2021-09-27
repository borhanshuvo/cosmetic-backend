// external imports
const express = require("express");
const { addUser, getUsers, updateUser } = require("../controllers/usersController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidationHandler,
  addUserValidators,
} = require("../middlewares/users/usersValidators");

// internal imports
const router = express.Router();

// get user
router.get("/get",checkLogin, getUsers);

// add user
router.post(
  "/post",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// update user
router.put("/update/:id",checkLogin, avatarUpload, updateUser);

module.exports = router;
