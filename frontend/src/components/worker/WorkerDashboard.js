import { useAuth } from '../../App';
import { BinMapView } from '@/components/map/BinMapView'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck, MapPin, Clock, CheckCircle, AlertTriangle,
  Route, Bell, LogOut, Calendar, PlayCircle,
  TrendingUp, XCircle
} from 'lucide-react';

import DashboardTab from './tabs/DashboardTab';
import ScheduleTab from './tabs/ScheduleTab';
import RoutesTab from './tabs/RoutesTab';
import ComplaintsTab from './tabs/ComplaintsTab';
import TrainingTab from './tabs/TrainingTab';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const [activeTab, setActiveTab] = useState('dashboard');

  // ✅ SINGLE SOURCE OF TRUTH
  const [schedules, setSchedules] = useState([
    { id: 1, area: 'Downtown District', time: '7:00 AM', bins: 12, status: 'pending' },
    { id: 2, area: 'Residential Zone A', time: '9:30 AM', bins: 8, status: 'pending' },
    { id: 3, area: 'Business Park', time: '11:00 AM', bins: 15, status: 'completed' },
    { id: 4, area: 'Shopping Center', time: '2:00 PM', bins: 6, status: 'in_progress' }
  ]);

  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Overflowing Bin Near School",
      description: "Large bin is overflowing with waste, needs immediate attention",
      location: "Green Valley School, Main Road",
      status: "reported"
    },
    {
      id: 2,
      title: "Illegal Dumping Reported",
      description: "Construction waste dumped illegally behind shops",
      location: "Commercial Street, Behind Shops",
      status: "reported"
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (user?.role !== 'worker') {
      navigate('/login', { state: { role: 'worker' } });
    }
  }, [user, navigate]);

  const handleUpdateReportStatus = (reportId, status) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId ? { ...report, status, worker_id: user?.id } : report
      )
    );

    if (status === 'in_progress') {
      const acceptedReport = reports.find(r => r.id === reportId);
      if (acceptedReport) {
        setSchedules(prev => [
          ...prev,
          { ...acceptedReport, status: 'in_progress' }
        ]);
        alert(`Report "${acceptedReport.title}" Accepted`);
      }
    }

    if (status === 'resolved') {
      setSchedules(prev => prev.filter(r => r.id !== reportId));
      const resolvedReport = reports.find(r => r.id === reportId);
      if (resolvedReport) alert(`Report "${resolvedReport.title}" Resolved`);
    }
  };

  const mockRouteOptimization = [
    { stop: 1, location: 'Central Plaza', time: '7:00 AM', duration: '15 min' },
    { stop: 2, location: 'Main Street', time: '7:20 AM', duration: '20 min' },
    { stop: 3, location: 'Park Avenue', time: '7:45 AM', duration: '25 min' },
    { stop: 4, location: 'Business District', time: '8:15 AM', duration: '30 min' }
  ];

  const mockTrainingModules = [
    { title: 'Waste Segregation Techniques', duration: '12 min', completed: true, videoId: 'HoeLTqbOJ-k' },
    { title: 'Safe Handling of Hazardous Materials', duration: '18 min', completed: true, videoId: 'VWftDJhyNqY' },
    { title: 'Route Optimization Best Practices', duration: '15 min', completed: false, videoId: 'LBK_5ByJ0nM' },
    { title: 'Customer Service Excellence', duration: '22 min', completed: false, videoId: 'tNV16tz1NK8' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-green-100">

      {/* HEADER (UNCHANGED) */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-emerald-600 p-2 rounded-xl">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">T2T Worker</h1>
                <p className="text-sm text-blue-600">Welcome, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-blue-100 px-3 py-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Active Shift</span>
              </div>
              <button className="p-2 text-blue-700 hover:bg-blue-100 rounded-full">
                <Bell className="h-5 w-5" />
              </button>
              <button onClick={handleLogout} className="flex items-center space-x-2 text-blue-700 hover:text-blue-900">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex space-x-1 bg-white/50 p-2 rounded-xl mb-8 backdrop-blur-sm">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'schedule', label: 'Daily Schedule', icon: Calendar },
            { id: 'routes', label: 'Optimized Routes', icon: Route },
            { id: 'complaints', label: 'Complaints', icon: AlertTriangle },
            { id: 'training', label: 'Training', icon: PlayCircle }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-tab flex items-center space-x-2 ${activeTab === tab.id ? 'active' : ''}`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'dashboard' && (
          <DashboardTab reports={reports} schedules={schedules} />
        )}

        {activeTab === 'schedule' && (
          <ScheduleTab schedules={schedules} />
        )}

        {activeTab === 'routes' && (
          <RoutesTab mockRouteOptimization={mockRouteOptimization} />
        )}

        {activeTab === 'complaints' && (
          <ComplaintsTab reports={reports} handleUpdateReportStatus={handleUpdateReportStatus} />
        )}

        {activeTab === 'training' && (
          <TrainingTab
            mockTrainingModules={mockTrainingModules}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
          />
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;
