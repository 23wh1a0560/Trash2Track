import React, { useState } from 'react';

const ReportFormModal = ({ reports, setReports, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    waste_type: 'general',
    location: '',
    image_url: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newId =
      reports.length > 0
        ? Math.max(...reports.map((r) => r.id)) + 1
        : 1;

    const report = {
      id: newId,
      ...newReport,
      status: 'reported',
      created_at: new Date().toISOString().split('T')[0],
    };

    setReports([...reports, report]);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Report Waste Issue
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newReport.title}
              onChange={(e) =>
                setNewReport({ ...newReport, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newReport.description}
              onChange={(e) =>
                setNewReport({ ...newReport, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              rows="3"
              required
            />
          </div>

          {/* IMAGE UPLOAD — RESTORED */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewReport({
                      ...newReport,
                      image_url: reader.result,
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />

            {newReport.image_url && (
              <img
                src={newReport.image_url}
                alt="preview"
                className="mt-3 w-full h-40 object-cover rounded-md"
              />
            )}
          </div>

          {/* WASTE TYPE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Waste Type
            </label>
            <select
              value={newReport.waste_type}
              onChange={(e) =>
                setNewReport({ ...newReport, waste_type: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="general">General Waste</option>
              <option value="recyclable">Recyclable</option>
              <option value="organic">Organic Waste</option>
              <option value="hazardous">Hazardous Waste</option>
              <option value="construction">Construction Waste</option>
            </select>
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={newReport.location}
              onChange={(e) =>
                setNewReport({ ...newReport, location: e.target.value })
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
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportFormModal;