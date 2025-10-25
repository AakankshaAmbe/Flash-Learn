const pool = require('../config/database');

class Subject {
  // Get all subjects
  static async getAll() {
    const query = 'SELECT * FROM subjects ORDER BY name';
    const result = await pool.query(query);
    return result.rows;
  }

  // Get subject by ID
  static async getById(id) {
    const query = 'SELECT * FROM subjects WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows;
  }

  // Create new subject
  static async create(name) {
    const query = 'INSERT INTO subjects (name) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [name]);
    return result.rows;
  }

  // Update subject
  static async update(id, name) {
    const query = 'UPDATE subjects SET name = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [name, id]);
    return result.rows;
  }

  // Delete subject
  static async delete(id) {
    const query = 'DELETE FROM subjects WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows;
  }

  // Get subject with topic count
  static async getWithTopicCount() {
    const query = `
      SELECT s.*, COUNT(t.id) as topic_count
      FROM subjects s
      LEFT JOIN topics t ON s.id = t.subject_id
      GROUP BY s.id, s.name
      ORDER BY s.name
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = Subject;