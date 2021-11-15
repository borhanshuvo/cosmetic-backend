const Message = require("../models/Message");

async function sendMessage(req, res, next) {
  try {
    const message = {};
    if (req.files[0]) {
      const avatar = `/uploads/msgImage/${req.files[0].filename}`;
      message.avatar = avatar;
    }
    message.text = req.body.text;
    message.conversation_id = req.body.conversation_id;
    message.sender = {
      id: req.body.sender_id,
      name: req.body.sender_name,
      email: req.body.sender_email,
      image: req.body.sender_image,
      backColor: req.body.sender_backColor,
    };
    message.receiver = {
      id: req.body.receiver_id,
      name: req.body.receiver_name,
      email: req.body.receiver_email,
      image: req.body.receiver_image,
      backColor: req.body.receiver_backColor,
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
