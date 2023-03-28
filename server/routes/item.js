const express = require("express");
const router = express.Router();

const {
  createitem,
  getitem,
  allitems,
  updateitem,
  deleteitem,
} = require("../controller/item");

/**CREATE ITEM */
router.post("/createitem", createitem);

/**GET ONE ITEM */
router.get("/getitem/:id", getitem);

/**GET ALL ITEMS */
router.get("/allitems", allitems);

/**UPDATE A ITEM */
router.put("/updateitem/:id", updateitem);

/**DELETE A ITEM */
router.delete("/deleteitem/:id", deleteitem);

module.exports = router;