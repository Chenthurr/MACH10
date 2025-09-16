import React, { useState, useEffect } from 'react';
import { AlertCircle, Activity, Users, Navigation, Zap, TrendingUp, MapPin, Shield, Siren, Car } from 'lucide-react';
import MetricCard from './components/MetricCard';
import EmergencyVehicleCard from './components/EmergencyVehicleCard';
import IntersectionStatus from './components/IntersectionStatus';
import AlertsSection from './components/AlertsSection';

const TrafficOpsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [emergencyVehicles, setEmergencyVehicles] = useState([]);
  const [trafficMetrics, setTrafficMetrics] = useState({
    congestionLevel: 0,
    avgSpeed: 0,
    activeVehicles: 0,
    pedestrianCount: 0,
    pollutionIndex: 0,
    emergencyResponseTime: 0
  });
  const [intersections, setIntersections] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Simulated real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate traffic metrics updates
      setTrafficMetrics({
        congestionLevel: Math.floor(Math.random() * 100),
        avgSpeed: Math.floor(Math.random() * 40 + 20),
        activeVehicles: Math.floor(Math.random() * 500 + 100),
        pedestrianCount: Math.floor(Math.random() * 200 + 50),
        pollutionIndex: Math.floor(Math.random() * 150),
        emergencyResponseTime: Math.floor(Math.random() * 10 + 2)
      });

      // Simulate emergency vehicles
      const vehicles = [
        { id: 'EMV001', type: 'Ambulance', status: 'Active', eta: '3 min', priority: 'High', route: 'Hospital Route A' },
        { id: 'EMV002', type: 'Fire Truck', status: 'Responding', eta: '5 min', priority: 'Critical', route: 'Industrial Zone B' }
      ];
      setEmergencyVehicles(vehicles);

      // Simulate intersection data
      const intersectionData = [
        { id: 'INT001', name: 'Main St & 1st Ave', signalStatus: 'Green', waitTime: 45, pedestrians: 12, vehicles: 34 },
        { id: 'INT002', name: '2nd St & Park Ave', signalStatus: 'Red', waitTime: 30, pedestrians: 8, vehicles: 28 },
        { id: 'INT003', name: 'Hospital Junction', signalStatus: 'Yellow', waitTime: 15, pedestrians: 25, vehicles: 42 }
      ];
      setIntersections(intersectionData);

      // Simulate alerts
      const newAlerts = [
        { id: 1, type: 'emergency', message: 'Ambulance approaching Main St - Green wave activated', time: 'Just now' },
        { id: 2, type: 'pollution', message: 'High pollution detected near School Zone A', time: '2 min ago' },
        { id: 3, type: 'pedestrian', message: 'Heavy pedestrian traffic at Park Ave crossing', time: '5 min ago' }
      ];
      setAlerts(newAlerts);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Zap className="w-10 h-10 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">MACH-10: TrafficOps+</h1>
                <p className="text-gray-600">Intelligent Traffic Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-green-100 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-green-800 font-medium">System Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {['overview', 'emergency', 'intersections', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-3 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <MetricCard
                icon={Activity}
                label="Congestion Level"
                value={trafficMetrics.congestionLevel}
                unit="%"
                color="#3B82F6"
                trend={12}
              />
              <MetricCard
                icon={Navigation}
                label="Avg Speed"
                value={trafficMetrics.avgSpeed}
                unit="km/h"
                color="#10B981"
              />
              <MetricCard
                icon={Users}
                label="Pedestrians"
                value={trafficMetrics.pedestrianCount}
                unit="active"
                color="#8B5CF6"
              />
              <MetricCard
                icon={Shield}
                label="Pollution Index"
                value={trafficMetrics.pollutionIndex}
                unit="AQI"
                color="#F59E0B"
              />
              <MetricCard
                icon={Siren}
                label="Emergency Response"
                value={trafficMetrics.emergencyResponseTime}
                unit="min"
                color="#EF4444"
                trend={25}
              />
              <MetricCard
                icon={Car}
                label="Active Vehicles"
                value={trafficMetrics.activeVehicles}
                unit="total"
                color="#06B6D4"
              />
            </div>
            {/* Alerts Section */}
            <AlertsSection alerts={alerts} />
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Active Emergency Vehicles</h2>
              {emergencyVehicles.map((vehicle) => (
                <EmergencyVehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Green Wave Status</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                  <p className="font-semibold text-green-900">Route Optimization Active</p>
                  <p className="text-sm text-green-700 mt-1">2 emergency corridors cleared</p>
                  <div className="mt-3 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'intersections' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Intersection Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {intersections.map((intersection) => (
                <IntersectionStatus key={intersection.id} intersection={intersection} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <p className="text-4xl font-bold text-blue-600">32%</p>
                <p className="text-gray-700 mt-2">Congestion Reduction</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <p className="text-4xl font-bold text-green-600">45%</p>
                <p className="text-gray-700 mt-2">Faster Emergency Response</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <p className="text-4xl font-bold text-purple-600">28%</p>
                <p className="text-gray-700 mt-2">Emission Reduction</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TrafficOpsDashboard;
