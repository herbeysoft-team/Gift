const express = require("express");
const router = express.Router();
const {signup} = require("../controller/auth")


/**SIGN UP */
router.post("/signup", signup);



module.exports = router;