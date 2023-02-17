const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {signup, login, logout} = require("../controller/auth")


/**SIGN UP */
router.post("/signup", signup);

/**LOGIN */
router.post("/login", login);

/**LOGOUT */
router.post("/logout", logout);

//protected route
router.get("/private_data", verifyToken, async(req, res) => {
    res.status(200).send(`You're in a private territory of ${req.user.phone_no}`);
} )



module.exports = router;