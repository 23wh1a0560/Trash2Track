import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const wasteTypeData = [
  { name: "Organic", value: 45, color: "#2a9d8f" },
  { name: "Plastic", value: 30, color: "#f4a261" },
  { name: "Metal", value: 25, color: "#e76f51" },
]

export function AnalyticsTab() {
  return (
    <div className="space-y-6">

      {/* Waste Type Distribution */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-lg font-bold mb-4">Waste Type Distribution</h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={wasteTypeData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {wasteTypeData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-4 shadow rounded text-center">
          <div className="text-xs text-gray-500 mb-2">Collection Efficiency</div>
          <div className="text-4xl font-bold text-green-600">32%</div>
          <div className="text-xs text-gray-500 mt-2">Last 30 days</div>
        </div>

        <div className="bg-white p-4 shadow rounded text-center">
          <div className="text-xs text-gray-500 mb-2">Avg Response Time</div>
          <div className="text-4xl font-bold text-blue-600">2.4h</div>
          <div className="text-xs text-gray-500 mt-2">From alert to collection</div>
        </div>

        <div className="bg-white p-4 shadow rounded text-center">
          <div className="text-xs text-gray-500 mb-2">Collection Satisfaction</div>
          <div className="text-4xl font-bold text-purple-600">4.8 / 5</div>
          <div className="text-xs text-gray-500 mt-2">Based on citizen feedback</div>
        </div>

      </div>

    </div>
  )
}