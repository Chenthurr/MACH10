import React from 'react';
import { TrendingUp } from 'lucide-react';

const MetricCard = ({ icon: Icon, label, value, unit, color, trend }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{label}</p>
        <div className="flex items-baseline mt-2">
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <span className="ml-2 text-gray-500">{unit}</span>
        </div>
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500">{trend}% improved</span>
          </div>
        )}
      </div>
      <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-8 h-8" style={{ color }} />
      </div>
    </div>
  </div>
);

export default MetricCard;
