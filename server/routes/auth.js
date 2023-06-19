const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  signup,
  login,
  logout,
  verify,
  otp,
  passwordreset,
  reset,
  verifyphoneotp,
  phoneotp,
  adminlogin
} = require("../controller/auth");

/**SIGN UP */
router.post("/signup", signup);

/**LOGIN */
router.post("/login", login);

/**ADMIN LOGIN */
router.post("/adminlogin", adminlogin);

/**LOGOUT */
router.post("/logout", logout);

/*REQUEST NEW VERIFICATION OTP */
router.post("/otp", otp);

/**VERIFY THE OTP */
router.post("/verify", verify);

/**REQUEST NEW PHONE VERIFICATION OTP*/
router.post("/phoneotp", phoneotp);

/**PHONE VERIFICATION OTP*/
router.post("/verifyphoneotp", verifyphoneotp);

/**PASSWORD RESET REQUEST */
router.post("/passwordreset", passwordreset);

/**PASSWORD RESET */
router.post("/reset", reset);

module.exports = router;
