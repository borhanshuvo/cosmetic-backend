const router = require("express").Router();

const {
  addConversation,
  getConversation,
  getConversationInfo,
  updateConversationBackColor,
} = require("../controllers/conversationController");
const { checkLogin } = require("../middlewares/common/checkLogin");

router.post("/add", addConversation);
router.get("/getUser/:id", checkLogin, getConversation);
router.put("/updateBackColor/:id", checkLogin, updateConversationBackColor);
router.get(
  "/getConversationInfo/:conversation_id",
  checkLogin,
  getConversationInfo
);

module.exports = router;
