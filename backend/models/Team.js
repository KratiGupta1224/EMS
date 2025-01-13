const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  image: {
    type: String, 
    required: false,
  },
});

module.exports = mongoose.model('Team', teamSchema);
