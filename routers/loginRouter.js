// external imports
const express = require("express");

// internal imports
const { login } = require("../controllers/loginController");

// internal imports
const router = express.Router();

// add user
router.post("/post", login);

module.exports = router;
