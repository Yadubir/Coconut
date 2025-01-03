const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

<<<<<<< Updated upstream
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
=======
        const webtoken = generateToken(res, user._id);
        console.log({webtoken});
        res.status(200).json({success: true, message: 'User logged in  successfully'});
        // updating user last login
        user.lastLogin = Date.now();
        await user.save();
        
>>>>>>> Stashed changes
        console.log(`User logged in with email: ${user.email}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;