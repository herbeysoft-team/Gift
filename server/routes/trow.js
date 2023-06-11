const express = require("express");
const router = express.Router();
const {createtrow,createevent, gettrow, getevent, getallevent, getmytrowbox, getmyscheduletrowbox, addtrowwishlist, addtrowgift} = require("../controller/trow")
const {multerMiddleware} = require("../middleware/multerUtil")
const verifyToken = require("../middleware/verifyToken");

/**CREATE TROW */
router.post("/createtrow", verifyToken, multerMiddleware, createtrow);

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
router.post("/addtrowwishlist/:id", addtrowwishlist);

/**ADD TROW GIFT*/
router.post("/addtrowgift/:id", verifyToken, addtrowgift);

module.exports = router;