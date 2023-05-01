const express = require("express");
const router = express.Router();

const {
  getuserprofile
} = require("../controller/user");

/**CREATE SUBCATEORY */
//router.post("/createsubcategory", createsubcategory);

/**GET ONE SUBCATEGORY */
router.post("/getuserprofile/:userId", getuserprofile);

/**GET ALL SUBCATOTEGORIES */
//router.get("/allsubcategories", allsubcategories);

/**UPDATE A SUBCATEGORY */
//router.put("/updatesubcategory/:id", updatesubcategory);

/**DELETE A SUBCATEGORY */
//router.delete("/deletesubcategory/:id", deletesubcategory);

module.exports = router;