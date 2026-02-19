import React from 'react';
import { MapPin } from 'lucide-react';

const ComplaintsTab = ({ reports, handleUpdateReportStatus }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">
        Citizen Complaints
      </h2>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="card">
            
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-gray-900">
                {report.title}
              </h3>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                New
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-3">
              {report.description}
            </p>

            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <MapPin className="h-4 w-4" />
              <span>{report.location}</span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() =>
                  handleUpdateReportStatus(report.id, 'in_progress')
                }
                className="flex-1 btn-primary text-sm"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  handleUpdateReportStatus(report.id, 'resolved')
                }
                className="flex-1 btn-secondary text-sm"
              >
                Resolve
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsTab;
