const express = require('express');
const router = express.Router();
const pool = require('.../config/database'); // PostgreSQL connection pool

// ✅ Get all topics by class and subject
router.get('/:classLevel/:subject', async (req, res) => {
  const { classLevel, subject } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM topics WHERE class_level = $1 AND subject = $2 ORDER BY id ASC',
      [classLevel, subject]
    );
    res.json({ success: true, topics: result.rows });
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ success: false, message: 'Error fetching topics' });
  }
});

// ✅ Get specific topic details dynamically
router.get('/:classLevel/:subject/:unit/:topicName', async (req, res) => {
  const { classLevel, subject, unit, topicName } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM topics WHERE class_level = $1 AND subject = $2 AND unit = $3 AND topic_name = $4',
      [classLevel, subject, unit, topicName]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }
    res.json({ success: true, topic: result.rows[0] });
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({ success: false, message: 'Error fetching topic' });
  }
});

module.exports = router;
