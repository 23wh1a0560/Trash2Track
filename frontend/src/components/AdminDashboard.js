import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, MapPin, Users, Truck, Award, AlertTriangle, 
  TrendingUp, Calendar, Settings, Bell, LogOut, Leaf,
  CheckCircle, Clock, Filter, Search, Plus, Eye,
  PieChart, Activity, DollarSign, Target
} from 'lucide-react';
import { useAuth } from '../App';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analytics, setAnalytics] = useState({});
  const [bins, setBins] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/login', { state: { role: 'admin' } });
      return;
    }
    fetchAdminData();
  }, [user, navigate]);

  const fetchAdminData = async () => {
    try {
      const [analyticsRes, binsRes, driversRes, reportsRes] = await Promise.all([
        axios.get(`${API}/analytics/overview`),
        axios.get(`${API}/bins`),
        axios.get(`${API}/drivers`),
        axios.get(`${API}/reports`)
      ]);
      
      setAnalytics(analyticsRes.data);
      setBins(binsRes.data);
      setDrivers(driversRes.data);
      setReports(reportsRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const handleAssignDriver = async (driverId, routeId) => {
    try {
      await axios.put(`${API}/drivers/${driverId}/assign`, { route_id: routeId });
      fetchAdminData();
    } catch (error) {
      console.error('Error assigning driver:', error);
    }
  };

  const getBinFillColor = (level) => {
    if (level >= 80) return 'text-red-600 bg-red-100';
    if (level >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getBinProgressColor = (level) => {
    if (level >= 80) return 'high';
    if (level >= 60) return 'medium';
    return '';
  };

  const mockWardData = [
    { ward: 'Ward 1', bins: 45, alerts: 3, efficiency: 92 },
    { ward: 'Ward 2', bins: 38, alerts: 1, efficiency: 88 },
    { ward: 'Ward 3', bins: 52, alerts: 5, efficiency: 85 },
    { ward: 'Ward 4', bins: 41, alerts: 2, efficiency: 94 }
  ];

  const mockPenalties = [
    { citizen: 'John Doe', offense: 'Improper Segregation', amount: '$25', date: '2024-01-15' },
    { citizen: 'Jane Smith', offense: 'Late Bin Placement', amount: '$15', date: '2024-01-14' },
    { citizen: 'Mike Johnson', offense: 'Overloading Bin', amount: '$20', date: '2024-01-13' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-purple-900">T2T Admin</h1>
                <p className="text-sm text-purple-600">Welcome, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-purple-100 px-3 py-2 rounded-full">
                <Activity className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">All Systems Active</span>
              </div>
              <button className="p-2 text-purple-700 hover:bg-purple-100 rounded-full">
                <Bell className="h-5 w-5" />
              </button>
              <button 
                onClick={logout}
                className="flex items-center space-x-2 text-purple-700 hover:text-purple-900"
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
            { id: 'dashboard', label: 'Overview', icon: TrendingUp },
            { id: 'bins', label: 'Bin Monitoring', icon: MapPin },
            { id: 'drivers', label: 'Driver Management', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'rewards', label: 'Rewards & Penalties', icon: Award }
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
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Active Bins</p>
                    <p className="text-3xl font-bold">{analytics.active_bins || 0}</p>
                  </div>
                  <MapPin className="h-8 w-8 text-blue-200" />
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Total Reports</p>
                    <p className="text-3xl font-bold">{analytics.total_reports || 0}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-emerald-200" />
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">High Priority</p>
                    <p className="text-3xl font-bold">{analytics.high_priority_bins || 0}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-200" />
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Efficiency</p>
                    <p className="text-3xl font-bold">{analytics.collection_efficiency || 0}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-200" />
                </div>
              </div>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <h2 className="text-xl font-bold text-purple-900 mb-4">Critical Alerts</h2>
                <div className="space-y-3">
                  {bins.filter(bin => bin.current_level >= 80).slice(0, 5).map((bin) => (
                    <div key={bin.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <div>
                          <h3 className="font-medium text-red-900">{bin.location}</h3>
                          <p className="text-sm text-red-700">{bin.current_level}% full - Requires immediate attention</p>
                        </div>
                      </div>
                      <button className="btn-eco text-sm">Assign</button>
                    </div>
                  ))}
                  {bins.filter(bin => bin.current_level >= 80).length === 0 && (
                    <p className="text-center text-gray-500 py-4">No critical alerts at this time</p>
                  )}
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-bold text-purple-900 mb-4">Recent Reports</h2>
                <div className="space-y-3">
                  {reports.slice(0, 5).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.location}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        report.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ward Overview */}
            <div className="card">
              <h2 className="text-xl font-bold text-purple-900 mb-4">Ward Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockWardData.map((ward) => (
                  <div key={ward.ward} className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-bold text-purple-900 mb-2">{ward.ward}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bins:</span>
                        <span className="font-medium">{ward.bins}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alerts:</span>
                        <span className={`font-medium ${ward.alerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {ward.alerts}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Efficiency:</span>
                        <span className="font-medium text-green-600">{ward.efficiency}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bin Monitoring Tab */}
        {activeTab === 'bins' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-purple-900">Bin Monitoring</h2>
              <div className="flex items-center space-x-3">
                <button className="btn-secondary flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
                <button className="btn-primary flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Bin</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bins.map((bin) => (
                <div key={bin.id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{bin.location}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBinFillColor(bin.current_level)}`}>
                      {bin.current_level}% Full
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Fill Level</span>
                      <span className="font-medium">{bin.current_level}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${getBinProgressColor(bin.current_level)}`}
                        style={{ width: `${bin.current_level}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Capacity:</span>
                      <span>{bin.capacity}L</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="capitalize">{bin.waste_type.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Collected:</span>
                      <span>{new Date(bin.last_collected).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 btn-secondary text-sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </button>
                    <button className="flex-1 btn-eco text-sm">
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Driver Management Tab */}
        {activeTab === 'drivers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-purple-900">Driver Management</h2>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Driver</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drivers.map((driver) => (
                <div key={driver.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-blue-500 to-emerald-500 p-2 rounded-full">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{driver.name}</h3>
                        <p className="text-sm text-gray-600">{driver.phone}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      driver.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {driver.availability ? 'Available' : 'Busy'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Vehicle:</span>
                      <span className="font-medium">{driver.vehicle_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shift:</span>
                      <span className="capitalize">{driver.shift}</span>
                    </div>
                    {driver.current_route && (
                      <div className="flex justify-between">
                        <span>Current Route:</span>
                        <span className="font-medium">{driver.current_route}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      className="flex-1 btn-secondary text-sm"
                      disabled={!driver.availability}
                    >
                      Assign Route
                    </button>
                    <button className="flex-1 btn-eco text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-900">Analytics & Reports</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Collection Efficiency</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-900 mb-2">
                    {analytics.collection_efficiency || 0}%
                  </div>
                  <p className="text-gray-600">Overall System Efficiency</p>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Resolved Reports</span>
                    <span className="font-medium">{analytics.resolved_reports || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Reports</span>
                    <span className="font-medium">{analytics.pending_reports || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium text-green-600">2.3 hours</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Waste Collection Trends</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="font-medium">General Waste</span>
                    </div>
                    <span className="text-purple-900 font-bold">45%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="font-medium">Recyclables</span>
                    </div>
                    <span className="text-purple-900 font-bold">30%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span className="font-medium">Organic</span>
                    </div>
                    <span className="text-purple-900 font-bold">20%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="font-medium">Hazardous</span>
                    </div>
                    <span className="text-purple-900 font-bold">5%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl mb-3">
                    <Target className="h-8 w-8 text-white mx-auto" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Route Efficiency</h4>
                  <p className="text-2xl font-bold text-green-600">87%</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl mb-3">
                    <Clock className="h-8 w-8 text-white mx-auto" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Avg Response</h4>
                  <p className="text-2xl font-bold text-blue-600">2.3h</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl mb-3">
                    <Users className="h-8 w-8 text-white mx-auto" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Citizen Satisfaction</h4>
                  <p className="text-2xl font-bold text-orange-600">94%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rewards & Penalties Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-900">Rewards & Penalties Management</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-full">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">John Citizen</h4>
                        <p className="text-sm text-gray-600">15 reports submitted</p>
                      </div>
                    </div>
                    <span className="font-bold text-orange-600">500 pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-full">
                        <Leaf className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Sarah Green</h4>
                        <p className="text-sm text-gray-600">12 reports submitted</p>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-600">420 pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-2 rounded-full">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Mike Wilson</h4>
                        <p className="text-sm text-gray-600">10 reports submitted</p>
                      </div>
                    </div>
                    <span className="font-bold text-blue-600">350 pts</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Recent Penalties</h3>
                <div className="space-y-3">
                  {mockPenalties.map((penalty, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <h4 className="font-medium text-red-900">{penalty.citizen}</h4>
                        <p className="text-sm text-red-700">{penalty.offense}</p>
                        <p className="text-xs text-red-600">{penalty.date}</p>
                      </div>
                      <span className="font-bold text-red-600">{penalty.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Reward System Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <h4 className="font-bold text-purple-900 mb-2">Points Awarded</h4>
                  <p className="text-3xl font-bold text-purple-600">12,450</p>
                  <p className="text-sm text-purple-700">This Month</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <h4 className="font-bold text-purple-900 mb-2">Active Citizens</h4>
                  <p className="text-3xl font-bold text-purple-600">234</p>
                  <p className="text-sm text-purple-700">Participating</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <h4 className="font-bold text-purple-900 mb-2">Badges Earned</h4>
                  <p className="text-3xl font-bold text-purple-600">89</p>
                  <p className="text-sm text-purple-700">This Month</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;