const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin:{
        type: Date,
        default: Date.now
    },
    isVerified:{
        type: Boolean,
        default:false
    },
    problemId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    resetPasswordToken: String, 
    resetPasswordExpiresAt: Date, 
    verificationToken: String, 
    verificationTokenExpiresAt: Date,  
}, {timestamps :true});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
