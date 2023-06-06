const db = require("../config/database");
var moment = require('moment'); 


//add a wishlist
exports.addwishlist = async (req, res) => {
    const userId = req.user.userId;
    const { item_id } = req.params;

    try {
      const result = await db.insert(
        "INSERT INTO wishlist (user_id, item_id, created_at) VALUES (?,?,?)",
        [userId, item_id, moment(Date.now()).format("YYYY-MM-DD")]
      );
    
      res.status(201).json({message:"Item added to wishlist", result});
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
      console.log(error);
    }
  };

  //remove a wishlist
exports.removewishlist = async (req, res) => {
    const userId = req.user.userId;
    const { item_id } = req.params;


    try {
      const result = await db.delete(
        "DELETE FROM wishlist WHERE user_id = ? AND item_id = ?",
        [userId, item_id]
      );
    
      res.status(201).json({message:"Item Removed from wishlist", result});
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
      console.log(error);
    }
  };


  //get wishlist list of current user
  exports.mywishlist = async (req, res) => {
    const userId = req.user.userId;

    try {
      const result = await db.getall(
        "SELECT item_id FROM wishlist WHERE user_id = ?",
        [userId]
      );
     
      res.status(201).json(result.map(wishlist => wishlist.item_id));
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
      console.log(error);
    }
  };


  //get wishlist for a user
  exports.wishlists = async (req, res) => {
    const { userId } = req.params;
 
    try {
      const result = await db.getall(
        // "SELECT i.id, i.item_name, i.item_description, i.item_pics FROM items AS i, wishlist AS w WHERE i.id = w.item_id AND w.user_id = ?",
        "SELECT i.id, i.item_name, i.item_description, i.item_pics FROM items AS i JOIN wishlist AS w ON i.id = w.item_id WHERE w.user_id = ?",
        [userId]
      );
     
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
      console.log(error);
    }
  };