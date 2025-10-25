const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const subjectRoutes = require('./routes/subjects');
const topicRoutes = require('./routes/topics');
const flashcardRoutes = require('./routes/flashcards');
const questionRoutes = require('./routes/questions');

// Import utilities
const { sendError } = require('./utils/responsehandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
})); // Enable CORS
app.use(limiter); // Apply rate limiting
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 FlashLearn Backend API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    features: [
      '🤖 AI-powered flashcard generation with Perplexity',
      '🔐 JWT authentication',
      '📚 Subject and topic management',
      '🎯 3D model integration',
      '⚡ PostgreSQL database'
    ]
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/flashcards', flashcardRoutes); // 🎯 Main route for AI generation
app.use('/api/questions', questionRoutes);

// Handle 404 errors using catch-all middleware (no '*' path)
app.use((req, res) => {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;
    
  sendError(res, message, 500, process.env.NODE_ENV === 'development' ? err : null);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🎉 =====================================');
  console.log(`🚀 FlashLearn Backend running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}`);
  console.log(`🤖 Perplexity AI: ${process.env.PERPLEXITY_API_KEY ? 'Connected ✅' : 'Not configured ❌'}`);
  console.log(`💾 Database: ${process.env.DB_NAME || 'Not configured'}`);
  console.log('🎉 =====================================');
});

module.exports = app;