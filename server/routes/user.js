const express = require("express");
const router = express.Router();

const {
  getuserprofile,
  getunfollowusers,
  getsearchusers,
} = require("../controller/user");
const verifyToken = require("../middleware/verifyToken");

/**GET SEARCH USERS*/
router.get("/getsearchusers/:searchname", getsearchusers);

/**GET USER INFORMATION */
router.post("/getuserprofile/:userId", verifyToken, getuserprofile);

/**GET UNFOLLOW USERS */
router.get("/getunfollowusers/:id", getunfollowusers);

/**UPDATE A SUBCATEGORY */
//router.put("/updatesubcategory/:id", updatesubcategory);

/**DELETE A SUBCATEGORY */
//router.delete("/deletesubcategory/:id", deletesubcategory);

module.exports = router;