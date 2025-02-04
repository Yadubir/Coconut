const User = require('../Models/User');

const addSubmission = async (userId,problemId,difficultyLevel) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId }, 
        { 
            $push: { 
                submissions: { 
                  problemId, 
                  date: new Date()
                }
            },
            $inc: { [`totalDifficulty.${difficultyLevel}`]: 1 } // 🔹 Increment totalDifficulty for this level
        },
        { new: true}
    );

    console.log("Submission added successfully:", updatedUser);
} catch (error) {
    console.error("Error adding submission:", error);
}
};

module.exports = addSubmission;