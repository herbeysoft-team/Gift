const express = require("express");
const router = express.Router();

const {
  createitem,
  getitem,
  getitemsbycategory,
  getitemsbysubcategory,
  getitemsbysearch,
  allitems,
  updateitem,
  deleteitem,
} = require("../controller/item");
const {multerMiddleware} = require("../middleware/multerUtil")

/**CREATE ITEM */
router.post("/createitem", multerMiddleware, createitem);

/**GET ONE ITEM */
router.get("/getitem/:id", getitem);

/**GET ITEMS BY CATEGORY */
router.get("/getitemsbycategory/:id", getitemsbycategory);

/**GET ITEMS BY SUBCATEGORY */
router.get("/getitemsbysubcategory/:id", getitemsbysubcategory);


/**GET ITEMS BY SUBCATEGORY */
router.get("/getitemsbysearch/:searchName", getitemsbysearch);

/**GET ALL ITEMS */
router.get("/allitems", allitems);

/**UPDATE A ITEM */
router.put("/updateitem", updateitem);

/**DELETE A ITEM */
router.delete("/deleteitem/:id", deleteitem);

module.exports = router;