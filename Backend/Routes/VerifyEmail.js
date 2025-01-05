const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const User = require('../Models/User');
const sendEmail = require('../utlis/sendEmail');

router.post('/verify', async (req, res) => {
    const {email, oneTimePassword } = req.body;

    // Verify email
    try {
        // Validate input
        if (!email || !oneTimePassword) {
            return res.status(400).json({ success: false, message: "Email and OTP are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the verification token matches and is not expired
        if (
            user.verificationToken !== oneTimePassword ||
            user.verificationTokenExpiresAt < Date.now()
        ) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        // Verify the user
        user.isVerified = true;
        user.verificationToken = undefined; // Clear the verification token
        user.verificationTokenExpiresAt = undefined; // Clear the expiration date

        await user.save();
        
        try {
            let htmlTemplate = fs.readFileSync(path.join(__dirname, '../Email_Templates/verified.html'), 'utf-8');
            htmlTemplate = htmlTemplate.replace('{{name}}', user.username);
            await sendEmail(email, htmlTemplate ); 
            console.log('Verification function running..');
        } catch (emailError) {
            console.error('Error sending email:', emailError.message);
            // Optionally, send an error response back to the client, or log the email failure
        }

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        console.error("Error verifying email:", error.message);
        res.status(500).json({
            success: false,
            message: "Error verifying email",
            error: error.message,
        });
    }
});

module.exports = router;
