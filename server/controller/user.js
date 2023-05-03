const db = require("../config/database");

/**
 * GET - http://localhost:8000/api/v1/user/getuserprofile/:id
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
      
      res.status(201).json(getUserProfile[0]);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


/**
 * GET - http://localhost:8000/api/v1/user/getunfollowusers/:id
 * id- Get user id
 *
 */
//Get unfollow users
exports.getunfollowusers = async (req, res) => {
  const userId = req.params.id;
  try {
    const getUnfollowUsers = await db.getall(
      "SELECT u.id as unfollowId, u.fullname, u.profilePic FROM userProfile u WHERE u.id NOT IN (SELECT following_id FROM relationship WHERE follower_id = ? )  AND u.id <> ? ORDER BY u.username ASC LIMIT 5",
      [userId, userId]
    );
   
    if (getUnfollowUsers) {
      res.status(201).json(getUnfollowUsers);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};



/**
 * GET - http://localhost:8000/api/v1/user/getsearchusers/:searchname
 * name - Name of the user OR
 * phone Number - Phone number of the user
 *
 */
//Get Search users
exports.getsearchusers = async (req, res) => {
  const searchName = req.params.searchname;
  
  try {
    const getSearchUsers = await db.getall(
      "SELECT u.id as userId, u.fullname, u.profilePic FROM userProfile u WHERE u.fullname LIKE ? OR u.phone_no LIKE ?",
      [`%${searchName}%`, `%${searchName}%`]
    );
   
    if (getSearchUsers) {
      res.status(201).json(getSearchUsers);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};