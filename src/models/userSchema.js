const mongoose = require('mongoose');
const {ROLES} = require('./roles');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.GUEST
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = { User };
