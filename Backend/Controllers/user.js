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
        const submissionCounts = user.submissions.reduce((acc, submission) => {
            const date = new Date(submission.date).toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // Format response
        const values = Object.entries(submissionCounts).map(([date, count]) => ({
            date,
            count
        }));

        const difficultystats = {
            labels: ['Easy', 'Medium', 'Hard'],
            datasets: [{
                data: [
                    user.totalDifficulty.easy,
                    user.totalDifficulty.medium,
                    user.totalDifficulty.hard
                ],
                backgroundColor: [
                    '#4ade80', // green for easy
                    '#fb923c', // orange for medium
                    '#ef4444'  // red for hard
                ]
            }]
        };

        // Return formatted response
        return res.status(200).json({
            name: user.username,
            displayname: user.displayname,
            about: user.about,
            email: user.email,
            linkedin: user.linkedin,
            github: user.github,
            website: user.website,
            difficultystats: difficultystats,
            values: values
        });

    } catch (err) {
        console.log('Error fetching user submissions:',err);
        return res.status(500).json({
            error: 'Server error'
        });
    }
};
