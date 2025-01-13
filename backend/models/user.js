const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Organizer', 'Attendee'], required: true },
  createdAt: { type: Date}, 
  profilePhoto: {type: String},
  otp: {type: String, default: ""},
  emailVerified: {type: Boolean, default: false}
});

module.exports = mongoose.model('Users', userSchema);