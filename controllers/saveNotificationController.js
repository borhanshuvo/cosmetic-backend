// internal imports
const SaveNotification = require("../models/SaveNotification");

// get save notification
async function getSaveNotification(req, res, next) {
  try {
    const email = req.params.email;
    const saveNotification = await SaveNotification.find({ email: email }).sort(
      {
        createdAt: -1,
      }
    );
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
    const notifyId = req.body.notifyId;
    const findNotification = await SaveNotification.find({
      notifyId: notifyId,
    });
    if (findNotification.length > 0) {
      res.status(200).json({
        error: "Notification was already added!",
      });
    } else {
      const saveNotification = new SaveNotification(req.body);
      const result = await saveNotification.save();
      res.status(200).json({
        success: "Save Notification was added successfully!",
      });
    }
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
