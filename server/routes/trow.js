const express = require("express");
const router = express.Router();
const {createtrow,createevent, gettrow, addtrowwishlist, addtrowgift} = require("../controller/trow")
const {multerMiddleware} = require("../middleware/multerUtil")
const verifyToken = require("../middleware/verifyToken");

/**CREATE TROW */
router.post("/createtrow", verifyToken, multerMiddleware, createtrow);

/**CREATE EVENT */
router.post("/createevent", verifyToken, multerMiddleware, createevent);

/**GET TROW */
router.get("/gettrow/:id", verifyToken, gettrow);

/**ADD TROW WISHLIST*/
router.post("/addtrowwishlist/:id", addtrowwishlist);

/**ADD TROW GIFT*/
router.post("/addtrowgift/:id", verifyToken, addtrowgift);

module.exports = router;