// external imports
const express = require("express");
const {
  getSaveNotification,
  addSaveNotification,
} = require("../controllers/saveNotificationController");
const { checkLogin } = require("../middlewares/common/checkLogin");

// internal imports
const router = express.Router();

// get save notification
router.get("/get/:email", checkLogin, getSaveNotification);

// post save notification
router.post("/post", checkLogin, addSaveNotification);

module.exports = router;
