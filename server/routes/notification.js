const express = require("express");
const router = express.Router();
const {
  getmynotification,
  hasUnreadNotification
} = require("../controller/notification");
const verifyToken = require("../middleware/verifyToken");


/**GET USER NOTIFICATION */
router.get("/getmynotification", verifyToken, getmynotification);

/**CHECK IF USER HAS NOTIFICATION */
router.get("/hasunreadnotification", verifyToken, hasUnreadNotification);




module.exports = router;