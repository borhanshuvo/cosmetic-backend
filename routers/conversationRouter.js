const router = require("express").Router();

const {
  addConversation,
  getConversation,
  getConversationInfo,
} = require("../controllers/conversationController");
const { checkLogin } = require("../middlewares/common/checkLogin");

router.post("/add", addConversation);
router.get("/getUser/:id", checkLogin, getConversation);
router.get("/getConversationInfo/:conversation_id", checkLogin, getConversationInfo);

module.exports = router;
