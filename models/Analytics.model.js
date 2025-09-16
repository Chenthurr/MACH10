const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },
  intersectionId: String,
  metrics: {
    totalVehicles: Number,
    totalPedestrians: Number,
    avgCongestion: Number,
    avgSpeed: Number,
    emergencyResponseTimes: [Number],
    avgEmergencyResponse: Number,
    pollutionLevels: {
      avg: Number,
      peak: Number,
      low: Number
    },
    safetyIncidents: Number,
    greenWaveActivations: Number,
    adaptiveSignalAdjustments: Number
  },
  peakPeriods: [{
    startTime: String,
    endTime: String,
    congestionLevel: Number,
    vehicleCount: Number
  }],
  improvements: {
    congestionReduction: Number,
    emissionReduction: Number,
    responseTimeImprovement: Number,
    pedestrianSafetyScore: Number
  },
  anomalies: [{
    type: String,
    description: String,
    timestamp: Date,
    impact: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Analytics', analyticsSchema);
