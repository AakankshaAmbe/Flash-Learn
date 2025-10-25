// routes/flashcards.js
const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/:topicId', async (req, res) => {
  const { topicId } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, content FROM flashcards WHERE topic_id = $1',
      [topicId]
    );
    res.json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;