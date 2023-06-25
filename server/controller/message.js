const db = require("../config/database");
const moment = require("moment");
const {sendSMSNow} = require("../utilities/sms");

exports.getmessages = async (req, res) => {
  const { userId } = req.params;
  const userInfo = req.user;
  try {
    const result = await db.getall(
      "SELECT * FROM messaging WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?) ORDER BY timestamp ASC",
      [userInfo?.userId, userId, userId, userInfo?.userId]
    );
    if(result){
    return res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.getmessagesusers = async (req, res) => {
  const userInfo = req.user;
  try {
    const result = await db.getall(
      "SELECT DISTINCT up.id AS user_id, up.fullname, up.profilePic, up.username FROM userProfile up JOIN (SELECT senderId AS user_id FROM messaging WHERE receiverId = ? UNION SELECT receiverId AS user_id FROM messaging WHERE senderId = ? ) AS m ON up.id = m.user_id",
      [userInfo?.userId, userInfo?.userId]
    );
    if(result){
    return res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.sendmessagetext = async (req, res) => {
  const userInfo = req.user;
  const { commentText, userId } = req.body;
  try {
    const result = await db.insert(
      "INSERT INTO messaging(senderId, receiverId, contentType, contextText, timestamp) VALUES (?,?,?,?,?)",
      [
        userInfo?.userId,
        userId,
        "text",
        commentText,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ]
    );

    // //NOTICATION HERE
    // if (result) {
    //   const contentOwner = await db.getval(
    //     "SELECT user_id FROM post WHERE id = ?",
    //     [postId]
    //   );
    //   if (contentOwner) {
    //     const notification = await db.insert(
    //       "INSERT INTO notification(userId, activity, content_id, content_owner, content_type, date) VALUES (?,?,?,?,?,?)",
    //       [
    //         userInfo?.userId,
    //         "comment",
    //         postId,
    //         contentOwner,
    //         "comment",
    //         moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    //       ]
    //     );

    //
    //   }
    // }
    return res.status(200).json({ message: "sent successfully." });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.sendmessagemedia = async (req, res) => {
  const userInfo = req.user;
  const { commentText, userId, post_id, post_pic } = req.body;
  try {
    const result = await db.insert(
      "INSERT INTO messaging(senderId, receiverId, contentType, contextText, contentMediaId, contentMediaPics, timestamp) VALUES (?,?,?,?,?,?,?)",
      [
        userInfo?.userId,
        userId,
        "media",
        commentText,
        post_id,
        post_pic,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ]
    );
    if (result) {
      const share = await db.insert(
        "INSERT INTO share(user_id, post_id) VALUES (?,?)",
        [
          userInfo?.userId,
          post_id,
        ]
      );

      const notification = await db.insert(
        "INSERT INTO notification(userId, activity, content_id, content_owner, content_type, date) VALUES (?,?,?,?,?,?)",
        [
          userInfo?.userId,
          "share",
          post_id,
          userId,
          "share",
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]
      );
      
        return res.status(200).json({ message: "shared successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


exports.getshare = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.getall(
      "SELECT user_id FROM share WHERE post_id = ?",
      [id]
    );
    if (result) {
      res.status(201).json(result.map((share) => share.user_id));
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


exports.sendtextmessagetouser= async (req, res) => {
  const { phone_no, message } = req.body;
  try {
    const result = await sendSMSNow(message, phone_no)
    if(result){
      return res.status(200).json({ message: "Message Sent Successfully" });
    } 
    
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
