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

    const adminUnseenMessage = await Conversation.find({
      $and: [
        { "participant.id": req.params.id },
        { "creator.backColor": "#E1E9E9" },
      ],
    });

    const userUnseenMessage = await Conversation.find({
      $and: [
        { "creator.id": req.params.id },
        { "participant.backColor": "#E1E9E9" },
      ],
    });

    res.status(200).json({
      success: true,
      conversation: conversation,
      adminTotal: adminUnseenMessage.length,
      userTotal: userUnseenMessage.length,
    });
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

async function updateConversationBackColor(req, res, next) {
  try {
    const id = req.params.id;
    const role = req.body.role;
    const backColor = req.body.backColor;

    if (role === "admin") {
      if (backColor === "#ffffff") {
        const p = await Conversation.findOne({ _id: id });
        const { participant } = p;
        participant.backColor = req.body.backColor;
        const conversation = await Conversation.findOneAndUpdate(
          { _id: id },
          { $set: { participant: participant } },
          { useFindAndModify: false }
        );
        res.status(200).json({
          message: "Update successfully",
        });
      } else {
        const c = await Conversation.findOne({ _id: id });
        const { creator } = c;
        creator.backColor = req.body.backColor;
        const conversation = await Conversation.findOneAndUpdate(
          { _id: id },
          { $set: { creator: creator } },
          { useFindAndModify: false }
        );
        res.status(200).json({
          message: "Update successfully",
        });
      }
    } else {
      if (backColor === "#ffffff") {
        const c = await Conversation.findOne({ _id: id });
        const { creator } = c;
        creator.backColor = req.body.backColor;
        const conversation = await Conversation.findOneAndUpdate(
          { _id: id },
          { $set: { creator: creator } },
          { useFindAndModify: false }
        );
        res.status(200).json({
          message: "Update successfully",
        });
      } else {
        const p = await Conversation.findOne({ _id: id });
        const { participant } = p;
        participant.backColor = req.body.backColor;
        const conversation = await Conversation.findOneAndUpdate(
          { _id: id },
          { $set: { participant: participant } },
          { useFindAndModify: false }
        );
        res.status(200).json({
          message: "Update successfully",
        });
      }
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

module.exports = {
  addConversation,
  getConversation,
  getConversationInfo,
  updateConversationBackColor,
};
