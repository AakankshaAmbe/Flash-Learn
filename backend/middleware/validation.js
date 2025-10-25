const { sendError } = require('../utils/responsehandler');

const validateRequired = (fields) => {
  return (req, res, next) => {
    const missingFields = [];
    
    fields.forEach(field => {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      return sendError(res, `Missing required fields: ${missingFields.join(', ')}`);
    }
    
    next();
  };
};

const validateEmail = (req, res, next) => {
  const { username } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (username && !emailRegex.test(username)) {
    return sendError(res, 'Invalid email format');
  }
  
  next();
};

module.exports = {
  validateRequired,
  validateEmail
};