import React, { useEffect, useState } from "react"
import { Search, Map, List, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { BinMapView } from "../../map/BinMapView"

const initialBins = [
  { id: "BIN-001", zone: "Downtown North", type: "Organic", fill: 92, status: "critical" },
  { id: "BIN-002", zone: "Downtown South", type: "Plastic", fill: 74, status: "warning" },
  { id: "BIN-003", zone: "Eastside", type: "Metal", fill: 46, status: "normal" },
  { id: "BIN-004", zone: "Westside", type: "Organic", fill: 88, status: "critical" },
  { id: "BIN-005", zone: "Central Park", type: "Plastic", fill: 61, status: "warning" },
]

const trendData = [
  { time: "8AM", level: 40 },
  { time: "10AM", level: 48 },
  { time: "12PM", level: 55 },
  { time: "2PM", level: 60 },
  { time: "4PM", level: 58 },
  { time: "6PM", level: 65 },
]

export default function BinMonitoringTab() {
  const [bins, setBins] = useState(initialBins)
  const [view, setView] = useState("table")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setBins(prev =>
        prev.map(b => {
          const inc = Math.random() * 5
          const fill = Math.min(100, b.fill + inc)
          let status = "normal"
          if (fill >= 80) status = "critical"
          else if (fill >= 60) status = "warning"
          return { ...b, fill, status }
        })
      )
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const filtered = bins.filter(
    b =>
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.zone.toLowerCase().includes(search.toLowerCase())
  )

  const pill = s =>
    s === "critical"
      ? "bg-red-100 text-red-600"
      : s === "warning"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-green-100 text-green-600"

  const bar = s =>
    s === "critical"
      ? "bg-red-500"
      : s === "warning"
      ? "bg-yellow-400"
      : "bg-green-500"

  return (
    <div className="p-6 space-y-6">

      {/* KPI */}
      <div className="grid grid-cols-3 gap-4">
        <Kpi title="Total Bins" value={bins.length} />
        <Kpi title="Critical" value={bins.filter(b => b.status==="critical").length} red />
        <Kpi title="Warnings" value={bins.filter(b => b.status==="warning").length} yellow />
      </div>

      {/* CHART */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Average Fill Level Trend</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="time"/>
            <YAxis/>
            <Line dataKey="level" stroke="#10b981" strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"/>
          <input
            placeholder="Search bins..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
            className="pl-8 border rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setView("table")} className={`tab-btn ${view==="table"&&"active"}`}><List/></button>
          <button onClick={()=>setView("map")} className={`tab-btn ${view==="map"&&"active"}`}><Map/></button>
        </div>
      </div>

      {/* TABLE */}
      {view==="table" ? (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-500">
  <tr>
    <th className="px-4 py-3">Bin ID</th>
    <th className="px-4 py-3">Zone</th>
    <th className="px-4 py-3">Type</th>
    <th className="px-4 py-3">Fill Level</th>
    <th className="px-4 py-3">Status</th>
    <th className="px-4 py-3 text-right">Actions</th>
  </tr>
</thead>
            <tbody>
              {filtered.map(b=>(
                <tr key={b.id} className="border-b hover:bg-gray-50 text-sm">
  <td className="px-4 py-3 font-mono font-medium">{b.id}</td>

  <td className="px-4 py-3 flex items-center gap-2">
    <span className="text-gray-400">📍</span> {b.zone}
  </td>

  <td className="px-4 py-3">
    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
      {b.type}
    </span>
  </td>

  <td className="px-4 py-3">
    <div className="flex items-center gap-2">
      <div className="w-28 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          style={{ width: `${b.fill}%` }}
          className={`h-2 ${bar(b.status)}`}
        />
      </div>
      <span className="text-gray-700 font-medium">
        {Math.round(b.fill)}%
      </span>
    </div>
  </td>

  <td className="px-4 py-3">
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${pill(b.status)}`}>
      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
    </span>
  </td>

  <td className="px-4 py-3 text-right space-x-3">
    <button className="text-blue-600 hover:underline">View</button>
    {b.status === "critical" ? (
      <button className="text-red-600 hover:underline">Dispatch</button>
    ) : (
      <button className="text-gray-600 hover:underline">Manage</button>
    )}
  </td>
</tr>
              ))}
            </tbody>
          </table>
        </div>
      ):(
        <div className="h-[500px] bg-white rounded-xl shadow">
          <BinMapView/>
        </div>
      )}
    </div>
  )
}

const Kpi = ({title,value,red,yellow})=>(
  <div className={`bg-white p-4 rounded-xl shadow ${red?"border-l-4 border-red-400":yellow?"border-l-4 border-yellow-400":""}`}>
    <p className="text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
)