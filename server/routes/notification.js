const express = require("express");
const router = express.Router();
const {
  getmynotification
} = require("../controller/notification");
const verifyToken = require("../middleware/verifyToken");


/**ADD COMMENT */
router.get("/getmynotification", verifyToken, getmynotification);






module.exports = router;