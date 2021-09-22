// external imports
const express = require("express");
const { addUser, getUsers } = require("../controllers/usersController");
const avatarUpload = require("../middlewares/users/avatarUpload");

// internal imports
const router = express.Router();

// get user
router.get("/get", getUsers);

// add user
router.post("/post", avatarUpload, addUser);

module.exports = router;
