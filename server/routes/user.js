const express = require("express");
const router = express.Router();

const {
  getuserprofile,
  getunfollowusers
} = require("../controller/user");
const verifyToken = require("../middleware/verifyToken");

/**CREATE SUBCATEORY */
//router.post("/createsubcategory", createsubcategory);

/**GET USER INFORMATION */
router.post("/getuserprofile/:userId", verifyToken, getuserprofile);

/**GET UNFOLLOW USERS */
router.get("/getunfollowusers/", verifyToken, getunfollowusers);

/**UPDATE A SUBCATEGORY */
//router.put("/updatesubcategory/:id", updatesubcategory);

/**DELETE A SUBCATEGORY */
//router.delete("/deletesubcategory/:id", deletesubcategory);

module.exports = router;