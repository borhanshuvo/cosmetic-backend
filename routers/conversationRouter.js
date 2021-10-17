const router = require("express").Router();

const {
  addConversation,
  getConversation,
  getConversationInfo,
} = require("../controllers/conversationController");

router.post("/add", addConversation);
router.get("/getUser/:id", getConversation);
router.get("/getConversationInfo/:conversation_id", getConversationInfo);

module.exports = router;
