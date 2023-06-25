const db = require("../config/database");
const getCurrentDate = require("../utilities/currentDate");
const moment = require("moment");
const {sendSMSNow} = require("../utilities/sms");

//create a trow box
exports.createtrow = async (req, res) => {
  const {
    username,
    phone_number,
    event_name,
    event_purpose,
    category_name,
    event_date,
    recommended_gift,
  } = req.body;
  const recommended_gift_sent = recommended_gift.split(",");
  const file = req.file.filename;
  const userId = req.user.userId;
  try {
    const result = await db.insert(
      "INSERT INTO trowbox (sender_id, recipient_no, event_name, event_purpose, event_category, event_date, event_pics) VALUES (?,?,?,?,?,?,?)",
      [
        userId,
        phone_number ? phone_number : username,
        event_name,
        event_purpose,
        category_name,
        event_date,
        file,
      ]
    );
    if (result) {
      await sendSMSNow(`An anonymous sender has sent you a gift box. Please register/login at https://trowbox.com to claim it.`, phone_number ? phone_number : username)
      const notification = await db.insert(
        "INSERT INTO notification(userId, activity, content_id, content_owner_no, content_type, date) VALUES (?,?,?,?,?,?)",
        [
          userId,
          "trow",
          result,
          phone_number ? phone_number : username,
          "trowbox",
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]
      );
      //add the recommended gifts
      recommended_gift_sent.forEach((element) => {
        const result2 = db.insert(
          "INSERT INTO recommended_gift (trowbox_id, item_id) VALUES (?,?)",
          [result, element]
        );
      });
    }

    res.status(201).json({ message: "Trowbox Sent Successfully", result });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//create a retrow
exports.createretrow = async (req, res) => {
  const {
    phone_number,
    event_name,
    event_purpose,
    category_name,
    event_date,
    event_id,
    event_pic
  } = req.body;
  
  const userId = req.user.userId;
  
  try {
    const result = await db.insert(
      "INSERT INTO trowbox (sender_id, recipient_no, event_name, event_purpose, event_category, event_date, event_pics) VALUES (?,?,?,?,?,?,?)",
      [
        userId,
        phone_number,
        event_name,
        event_purpose,
        category_name,
        event_date,
        event_pic,
      ]
    );
    if (result) {
      const retrow = await db.insert("INSERT INTO retrow(user_id, event_id) VALUES (?,?)", [userId, event_id])
      const notification = await db.insert(
        "INSERT INTO notification(userId, activity, content_id, content_owner_no, content_type, date) VALUES (?,?,?,?,?,?)",
        [
          userId,
          "retrow",
          result,
          phone_number,
          "trowbox",
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]
      );

      const recommended_gift = await db.getall("SELECT item_id FROM recommended_gift WHERE trowbox_id = ?", [event_id] )
      if(recommended_gift){
        //add the recommended gifts
        recommended_gift.forEach((element) => {
          const result2 = db.insert(
            "INSERT INTO recommended_gift (trowbox_id, item_id) VALUES (?,?)",
            [result, element.item_id]
          );
        });
      }
    }

    res.status(201).json({ message: "Retrow Successfully", result });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//create an event
exports.createevent = async (req, res) => {
  const { username, event_name, event_purpose, category_name, event_date } =
    req.body;

  const file = req.file.filename;
  const userId = req.user;
  try {
    const result = await db.insert(
      "INSERT INTO trowbox (sender_id, recipient_no, event_name, event_purpose, event_category, event_date, event_pics, gift_sent) VALUES (?,?,?,?,?,?,?,?)",
      [
        userId?.userId,
        username == "null" ? userId?.phone_no : username,
        event_name,
        event_purpose,
        category_name,
        event_date,
        file,
        1,
      ]
    );
    if (result) {
      const notification = await db.insert(
        "INSERT INTO notification(userId, activity, content_id, content_owner_no, content_type, date) VALUES (?,?,?,?,?,?)",
        [
          userId?.userId,
          "event",
          result,
          username == "null" ? userId?.phone_no : username,
          "event",
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]
      );

      res.status(201).json({ message: "Event Created Successfully", result });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


//get all event of you, your followers and those you are following
exports.getallevent = async (req, res) => {
  const userInfo = req.user;
  const limit = 10;
  try {
    const result = await db.getall(
      "SELECT DISTINCT tb.*, up.fullname, up.profilePic, up.id AS userId FROM trowbox tb, userprofile up WHERE tb.recipient_no = up.phone_no AND tb.gift_sent = ? AND tb.recipient_no <> ? ORDER BY tb.event_date ASC LIMIT ?",
      [1, userInfo?.phone_no, limit]
    );
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//get a trow box
exports.gettrow = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  var message = "";

  try {
    const result = await db.getrow("SELECT * FROM trowbox WHERE id = ?", [id]);
    if (result) {
      //get recommended gifts
      const result2 = await db.getall(
        "SELECT i.id, i.item_name, i.item_description, i.item_pics FROM items AS i, recommended_gift AS r WHERE i.id = r.item_id AND r.trowbox_id = ?",
        [id]
      );

      //get wishlist
      const result3 = await db.getall(
        "SELECT i.id, i.item_name, i.item_description, i.item_pics FROM items AS i, wishlist_gift AS w WHERE i.id = w.item_id AND w.trowbox_id = ?",
        [id]
      );

      const result4 = await db.getall(
        "SELECT i.id, i.item_name, i.item_description, i.item_pics FROM items AS i, trowbox_gift AS t WHERE i.id = t.item_id AND t.trowbox_id = ?",
        [id]
      );

      if (result2) {
        if (result.sender_id === userId) {
          message = `You have sent a trowbox to ${result.recipient_no}`;
        } else {
          message = `Anonymous sent you a trowbox!`;
        }
        res.status(201).json({
          Trowbox: result,
          recommended_gift: result2,
          wishlist_gift: result3,
          trowbox_gift: result4,
          message: message,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//get a event box
exports.getevent = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.getrow(
      "SELECT u.fullname, u.id AS userId, u.username, u.profilePic, t.* FROM trowbox t, userprofile u WHERE t.recipient_no = u.phone_no AND t.id = ?",
      [id]
    );
    if (result) {
      const result2 = await db.getall(
        "SELECT i.id, i.item_name, i.item_description, i.item_pics, u.profilePic, u.id AS userId FROM items AS i, trowbox_gift AS t, userProfile AS u WHERE i.id = t.item_id AND t.sender_id = u.id AND t.trowbox_id = ?",
        [id]
      );
      res.status(201).json({
        event_box: result,
        event_gift: result2,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


//get user recieved gift
exports.getusersentgift = async (req, res) => {
  const { id } = req.params;

  try {   
      const sendGift = await db.getall(
        "SELECT DISTINCT i.id, i.item_name, i.item_description, i.item_pics, u.profilePic, u.id AS userId FROM items AS i, trowbox_gift AS t, userProfile AS u WHERE i.id = t.item_id AND t.sender_id = u.id AND t.status = 'redeemed' AND t.sender_id = ?",
        [id]
      );

      const recieveGift = await db.getall(
        "SELECT DISTINCT i.id, i.item_name, i.item_description, i.item_pics, u.profilePic, u.id AS userId FROM items AS i, trowbox_gift AS t, trowbox AS tb, userProfile AS u WHERE i.id = t.item_id AND tb.id = t.trowbox_id AND tb.recipient_no = u.phone_no AND t.status = 'redeemed' AND u.id = ?",
        [id]
      );
      res.status(201).json({
        sendGift,
        recieveGift
      });
    
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//add a wishlist to a trowbox
exports.addtrowwishlist = async (req, res) => {
  const { id } = req.params;
  const { trowWishlists_gift } = req.body;
  const userId = req.user.userId;


  try {
    //add the wishlist to trowbox
    const result = await db.update(
      "UPDATE trowbox SET wishlist_sent = ? WHERE id = ?",
      [1, id]
    );
    if (result) {
      const contentOwner = await db.getval(
        "SELECT sender_id FROM trowbox WHERE id = ?",
        [id]
      );
      if(contentOwner){
      const notification = await db.insert(
        "INSERT INTO notification(userId, activity, content_id, content_owner, content_type, date) VALUES (?,?,?,?,?,?)",
        [
          userId,
          "wishlist",
          id,
          contentOwner,
          "trowbox",
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]
      );
      trowWishlists_gift.forEach((element) => {
        const result2 = db.insert(
          "INSERT INTO wishlist_gift (trowbox_id, item_id) VALUES (?,?)",
          [id, element]
        );
      });
    }
  }
    res.status(201).json({ message: "Wishlist Added" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//add gift to a trowbox
exports.addtrowgift = async (req, res) => {
  const { id } = req.params;
  const trow_gift = req.body;
  const userId = req.user.userId;

  try {
    //add the wishlist to trowbox
    const result = await db.update(
      "UPDATE trowbox SET gift_sent = ? WHERE id = ?",
      [1, id]
    );
    
    const contentOwner = await db.getval(
      "SELECT recipient_no FROM trowbox WHERE id = ?",
      [id]
    );
    if(contentOwner){
    const notification = await db.insert(
      "INSERT INTO notification(userId, activity, content_id, content_owner_no, content_type, date) VALUES (?,?,?,?,?,?)",
      [
        userId,
        "gifting",
        id,
        contentOwner,
        "trowbox",
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ]
    );
    }

    trow_gift?.forEach((element) => {
      const result2 = db.insert(
        "INSERT INTO trowbox_gift (sender_id, trowbox_id, item_id) VALUES (?,?, ?)",
        [userId, id, element]
      );
    });

    res.status(201).json({ message: "Gift Added" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//get my current trowbox
exports.getmytrowbox = async (req, res) => {
  const currentDate = getCurrentDate();
  const userId = req.user;
  try {
    const resultforCurrent = await db.getall(
      "SELECT * FROM trowbox WHERE recipient_no = ? AND event_date <= ? AND gift_sent = ?",
      [userId?.phone_no, currentDate, 1]
    );
    if (resultforCurrent) {
      res.status(201).json(resultforCurrent);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//get my schedule trowbox
exports.getmyscheduletrowbox = async (req, res) => {
  const currentDate = getCurrentDate();
  const userId = req.user;
  try {
    const resultforSchedule = await db.getall(
      "SELECT * FROM trowbox WHERE recipient_no = ? AND event_date > ? AND gift_sent = ?",
      [userId?.phone_no, currentDate, 1]
    );
    if (resultforSchedule) {
      res.status(201).json(resultforSchedule);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


// ADMIN SPECIAL API////////////////////////////////////////////////////////////
//Get all gift count
exports.allgiftcount = async (req, res) => {
  try {
    const giftRedeemed = await db.getval(
      "SELECT COUNT(*) AS RedeemedGift FROM trowbox_gift WHERE status = 'redeemed'",
      []
    );
    const giftPending = await db.getval(
      "SELECT COUNT(*) AS PendingGift FROM trowbox_gift WHERE status = 'pending'",
      []
    );
    res.status(201).json({
        RedeemedGift: giftRedeemed,
        PendingGift: giftPending,
      });
    
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


//Get all trowbox
exports.alltrowbox = async (req, res) => {
  try {
    const alltrowbox = await db.getall(
      "SELECT t.*, u.fullname FROM trowbox AS t JOIN userprofile AS u ON t.sender_id = u.id ",
      []
    );
    if(alltrowbox){
    res.status(201).json(alltrowbox);
  }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//Update user profile
exports.updatetrowboxbyadmin = async (req, res) => {
  const { wishlist_sent, gift_sent, post, event_name, id } = req.body;
  try {
    const UpdateTrowbox = await db.update(
      "UPDATE trowbox SET wishlist_sent = ?, gift_sent = ?, post = ?, event_name = ? WHERE id = ?",
      [wishlist_sent, gift_sent, post, event_name, id]
    );
    if (UpdateTrowbox) {
        res.status(201).json({ successtrowbox: true, message:"Updated Successfully" }); 
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


//Get all gift for admin
exports.allgift= async (req, res) => {
  try {
    const allgift = await db.getall(
      "SELECT t.*, u.fullname, i.item_name, i.item_description, i.item_pics FROM trowbox_gift AS t " +
      "JOIN userprofile AS u ON t.sender_id = u.id " +
      "JOIN items AS i ON t.item_id = i.id",
      []
    );
    if(allgift){
    res.status(201).json(allgift);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//Updaten gift by admin
exports.updategiftbyadmin = async (req, res) => {
  const { status, id, trowbox_id, sender_id } = req.body;
  
  try {
    if(status !== 'pending'){
      const UpdateGift = await db.update(
        "UPDATE trowbox_gift SET status = ? WHERE id = ?",
        [status, id]
        );
        const contentOwner = await db.getval(
          "SELECT recipient_no FROM trowbox WHERE id = ?",
          [trowbox_id]
          );
          if(contentOwner){
            const notification = await db.insert(
              "INSERT INTO notification(userId, activity, content_id, content_owner_no, content_type, date) VALUES (?,?,?,?,?,?)",
              [
                sender_id,
                "redeemed",
                trowbox_id,
                contentOwner,
                "trowbox",
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
              ]
            );
            }   
          
    }else{
      const UpdateGift = await db.update(
        "UPDATE trowbox_gift SET status = ? WHERE id = ?",
        [status, id]
        );
    }

    res.status(201).json({ successgift: true, message:"Updated Successfully" }); 

  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
