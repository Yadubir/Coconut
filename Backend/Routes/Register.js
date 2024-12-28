const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const newUser = new User({username, email, password});
        await newUser.save();
        res.status(200).json({message: 'User registered successfully'});
        console.log(`User registered with username: ${newUser.username} and email: ${newUser.email}`);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;