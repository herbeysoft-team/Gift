const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {signup, login, logout, verify, otp} = require("../controller/auth");
const { sendVerificationOTPPhone } = require("../utilities/sendOTP");


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

/*PHONE VERIFICATION*/
router.post("/verifyaccount", async(req, res) => {
    try {
        const { phone_no } = req.body;
        if(!phone_no) throw Error("A Phone number is required");

        const createPhoneVerificationOTP = await sendVerificationOTPPhone(phone_no);
        console.log(createPhoneVerificationOTP)
        res.status(200).json(createPhoneVerificationOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = router;