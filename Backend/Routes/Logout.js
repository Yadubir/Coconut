const express = require('express');
const router = express.Router();


router.post('/logout', (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;