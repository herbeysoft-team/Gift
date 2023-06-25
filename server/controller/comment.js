const db = require("../config/database");
const moment = require("moment");

exports.getcomments = async (req, res) => {
  const { postId } = req.params;

  try {
    const result = await db.getall(
      "SELECT c.*, u.id AS userId, u.username, u.profilePic FROM comment AS c JOIN userprofile AS u ON (u.id = c.user_id) WHERE c.post_id = ? ORDER BY c.createdAt DESC",
      [postId]
    );

    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.addcomment = async (req, res) => {
  const userInfo = req.user;
  const { commentText, postId } = req.body;

  try {
    const result = await db.insert(
      "INSERT INTO comment(description, createdAt, user_id, post_id) VALUES (?,?,?,?)",
      [
        commentText,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo?.userId,
        postId,
      ]
    );

    //NOTICATION HERE
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
            "comment",
            postId,
            contentOwner,
            "comment",
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          ]
        );

        return res.status(200).json({ message: "Comment has been added." });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.deletecomment = async (req, res) => {
  const commentId = req.params.id;
  const userInfo = req.userId;
  try {
    const result = await db.delete(
      "DELETE FROM comment WHERE `id` = ? AND `userId` = ?",
      [commentId, userInfo?.userId]
    );
    if (result) {
      return res.status(201).json("Comment has been deleted!");
    } else {
      res.status(403).json("You can delete only your comment!");
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
