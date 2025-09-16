const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  alertId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['emergency', 'congestion', 'accident', 'pollution', 'pedestrian_safety', 'system'],
    required: true
  },
  severity: {
    type: String,
    enum: ['info', 'warning', 'critical'],
    default: 'info'
  },
  location: {
    intersectionId: String,
    lat: Number,
    lng: Number
  },
  message: String,
  details: mongoose.Schema.Types.Mixed,
  resolved: {
    type: Boolean,
    default: false
  },
  resolvedAt: Date,
  acknowledgedBy: String,
  actions: [{
    action: String,
    timestamp: Date,
    result: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Alert', alertSchema);
