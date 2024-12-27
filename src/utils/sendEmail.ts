import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "janarthanan.b@technotackle.com",
  },
});

export function sendEmail(otp: string, toAddress: string, purpose: string) {
  const mailConfigurations = {
    to: toAddress,
    subject: "Sending Email",
    text: `Your ${purpose} OTP is ${otp}`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      throw error;
    }
    console.log("Email Sent Successfully");
  });
}
