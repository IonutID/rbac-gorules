const { ZenEngine } = require('@gorules/zen-engine');
const fs = require('fs');
const path = require('path');
const { User } = require('../models/userSchema');
const { Location } = require('../models/locationSchema');
const { Booking } = require('../models/bookingSchema');

class AccessControlService {
  async initialize() {
    if (this.engine) return;

    const decision = fs.readFileSync(
      path.join(__dirname, '../rules/access-control.json')
    );

    this.engine = new ZenEngine();
    this.decision = this.engine.createDecision(decision);

    console.log('Access Control Service initialized');
  }

  async checkAccess(userId, locationId) {
    await this.initialize();

    const user = await User.findById(userId);
    const location = await Location.findById(locationId);
    const booking = await Booking.findOne({ userId });

    if (!user) {
      return { accessGranted: false, reason: 'User not found' };
    }

    if (!location) {
      return { accessGranted: false, reason: 'Location not found' };
    }

    const isBookedRoom =
      booking && booking.roomId.toString() === location._id.toString();

    const context = {
      role: user.role,
      locationType: location.type,
      isBookedRoom,
      roomType: booking?.roomType || null
    };

    const result = await this.decision.evaluate(context);

    return { ...result.result, context, location };
  }
}

module.exports = new AccessControlService();
