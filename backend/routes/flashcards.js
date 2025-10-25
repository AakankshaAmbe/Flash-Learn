const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Get flashcards by topic ID
router.get('/:topicId', async (req, res) => {
  const { topicId } = req.params;
  try {
    const { rows } = await pool.query(
      'SELECT id, topic_id, content FROM flashcards WHERE topic_id = $1',
      [topicId]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error fetching flashcards:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;