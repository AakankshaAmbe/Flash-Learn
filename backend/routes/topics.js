const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Get all topics for a class & subject
router.get('/', async (req, res) => {
  const { class_level, subject } = req.query;
  if (!class_level || !subject) {
    return res.status(400).json({ success: false, message: 'class_level & subject required' });
  }

  try {
    const { rows } = await pool.query(
      `SELECT id, topic_name, description, key_concepts, learning_outcomes, duration, difficulty, progress
       FROM topics
       WHERE class_level = $1 AND LOWER(subject) = LOWER($2)
       ORDER BY id ASC`,
      [class_level, subject]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching topics:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;