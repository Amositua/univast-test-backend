const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  planetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Planet',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  facts: [{
    label: String,
    value: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Location', locationSchema);
