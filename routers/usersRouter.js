// external imports
const express = require("express");
const { addUser, getUsers } = require("../controllers/usersController");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidationHandler,
  addUserValidators,
} = require("../middlewares/users/usersValidators");

// internal imports
const router = express.Router();

// get user
router.get("/get", getUsers);

// add user
router.post(
  "/post",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

module.exports = router;
