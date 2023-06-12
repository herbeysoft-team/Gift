const db = require("../config/database");
const getCurrentDate = require("../utilities/currentDate");
const moment = require("moment");



//create an event
exports.createpost = async (req, res) => {
  const { id, description } =
    req.body;
  const userInfo = req.user;
  try {
    const result = await db.insert(
      "INSERT INTO post (description, createdAt, user_id, event_id) VALUES (?,?,?,?)",
      [
        description,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo?.userId,
        id
      ]
    );
        const result2 = await db.update("UPDATE trowbox SET post = ? WHERE id = ?", [1, id]);
        res.status(201).json({ message: "Post Created Successfully", result });
    
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};



//get posts
exports.getposts = async (req, res) => {
  const userInfo = req.user;
  try {
    const result = await db.getall(
      "SELECT up.id AS user_id, up.profilePic, up.fullname, p.id AS post_id, p.description, p.createdAt, tb.* FROM userprofile up JOIN post p ON up.id = p.user_id JOIN trowbox tb ON tb.recipient_no = up.phone_no AND tb.id = p.event_id LEFT JOIN relationship AS r ON (p.user_id = r.following_id) WHERE r.follower_id = ? OR p.user_id =?",
      [
        userInfo?.userId,
        userInfo?.userId
      ]
    );
        
        res.status(201).json(result );
    
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

