const express = require('express');
const router = express.Router();
const accessControlService = require('../services/accessControl');
const { User } = require('../models/userSchema');

/**
 * POST /api/access/check
 * Body: { userId, locationId }
 */
router.post('/check', async (req, res) => {
  try {
    const { userId, locationId } = req.body;

    if (!userId || !locationId) {
      return res.status(400).json({
        error: 'userId and locationId are required'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await accessControlService.checkAccess(
      userId,
      locationId
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      },
      ...result
    });
  } catch (err) {
    console.error('Access check error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }
});

module.exports = router;
