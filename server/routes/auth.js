const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {signup, login, logout} = require("../controller/auth")
const generateSMS = require('../utilities/generateSMS')
const sendOTP = require('../utilities/sendOTP')

/**SIGN UP */
router.post("/signup", signup);

/**LOGIN */
router.post("/login", login);

/**LOGOUT */
router.post("/logout", logout);

//REQUEST NEW VERIFICATION OTP
router.post("/otp", async(req, res) => {
    try {
        const { phone_no, message, duration } = req.body;

        const createdOTP = await sendOTP({
            phone_no,
            message,
            duration
        });
        console.log(createdOTP)
        res.status(200).json(createdOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


//VERIFY THE OTP
router.post("/verify", async(req, res) => {
    try {
        const { phone_no, otp } = req.body;

        const createdOTP = await sendOTP({
            phone_no, 
            message,
            duration
        });
        res.status(200).json(createdOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
})





module.exports = router;