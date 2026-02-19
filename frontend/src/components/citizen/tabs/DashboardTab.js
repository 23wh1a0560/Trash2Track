import React from "react";
import {
  Trash2,
  Award,
  CheckCircle,
  Plus,
  Calendar
} from "lucide-react";

const DashboardTab = ({
  reports,
  user,
  setShowReportForm,
  getStatusIcon,
  getStatusBadge
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Quick Stats */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card card-eco">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">
                  Total Reports
                </p>
                <p className="text-2xl font-bold text-emerald-900">
                  {reports.length}
                </p>
              </div>
              <Trash2 className="h-8 w-8 text-emerald-600" />
            </div>
          </div>

          <div className="card card-eco">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">
                  Eco Points
                </p>
                <p className="text-2xl font-bold text-emerald-900">
                  {user?.eco_points || 0}
                </p>
              </div>
              <Award className="h-8 w-8 text-emerald-600" />
            </div>
          </div>

          <div className="card card-eco">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">
                  Resolved
                </p>
                <p className="text-2xl font-bold text-emerald-900">
                  {reports.filter(r => r.status === "resolved").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-emerald-900">
              Recent Reports
            </h2>
            <button
              onClick={() => setShowReportForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Report</span>
            </button>
          </div>

          <div className="space-y-4">
            {reports.slice(0, 3).map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(report.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {report.location}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    report.status
                  )}`}
                >
                  {report.status.replace("_", " ")}
                </span>
              </div>
            ))}

            {reports.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No reports yet. Create your first report!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions & Info */}
      <div className="space-y-6">
        <div className="card card-eco">
          <h3 className="text-lg font-bold text-emerald-900 mb-4">
            Achievement
          </h3>
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-full">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-900">
                Eco Warrior
              </h4>
              <p className="text-sm text-emerald-600">
                Reported 5+ waste issues
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-emerald-900 mb-4">
            Next Collection
          </h3>
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="font-medium text-gray-900">
                Monday, 7:00 AM
              </p>
              <p className="text-sm text-gray-600">
                General Waste Collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;