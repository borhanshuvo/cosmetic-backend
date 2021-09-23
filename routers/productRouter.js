// external imports
const express = require("express");
const { getProducts } = require("../controllers/productController");
const { checkLogin } = require("../middlewares/common/checkLogin");

// internal imports
const router = express.Router();

// get user
router.get("/get", checkLogin, getProducts);

// add user
router.post("/post");

module.exports = router;
