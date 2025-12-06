const express = require('express');
const accessControlService = require('./services/accessControl');

// Import routes
const usersRouter = require('./routes/users');
const locationsRouter = require('./routes/locations');
const bookingsRouter = require('./routes/bookings');
const accessRouter = require('./routes/access');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hotel RBAC Smart Lock System API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      locations: '/api/locations',
      bookings: '/api/bookings',
      access: '/api/access'
    }
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/access', accessRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path
  });
});

// Initialize the access control service and start server
async function startServer() {
  try {
    console.log('Initializing Access Control Service...');
    await accessControlService.initialize();
    
    app.listen(PORT, () => {
      console.log(`\n🚀 Hotel RBAC Smart Lock System is running!`);
      console.log(`📍 Server: http://localhost:${PORT}`);
      console.log(`\n📚 Available endpoints:`);
      console.log(`   GET  /                        - API info`);
      console.log(`   GET  /api/users               - List all users`);
      console.log(`   GET  /api/locations           - List all locations`);
      console.log(`   GET  /api/bookings            - List all bookings`);
      console.log(`   POST /api/access/check        - Check access (body: {userId, locationId})`);
      console.log(`   GET  /api/access/test/:userId/:locationId - Test access`);
      console.log(`\n🔐 RBAC System ready with GoRules decision engine!\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
