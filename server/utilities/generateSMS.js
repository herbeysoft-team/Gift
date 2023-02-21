require('dotenv').config(); //have access to environment variable
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
var twilio = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)

const sendSMS = async (smsOption) => {
  try {
    twilio.messages 
          .create({ 
            body: smsOption.body, 
            from: smsOption.from,       
            to: smsOption.to 
          }) 
          .then(message => console.log(message.sid)) 
          .catch((err) => {
            console.log(err)
        })
  } catch (error) {
     throw err;
  }
}

module.exports = { sendSMS }