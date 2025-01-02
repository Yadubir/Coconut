const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();
const generateToken = require('../utlis/generateToken');
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
      
      
        //jwt token 
        const webtoken = generateToken(res, newUser._id);
        console.log({webtoken});

        res.status(200).json({success: true, message: 'User registered successfully'});


    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
});

module.exports = router;