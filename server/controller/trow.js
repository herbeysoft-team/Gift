const db = require("../config/database");


//create a trow box
exports.createtrow = async (req, res) => {
    const { name, description, category } = req.body;
    const file = req.file.filename;

    console.log(req.body)
    console.log(file)
    try {
      // const result = await db.insert(
      //   "INSERT INTO items (item_name, item_description, item_pics, item_subcategory) VALUES (?,?,?,?)",
      //   [name, description, file, category]
      // );
      // res.status(201).json({message:"Item Created Successfully", result});
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
      console.log(error);
    }
  };