import React from 'react';
import { MapPin, Clock, Plus } from 'lucide-react';

const ReportsTab = ({ reports, setShowReportForm }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-emerald-900">
          My Reports
        </h2>
        <button
          onClick={() => setShowReportForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="card">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-gray-900">
                {report.title}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  report.status === 'reported'
                    ? 'bg-yellow-100 text-yellow-800'
                    : report.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {report.status.replace('_', ' ')}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-3">
              {report.description}
            </p>

            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{report.location}</span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>
                {new Date(report.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsTab;