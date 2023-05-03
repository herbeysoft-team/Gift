const db = require("../config/database");

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
