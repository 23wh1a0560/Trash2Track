import { useNavigate } from "react-router-dom";
import { useAuth } from '../../App';
import React, { useState } from "react"
import {
  BarChart3,
  MapPin,
  Users,
  Award,
  TrendingUp,
  Bell,
  LogOut,
  Activity
} from "lucide-react"

// Named exports
import { DashboardTab } from "./tabs/DashboardTab"
import { AnalyticsTab } from "./tabs/AnalyticsTab"
import  BinMonitoringTab  from "./tabs/BinMonitoringTab"

// Default exports
import CollectionSchedulingTab from "./tabs/CollectionSchedulingTab"
import RewardsTab from "./tabs/RewardsTab"

import { LoadingState } from "./LoadingState"

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Get these from your Context

const handleLogout = async () => {
  try {
    await logout(); // 1. Triggers Firebase signOut in App.js
    navigate('/', { replace: true }); // 2. Forces navigation to Landing Page
  } catch (error) {
    console.error("Logout failed", error);
  }
};
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loading] = useState(false)

  if (loading) return <LoadingState />

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50">

      {/* HEADER */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-purple-900">T2T Admin</h1>
              <p className="text-sm text-purple-600">Smart Waste Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-full">
              <Activity className="h-4 w-4 text-purple-600" />
              <span className="text-purple-800 text-sm">All Systems Active</span>
            </div>
            <Bell className="h-5 w-5 text-purple-700 cursor-pointer" />
            <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 text-purple-600 hover:text-purple-600"
                          >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                          </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* TABS */}
        <div className="flex bg-white rounded-xl p-2 mb-8">
          {[
            { id: "dashboard", label: "Overview", icon: TrendingUp },
            { id: "bins", label: "Bin Monitoring", icon: MapPin },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "collection", label: "Collection", icon: Users },
            { id: "rewards", label: "Rewards", icon: Award }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "text-purple-700 hover:bg-purple-100"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* CONTENT */}
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "bins" && <BinMonitoringTab />}
        {activeTab === "collection" && <CollectionSchedulingTab />}
        {activeTab === "rewards" && <RewardsTab />}

      </div>
    </div>
  )
}