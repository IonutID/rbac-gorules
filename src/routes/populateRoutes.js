const express = require('express');
const router = express.Router();
const { User } = require('../models/userSchema');
const { Location } = require('../models/locationSchema');
const { Booking } = require('../models/bookingSchema');

/**
 * POST /api/populate/users
 */
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({
      error: 'Failed to create user',
      message: err.message
    });
  }
});

/**
 * POST /api/populate/locations
 */
router.post('/locations', async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({
      error: 'Failed to create location',
      message: err.message
    });
  }
});

/**
 * POST /api/populate/bookings
 */
router.post('/bookings', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({
      error: 'Failed to create booking',
      message: err.message
    });
  }
});

module.exports = router;
