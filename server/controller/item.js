const db = require("../config/database");


//create a item
exports.createitem = async (req, res) => {
  const { name, description, category } = req.body;
  const file = req.file.filename;
  try {
    const result = await db.insert(
      "INSERT INTO items (item_name, item_description, item_pics, item_subcategory) VALUES (?,?,?,?)",
      [name, description, file, category]
    );
    res.status(201).json({message:"Item Created Successfully", result});
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//Get a item
exports.getitem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.getrow(
      "SELECT * FROM items WHERE id = ?",
      [id]
    );
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//Get all items
exports.allitems = async (req, res) => {
  try {
    const result = await db.getall("SELECT * FROM items");
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//update an item
exports.updateitem = async (req, res) => {
  const { id } = req.params;
  const { item_name, item_description, item_pics, item_subcategory } = req.body;
  try {
    const result = await db.update(
      "UPDATE items SET item_name = ?, item_description = ?, item_pics = ?, item_subcategory = ? WHERE id = ?",
      [item_name, item_description, item_pics, item_subcategory, id]
    );
    if (result) {
      res.status(201).json({message: "Item Updated Successfully", result});
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//delete one item
exports.deleteitem= async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.delete("DELETE FROM items WHERE id = ?", [id]);
    if (result) {
      res.status(201).json({ message: "Item Deleted Successfully"});
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
