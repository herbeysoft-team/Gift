const { hashData, verifyHashData } = require("../utilities/hashData");
const createToken = require("../utilities/createToken");
const jwt = require("jsonwebtoken");
const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;
var bcrypt = require("bcryptjs");
const db = require("../config/database");


/**
 * GET - http://localhost:8000/api/v1/user/getuserprofile
 * id- Get user id
 *
 */
//Get user profile
exports.getuserprofile = async (req, res) => {
    const { id } = req.params;
    try {
      const getUserProfile = await db.getall(
        "SELECT * FROM userProfile  WHERE id=?",
        [id]
      );
      if (getUserProfile) {
        res.status(201).json(getUserProfile[0]);
      }
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
      console.log(error);
    }
  };