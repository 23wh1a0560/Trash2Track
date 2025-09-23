import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, MapPin, Clock, CheckCircle, AlertTriangle, 
  Route, Bell, LogOut, Calendar, List, PlayCircle,
  Navigation, Users, Leaf, TrendingUp, Clipboard
} from 'lucide-react';
import { useAuth } from '../App';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [schedules, setSchedules] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role !== 'worker') {
      navigate('/login', { state: { role: 'worker' } });
      return;
    }
    fetchWorkerData();
  }, [user, navigate]);

  const fetchWorkerData = async () => {
    try {
      const [schedulesRes, reportsRes] = await Promise.all([
        axios.get(`${API}/schedules?worker_id=${user.id}`),
        axios.get(`${API}/reports?status=reported`)
      ]);
      setSchedules(schedulesRes.data);
      setReports(reportsRes.data.slice(0, 10)); // Show recent reports
    } catch (error) {
      console.error('Error fetching worker data:', error);
    }
  };

  const handleUpdateReportStatus = async (reportId, status) => {
    try {
      await axios.put(`${API}/reports/${reportId}/status`, { 
        status, 
        worker_id: user.id 
      });
      fetchWorkerData();
    } catch (error) {
      console.error('Error updating report status:', error);
    }
  };

  const mockDailySchedule = [
    { id: 1, area: 'Downtown District', time: '7:00 AM', bins: 12, status: 'pending' },
    { id: 2, area: 'Residential Zone A', time: '9:30 AM', bins: 8, status: 'pending' },
    { id: 3, area: 'Business Park', time: '11:00 AM', bins: 15, status: 'completed' },
    { id: 4, area: 'Shopping Center', time: '2:00 PM', bins: 6, status: 'in_progress' }
  ];

  const mockRouteOptimization = [
    { stop: 1, location: 'Central Plaza', time: '7:00 AM', duration: '15 min' },
    { stop: 2, location: 'Main Street', time: '7:20 AM', duration: '20 min' },
    { stop: 3, location: 'Park Avenue', time: '7:45 AM', duration: '25 min' },
    { stop: 4, location: 'Business District', time: '8:15 AM', duration: '30 min' }
  ];

  const mockTrainingModules = [
    { title: 'Waste Segregation Techniques', duration: '12 min', completed: true },
    { title: 'Safe Handling of Hazardous Materials', duration: '18 min', completed: true },
    { title: 'Route Optimization Best Practices', duration: '15 min', completed: false },
    { title: 'Customer Service Excellence', duration: '22 min', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-green-100">
      {/* Header */}
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
              <button 
                onClick={logout}
                className="flex items-center space-x-2 text-blue-700 hover:text-blue-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
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

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats & Progress */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card card-eco">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Today's Routes</p>
                      <p className="text-2xl font-bold text-blue-900">4</p>
                    </div>
                    <Route className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="card card-eco">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Bins Collected</p>
                      <p className="text-2xl font-bold text-blue-900">28</p>
                    </div>
                    <Truck className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="card card-eco">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Complaints</p>
                      <p className="text-2xl font-bold text-blue-900">{reports.length}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Today's Progress */}
              <div className="card">
                <h2 className="text-xl font-bold text-blue-900 mb-4">Today's Progress</h2>
                <div className="space-y-4">
                  {mockDailySchedule.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          schedule.status === 'completed' ? 'bg-green-500' :
                          schedule.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <div>
                          <h3 className="font-medium text-gray-900">{schedule.area}</h3>
                          <p className="text-sm text-gray-600">{schedule.bins} bins • {schedule.time}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        schedule.status === 'completed' ? 'bg-green-100 text-green-800' :
                        schedule.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {schedule.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions & Alerts */}
            <div className="space-y-6">
              <div className="card card-eco">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveTab('routes')}
                    className="w-full btn-eco flex items-center justify-center space-x-2"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>View Routes</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('complaints')}
                    className="w-full btn-secondary flex items-center justify-center space-x-2"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <span>Check Complaints</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('training')}
                    className="w-full btn-secondary flex items-center justify-center space-x-2"
                  >
                    <PlayCircle className="h-4 w-4" />
                    <span>Training Modules</span>
                  </button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Recent Alert</h3>
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">High Priority</p>
                    <p className="text-sm text-red-700">Bin overflow at Central Plaza</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Performance</h3>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900">Excellent</h4>
                  <p className="text-sm text-gray-600">95% completion rate</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Daily Schedule</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockDailySchedule.map((schedule) => (
                <div key={schedule.id} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{schedule.area}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      schedule.status === 'completed' ? 'bg-green-100 text-green-800' :
                      schedule.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {schedule.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <span>Scheduled: {schedule.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-gray-600" />
                      <span>{schedule.bins} bins to collect</span>
                    </div>
                  </div>
                  <button 
                    className={`w-full ${
                      schedule.status === 'completed' ? 'btn-secondary' : 'btn-primary'
                    }`}
                    disabled={schedule.status === 'completed'}
                  >
                    {schedule.status === 'completed' ? 'Completed' : 
                     schedule.status === 'in_progress' ? 'In Progress' : 'Start Route'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Optimized Routes</h2>
            
            <div className="card">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Today's Route - Downtown District</h3>
              <p className="text-gray-600 mb-6">Optimized route for maximum efficiency and minimal travel time</p>
              
              <div className="space-y-4">
                {mockRouteOptimization.map((stop, index) => (
                  <div key={stop.stop} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {stop.stop}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{stop.location}</h4>
                        <span className="text-sm text-gray-600">{stop.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">Estimated duration: {stop.duration}</p>
                    </div>
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total estimated time:</span>
                  <span className="font-medium text-blue-900">1 hour 30 minutes</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Complaints Tab */}
        {activeTab === 'complaints' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Citizen Complaints</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <div key={report.id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{report.title}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      New
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{report.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{report.location}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleUpdateReportStatus(report.id, 'in_progress')}
                      className="flex-1 btn-primary text-sm"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => handleUpdateReportStatus(report.id, 'resolved')}
                      className="flex-1 btn-secondary text-sm"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Training Modules</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTrainingModules.map((module, index) => (
                <div key={index} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{module.title}</h3>
                    {module.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration}</span>
                  </div>
                  <button className={`w-full ${module.completed ? 'btn-secondary' : 'btn-primary'}`}>
                    {module.completed ? 'Review' : 'Start Training'}
                  </button>
                </div>
              ))}
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Training Progress</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Overall Completion</span>
                <span className="font-medium text-blue-900">50%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;