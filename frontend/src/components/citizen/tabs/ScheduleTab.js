import React from 'react';

const mockSchedule = [
  { day: 'Monday', time: '7:00 AM', type: 'General Waste' },
  { day: 'Wednesday', time: '7:00 AM', type: 'Recyclables' },
  { day: 'Friday', time: '7:00 AM', type: 'Organic Waste' },
];

const ScheduleTab = ({ pickupSchedule, setShowPickupForm }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-900">
        Collection Schedule
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockSchedule.map((schedule, index) => (
          <div key={index} className="card">
            <h3 className="font-bold text-gray-900 mb-2">
              {schedule.day}
            </h3>
            <p className="text-gray-600">
              {schedule.time} - {schedule.type}
            </p>
          </div>
        ))}

        {pickupSchedule.map((pickup) => (
          <div
            key={pickup.id}
            className="card border-emerald-500 border-2"
          >
            <h3 className="font-bold text-gray-900 mb-2">
              {pickup.day}
            </h3>
            <p className="text-gray-600">
              {pickup.time} - {pickup.type}
            </p>
            <p className="text-gray-500 text-sm">
              {pickup.location}
            </p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-emerald-900 mb-4">
          Request Special Pickup
        </h3>
        <p className="text-gray-600 mb-4">
          Need to dispose of bulk items or hazardous waste?
          Request a special pickup.
        </p>
        <button
          onClick={() => setShowPickupForm(true)}
          className="btn-primary"
        >
          Request Special Pickup
        </button>
      </div>
    </div>
  );
};

export default ScheduleTab;