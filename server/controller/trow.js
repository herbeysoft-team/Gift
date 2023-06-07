const db = require("../config/database");
const getCurrentDate = require("../utilities/currentDate");

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

//create an event 
exports.createevent = async (req, res) => {
  const {
    username,
    event_name,
    event_purpose,
    category_name,
    event_date,
  } = req.body;

  const file = req.file.filename;
  const userId = req.user;
  try {
    const result = await db.insert(
      "INSERT INTO trowbox (sender_id, recipient_no, event_name, event_purpose, event_category, event_date, event_pics, gift_sent) VALUES (?,?,?,?,?,?,?,?)",
      [
        userId?.userId,
        username == 'null' ? userId?.phone_no : username,
        event_name,
        event_purpose,
        category_name,
        event_date,
        file,
        1,
      ]
    );
    if (result) {
      res.status(201).json({ message: "Event Created Successfully", result });
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

//add a wishlist to a trowbox
exports.addtrowwishlist = async (req, res) => {
  const { id } = req.params;
  const { trowWishlists_gift } = req.body;

  try {
    //add the wishlist to trowbox
    const result = await db.update(
      "UPDATE trowbox SET wishlist_sent = ? WHERE id = ?",
      [1, id]
    );
    if (result) {
      trowWishlists_gift.forEach((element) => {
        const result2 = db.insert(
          "INSERT INTO wishlist_gift (trowbox_id, item_id) VALUES (?,?)",
          [id, element]
        );
      });
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
  const trow_gift  = req.body;
  const userId = req.user.userId;

  try {
    //add the wishlist to trowbox
    const result = await db.update(
      "UPDATE trowbox SET gift_sent = ? WHERE id = ?",
      [1, id]
    );
    if (result) {
      trow_gift.forEach((element) => {
        const result2 = db.insert(
          "INSERT INTO trowbox_gift (sender_id, trowbox_id, item_id) VALUES (?,?, ?)",
          [userId, id, element]
        );
      });
    }
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
    const resultforCurrent = await db.getall("SELECT * FROM trowbox WHERE recipient_no = ? AND event_date <= ?", [userId?.phone_no, currentDate]);
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
    const resultforSchedule = await db.getall("SELECT * FROM trowbox WHERE recipient_no = ? AND event_date > ?", [userId?.phone_no, currentDate]);
    if (resultforSchedule) {
        res.status(201).json(resultforSchedule);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};