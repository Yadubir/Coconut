const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // Set to true if using SSL (465), otherwise use false for TLS (587)
  auth: {
    user: process.env.EMAIL, // Store the email in .env file
    pass: process.env.EMAILAUTH_PASSWORD, // Store the password in .env file
  },
});

// Async function to send an email
async function sendEmail(to, text) {
  try {
    if (!to) {
      throw new Error("Recipient email is required");
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address (use environment variable)
      to, // recipient address (pass as argument)
      subject: "Hello", // Subject line
      text, // plain text body
      // html: "<b>Welcome to Coconut! </b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId }; // Return success response

  } catch (error) {
    console.error("Error occurred while sending email:", error);
    return { success: false, error: error.message }; // Return error response
  }
}

module.exports = sendEmail;
