const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const Question = require('../models/Question');

// GET /api/questions?class_level=11&subject=physics&topic=physical-world
router.get('/', async (req, res) => {
    const { class_level, subject, topic } = req.query;

    if (!class_level || !subject || !topic) {
        return res.status(400).json({ message: 'class_level, subject and topic are required' });
    }

    try {
        // Get topic id
        const topicQuery = `SELECT id FROM topics WHERE class_level=$1 AND LOWER(subject)=LOWER($2) AND LOWER(unit)=LOWER($3)`;
        const topicRes = await pool.query(topicQuery, [class_level, subject, topic]);
        if (topicRes.rows.length === 0) return res.status(404).json({ message: 'Topic not found' });

        const topicId = topicRes.rows[0].id;

        // Get questions for topic
        const questions = await Question.getByTopic(topicId);
        res.json(questions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
