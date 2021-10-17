const router = require("express").Router();

const { sendMessage, getMessage } = require("../controllers/messageController");

router.post("/send", sendMessage);
router.get("/get/:conversation_id", getMessage);

module.exports = router;
