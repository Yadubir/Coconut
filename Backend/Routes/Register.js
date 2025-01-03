const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();
<<<<<<< Updated upstream

=======
const generateToken = require('../utlis/generateToken');
const sendEmail = require('../utlis/sendEmail');
>>>>>>> Stashed changes
router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const newUser = new User({username, email, password});
        await newUser.save();
<<<<<<< Updated upstream
        res.status(200).json({message: 'User registered successfully'});
        console.log(`User registered with username: ${newUser.username} and email: ${newUser.email}`);
=======
      
      
        //jwt token 
        const webtoken = generateToken(res, newUser._id);
        console.log({webtoken});

        res.status(200).json({success: true, message: 'User registered successfully'});
        // sending welcome email
        try {
        
            const sentmsg = `Hi ${username}`;//not visible in email!!
            console.log(sentmsg);
            await sendEmail(email, sentmsg ); 
            console.log('Verification function running..');
        } catch (emailError) {
            console.error('Error sending email:', emailError.message);
            // Optionally, send an error response back to the client, or log the email failure
        }


>>>>>>> Stashed changes
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;