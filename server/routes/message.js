const express = require("express");
const router = express.Router();
const {
 sendmessagetext, sendmessagemedia, getshare, getmessages, getmessagesusers
} = require("../controller/message");
const verifyToken = require("../middleware/verifyToken");


/**SEND MESSAGE TEXT */
router.post("/sendmessagetext", verifyToken, sendmessagetext);

/**SEND MEDIA MESSAGE TEXT */
router.post("/sendmessagemedia", verifyToken, sendmessagemedia);

/**GET SHARE  */
router.get("/getshare/:id", getshare);

/**GET MESSAGES  */
router.get("/getmessages/:userId", verifyToken, getmessages);

/**GET USERS THAT MESSAGED YOU  */
router.get("/getmessagesusers", verifyToken, getmessagesusers);







module.exports = router;
