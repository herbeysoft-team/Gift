const db = require("../config/database");

/**
 * GET - http://localhost:8000/api/v1/user/getuserprofile
 * id- Get user id
 *
 */
//Get user profile
exports.getuserprofile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const getUserProfile = await db.getall(
      "SELECT * FROM userProfile  WHERE id=?",
      [userId]
    );
    if (getUserProfile) {
      const { password, ...info } = getUserProfile[0];
      res.status(201).json(info);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
