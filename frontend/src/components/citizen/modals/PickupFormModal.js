import React, { useState } from 'react';

const PickupFormModal = ({
  pickupSchedule,
  setPickupSchedule,
  onClose,
}) => {
  const [form, setForm] = useState({
    title: '',
    waste_type: 'bulk',
    location: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const today = new Date();
    const nextDay = daysOfWeek[(today.getDay() + 1) % 7];

    const pickup = {
      id: pickupSchedule.length + 1,
      title: form.title,
      type: form.waste_type,
      location: form.location,
      time: '7:00 AM',
      day: nextDay,
    };

    setPickupSchedule([...pickupSchedule, pickup]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Request Special Pickup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* WASTE TYPE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Waste Type
            </label>
            <select
              value={form.waste_type}
              onChange={(e) =>
                setForm({ ...form, waste_type: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="bulk">Bulk Items</option>
              <option value="hazardous">Hazardous Waste</option>
              <option value="electronic">Electronic Waste</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* ACTIONS */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PickupFormModal;