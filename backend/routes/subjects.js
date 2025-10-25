const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validateRequired } = require('../middleware/validation');
const { sendSuccess, sendError } = require('../utils/responsehandler');

// GET /api/subjects - Get all subjects
router.get('/', authenticateToken, async (req, res) => {
  try {
    const subjects = await Subject.getWithTopicCount();
    return sendSuccess(res, 'Subjects retrieved successfully', { subjects });
  } catch (error) {
    console.error('Get subjects error:', error);
    return sendError(res, 'Failed to retrieve subjects', 500, error);
  }
});

// GET /api/subjects/:id - Get subject by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.getById(id);
    
    if (!subject) {
      return sendError(res, 'Subject not found', 404);
    }

    return sendSuccess(res, 'Subject retrieved successfully', { subject });
  } catch (error) {
    console.error('Get subject error:', error);
    return sendError(res, 'Failed to retrieve subject', 500, error);
  }
});

// POST /api/subjects - Create subject (teachers only)
router.post('/',
  authenticateToken,
  requireRole(['teacher']),
  validateRequired(['name']),
  async (req, res) => {
    try {
      const { name } = req.body;
      const subject = await Subject.create(name);
      return sendSuccess(res, 'Subject created successfully', { subject }, 201);
    } catch (error) {
      console.error('Create subject error:', error);
      if (error.code === '23505') {
        return sendError(res, 'Subject with this name already exists', 409);
      }
      return sendError(res, 'Failed to create subject', 500, error);
    }
  }
);

// PUT /api/subjects/:id - Update subject (teachers only)
router.put('/:id',
  authenticateToken,
  requireRole(['teacher']),
  validateRequired(['name']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      
      const subject = await Subject.update(id, name);
      if (!subject) {
        return sendError(res, 'Subject not found', 404);
      }

      return sendSuccess(res, 'Subject updated successfully', { subject });
    } catch (error) {
      console.error('Update subject error:', error);
      if (error.code === '23505') {
        return sendError(res, 'Subject with this name already exists', 409);
      }
      return sendError(res, 'Failed to update subject', 500, error);
    }
  }
);

// DELETE /api/subjects/:id - Delete subject (teachers only)
router.delete('/:id',
  authenticateToken,
  requireRole(['teacher']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const subject = await Subject.delete(id);
      
      if (!subject) {
        return sendError(res, 'Subject not found', 404);
      }

      return sendSuccess(res, 'Subject deleted successfully', { subject });
    } catch (error) {
      console.error('Delete subject error:', error);
      return sendError(res, 'Failed to delete subject', 500, error);
    }
  }
);

module.exports = router;