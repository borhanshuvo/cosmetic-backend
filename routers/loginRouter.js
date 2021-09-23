// external imports
const express = require("express");

// internal imports
const { login } = require("../controllers/loginController");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidator");

// internal imports
const router = express.Router();

// add user
router.post("/post", doLoginValidators, doLoginValidationHandler, login);

module.exports = router;
