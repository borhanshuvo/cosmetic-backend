const Message = require("../models/Message");

async function sendMessage(req, res, next) {
  try {
    const message = {};
    if (req.files[0]) {
      const avatar = req.files[0].filename;
      message.avatar = avatar;
    }

    if (req.body.text) {
      message.text = req.body.text;
    }

    message.conversation_id = req.body.conversation_id;

    message.sender = {
      name: req.body.sender_name,
      image: req.body.sender_image,
      id: req.body.sender_id,
    };

    message.receiver = {
      name: req.body.receiver_name,
      image: req.body.receiver_image,
      id: req.body.receiver_id,
    };

    const newMessage = new Message(message);
    await newMessage.save();
    res.json({ success: true });
    global.io.emit("new_message", newMessage);
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

async function getMessage(req, res, next) {
  try {
    const messages = await Message.find({
      conversation_id: req.params.conversation_id,
    });
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

module.exports = { sendMessage, getMessage };