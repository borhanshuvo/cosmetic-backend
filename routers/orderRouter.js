// external imports
const express = require("express");

// internal imports
const router = express.Router();

// get order info
router.get("/get");

// add order info
router.post("/post");

module.exports = router;
