const express = require('express');
const crypto= require('crypto');
const bcrypt= require('bcrypt');
const User = require('../Models/User');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sendEmail = require('../utlis/sendEmail');

router.post('/forgotpass',async (req, res) => {
  const{email}= req.body;
  try{
    const user = await User.findOne({email});
    if(!user){

      return res.status(404).json({success: false, message: 'User not found'});
    }
    // generate reset token 
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiresAt = Date.now() + 1*60*60*1000; // 1hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    //send email 
    let htmlTemplate = fs.readFileSync(path.join(__dirname, '../Email_Templates/resetpass.html'), 'utf-8');
    htmlTemplate = htmlTemplate.replace('{{name}}', user.username);
    htmlTemplate = htmlTemplate.replace('{{resetPasswordLink}}', `${process.env.CLIENT_URL}/${resetToken}`);
    // htmlTemplate = htmlTemplate.replace('{{resetPasswordLink}}', `${process.env.CLIENT_URL}/resetpass/${resetToken}`);
    await sendEmail(user.email, htmlTemplate);

    return res.status(200).json({success: true, message: 'Email sent successfully'});
  }catch(error){
    return res.status(500).json({success: false, message: error.message});
  }
});

module.exports = router;