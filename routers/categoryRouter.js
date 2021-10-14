// external imports
const express = require("express");
const {
  getCategory,
  addCategory,
  getCategoryName,
} = require("../controllers/categoryController");
const { checkLogin } = require("../middlewares/common/checkLogin");

// internal imports
const router = express.Router();

// get category
router.get("/get", checkLogin,  getCategory);

// get category name
router.get("/categoryName", checkLogin, getCategoryName);

// post category
router.post("/post", checkLogin, addCategory);

module.exports = router;
