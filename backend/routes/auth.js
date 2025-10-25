const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authcontroller');
const { authenticateToken } = require('../middleware/auth');
const { validateRequired, validateEmail } = require('../middleware/validation');

// POST /api/auth/register
router.post('/register', 
  validateRequired(['username', 'password']),
  validateEmail,
  AuthController.register
);

// POST /api/auth/login
router.post('/login',
  validateRequired(['username', 'password']),
  AuthController.login
);

// GET /api/auth/profile
router.get('/profile',
  authenticateToken,
  AuthController.getProfile
);

module.exports = router;