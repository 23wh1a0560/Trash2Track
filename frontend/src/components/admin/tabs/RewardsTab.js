import React, { useState } from "react"
import { Award, Users, Trophy } from "lucide-react"

const rewardsPenaltiesData = {
  achievementsUnlocked: 96
}

const initialCitizens = [
  { id: 1, name: "Akhi", points: 1250 },
  { id: 2, name: "Bhim", points: 580 },
  { id: 3, name: "Siva", points: 1640 },
  { id: 4, name: "Ravi", points: 970 }
]

export default function RewardsTab() {
  const [citizens, setCitizens] = useState(initialCitizens)
  const [selectedId, setSelectedId] = useState(initialCitizens[0].id)

  const selectedCitizen = citizens.find(c => c.id === selectedId)

  const totalRewards = citizens.reduce((sum, c) => sum + c.points, 0)

  function issueReward() {
    setCitizens(prev =>
      prev.map(c =>
        c.id === selectedId ? { ...c, points: c.points + 100 } : c
      )
    )
  }

  function issuePenalty() {
    setCitizens(prev =>
      prev.map(c =>
        c.id === selectedId
          ? { ...c, points: Math.max(0, c.points - 50) }
          : c
      )
    )
  }

  return (
    <div style={{ padding: "24px" }}>

      <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>
        Rewards & Penalties
      </h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Citizen engagement and contribution tracking
      </p>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
        <KpiCard title="Total Rewards Given" value={totalRewards} icon={<Award />} color="#facc15" />
        <KpiCard title="Active Citizens" value={citizens.length} icon={<Users />} color="#22c55e" />
        <KpiCard title="Achievements Unlocked" value={rewardsPenaltiesData.achievementsUnlocked} icon={<Trophy />} color="#a855f7" />
      </div>

      {/* Selected Citizen */}
      <div style={{ marginTop: "20px", fontWeight: "600" }}>
        Selected Citizen: <span style={{ color: "#16a34a" }}>{selectedCitizen.name}</span>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
        <button style={greenBtn} onClick={issueReward}>
          <Award size={16} /> Issue Reward (+100)
        </button>
        <button style={redBtn} onClick={issuePenalty}>
          Issue Penalty (-50)
        </button>
      </div>

      {/* Top Contributors */}
      <div style={cardStyle}>
        <h3 style={{ marginBottom: "10px" }}>Top Contributors</h3>
        {citizens.map((c, i) => (
          <div
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            style={{
              ...rowStyle,
              cursor: "pointer",
              border: c.id === selectedId ? "2px solid #16a34a" : "2px solid transparent"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={rankStyle}>#{i + 1}</div>
              <div>
                <div style={{ fontWeight: "600" }}>{c.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  Points: {c.points}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Trophy size={18} color="#facc15" />
              <strong>{c.points}</strong>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

/* ---------- UI Helpers ---------- */

function KpiCard({ title, value, icon, color }) {
  return (
    <div style={{
      background: "white",
      padding: "16px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <div style={{ fontSize: "13px", color: "#666" }}>{title}</div>
        <div style={{ fontSize: "26px", fontWeight: "bold" }}>{value}</div>
      </div>
      <div style={{
        background: color + "33",
        padding: "12px",
        borderRadius: "10px",
        color
      }}>
        {icon}
      </div>
    </div>
  )
}

const cardStyle = {
  marginTop: "24px",
  background: "white",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
}

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#f9fafb",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "10px"
}

const rankStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "#dcfce7",
  color: "#166534",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold"
}

const greenBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px"
}

const redBtn = {
  background: "white",
  border: "1px solid #fca5a5",
  color: "#dc2626",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer"
}