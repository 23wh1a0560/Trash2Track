import { AlertTriangle } from "lucide-react"
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts"

const efficiencyData = [
  { day: "Sep 22", efficiency: 75 },
  { day: "Sep 23", efficiency: 90 },
  { day: "Sep 24", efficiency: 86 },
  { day: "Sep 25", efficiency: 80 },
  { day: "Sep 26", efficiency: 89 },
  { day: "Sep 27", efficiency: 81 },
  { day: "Sep 28", efficiency: 88 }
]

const reportsData = [
  { day: "Sep 22", reports: 14, collections: 8 },
  { day: "Sep 23", reports: 13, collections: 12 },
  { day: "Sep 24", reports: 10, collections: 10 },
  { day: "Sep 25", reports: 8, collections: 18 },
  { day: "Sep 26", reports: 23, collections: 17 },
  { day: "Sep 27", reports: 10, collections: 22 },
  { day: "Sep 28", reports: 5, collections: 18 }
]

const recentReports = [
  { id: 1, title: "Waste Issue #1", location: "Location 1", status: "in-progress" },
  { id: 2, title: "Waste Issue #2", location: "Location 2", status: "in-progress" },
  { id: 3, title: "Waste Issue #3", location: "Location 3", status: "in-progress" },
  { id: 4, title: "Waste Issue #4", location: "Location 4", status: "in-progress" },
  { id: 5, title: "Waste Issue #5", location: "Location 5", status: "pending" }
]

export function DashboardTab() {
  return (
    <div className="space-y-6">

      {/* Urgent Alert
      <div className="flex items-center space-x-3 bg-red-50 border border-red-200 p-4 rounded-lg">
        <AlertTriangle className="text-red-600" />
        <span className="text-red-700 font-medium">
          5 urgent alerts require immediate attention.
        </span>
        <span className="ml-auto text-red-600 underline cursor-pointer">
          View Details
        </span>
      </div>*/}

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Efficiency */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-1">System Efficiency Trends</h3>
          <p className="text-sm text-gray-500 mb-4">
            Performance over the last 7 days
          </p>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData}>
                <XAxis dataKey="day" />
                <YAxis domain={[70, 95]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#4CAF50"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reports vs Collections */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-1">Reports vs Collections</h3>
          <p className="text-sm text-gray-500 mb-4">
            Daily comparison of activities
          </p>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportsData}>
                <XAxis dataKey="day" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="reports" fill="#4CAF50" />
                <Bar dataKey="collections" fill="#d4b896" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Reports */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-bold text-lg mb-1">Recent Citizen Reports</h3>
        <p className="text-sm text-gray-500 mb-4">
          Latest submissions from citizens
        </p>

        <div className="space-y-3">
          {recentReports.map(r => (
            <div
              key={r.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-semibold">{r.title}</h4>
                <p className="text-sm text-gray-500">{r.location}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 text-sm rounded-full ${
                  r.status === "pending"
                    ? "bg-red-500 text-white"
                    : "bg-yellow-400 text-white"
                }`}>
                  {r.status}
                </span>
                <span className="text-blue-600 cursor-pointer">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}