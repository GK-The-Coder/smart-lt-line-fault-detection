const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS(message) {
  try {

    const response = await client.messages.create({
      body: message,

      from: process.env.TWILIO_PHONE_NUMBER,

      to: process.env.ALERT_PHONE_NUMBER,
    });

    console.log(
      "SMS Sent:",
      response.sid
    );

  } catch (error) {

    console.error(
      "SMS Error:",
      error.message
    );

  }
}

module.exports = sendSMS;
