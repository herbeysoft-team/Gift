const express = require("express");
const router = express.Router();
const {createpost, getposts, getpost, allpostbyadmin} = require("../controller/post")
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

/**CREATE TROW */
router.post("/createpost", verifyToken, createpost);

/**GET ALL POSTS */
router.get("/getposts/:id", getposts);

/**GET POSTS BY ADMIN*/
router.get("/allpostbyadmin", verifyToken, allpostbyadmin);

/**GET A POST */
router.get("/getpost/:id", verifyToken, getpost);


module.exports = router;