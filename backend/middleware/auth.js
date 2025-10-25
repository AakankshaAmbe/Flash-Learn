const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/responsehandler');
const jwtConfig = require('../config/jwt');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' '); // Bearer TOKEN

  if (!token) {
    return sendError(res, 'Access token is required', 401);
  }

  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) {
      return sendError(res, 'Invalid or expired token', 403);
    }
    req.user = user; // Add user info to request
    next();
  });
};

// Middleware to require specific roles
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(res, 'Insufficient permissions', 403);
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  requireRole
};