// internal imports
const SaveNotification = require("../models/SaveNotification");

// get save notification
async function getSaveNotification(req, res, next) {
  try {
    const saveNotification = await SaveNotification.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(saveNotification);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// add save notification
async function addSaveNotification(req, res, next) {
  try {
    const saveNotification = new SaveNotification(req.body);
    const result = await saveNotification.save();
    res.status(200).json({
      success: "Save Notification was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

module.exports = {
  getSaveNotification,
  addSaveNotification,
};
