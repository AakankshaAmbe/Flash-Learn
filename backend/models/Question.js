const pool = require('../config/database');

class Question {
    static async getByTopic(topicId) {
        const query = `
            SELECT q.id as question_id, q.question_text,
                   json_agg(json_build_object('id', o.id, 'option_text', o.option_text, 'is_correct', o.is_correct)) AS options
            FROM questions q
            JOIN options o ON q.id = o.question_id
            WHERE q.topic_id = $1
            GROUP BY q.id
        `;
        const result = await pool.query(query, [topicId]);
        return result.rows;
    }
}

module.exports = Question;
