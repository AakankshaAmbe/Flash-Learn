require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: '24h' // Token expires in 24 hours
};