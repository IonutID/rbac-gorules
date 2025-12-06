const express = require('express');
const router = express.Router();
const { getAllBookings } = require('../models/mockData');

/**
 * GET /api/bookings
 * Get all bookings
 */
router.get('/', (req, res) => {
  const bookings = getAllBookings();
  res.json(bookings);
});

module.exports = router;
