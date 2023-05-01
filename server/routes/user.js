const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getuserprofile } = require("../controller/user");


/**GET USER PROFILE */
router.get("/getuserprofile/:id", getuserprofile);
