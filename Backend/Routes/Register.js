const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();

const generateToken = require('../utlis/generateToken');
const sendEmail = require('../utlis/sendEmail');

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        if(!email || !password || !username){
            throw new Error("All feilds must be required");
        }
        //checking if user exists : 
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({success: false, message: 'User Exists'});
        } 

        //verification code 
        const verificationToken = Math.floor(100000 + Math.random()*900000).toString();

        
        // adding new user 
        const newUser = new User({
            username, 
            email, 
            password,
            verificationToken,
            verificationTokenExpiresAt : Date.now() + 5*60*1000
        });

        await newUser.save();

        // res.status(200).json({message: 'User registered successfully'});
        // console.log(`User registered with username: ${newUser.username} and email: ${newUser.email}`);
      
      
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


    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
});

module.exports = router;