const express = require('express');
const router = express.Router();
const { getAllLocations } = require('../models/mockData');

/**
 * GET /api/locations
 * Get all locations
 */
router.get('/', (req, res) => {
  const locations = getAllLocations();
  res.json(locations);
});

module.exports = router;
