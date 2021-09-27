// external imports
const express = require("express");
const {
  getCategory,
  addCategory,
} = require("../controllers/categoryController");
const { checkLogin } = require("../middlewares/common/checkLogin");

// internal imports
const router = express.Router();

// get category
router.get("/get", getCategory);

// post category
router.post("/post", checkLogin, addCategory);

module.exports = router;
