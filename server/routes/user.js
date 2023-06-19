const express = require("express");
const router = express.Router();

const {
  getuserprofile,
  getunfollowusers,
  getsearchusers,
  updateuserprofile,
  updateuserprofilepic,
  getuserstogift,
  allcountfordashboard
} = require("../controller/user");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const {multerMiddleware} = require("../middleware/multerUtil");


/**GET COUNT FOR DASHBOARD*/
router.get("/allcountfordashboard",verifyAdmin, allcountfordashboard);

/**GET SEARCH USERS*/
router.get("/getsearchusers/:searchname",verifyToken, getsearchusers);

/**GET USERS TO GIFT*/
router.get("/getuserstogift/", verifyToken, getuserstogift);

/**GET USER INFORMATION */
router.post("/getuserprofile/:userId", verifyToken, getuserprofile);

/**GET UNFOLLOW USERS */
router.get("/getunfollowusers/:id", getunfollowusers);

/**UPDATE A PROFILE*/
router.put("/updateuserprofile", verifyToken, updateuserprofile);

/**UPDATE A PROFILE PICTURE*/
router.put("/updateuserprofilepic", verifyToken, multerMiddleware, updateuserprofilepic);

/**DELETE A SUBCATEGORY */
//router.delete("/deletesubcategory/:id", deletesubcategory);

module.exports = router;