const Conversation = require("../models/Conversation");

async function addConversation(req, res, next) {
  try {
    const conversation = new Conversation(req.body);
    await conversation.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

async function getConversation(req, res, next) {
  try {
    const conversation = await Conversation.find({
      $or: [
        { "creator.id": req.params.id },
        { "participant.id": req.params.id },
      ],
    });
    res.status(200).json({ success: true, conversation: conversation });
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

async function getConversationInfo(req, res, next) {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.conversation_id,
    });
    res.status(200).json({ success: true, conversation: conversation });
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

module.exports = { addConversation, getConversation, getConversationInfo };