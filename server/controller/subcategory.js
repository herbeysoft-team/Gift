const db = require("../config/database");

//create a subcategory
exports.createsubcategory = async (req, res) => {
  const { cat_id, sub_cat_name } = req.body;
  try {
    const result = await db.insert(
      "INSERT INTO subcategory (cat_id, sub_cat_name) VALUES (?,?)",
      [cat_id, sub_cat_name]
    );
    res.status(201).json({message:"Sub-Category Created Successfully", result});
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//Get one subcategory
exports.getsubcategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.getrow(
      "SELECT * FROM subcategory WHERE id = ?",
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

//Get all sub categories
exports.allsubcategories = async (req, res) => {
  try {
    const result = await db.getall("SELECT * FROM subcategory");
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//update one subcategory
exports.updatesubcategory = async (req, res) => {
  const { cat_id, sub_cat_name, id } = req.body;
  try {
    const result = await db.update(
      "UPDATE subcategory SET cat_id = ?, sub_cat_name = ? WHERE id = ?",
      [cat_id, sub_cat_name, id]
    );
    if (result) {
      res.status(201).json({message: "Updated Successfully", result});
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

//delete one subcategory
exports.deletesubcategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.delete("DELETE FROM subcategory WHERE id = ?", [id]);
    if (result) {
      res.status(201).json({ message: "SubCategory Deleted Successfully"});
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
