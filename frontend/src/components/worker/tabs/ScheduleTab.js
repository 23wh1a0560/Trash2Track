import React from 'react';
import { Truck, Clock, MapPin } from 'lucide-react';

const ScheduleTab = ({ schedules }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">Daily Schedule</h2>
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {schedule.title || schedule.area}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  schedule.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : schedule.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {schedule.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {schedule.bins && (
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-gray-600" />
                  <span>{schedule.bins} bins to collect</span>
                </div>
              )}

              {schedule.time && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span>Scheduled: {schedule.time}</span>
                </div>
              )}

              {schedule.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span>{schedule.location}</span>
                </div>
              )}
            </div>

            <button
              className={`w-full ${
                schedule.status === 'completed'
                  ? 'btn-secondary'
                  : 'btn-primary'
              }`}
              disabled={schedule.status === 'completed'}
            >
              {schedule.status === 'completed'
                ? 'Completed'
                : schedule.status === 'in_progress'
                ? 'In Progress'
                : 'Start Route'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTab;
