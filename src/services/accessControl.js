const { ZenEngine } = require('@gorules/zen-engine');
const fs = require('fs');
const path = require('path');
const { getBookingByUserId, getLocationById } = require('../models/mockData');
const { LOCATION_TYPES, ROOM_TYPES } = require('../models/locations');

class AccessControlService {
  constructor() {
    this.engine = null;
    this.decision = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Load the decision table
      const decisionPath = path.join(__dirname, '../rules/access-control.json');
      const decisionContent = fs.readFileSync(decisionPath);

      // Create ZenEngine instance
      this.engine = new ZenEngine();
      this.decision = this.engine.createDecision(decisionContent);
      
      this.initialized = true;
      console.log('Access Control Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Access Control Service:', error);
      throw error;
    }
  }

  async checkAccess(userId, locationId) {
    if (!this.initialized) {
      await this.initialize();
    }

    // Get user's booking info
    const booking = getBookingByUserId(userId);
    const location = getLocationById(locationId);

    if (!location) {
      return {
        accessGranted: false,
        reason: 'Location not found'
      };
    }

    // Determine if the location is the user's booked room
    const isBookedRoom = booking && booking.roomId === locationId;
    
    // Get the user's room type from booking
    const roomType = booking ? booking.roomType : null;

    // Prepare context for decision engine
    const context = {
      role: this.getUserRole(userId),
      locationType: location.type,
      isBookedRoom: isBookedRoom,
      roomType: roomType
    };

    try {
      // Evaluate the decision
      const evalResult = await this.decision.evaluate(context);
      
      // Extract the actual result from the nested structure
      const decisionResult = evalResult.result || evalResult;
      
      return {
        accessGranted: decisionResult.accessGranted || false,
        reason: decisionResult.reason || 'Unknown',
        context: context,
        location: location
      };
    } catch (error) {
      console.error('Error evaluating decision:', error);
      return {
        accessGranted: false,
        reason: 'Error: ' + error.message,
        context: context,
        location: location
      };
    }
  }

  getUserRole(userId) {
    const { getUserById } = require('../models/mockData');
    const user = getUserById(userId);
    return user ? user.role : null;
  }
}

// Singleton instance
const accessControlService = new AccessControlService();

module.exports = accessControlService;
