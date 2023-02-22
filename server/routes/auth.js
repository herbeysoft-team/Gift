const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { signup, login, logout, verify, otp } = require("../controller/auth");
const {
  sendVerificationOTPPhone,
  verifyUserPhone,
  sendPasswordResetOTPPhone,
  resetUserPassword,
} = require("../utilities/sendOTP");

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

/*REQUEST NEW PHONE VERIFICATION OTP*/
router.post("/phoneotp", async (req, res) => {
  try {
    const { phone_no } = req.body;
    if (!phone_no) throw Error("A Phone number is required");

    const createPhoneVerificationOTP = await sendVerificationOTPPhone(phone_no);
    console.log(createPhoneVerificationOTP);
    res.status(200).json(createPhoneVerificationOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/* PHONE VERIFICATION OTP*/
router.post("/verifyphoneotp", async (req, res) => {
  try {
    const { phone_no, otp } = req.body;
    if (!phone_no && otp) throw Error("Empty otp details are not allowed");

    const verifiedPhone = await verifyUserPhone({ phone_no, otp });
    res.status(200).json({ phone_no, verified: true, verifiedPhone });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/* PASSWORD RESET REQUEST */
router.post("/passwordreset", async (req, res) => {
  try {
    const { phone_no } = req.body;
    if (!phone_no) throw Error("Phone number is required");

    const createPasswordResetOTP = await sendPasswordResetOTPPhone(phone_no);
    res.status(200).json(createPasswordResetOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/* PASSWORD RESET */
router.post("/reset", async (req, res) => {
  try {
    const { phone_no, otp, newPassword } = req.body;
    if (!(phone_no && otp && newPassword))
      throw Error("Phone number is required");

    await resetUserPassword({phone_no, otp, newPassword});
    res.status(200).json({phone_no, passwordreset: true});
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
