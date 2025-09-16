const mongoose = require('mongoose');

const trafficDataSchema = new mongoose.Schema({
  intersectionId: {
    type: String,
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  vehicleCount: {
    cars: Number,
    buses: Number,
    trucks: Number,
    motorcycles: Number,
    bicycles: Number,
    rickshaws: Number
  },
  pedestrianCount: Number,
  avgSpeed: Number,
  congestionLevel: {
    type: Number,
    min: 0,
    max: 100
  },
  pollutionIndex: Number,
  weatherConditions: {
    visibility: String,
    precipitation: Boolean,
    temperature: Number
  },
  detectedObjects: [{
    type: String,
    confidence: Number,
    bbox: {
      x: Number,
      y: Number,
      width: Number,
      height: Number
    }
  }]
}, {
  timestamps: true,
  timeseries: {
    timeField: 'timestamp',
    metaField: 'intersectionId',
    granularity: 'seconds'
  }
});

module.exports = mongoose.model('TrafficData', trafficDataSchema);
