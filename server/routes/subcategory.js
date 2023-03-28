const express = require("express");
const router = express.Router();

const {
  createsubcategory,
  getsubcategory,
  allsubcategories,
  updatesubcategory,
  deletesubcategory,
} = require("../controller/subcategory");

/**CREATE SUBCATEORY */
router.post("/createsubcategory", createsubcategory);

/**GET ONE SUBCATEGORY */
router.get("/getsubcategory/:id", getsubcategory);

/**GET ALL SUBCATOTEGORIES */
router.get("/allsubcategories", allsubcategories);

/**UPDATE A SUBCATEGORY */
router.put("/updatesubcategory/:id", updatesubcategory);

/**DELETE A SUBCATEGORY */
router.delete("/deletesubcategory/:id", deletesubcategory);

module.exports = router;