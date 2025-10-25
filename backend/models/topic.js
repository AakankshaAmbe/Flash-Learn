const pool = require('../config/database');

class Topic {
  // Get all topics with subject information
  static async getAll() {
    const query = `
      SELECT t.*, s.name as subject_name 
      FROM topics t 
      JOIN subjects s ON t.subject_id = s.id 
      ORDER BY s.name, t.name
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Get topics by subject ID
  static async getBySubject(subjectId) {
    const query = `
      SELECT t.*, s.name as subject_name 
      FROM topics t 
      JOIN subjects s ON t.subject_id = s.id 
      WHERE t.subject_id = $1 
      ORDER BY t.name
    `;
    const result = await pool.query(query, [subjectId]);
    return result.rows;
  }

  // Get topic by ID with subject info
  static async getById(id) {
    const query = `
      SELECT t.*, s.name as subject_name 
      FROM topics t 
      JOIN subjects s ON t.subject_id = s.id 
      WHERE t.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows;
  }

  // Create new topic
  static async create(topicData) {
    const { subject_id, name, model_url } = topicData;
    const query = `
      INSERT INTO topics (subject_id, name, model_url) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const result = await pool.query(query, [subject_id, name, model_url]);
    return result.rows;
  }

  // Update topic
  static async update(id, topicData) {
    const { name, model_url } = topicData;
    const query = `
      UPDATE topics 
      SET name = $1, model_url = $2 
      WHERE id = $3 
      RETURNING *
    `;
    const result = await pool.query(query, [name, model_url, id]);
    return result.rows;
  }

  // Delete topic
  static async delete(id) {
    const query = 'DELETE FROM topics WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows;
  }

  // Check if topic has flashcards
  static async hasFlashcards(topicId) {
    const query = 'SELECT COUNT(*) as count FROM flashcards WHERE topic_id = $1';
    const result = await pool.query(query, [topicId]);
    return parseInt(result.rows.count) > 0;
  }
}

module.exports = Topic;