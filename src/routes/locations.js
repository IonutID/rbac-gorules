const express = require('express');
const router = express.Router();
const { Location } = require('../models/locationSchema');

/**
 * GET /api/locations
 */
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find({}, { __v: 0 });
    res.json(locations);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch locations',
      message: err.message
    });
  }
});

module.exports = router;
