const db = require("../config/database");
const moment = require("moment");

exports.getlikes = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.getall(
      "SELECT user_id FROM upvote WHERE post_id = ?",
      [id]
    );
    if (result) {
      res.status(201).json(result.map((like) => like.user_id));
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.getretrow = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.getall(
      "SELECT user_id FROM retrow WHERE event_id = ?",
      [id]
    );
    if (result) {
      res.status(201).json(result.map((retrow) => retrow.user_id));
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.getlikescount = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await db.getall(
      "SELECT COUNT(*) AS upvote_count FROM upvote WHERE user_id = ?",
      [userId]
    );
    res.status(201).json(result.map((upvote) => upvote.upvote_count));
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.addlike = async (req, res) => {
  const userInfo = req.user;
  const { postId } = req.body;

  try {
    const result = await db.insert(
      "INSERT INTO upvote(user_id, post_id) VALUES (?,?)",
      [userInfo?.userId, postId]
    );

    //NOTIFICATION HERE
    if (result) {
      const contentOwner = await db.getval(
        "SELECT user_id FROM post WHERE id = ?",
        [postId]
      );
      if (contentOwner) {
        const notification = await db.insert(
          "INSERT INTO notification(userId, activity, content_id, content_owner, content_type, date) VALUES (?,?,?,?,?,?)",
          [
            userInfo?.userId,
            "upvote",
            postId,
            contentOwner,
            "upvote",
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          ]
        );
        return res.status(200).json({ message: "Post Upvoted" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.deletelike = async (req, res) => {
  const likeId = req.params.id;
  const userInfo = req.user;
  try {
    const result = await db.delete(
      "DELETE FROM upvote WHERE post_id = ? AND user_id = ?",
      [likeId, userInfo?.userId]
    );
    if (result) {
      return res.status(201).json({ message: "Post Downvoted" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


// ADMIN SPECIAL API////////////////////////////////////////////////////////////
exports.allupvote = async (req, res) => {

  try {
    const allupvote = await db.getall(
      "SELECT post_id, COUNT(user_id) AS like_count FROM upvote GROUP BY post_id",
      []
    );
    if (allupvote) {
      res.status(201).json(allupvote);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};