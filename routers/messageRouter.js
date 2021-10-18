const router = require("express").Router();

const { sendMessage, getMessage } = require("../controllers/messageController");
const { checkLogin } = require("../middlewares/common/checkLogin");

router.post("/send", checkLogin, sendMessage);
router.get("/get/:conversation_id", checkLogin, getMessage);

module.exports = router;
