const express = require("express");
const router = express.Router();
const {createpost, getposts} = require("../controller/post")
const verifyToken = require("../middleware/verifyToken");

/**CREATE TROW */
router.post("/createpost", verifyToken, createpost);

/**GET ALL POSTS */
router.get("/getposts", verifyToken, getposts);


module.exports = router;