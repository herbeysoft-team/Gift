const db = require("../config/database");
const moment = require("moment");
/**
 * GET - http://localhost:8000/api/v1/relationship/addrelationship
 * id- Follower ID
 * id = Following ID
 */
//Add A Relationship
exports.addrelationship = async (req, res) => {
  const userId = req.params.userId;
  try {
    const addRelationship = await db.insert(
      "INSERT INTO relationship(follower_id, following_id) VALUES (?, ?)",
      [req.user.userId, userId]
    );
    if (addRelationship) {
      
        const notification = await db.insert(
          "INSERT INTO notification(userId, activity, content_id, content_owner, content_type, date) VALUES (?,?,?,?,?,?)",
          [
            req.user.userId,
            "follow",
            userId,
            userId,
            "profile",
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          ]
        );
      res.status(201).json("Following");
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * GET - http://localhost:8000/api/v1/relationship/deleterelationship
 * id- Follower ID
 * id = Following ID
 */
//Delete A Relationship
exports.deleterelationship = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deleteRelationship = await db.delete(
      "DELETE FROM relationship WHERE follower_id = ? AND following_id = ?",
      [req.user.userId, userId]
    );
    if (deleteRelationship) {
      const notification = await db.insert(
        "INSERT INTO notification(userId, activity, content_id, content_owner, content_type, date) VALUES (?,?,?,?,?,?)",
        [
          req.user.userId,
          "unfollow",
          userId,
          userId,
          "profile",
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]
      );
      res.status(201).json("Unfollow");
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * GET - http://localhost:8000/api/v1/relationship/countrelationship
 * id- User Id
 *
 */
//Count Relationship
exports.countrelationship = async (req, res) => {
  const userId = req.params.userId;
  try {
    const countfollower = await db.getrow(
      "SELECT COUNT(*) AS num_followers FROM relationship WHERE following_id = ?",
      [userId]
    );

    const countfollowing = await db.getrow(
      "SELECT COUNT(*) AS num_following FROM relationship WHERE follower_id = ?",
      [userId]
    );
    res.status(201).json({countfollower, countfollowing});
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


/**
 * GET - http://localhost:8000/api/v1/relationship/getfollower
 * id- User Id
 *
 */
//Get followers
exports.getfollowers = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getfollowers = await db.getall(
      "SELECT u.id, u.fullname, u.username, u.profilePic FROM userprofile u, relationship r WHERE r.follower_id = u.id AND r.following_id = ?",
      [userId]
    );
    res.status(201).json(getfollowers);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * GET - http://localhost:8000/api/v1/relationship/getfollowing
 * id- User Id
 *
 */
//Get followers
exports.getfollowings = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getfollowings = await db.getall(
      "SELECT u.id, u.fullname, u.username, u.profilePic FROM userprofile u, relationship r WHERE r.following_id = u.id AND r.follower_id = ?",
      [userId]
    );
    res.status(201).json(getfollowings);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};



/**
 * GET - http://localhost:8000/api/v1/relationship/checkrelationship
 * id- User Id
 *
 */
//Check Relationship
exports.checkrelationship = async (req, res) => {
  const userId = req.params.userId;
  try {
    const checkfollower = await db.getrow(
      "SELECT COUNT(*)  AS followed FROM relationship WHERE follower_id = ? AND following_id = ?",
      [req.user.userId, userId]
    );
    res.status(201).json(checkfollower);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


/**
 * GET - http://localhost:8000/api/v1/relationship/checkmutualrelationship
 * id- User Id
 *
 */
//Check Mutual Relationship
exports.checkmutualrelationship = async (req, res) => {
  const userId = req.params.userId;
  try {
    const checkmutualfollower = await db.getrow(
      "SELECT COUNT(*) AS mutual_relationship FROM relationship r1 JOIN relationship r2 ON r1.follower_id = r2.following_id AND r1.following_id = r2.follower_id WHERE r1.follower_id = ? AND r1.following_id = ?;",
      [req.user.userId, userId]
    );
    res.status(201).json(checkmutualfollower);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
