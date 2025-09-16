const TrafficData = require('../models/TrafficData.model');
const Intersection = require('../models/Intersection.model');

class TrafficAnalysisService {
  // Analyze real-time traffic using YOLO detections
  async analyzeTrafficFlow(detectionData) {
    const { intersectionId, detections, timestamp } = detectionData;
    
    // Process YOLO detections
    const vehicleCounts = this.categorizeVehicles(detections);
    const pedestrianCount = this.countPedestrians(detections);
    const avgSpeed = this.calculateAvgSpeed(detections);
    const congestionLevel = this.calculateCongestion(vehicleCounts, avgSpeed);

    // Get pollution data (placeholder)
    const pollutionIndex = this.getPollutionData(intersectionId);
    
    // Create new TrafficData document
    const newTrafficData = new TrafficData({
      intersectionId,
      timestamp,
      vehicleCount: vehicleCounts,
      pedestrianCount,
      avgSpeed,
      congestionLevel,
      pollutionIndex,
      detectedObjects: detections
    });
    
    await newTrafficData.save();
    return newTrafficData;
  }

  // Calculate overall metrics for all intersections
  async calculateMetrics() {
    const totalCongestion = await TrafficData.aggregate([
      {
        $group: {
          _id: null,
          avgCongestion: { $avg: '$congestionLevel' }
        }
      }
    ]);

    const totalVehicles = await TrafficData.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $add: ['$vehicleCount.cars', '$vehicleCount.buses', '$vehicleCount.trucks', '$vehicleCount.motorcycles'] } }
        }
      }
    ]);

    const avgEmergencyTime = await Analytics.aggregate([
      {
        $group: {
          _id: null,
          avgResponse: { $avg: '$metrics.avgEmergencyResponse' }
        }
      }
    ]);

    return {
      congestionLevel: totalCongestion[0]?.avgCongestion || 0,
      activeVehicles: totalVehicles[0]?.total || 0,
      emergencyResponseTime: avgEmergencyTime[0]?.avgResponse || 0
    };
  }

  // Check for pollution hotspots
  async checkPollutionHotspots() {
    const highPollutionData = await TrafficData.find({ pollutionIndex: { $gt: 100 } });
    const alerts = [];
    for (const data of highPollutionData) {
      alerts.push({
        type: 'pollution',
        severity: 'warning',
        location: { intersectionId: data.intersectionId },
        message: `High pollution detected with AQI of ${data.pollutionIndex}`
      });
    }
    return { alerts };
  }

  // Helper functions for analysis
  categorizeVehicles(detections) {
    const counts = { cars: 0, buses: 0, trucks: 0, motorcycles: 0, bicycles: 0, rickshaws: 0 };
    detections.forEach(det => {
      const type = det.type.toLowerCase();
      if (counts.hasOwnProperty(type)) {
        counts[type]++;
      }
    });
    return counts;
  }

  countPedestrians(detections) {
    return detections.filter(det => det.type.toLowerCase() === 'pedestrian').length;
  }

  calculateAvgSpeed(detections) {
    // Placeholder for a more complex speed calculation logic
    return Math.floor(Math.random() * 40 + 20); 
  }

  calculateCongestion(vehicleCounts, avgSpeed) {
    // A simple congestion formula
    const totalVehicles = Object.values(vehicleCounts).reduce((sum, count) => sum + count, 0);
    const congestion = (totalVehicles * 0.5) + (100 - avgSpeed) * 0.5;
    return Math.min(100, Math.max(0, congestion));
  }

  getPollutionData(intersectionId) {
    // Placeholder for an external API call or sensor data
    return Math.floor(Math.random() * 150);
  }
}

module.exports = new TrafficAnalysisService();
