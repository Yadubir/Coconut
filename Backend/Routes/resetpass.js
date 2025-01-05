const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sendEmail = require('../utlis/sendEmail');

router.post('/resetpass/:token', async (req, res) => {
  try{
    const {token} = req.params;
    const {password} = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt:{$gt: Date.now()}
    });

    if(!user){
      return res.status(404).json({success: false, message: 'Invalid or expired Token'});
    }

    //update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    res.status(200).json({success: true, message: 'Password updated successfully'});

    // sending confirmation email to the user 
    let htmlTemplate = fs.readFileSync(path.join(__dirname, '../Email_Templates/resetconfirm.html'), 'utf-8');
    htmlTemplate = htmlTemplate.replace('{{name}}', user.username);
    await sendEmail(user.email, htmlTemplate);

    return res.status(200).json({success: true, message: 'Email sent successfully'});
  }catch (error){

  }
});
module.exports = router;