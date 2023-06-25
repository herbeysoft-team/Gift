const db = require("../config/database");
const { sendSMS } = require("./generateSMS");
const { hashData, verifyHashData } = require("./hashData");
const generateOTP = require("./generateOTP");
const {sendSMSNow} = require("./sms");

/*VERIFY OTP */
const verifyOTP = async ({ phone_no, otp }) => {
  try {
    if (!(phone_no && otp)) {
      throw Error("Provide values for phone number and otp");
    }

    //ENSURE OTP RECORD EXISTS
    const matchedOTPRecord = await db.getall(
      "SELECT * FROM otp WHERE phone_no = ?",
      [phone_no]
    );

    //ENSURE OTP RECORD MATCHES
    if (!matchedOTPRecord) {
      throw Error("No otp records found.");
    }

    const { expiredAt } = matchedOTPRecord[0];

    //CHECK FOR EXPIRED CODDE
    if (expiredAt < Date.now()) {
      //CLEAR ANY OLD RECORD
      await db.delete("DELETE FROM otp WHERE phone_no = ?", [phone_no]);
    }

    //IF NOT EXPIRED
    const hashedOTP = matchedOTPRecord[0].otp;
    const validOTP = await verifyHashData(otp, hashedOTP);
    return validOTP;
  } catch (error) {
    throw error;
  }
};

/*SEND OTP */
const sendOTP = async ({ phone_no, message, duration = 1 }) => {
  try {
    if (!(phone_no && message)) {
      throw Error("Provide values for phone_no and message");
    }

    //CLEAR ANY OLD RECORD
    await db.delete("DELETE FROM otp WHERE phone_no = ?", [phone_no]);

    //GENERATE NEW PIN
    const genOTP = await generateOTP();

    //SEND SMS
    // const smsOptions = {
    //   from: "whatsapp:+14155238886",
    //   to: `whatsapp:${phone_no}`,
    //   body: `${message} with the OTP number ${genOTP}. This code expires in ${duration} hour`,
    // };

    // await sendSMS(smsOptions);
    await sendSMSNow(`${message} with the OTP number ${genOTP}. This code expires in ${duration} hour`, phone_no)

    //SAVE OTP RECORD
    const hashedOTP = await hashData(genOTP);
    const newOTP = await db.insert(
      "INSERT INTO otp (phone_no, otp, createdAt, expiredAt) VALUES (?, ?, ?, ?)",
      [phone_no, hashedOTP, Date.now(), Date.now() + 3600000 * +duration]
    );

    if (newOTP) {
      return genOTP;
    }
  } catch (error) {
    throw error;
  }
};

/*DELETE OTP */
const deleteOTP = async (phone_no) => {
  try {
    //CLEAR ANY OLD RECORD
    await db.delete("DELETE FROM otp WHERE phone_no = ?", [phone_no]);
  } catch (error) {
    throw error;
  }
};

/*SEND OTP  TO A PHONE NUMBER FOR VERIFICATION */
const sendVerificationOTPPhone = async (phone_no) => {
  try {
    //CHECK IF THE USER EXISTS
    const userExist = await db.getall(
      "SELECT * FROM userProfile WHERE phone_no = ?",
      [phone_no]
    );

    if (!userExist) {
      throw Error("There's no account for the provided phone number");
    }

    const otpDetails = {
      phone_no,
      message: "Verify your account",
      duration: 1,
    };

    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

/*VERIFY USER OTP*/
const verifyUserPhone = async ({ phone_no, otp }) => {
  try {
    //CHECK IF THE OTP VALID
    const validOTP = await verifyOTP({ phone_no, otp });
    if (!validOTP) {
      throw Error("Invalid code passed. Check your inbox");
    }

    //NOW UPDATE USER RECORD AFTER SUCCESSFUL VERIFICATION
    const updateUserVerified = await db.update(
      "UPDATE userprofile SET verified = ? WHERE phone_no = ?",
      [1, phone_no]
    );
    await deleteOTP(phone_no);

    return updateUserVerified;
  } catch (error) {
    throw error;
  }
};

/*SEND PASSWORD REST TO PHONE*/
const sendPasswordResetOTPPhone = async (phone_no) => {
  try {
    //CHECK IF THE USER EXISTS
    const userExist = await db.getrow(
      "SELECT * FROM userProfile WHERE phone_no = ?",
      [phone_no]
    );

    if (!userExist) {
      throw Error("There's no account for the provided phone number");
    }

    if (!userExist.verified) {
      throw Error("Phone number hasn't been verified yet. Check your inbox");
    }

    const otpDetails = {
      phone_no,
      message: "Reset your account",
      duration: 1,
    };

    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

/*RESET USER PASSWORD */
const resetUserPassword = async ({ phone_no, otp, newPassword }) => {
  try {
    //CHECK IF THE OTP VALID
    const validOTP = await verifyOTP({ phone_no, otp });
    if (!validOTP) {
      throw Error("Invalid code passed. Check your inbox");
    }

    //NOW UPDATE USER RECORD
    const hashedNewPassword = await hashData(newPassword);
    const updateUserPassword = await db.update(
      "UPDATE userprofile SET password = ? WHERE phone_no = ?",
      [hashedNewPassword, phone_no]
    );

    await deleteOTP(phone_no);
    return updateUserPassword;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  sendOTP,
  verifyOTP,
  deleteOTP,
  sendVerificationOTPPhone,
  verifyUserPhone,
  sendPasswordResetOTPPhone,
  resetUserPassword,
};
