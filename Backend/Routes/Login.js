const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();
const generateToken = require('../utlis/generateToken');
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(res, user._id);
        console.log({token});
        res.status(200).json({success: true, 
            message: 'User logged in  successfully',
            token,
        });
        // updating user last login
        user.lastLogin = Date.now();
        await user.save();
        // console.log(user);
      
        console.log(`User logged in with email: ${user.email}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;