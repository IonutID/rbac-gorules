const express = require('express');
const router = express.Router();
const accessControlService = require('../services/accessControl');
const { 
  getAllUsers, 
  getAllLocations, 
  getAllBookings,
  getUserById 
} = require('../models/mockData');

/**
 * POST /api/access/check
 * Check if a user has access to a location
 */
router.post('/check', async (req, res) => {
  try {
    const { userId, locationId } = req.body;

    if (!userId || !locationId) {
      return res.status(400).json({
        error: 'Missing required fields: userId and locationId'
      });
    }

    const user = getUserById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const result = await accessControlService.checkAccess(userId, locationId);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      },
      ...result
    });
  } catch (error) {
    console.error('Access check error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/access/test/:userId/:locationId
 * Test access for a user to a location (convenience endpoint)
 */
router.get('/test/:userId/:locationId', async (req, res) => {
  try {
    const { userId, locationId } = req.params;

    const user = getUserById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const result = await accessControlService.checkAccess(userId, locationId);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      },
      ...result
    });
  } catch (error) {
    console.error('Access check error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

module.exports = router;
