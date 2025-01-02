const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const generateToken = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '15d', 
  });
  res.cookie('jwt', token, {
    httpOnly: true, // cookie cannot be accessed by client js
    secure: process.env.NODE_ENV === 'production', // cookie only works in https
    sameSite: 'strict', // csrf
    maxAge: 15 * 24 * 60 * 60 * 1000, 
  });
  return token;
};

module.exports = generateToken