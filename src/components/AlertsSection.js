import React from 'react';
import { AlertCircle } from 'lucide-react';

const AlertsSection = ({ alerts }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
      <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
      Real-Time Alerts
    </h2>
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div key={alert.id} className={`flex items-start p-3 rounded-lg ${
          alert.type === 'emergency' ? 'bg-red-50' :
          alert.type === 'pollution' ? 'bg-yellow-50' : 'bg-blue-50'
        }`}>
          <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
            alert.type === 'emergency' ? 'bg-red-500' :
            alert.type === 'pollution' ? 'bg-yellow-500' : 'bg-blue-500'
          }`}></div>
          <div className="flex-1">
            <p className="text-gray-900">{alert.message}</p>
            <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AlertsSection;
