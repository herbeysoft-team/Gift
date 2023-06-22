const express = require("express");
const router = express.Router();

const {
  createcategory,
  getcategory,
  allcategories,
  updatecategory,
  deletecategory,
} = require("../controller/category");

/**CREATE CATEORY */
router.post("/createcategory", createcategory);

/**GET ONE CATEGORY */
router.get("/getcategory/:id", getcategory);

/**GET ALL CATOTEFORIES */
router.get("/allcategories", allcategories);

/**UPDATE A CATEGORY */
router.put("/updatecategory", updatecategory);

/**DELETE A CATEGORY */
router.delete("/deletecategory/:id", deletecategory);

module.exports = router;