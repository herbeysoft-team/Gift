const express = require("express");
const router = express.Router();
const {createpost, getposts, getpost} = require("../controller/post")
const verifyToken = require("../middleware/verifyToken");

/**CREATE TROW */
router.post("/createpost", verifyToken, createpost);

/**GET ALL POSTS */
router.get("/getposts", verifyToken, getposts);

/**GET A POST */
router.get("/getpost/:id", verifyToken, getpost);


module.exports = router;