const { hashData, verifyHashData } = require("../utilities/hashData");
const createToken = require("../utilities/createToken");
const jwt = require("jsonwebtoken");
const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;
var bcrypt = require("bcryptjs");
const db = require("../config/database");
const generateSMS = require('../utilities/generateSMS')
const { sendOTP, verifyOTP, sendVerificationOTPPhone } = require('../utilities/sendOTP')



/**
 * POST - http://localhost:8000/api/v1/auth/signup
 * fullname - Get firstname lastname
 * city - Get the city, country
 * gender - Get the gender, male or female
 * phone_no - Get the phone number (unique)
 * password - Get the password
 * 
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
    const otp = await sendVerificationOTPPhone(phone_no);
    res
      .status(201)
      .json({ result, info: "User has been created Successfully", otp });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


/**
 * POST - http://localhost:8000/api/v1/auth/login
 * phone_no - Get the phone number (unique)
 * password - Get the password
 * 
 */
exports.login = async (req, res) => {
  try {
  
    //CHECK IF THE INPUT IS NOT EMPTY
    if(!(req.body.phone_no && req.body.password)){
      throw Error("Empty Credentials Supplied");
    }

    //CHECK IF THE USER EXIST
    const userExist = await db.getrow(
      "SELECT * FROM userprofile  WHERE phone_no = ? OR username = ? ",
      [ req.body.phone_no, req.body.phone_no ]
    );

    
    //IF USER DOES NOT EXIST
    if(!userExist){
      return res.status(404).json({ message: "user does not exist" });
    }

    if(!userExist.verified){
      return res.status(404).json({ message: "Phone Number hasn't be verified yet. Please check your inbox" });
    }
    //IF USER EXIST
    const hashedPassword  = userExist.password;
    
    //CHECK IF PASSWORD MATCH
    const passwordMatch = await verifyHashData(req.body.password, hashedPassword)
    

    if(!passwordMatch){
      throw Error("Invalid Password Entered!")
    }

    //CREATE USER TOKEN
    const tokenData = {userId: userExist.id, phone_no: userExist.phone_no };
    const token = await createToken(tokenData);

    //DESTRUCTION USER EXIST INFO
    const { password, ...others } = userExist;

    res
      .cookie("trowbox_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);

  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
    
  }
}


/**
 * POST - http://localhost:8000/api/v1/auth/logout
 */
exports.logout = async (req, res) => {
  res.clearCookie("access_token",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
}


/**
 * POST - http://localhost:8000/api/v1/auth/verify
 * phone_no - Get the phone number (unique)
 * otp - Get the otp
 * 
 */
exports.verify =async(req, res) => {
  try {
      let  { phone_no, otp } = req.body;

     const validOTP = await verifyOTP({phone_no, otp});
     res.status(200).json({valid: validOTP});
  } catch (error) {
      res.status(400).send(error.message);
  }
}

/**
 * POST - http://localhost:8000/api/v1/auth/otp
 * phone_no - Get the phone number (unique)
 * message - the message to be sent 
 * duration: the time the otp will take to expire
 * 
 */
exports.otp = async(req, res) => {
  try {
      const { phone_no, message, duration } = req.body;

      const createdOTP = await sendOTP({
          phone_no,
          message,
          duration
      });
      console.log(createdOTP)
      res.status(200).json(createdOTP);
  } catch (error) {
      res.status(400).send(error.message);
  }
}