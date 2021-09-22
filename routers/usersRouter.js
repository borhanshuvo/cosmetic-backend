// external imports
const express = require("express");
const { addUser, getUsers } = require("../controllers/usersController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const avatarUpload = require("../middlewares/users/avatarUpload");

// internal imports
const router = express.Router();

// get user
router.get("/get", checkLogin, getUsers);

// add user
router.post("/post", avatarUpload, addUser);

module.exports = router;
