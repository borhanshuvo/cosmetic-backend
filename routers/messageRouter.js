const router = require("express").Router();

const { sendMessage, getMessage } = require("../controllers/messageController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const messageImage = require("../middlewares/message/messageImage");

router.post("/send", checkLogin, messageImage, sendMessage);
router.get("/get/:conversation_id", checkLogin, getMessage);

module.exports = router;
