const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Create new user with hashed password
  static async create(userData) {
    const { username, password, role = 'student' } = userData;
    
    // Hash password with salt rounds = 12
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const query = `
      INSERT INTO users (username, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING id, username, role, created_at
    `;
    
    const result = await pool.query(query, [username, hashedPassword, role]);
    return result.rows;
  }

  // Find user by username (for login)
  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows;
  }

  // Find user by ID (for profile)
  static async findById(id) {
    const query = 'SELECT id, username, role, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows;
  }

  // Validate password during login
  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Get all users (admin only)
  static async getAll() {
    const query = 'SELECT id, username, role, created_at FROM users ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = User;