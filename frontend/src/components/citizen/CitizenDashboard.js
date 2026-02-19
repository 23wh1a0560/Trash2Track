import { useAuth } from '../../App';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Leaf,
  Award,
  Bell,
  LogOut,
  TrendingUp,
  Trash2,
  Calendar,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';

import DashboardTab from './tabs/DashboardTab';
import ReportsTab from './tabs/ReportsTab';
import ScheduleTab from './tabs/ScheduleTab';
import TrainingTab from './tabs/TrainingTab';
import RewardsTab from './tabs/RewardsTab';

import ReportFormModal from './modals/ReportFormModal';
import PickupFormModal from './modals/PickupFormModal';

const CitizenDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Overflowing Bin on Main Street",
      description: "The municipal waste bin is overflowing with garbage",
      location: "Main Street, Ward 5",
      status: "resolved",
      created_at: "2024-01-15",
      waste_type: "general",
    },
  ]);

  const [pickupSchedule, setPickupSchedule] = useState([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showPickupForm, setShowPickupForm] = useState(false);

  useEffect(() => {
    if (user?.role !== 'citizen') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  /* ===== RESTORED HELPERS (WERE MISSING) ===== */
  const getStatusIcon = (status) => {
    switch (status) {
      case 'reported':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'in_progress':
        return <AlertTriangle className="h-4 w-4 text-blue-600" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      reported: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  };
  /* ========================================== */

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-lime-50">
      {/* HEADER – UNCHANGED */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <Leaf className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">T2T Citizen</h1>
              <p className="text-sm text-emerald-600">
                Welcome, {user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-emerald-100 px-3 py-2 rounded-full flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>{user?.eco_points || 0}</span>
            </div>
            <Bell />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1"
            >
              <LogOut /> <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* NAV TABS – UNCHANGED */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-1 bg-white/50 p-2 rounded-xl mb-8 backdrop-blur-sm">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'reports', label: 'My Reports', icon: Trash2 },
            { id: 'schedule', label: 'Collection Schedule', icon: Calendar },
            { id: 'training', label: 'Training', icon: Star },
            { id: 'rewards', label: 'Rewards', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-tab flex items-center space-x-2 ${
                  activeTab === tab.id ? 'active' : ''
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'dashboard' && (
          <DashboardTab
            reports={reports}
            user={user}
            setShowReportForm={setShowReportForm}
            getStatusIcon={getStatusIcon}
            getStatusBadge={getStatusBadge}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsTab
            reports={reports}
            setShowReportForm={setShowReportForm}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleTab
            pickupSchedule={pickupSchedule}
            setShowPickupForm={setShowPickupForm}
          />
        )}

        {activeTab === 'training' && <TrainingTab />}

        {activeTab === 'rewards' && <RewardsTab user={user} />}
      </div>

      {showReportForm && (
        <ReportFormModal
          reports={reports}
          setReports={setReports}
          onClose={() => setShowReportForm(false)}
        />
      )}

      {showPickupForm && (
        <PickupFormModal
          pickupSchedule={pickupSchedule}
          setPickupSchedule={setPickupSchedule}
          onClose={() => setShowPickupForm(false)}
        />
      )}
    </div>
  );
};

export default CitizenDashboard;