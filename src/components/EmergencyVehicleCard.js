import React from 'react';
import { Siren } from 'lucide-react';

const EmergencyVehicleCard = ({ vehicle }) => (
  <div className={`border rounded-lg p-4 mb-3 ${vehicle.priority === 'Critical' ? 'border-red-500 bg-red-50' : 'border-orange-500 bg-orange-50'}`}>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Siren className={`w-6 h-6 mr-3 ${vehicle.priority === 'Critical' ? 'text-red-600' : 'text-orange-600'}`} />
        <div>
          <p className="font-semibold text-gray-900">{vehicle.type} - {vehicle.id}</p>
          <p className="text-sm text-gray-600">Route: {vehicle.route}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-700">ETA: {vehicle.eta}</p>
        <span className={`inline-block px-2 py-1 text-xs rounded-full ${vehicle.priority === 'Critical' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'}`}>
          {vehicle.priority}
        </span>
      </div>
    </div>
  </div>
);

export default EmergencyVehicleCard;
