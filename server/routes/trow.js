const express = require("express");
const router = express.Router();
const {createtrow} = require("../controller/trow")
const {multerMiddleware} = require("../middleware/multerUtil")

/**CREATE TROW */
router.post("/createtrow", multerMiddleware, createtrow);

module.exports = router;