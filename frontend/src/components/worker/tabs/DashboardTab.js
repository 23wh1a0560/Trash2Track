import React from 'react';
import { Route, Truck, AlertTriangle, CheckCircle } from 'lucide-react';

const DashboardTab = ({ reports, schedules }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card card-eco">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Today's Routes</p>
                <p className="text-2xl font-bold text-blue-900">{schedules.length}</p>
              </div>
              <Route className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="card card-eco">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Bins Collected</p>
                <p className="text-2xl font-bold text-blue-900">28</p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="card card-eco">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Complaints</p>
                <p className="text-2xl font-bold text-blue-900">{reports.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Today's Progress</h2>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    schedule.status === 'completed'
                      ? 'bg-green-500'
                      : schedule.status === 'in_progress'
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{schedule.area}</h3>
                    <p className="text-sm text-gray-600">
                      {schedule.bins} bins • {schedule.time}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  schedule.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : schedule.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {schedule.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right side unchanged */}
      <div className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Recent Alert</h3>
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">High Priority</p>
              <p className="text-sm text-red-700">Bin overflow at Central Plaza</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Performance</h3>
          <div className="text-center">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-bold text-gray-900">Excellent</h4>
            <p className="text-sm text-gray-600">95% completion rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
