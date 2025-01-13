const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  price: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Completed'], default: 'Active' },
});

module.exports = mongoose.model('Events', eventSchema);