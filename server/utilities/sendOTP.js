const db = require("../config/database");
const { sendSMS } = require("./generateSMS");
const { hashData, verifyHashData } = require("./hashData");
const generateOTP = require("./generateOTP");

/*VERIFY OTP */
const verifyOTP = async ({phone_no, otp}) => {
    try {
        
        if(!(phone_no && otp)){
            throw Error("Provide values for phone numebr and otp")
        }

        //ENSURE OTP RECORD EXISTS
        const matchedOTPRecord = await db.getall( "SELECT * FROM otp WHERE phone_no = ?",
        [phone_no])

        //ENSURE OTP RECORD MATCHES
        if(!matchedOTPRecord){
            throw Error("No otp records found.");
        }

        const { expiredAt } = matchedOTPRecord;

        //CHECK FOR EXPIRED CODDE
        if(expiredAt < Date.now()){
            //CLEAR ANY OLD RECORD
            await db.delete("DELETE FROM otp WHERE phone_no = ?", [phone_no]);
        }

        //IF NOT EXPIRED
        const hashedOTP = matchedOTPRecord.otp;
        const validOTP = await verifyHashData(otp, hashedOTP);
        return validOTP;

    } catch (error) {
        throw error;
    }
}

/*SEND OTP */
const sendOTP = async({phone_no, message, duration = 1}) => {
    try {
        if(!(phone_no && message)){
            throw Error("Provide values for phone_no and message");    
        }

        //CLEAR ANY OLD RECORD
        await db.delete("DELETE FROM otp WHERE phone_no = ?", [phone_no]);

        //GENERATE NEW PIN
        const genOTP= await generateOTP();

        //SEND SMS
        const smsOptions = {
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${phone_no}`,
            body: `${message} with the OTP number ${genOTP}. This code expires in ${duration} hour`,
        };

        await sendSMS(smsOptions);
        
        //SAVE OTP RECORD
        const hashedOTP = await hashData(genOTP);
        const newOTP = await db.insert("INSERT INTO otp (phone_no, otp, createdAt, expiredAt) VALUES (?, ?, ?, ?)", 
        [phone_no, hashedOTP, Date.now(), Date.now() + 3600000 * +duration,])

        if(newOTP){
        return genOTP;
        }

    } catch (error) {
        throw error;
    }
}

/*DELETE OTP */
const deleteOTP = async (phone_no) => {
    try {
        //CLEAR ANY OLD RECORD
        await db.delete("DELETE FROM otp WHERE phone_no = ?", [phone_no]);
    } catch (error) {
        throw error;
    }
}
module.exports = {sendOTP , verifyOTP, deleteOTP};