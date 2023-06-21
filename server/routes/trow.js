const express = require("express");
const router = express.Router();
const {
  createtrow,
  createretrow,
  createevent,
  gettrow,
  getevent,
  getallevent,
  getmytrowbox,
  getmyscheduletrowbox,
  addtrowwishlist,
  addtrowgift,
  allgiftcount,
  alltrowbox,
  updatetrowboxbyadmin
} = require("../controller/trow");
const { multerMiddleware } = require("../middleware/multerUtil");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

/**CREATE TROW */
router.post("/createtrow", verifyToken, multerMiddleware, createtrow);

/**CREATE RETROW */
router.post("/createretrow", verifyToken, createretrow);

/**CREATE EVENT */
router.post("/createevent", verifyToken, multerMiddleware, createevent);

/**GET EVENT */
router.get("/getevent/:id", verifyToken, getevent);

/**GET ALL EVENT */
router.get("/getallevent", verifyToken, getallevent);

/**GET TROW */
router.get("/gettrow/:id", verifyToken, gettrow);

/**GET MY CURRENT TROWBOX */
router.get("/getmytrowbox", verifyToken, getmytrowbox);

/**GET MY SCHEDULE TROWBOX */
router.get("/getmyscheduletrowbox", verifyToken, getmyscheduletrowbox);

/**ADD TROW WISHLIST*/
router.post("/addtrowwishlist/:id", verifyToken, addtrowwishlist);

/**ADD TROW GIFT*/
router.post("/addtrowgift/:id", verifyToken, addtrowgift);

/**GET GIFT COUNT  */
router.get("/allgiftcount", verifyAdmin, allgiftcount);

/**GET ALL TROWBOX  */
router.get("/alltrowbox", verifyAdmin, alltrowbox);

/**UPDATE TROWBOX BY ADMIN  */
router.put("/updatetrowboxbyadmin", verifyAdmin, updatetrowboxbyadmin);

module.exports = router;
