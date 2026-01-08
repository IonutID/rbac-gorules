const { LOCATION_TYPES, ROOM_TYPES } = require('./locations');
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    name: String,
    type: {
        type: String,
        enum: Object.values(LOCATION_TYPES)
    },
    roomType: {
        type: String,
        enum: Object.values(ROOM_TYPES),
        required: function() {
            return this.type === LOCATION_TYPES.ROOM;
        }
    }
});

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
module.exports = { Location };