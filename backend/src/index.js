const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('🚀 [STARTUP] Loading Civic Bridge Backend...');
console.log(`📝 [CONFIG] NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`📝 [CONFIG] PORT: ${process.env.PORT || 5000}`);

// Initialize Express
const app = express();

// Middleware
console.log('⚙️  [MIDDLEWARE] Configuring CORS and body parsing...');
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📨 [REQUEST] ${req.method} ${req.path}`);
  next();
});

// Routes
console.log('🛣️  [ROUTES] Loading API routes...');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');
const ngoRoutes = require('./routes/ngoRoutes');
const matchingRoutes = require('./routes/matchingRoutes');

// API Routes
console.log('📍 [ROUTES] Mounting /api/auth...');
app.use('/api/auth', authRoutes);
console.log('📍 [ROUTES] Mounting /api/users...');
app.use('/api/users', userRoutes);
console.log('📍 [ROUTES] Mounting /api/issues...');
app.use('/api/issues', issueRoutes);
console.log('📍 [ROUTES] Mounting /api/ngos...');
app.use('/api/ngos', ngoRoutes);
console.log('📍 [ROUTES] Mounting /api/matches...');
app.use('/api/matches', matchingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('✅ [HEALTH] Health check endpoint called');
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date(),
  });
});

// Routes documentation
app.get('/api/docs', (req, res) => {
  console.log('📚 [DOCS] Documentation endpoint called');
  res.status(200).json({
    success: true,
    message: 'Civic Bridge Backend API Routes',
    endpoints: {
      auth: {
        'POST /api/auth/google': 'Google OAuth login - Headers: Authorization: Bearer <google_token>',
        'GET /api/auth/verify': 'Verify JWT token - Headers: Authorization: Bearer <jwt_token>',
      },
      users: {
        'GET /api/users/profile': 'Get user profile',
        'PUT /api/users/profile': 'Update user profile',
        'POST /api/users/request-join-ngo': 'Request to join NGO',
        'POST /api/users/verify-volunteer': 'Verify volunteer (admin only)',
        'GET /api/users/ngo/:ngoId/volunteers': 'Get NGO volunteers',
      },
      ngos: {
        'POST /api/ngos': 'Create NGO',
        'GET /api/ngos/:ngoId': 'Get NGO details',
        'PUT /api/ngos/:ngoId': 'Update NGO (admin only)',
        'POST /api/ngos/add-volunteer': 'Add volunteer to NGO (admin only)',
        'GET /api/ngos/:ngoId/pending-volunteers': 'Get pending volunteers (admin only)',
        'GET /api/ngos/:ngoId/stats': 'Get NGO statistics (admin only)',
      },
      issues: {
        'POST /api/issues': 'Post new issue',
        'GET /api/issues/activity-feed': 'Get public activity feed',
        'GET /api/issues/:issueId': 'Get issue details',
        'POST /api/issues/:issueId/verify': 'Verify issue (volunteer only)',
        'POST /api/issues/:issueId/approve': 'Approve issue & trigger AI matching (admin only)',
        'GET /api/issues/ngo/:ngoId': 'Get NGO issues (admin only)',
      },
      matches: {
        'GET /api/matches/:issueId': 'Get AI-suggested volunteer matches',
        'POST /api/matches/:matchId/respond': 'Respond to match - Body: {"response": "accept" or "reject"}',
      },
    },
    note: 'All endpoints require Authorization header with JWT token (except /api/health and /api/docs)',
  });
});

// 404 handler
app.use((req, res) => {
  console.warn(`⚠️  [404] Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ [ERROR]', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║         ✅ CIVIC BRIDGE BACKEND SERVER STARTED                ║
║                                                                ║
║  🌐 Server URL: http://localhost:${PORT}                       ║
║  🔧 Environment: ${(process.env.NODE_ENV || 'development').padEnd(20)}║
║  📚 API Docs: http://localhost:${PORT}/api/health              ║
║                                                                ║
║  Ready to accept requests!                                    ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
  `);
  console.log('💡 [TIP] Test with: curl http://localhost:' + PORT + '/api/health\n');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('📞 [SHUTDOWN] SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ [SHUTDOWN] Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📞 [SHUTDOWN] SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ [SHUTDOWN] Server closed');
    process.exit(0);
  });
});

module.exports = app;
