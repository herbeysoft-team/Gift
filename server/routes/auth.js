const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {signup, login, logout, verify, otp} = require("../controller/auth")


/**SIGN UP */
router.post("/signup", signup);

/**LOGIN */
router.post("/login", login);

/**LOGOUT */
router.post("/logout", logout);

/*REQUEST NEW VERIFICATION OTP */
router.post("/otp", otp);

/*VERIFY THE OTP */
router.post("/verify", verify);





module.exports = router;