const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getAllLocations, 
  getAllBookings 
} = require('../models/mockData');

/**
 * GET /api/users
 * Get all users
 */
router.get('/', (req, res) => {
  const users = getAllUsers();
  res.json(users);
});

module.exports = router;
