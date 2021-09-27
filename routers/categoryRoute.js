// external imports
const express = require("express");
const {
  getCategory,
  addCategory,
} = require("../controllers/categoryController");

// internal imports
const router = express.Router();

// get category
router.get("/get", getCategory);

// post category
router.post("/post", addCategory);

module.exports = router;
