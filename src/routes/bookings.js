const express = require('express');
const router = express.Router();
const { Booking } = require('../models/bookingSchema');

/**
 * GET /api/bookings
 */
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({}, { __v: 0 })
      .populate('userId', 'name email role')
      .populate('roomId', 'code name roomType');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch bookings',
      message: err.message
    });
  }
});

module.exports = router;
