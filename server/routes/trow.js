const express = require("express");
const router = express.Router();
const {createtrow} = require("../controller/trow")
const {multerMiddleware} = require("../middleware/multerUtil")
const verifyToken = require("../middleware/verifyToken");

/**CREATE TROW */
router.post("/createtrow", verifyToken, multerMiddleware, createtrow);

module.exports = router;