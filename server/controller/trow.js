const db = require("../config/database");


//create a trow box
exports.createtrow = async (req, res) => {
    const { username, phone_number, event_name, event_purpose, category_name, event_date, recommended_gift } = req.body;
    const recommended_gift_sent = recommended_gift.split(",");
    const file = req.file.filename;
    const userId = req.user.userId;
    try {
      const result = await db.insert(
        "INSERT INTO trowbox (sender_id, recipient_no, event_name, event_purpose, event_category, event_date, event_pics) VALUES (?,?,?,?,?,?,?)",
        [userId, phone_number ? phone_number : username, event_name, event_purpose, category_name, event_date, file]
      );
      if(result){
        //add the recommended gifts
        recommended_gift_sent.forEach(element => {
            const result2 = db.insert(
                "INSERT INTO recommended_gift (trowbox_id, item_id) VALUES (?,?)", [result, element]
            );
           });

      }
      
        res.status(201).json({message:"Item Created Successfully", result});
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
      console.log(error);
    }
  };