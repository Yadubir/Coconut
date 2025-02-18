const User = require('../Models/User');
const mongoose = require('mongoose');

exports.read = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            error: 'Invalid user ID'
        });
    }
    try {
        const user = await User.findById(userId).exec();
        if (!user) {
            console.log("no user found siudh");
            return res.status(400).json({
                error: 'User not found'
            });
        }
        // user.hashed_password = undefined;
        // user.salt = undefined;
        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Server error'
        });
    }
};