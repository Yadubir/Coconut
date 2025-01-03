const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const sendEmail = require('../utlis/sendEmail');

router.post('/verify', async (req, res) => {
    const { email, oneTimePassword } = req.body;

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
        
            const sentmsg = `Hi ${user.username},\n Your Email is successfully verified \n \n Team COCONUT`;//not visible in email!!
            console.log(sentmsg);
            await sendEmail(email, sentmsg ); 
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
