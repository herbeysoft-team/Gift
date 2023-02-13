const { hashData } = require("../utilities/hashData");
var bcrypt = require("bcryptjs");
const db = require("../config/database");



/**
 * POST - http://localhost:8000/api/v1/auth/signup
 * @param {varchar}fullname - Get firstname lastname
 * @param {varchar}city - Get the city, country
 * @param {enum}gender - Get the gender, male or female
 * @param {varchar}phone_no - Get the phone number (unique)
 * @param {varchar}password - Get the password
 * @returns {message} message - Info about the output 
 */
exports.signup = async (req, res) => {
  let { fullname, city, gender, password, phone_no, username } = req.body;

  //TRIM THE PHONE NUMBER, USERNAME & PASSSWORD
  phone_no = phone_no.trim();
  username = username.trim();
  password = password.trim();
  //CHECK IF USER EXIST
  try {
    const oldUser = await db.getval(
      "SELECT * FROM userProfile WHERE phone_no = ? OR username = ?",
      [phone_no, username]
    );
    if (oldUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    //IF IT IS A NEW USER, HASHED THE PASSWORD
    const hashedPassword = await hashData(password);
    //CREATE A NEW USER
    const result = await db.insert(
      "INSERT INTO userProfile (fullname, username, phone_no, city, password, gender) VALUES (?,?,?,?,?,?)",
      [fullname, username, phone_no, city, hashedPassword, gender]
    );
    if(result){
    res
      .status(201)
      .json({ result, info: "User has been created Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
