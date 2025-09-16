const mongoose = require('mongoose');

const intersectionSchema = new mongoose.Schema({
  intersectionId: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  signalConfiguration: {
    phases: [{
      direction: String,
      greenTime: Number,
      yellowTime: Number,
      redTime: Number
    }],
    cycleLength: Number,
    offsetTime: Number
  },
  currentSignalState: {
    activePhase: String,
    timeRemaining: Number,
    nextPhase: String
  },
  connectedIntersections: [{
    intersectionId: String,
    distance: Number,
    travelTime: Number
  }],
  specialZones: [{
    type: {
      type: String,
      enum: ['school', 'hospital', 'market', 'residential']
    },
    radius: Number,
    restrictions: [String]
  }],
  adaptiveControlEnabled: {
    type: Boolean,
    default: true
  },
  historicalData: {
    avgWaitTime: Number,
    peakHours: [String],
    accidentRate: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Intersection', intersectionSchema);
