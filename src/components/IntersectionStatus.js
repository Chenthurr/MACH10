import React from 'react';
import { Users, Car } from 'lucide-react';

const IntersectionStatus = ({ intersection }) => (
  <div className="bg-gray-50 rounded-lg p-4 mb-3">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-semibold text-gray-900 mb-2">{intersection.name}</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-blue-600" />
            <span>{intersection.pedestrians} pedestrians</span>
          </div>
          <div className="flex items-center">
            <Car className="w-4 h-4 mr-2 text-purple-600" />
            <span>{intersection.vehicles} vehicles</span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          intersection.signalStatus === 'Green' ? 'bg-green-500' :
          intersection.signalStatus === 'Yellow' ? 'bg-yellow-500' : 'bg-red-500'
        }`}>
          <span className="text-white font-bold text-xs">{intersection.waitTime}s</span>
        </div>
        <p className="text-xs mt-1 text-gray-600">Wait Time</p>
      </div>
    </div>
  </div>
);

export default IntersectionStatus;
