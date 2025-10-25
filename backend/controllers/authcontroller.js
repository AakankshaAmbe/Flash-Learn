const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { sendSuccess, sendError } = require('../utils/responsehandler');
const jwtConfig = require('../config/jwt');

class AuthController {
  // Register new user
  static async register(req, res) {
    try {
      const { username, password, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return sendError(res, 'User already exists with this username', 409);
      }

      // Create new user
      const newUser = await User.create({ username, password, role });
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: newUser.id, 
          username: newUser.username, 
          role: newUser.role 
        },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );

      console.log(`✅ New user registered: ${username} (${role})`);
      
      return sendSuccess(res, 'User registered successfully', {
        user: newUser,
        token
      }, 201);

    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle unique constraint violation
      if (error.code === '23505') {
        return sendError(res, 'Username already exists', 409);
      }
      
      return sendError(res, 'Registration failed', 500, error);
    }
  }

  // User login
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Find user by username
      const user = await User.findByUsername(username);
      if (!user) {
        return sendError(res, 'Invalid credentials', 401);
      }

      // Validate password
      const isValidPassword = await User.validatePassword(password, user.password_hash);
      if (!isValidPassword) {
        return sendError(res, 'Invalid credentials', 401);
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user.id, 
          username: user.username, 
          role: user.role 
        },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );

      // Remove password from response
      const { password_hash, ...userWithoutPassword } = user;

      console.log(`✅ User logged in: ${username}`);

      return sendSuccess(res, 'Login successful', {
        user: userWithoutPassword,
        token
      });

    } catch (error) {
      console.error('Login error:', error);
      return sendError(res, 'Login failed', 500, error);
    }
  }

  // Get user profile
  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return sendError(res, 'User not found', 404);
      }

      return sendSuccess(res, 'Profile retrieved successfully', { user });

    } catch (error) {
      console.error('Get profile error:', error);
      return sendError(res, 'Failed to get profile', 500, error);
    }
  }
}

module.exports = AuthController;