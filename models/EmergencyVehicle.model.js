const mongoose = require('mongoose');

const emergencyVehicleSchema = new mongoose.Schema({
  vehicleId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['ambulance', 'fire_truck', 'police', 'emergency_medical'],
    required: true
  },
  status: {
    type: String,
    enum: ['idle', 'responding', 'active', 'returning'],
    default: 'idle'
  },
  currentLocation: {
    lat: Number,
    lng: Number,
    intersectionId: String
  },
  destination: {
    lat: Number,
    lng: Number,
    address: String
  },
  route: [{
    intersectionId: String,
    estimatedArrival: Date,
    cleared: Boolean
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  greenWaveActive: {
    type: Boolean,
    default: false
  },
  estimatedTimeOfArrival: Date,
  responseTime: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('EmergencyVehicle', emergencyVehicleSchema);
