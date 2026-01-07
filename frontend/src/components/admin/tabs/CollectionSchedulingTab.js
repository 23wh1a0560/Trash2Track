import React, { useState } from "react"
import {
  Calendar, Navigation, TrendingUp, Route as RouteIcon, Map, List
} from "lucide-react"
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts"
import RouteMapView from "../maps/RouteMapView"

const scheduleData = [
  { routeId:"RT-001", zone:"Downtown North", time:"08:00 AM", bins:12, priority:"high", status:"scheduled", efficiency:92 },
  { routeId:"RT-002", zone:"Downtown South", time:"09:30 AM", bins:15, priority:"high", status:"in-progress", efficiency:88 },
  { routeId:"RT-003", zone:"Eastside", time:"11:00 AM", bins:8, priority:"medium", status:"scheduled", efficiency:95 },
  { routeId:"RT-004", zone:"Westside", time:"01:00 PM", bins:14, priority:"high", status:"completed", efficiency:90 }
]

const routeOptimizationData = [
  { week:"Week 1", distance:145, time:28 },
  { week:"Week 2", distance:138, time:26 },
  { week:"Week 3", distance:132, time:25 },
  { week:"Week 4", distance:128, time:24 }
]

const efficiencyTrendData = [
  { day:"Mon", efficiency:85, collections:42 },
  { day:"Tue", efficiency:88, collections:45 },
  { day:"Wed", efficiency:90, collections:48 },
  { day:"Thu", efficiency:92, collections:50 },
  { day:"Fri", efficiency:89, collections:46 },
  { day:"Sat", efficiency:87, collections:44 },
  { day:"Sun", efficiency:91, collections:47 }
]
const th = {
  padding: "14px",
  fontSize: "13px",
  color: "#555",
  fontWeight: "600"
}

const td = {
  padding: "14px",
  fontSize: "14px"
}

const binPill = {
  padding: "6px 12px",
  background: "#f3f4f6",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600"
}

const barBg = {
  width: "80px",
  height: "8px",
  background: "#e5e7eb",
  borderRadius: "6px",
  overflow: "hidden"
}

const barFill = {
  height: "100%",
  background: "#2a9d8f"
}

const statusBlue = {
  padding: "6px 12px",
  background: "#e0ecff",
  color: "#2563eb",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600"
}

const statusOrange = {
  padding: "6px 12px",
  background: "#fff7e6",
  color: "#f59e0b",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600"
}

const statusGreen = {
  padding: "6px 12px",
  background: "#e6f8f0",
  color: "#16a34a",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600"
}
export default function CollectionSchedulingTab() {
  const [view, setView] = useState("table")

  const scheduled = scheduleData.filter(r => r.status==="scheduled").length
  const inProgress = scheduleData.filter(r => r.status==="in-progress").length
  const completed = scheduleData.filter(r => r.status==="completed").length
  const avgEfficiency = Math.round(scheduleData.reduce((a,b)=>a+b.efficiency,0)/scheduleData.length)

  return (
    <div style={{ padding: "24px", background:"#f4f9f7" }}>

      {/* KPI */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(4,1fr)",
        gap:"16px",
        marginBottom:"24px"
      }}>
        {[
          ["Scheduled Routes", scheduled, <Calendar/>],
          ["In Progress", inProgress, <Navigation/>],
          ["Completed Today", completed, <RouteIcon/>],
          ["Avg Efficiency", avgEfficiency+"%", <TrendingUp/>]
        ].map((k,i)=>(
          <div key={i} style={{
            background:"#fff",
            padding:"20px",
            borderRadius:"14px",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            boxShadow:"0 8px 20px rgba(0,0,0,.05)"
          }}>
            <div>
              <div style={{color:"#777", fontSize:13}}>{k[0]}</div>
              <div style={{fontSize:32, fontWeight:700}}>{k[1]}</div>
            </div>
            <div style={{color:"#2a9d8f"}}>{k[2]}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px" }}>
        <div className="card">
          <h3>Route Optimization Trends</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={routeOptimizationData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="week"/>
              <YAxis/>
              <Area dataKey="distance" stroke="#2a9d8f" fill="#2a9d8f33"/>
              <Area dataKey="time" stroke="#f4a261" fill="#f4a26133"/>
            </AreaChart>
          </ResponsiveContainer>

          <div style={{ display:"flex", gap:"16px", marginTop:"12px" }}>
            <div style={{ flex:1, background:"#eaf7f4", padding:"12px", borderRadius:"10px" }}>
              17 km / week
            </div>
            <div style={{ flex:1, background:"#fff4ea", padding:"12px", borderRadius:"10px" }}>
              4 hrs / week
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Collection Efficiency Trends</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={efficiencyTrendData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="day"/>
              <YAxis/>
              <Line dataKey="efficiency" stroke="#2a9d8f" strokeWidth={3}/>
              <Line dataKey="collections" stroke="#e76f51" strokeDasharray="5 5"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table / Map */}
      <div style={{
        marginTop:"24px",
        background:"#fff",
        borderRadius:"16px",
        padding:"20px",
        boxShadow:"0 10px 30px rgba(0,0,0,.05)"
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"16px" }}>
          <h3>Today's Collection Schedule</h3>
          <div>
            <button onClick={()=>setView("table")} style={{marginRight:10}}>Table</button>
            <button onClick={()=>setView("map")}>Map</button>
          </div>
        </div>
{view==="table" ? (
  <div style={{ overflowX:"auto" }}>
    <table width="100%" style={{ borderCollapse:"collapse" }}>
      <thead>
        <tr style={{ background:"#f4f9f7", textAlign:"left" }}>
          <th style={th}>Route</th>
          <th style={th}>Zone</th>
          <th style={th}>Time</th>
          <th style={th}>Bins</th>
          <th style={th}>Efficiency</th>
          <th style={th}>Status</th>
        </tr>
      </thead>

      <tbody>
        {scheduleData.map(r=>(
          <tr key={r.routeId} style={{ borderBottom:"1px solid #eee" }}>

            <td style={td}>{r.routeId}</td>

            <td style={td}>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                📍 {r.zone}
              </div>
            </td>

            <td style={{ ...td, fontWeight:600 }}>{r.time}</td>

            <td style={td}>
              <span style={binPill}>{r.bins} bins</span>
            </td>

            <td style={td}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={barBg}>
                  <div style={{ ...barFill, width:`${r.efficiency}%` }} />
                </div>
                <strong>{r.efficiency}%</strong>
              </div>
            </td>

            <td style={td}>
              {r.status==="scheduled" && <span style={statusBlue}>Scheduled</span>}
              {r.status==="in-progress" && <span style={statusOrange}>In Progress</span>}
              {r.status==="completed" && <span style={statusGreen}>Completed</span>}
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
        
          <div style={{ height:"600px", marginTop:"10px" }}>
            <RouteMapView/>
          </div>
        )}
      </div>

    </div>
  )
}