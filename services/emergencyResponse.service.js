const EmergencyVehicle = require('../models/EmergencyVehicle.model');
const Intersection = require('../models/Intersection.model');
const Alert = require('../models/Alert.model');

class EmergencyResponseService {
  async activateGreenWave(data) {
    const { vehicleId, route } = data;
    try {
      const vehicle = await EmergencyVehicle.findOneAndUpdate(
        { vehicleId },
        { greenWaveActive: true, status: 'responding' },
        { new: true }
      );

      if (!vehicle) {
        throw new Error('Emergency vehicle not found');
      }

      // Logic to send commands to each intersection controller on the route
      for (const intersection of route) {
        // Find and update intersection's signal to green for the emergency vehicle's direction
        await Intersection.findOneAndUpdate(
          { intersectionId: intersection.intersectionId },
          { 
            'currentSignalState.activePhase': 'emergency_clearance',
            'currentSignalState.timeRemaining': 60, // e.g., clear for 60 seconds
            adaptiveControlEnabled: false
          }
        );
      }

      const newAlert = new Alert({
        alertId: `EMG-${Date.now()}`,
        type: 'emergency',
        severity: 'critical',
        location: { intersectionId: vehicle.currentLocation.intersectionId },
        message: `Green wave activated for ${vehicle.type} ${vehicle.vehicleId}`
      });
      await newAlert.save();

      return { success: true, message: `Green wave activated for ${vehicleId}` };
    } catch (error) {
      console.error('Green wave activation failed:', error);
      return { success: false, message: error.message };
    }
  }

  async optimizeRoute(data) {
    // Placeholder for a pathfinding algorithm that considers real-time traffic
    // e.g., A* or Dijkstra's with traffic data as edge weights
    const { startLocation, endLocation } = data;
    // ... complex route calculation logic ...
    const optimizedRoute = [
      { intersectionId: 'INT001', estimatedArrival: new Date() },
      { intersectionId: 'INT003', estimatedArrival: new Date() }
    ];
    return { route: optimizedRoute, estimatedTime: '5 min' };
  }
}

module.exports = new EmergencyResponseService();
