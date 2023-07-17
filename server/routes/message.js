const express = require("express");
const router = express.Router();
const {
 sendmessagetext, sendmessagemedia, getshare, getmessages, getmessagesusers, sendtextmessagetouser, hasNoUnreadMessages
} = require("../controller/message");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");


/**SEND MESSAGE TEXT */
router.post("/sendmessagetext", verifyToken, sendmessagetext);

/**SEND SMS TO USER*/
router.post("/sendtextmessagetouser", verifyAdmin, sendtextmessagetouser);

/**SEND MEDIA MESSAGE TEXT */
router.post("/sendmessagemedia", verifyToken, sendmessagemedia);

/**GET SHARE  */
router.get("/getshare/:id", getshare);

/**GET MESSAGES  */
router.get("/getmessages/:userId", verifyToken, getmessages);

/**CHECK FOR UNREAD MESSSAGE  */
router.get("/hasnounreadmessages", verifyToken, hasNoUnreadMessages);

/**GET USERS THAT MESSAGED YOU  */
router.get("/getmessagesusers", verifyToken, getmessagesusers);







module.exports = router;
