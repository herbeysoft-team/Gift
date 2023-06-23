const axios = require('axios');
const querystring = require('querystring');
const apiKey = "fUqs2a9FbmODrDK4Ajq9Zj9msq1Aab6l5StJVJsylwr6whaZveuAyUdVyk7X";
const senderID = "TrowBox"


async function sendSMS(message, phoneNumber) {
    const url = 'https://www.bulksmsnigeria.com/api/v1/sms/create';
  
    const params = {
      api_token: apiKey,
      from: senderID,
      to: phoneNumber,
      body: message,
    };
  
    const postData = querystring.stringify(params);
  
    try {
      const response = await axios.post(url, postData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      // Handle the response as per your requirements
      return response.data
      //console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  

  module.exports = { sendSMS };