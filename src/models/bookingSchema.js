const mongoose = require('mongoose');
const {User} = require('./userSchema');
const {Location} = require('./locationSchema');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    roomType: String,
    checkIn: Date,
    checkOut: Date
}); 

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
module.exports = { Booking };
