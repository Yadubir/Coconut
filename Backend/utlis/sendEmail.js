const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // Set to true if using SSL (465), otherwise use false for TLS (587)
  auth: {
    user: "iam.riri18@gmail.com", // Store the email in .env file
    pass: "cpfhfzafpyxvqsvq", // Store the password in .env file
  },
});

// Async function to send an email
async function sendEmail(to, text) {
  try {
    if (!to) {
      throw new Error("Recipient email is required");
    }

    const info = await transporter.sendMail({
      from: "iam.riri18@gmail.com", // sender address (use environment variable)
      to, // recipient address (pass as argument)
      subject: "Hello", // Subject line
      text, // plain text body
      html: "<b>Welcome to Coconut! </b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId }; // Return success response

  } catch (error) {
    console.error("Error occurred while sending email:", error);
    return { success: false, error: error.message }; // Return error response
  }
}

module.exports = sendEmail;
