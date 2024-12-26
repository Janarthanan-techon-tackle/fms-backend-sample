import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
async function createMessage() {
  const message = await client.messages
    .create({
      body: "Hi from twilio service",
      from: "+919566606092",
      to: "+919566606091",
    })
    .then((message) => {
      console.log("message sent successfully");
      console.log(message);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default createMessage;
