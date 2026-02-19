import React from 'react';
import { MapPin } from 'lucide-react';
import { BinMapView } from '@/components/map/BinMapView';

const RoutesTab = ({ mockRouteOptimization }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">Optimized Routes</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Route Details */}
        <div className="card">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Today's Route - Downtown District
          </h3>
          <p className="text-gray-600 mb-6">
            Optimized route for maximum efficiency and minimal travel time
          </p>

          <div className="space-y-4">
            {mockRouteOptimization.map((stop) => (
              <div
                key={stop.stop}
                className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg"
              >
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {stop.stop}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      {stop.location}
                    </h4>
                    <span className="text-sm text-gray-600">
                      {stop.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Estimated duration: {stop.duration}
                  </p>
                </div>

                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Total estimated time:
              </span>
              <span className="font-medium text-blue-900">
                1 hour 30 minutes
              </span>
            </div>
          </div>
        </div>

        {/* Route Map */}
        <div className="card">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Route Map
          </h3>

          <div className="aspect-square rounded-lg overflow-hidden">
            <BinMapView selectedStatus="all" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <span>Starting Point</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span>Collection Points</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-4 h-1 bg-purple-600"></div>
              <span>Optimized Route</span>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>GPS Waypoints</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoutesTab;
