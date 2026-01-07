import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera, MapPin, Clock, Award, Star, Leaf, Plus, Filter,
  Search, Bell, User, LogOut, Calendar, Trash2, Recycle,
  AlertTriangle, CheckCircle, XCircle, TrendingUp
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CitizenDashboard = () => {
  const navigate = useNavigate();
  // Mock user data since useAuth is not available
  const user = { id: 1, name: 'John Doe', role: 'citizen', eco_points: 1250 };
  const logout = () => navigate('/login');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Overflowing Bin on Main Street",
      description: "The municipal waste bin is overflowing with garbage",
      location: "Main Street, Ward 5",
      status: "resolved",
      created_at: "2024-01-15",
      waste_type: "general"
    },
    {
      id: 2,
      title: "Illegal Dumping Near Park",
      description: "Someone dumped construction waste in public area",
      location: "Central Park Area",
      status: "in_progress",
      created_at: "2024-01-20",
      waste_type: "construction"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showPickupForm, setShowPickupForm] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    waste_type: 'general',
    location: '',
    image_url: ''
  });

  useEffect(() => {
    if (user?.role !== 'citizen') {
      navigate('/login', { state: { role: 'citizen' } });
      return;
    }
    // fetchReports(); // Commented out since we're using mock data
  }, [user, navigate]);

  const handleCreateReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mock creating report
      const newId = Math.max(...reports.map(r => r.id)) + 1;
      const mockReport = {
        id: newId,
        ...newReport,
        status: 'reported',
        created_at: new Date().toISOString().split('T')[0]
      };
      setReports([...reports, mockReport]);
      
      setNewReport({ title: '', description: '', waste_type: 'general', location: '', image_url: '' });
      setShowReportForm(false);
    } catch (error) {
      console.error('Error creating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'reported': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'in_progress': return <AlertTriangle className="h-4 w-4 text-blue-600" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <XCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      'reported': 'bg-yellow-100 text-yellow-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'resolved': 'bg-green-100 text-green-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  };

  const mockSchedule = [
    { day: 'Monday', time: '7:00 AM', type: 'General Waste' },
    { day: 'Wednesday', time: '7:00 AM', type: 'Recyclables' },
    { day: 'Friday', time: '7:00 AM', type: 'Organic Waste' }
  ];

  const mockTrainingVideos = [
    { 
      title: 'Proper Waste Segregation', 
      duration: '3:45', 
      completed: true,
      videoId: '2SoH2d5wru4' // Your specific YouTube video
    },
    { 
      title: 'Recycling Best Practices', 
      duration: '5:20', 
      completed: true,
      videoId: 'dBNbA80Snb8' // Recycling education video
    },
    { 
      title: 'Composting at Home', 
      duration: '4:15', 
      completed: false,
      videoId: 'otmKoaKBbWk' // Composting guide
    },
    { 
      title: 'Hazardous Waste Disposal', 
      duration: '6:30', 
      completed: false,
      videoId: 'Bb1n_EE-9dQ' // Hazardous waste management
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-lime-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-2 rounded-xl">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-emerald-900">T2T Citizen</h1>
                <p className="text-sm text-emerald-600">Welcome, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-100 px-3 py-2 rounded-full">
                <Award className="h-4 w-4 text-emerald-600" />
                <span className="font-medium text-emerald-800">{user?.eco_points || 0} points</span>
              </div>
              <button className="p-2 text-emerald-700 hover:bg-emerald-100 rounded-full">
                <Bell className="h-5 w-5" />
              </button>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-900"
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
            { id: 'reports', label: 'My Reports', icon: Trash2 },
            { id: 'schedule', label: 'Collection Schedule', icon: Calendar },
            { id: 'training', label: 'Training', icon: Star },
            { id: 'rewards', label: 'Rewards', icon: Award }
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
            {/* Quick Stats */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card card-eco">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-600 text-sm font-medium">Total Reports</p>
                      <p className="text-2xl font-bold text-emerald-900">{reports.length}</p>
                    </div>
                    <Trash2 className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                <div className="card card-eco">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-600 text-sm font-medium">Eco Points</p>
                      <p className="text-2xl font-bold text-emerald-900">{user?.eco_points || 0}</p>
                    </div>
                    <Award className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                <div className="card card-eco">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-600 text-sm font-medium">Resolved</p>
                      <p className="text-2xl font-bold text-emerald-900">
                        {reports.filter(r => r.status === 'resolved').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Recent Reports */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-emerald-900">Recent Reports</h2>
                  <button
                    onClick={() => setShowReportForm(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Report</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {reports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(report.status)}
                        <div>
                          <h3 className="font-medium text-gray-900">{report.title}</h3>
                          <p className="text-sm text-gray-600">{report.location}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                        {report.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                  {reports.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No reports yet. Create your first report!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions & Info */}
            <div className="space-y-6">
              <div className="card card-eco">
                <h3 className="text-lg font-bold text-emerald-900 mb-4">Achievement</h3>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-full">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900">Eco Warrior</h4>
                    <p className="text-sm text-emerald-600">Reported 5+ waste issues</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-bold text-emerald-900 mb-4">Next Collection</h3>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-gray-900">Monday, 7:00 AM</p>
                    <p className="text-sm text-gray-600">General Waste Collection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-emerald-900">My Reports</h2>
              <button
                onClick={() => setShowReportForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Report</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <div key={report.id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{report.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                      {report.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{report.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{report.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(report.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emerald-900">Collection Schedule</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockSchedule.map((schedule, index) => (
                <div key={index} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{schedule.day}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{schedule.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Trash2 className="h-4 w-4 text-gray-500" />
                      <span>{schedule.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-emerald-900 mb-4">Request Special Pickup</h3>
              <p className="text-gray-600 mb-4">Need to dispose of bulk items or hazardous waste? Request a special pickup.</p>
              <button onClick={() => setShowPickupForm(true)} className="btn-primary">
                Request Special Pickup
              </button>
            </div>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emerald-900">Training Videos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTrainingVideos.map((video, index) => (
                <div key={index} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{video.title}</h3>
                    {video.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{video.duration}</span>
                  </div>
                  <button 
                    className={`w-full ${video.completed ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    {video.completed ? 'Watch Again' : 'Watch Now'}
                  </button>
                </div>
              ))}
            </div>

            {/* Video Modal */}
            {selectedVideo && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{selectedVideo.title}</h3>
                    <button 
                      onClick={() => setSelectedVideo(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XCircle className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="card text-center">
              <Award className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-emerald-900 mb-2">{user?.eco_points || 0} Points</h2>
              <p className="text-emerald-600">Your Environmental Impact Score</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Eco Warrior</h3>
                <p className="text-sm text-gray-600">Reported 5+ issues</p>
              </div>
              
              <div className="card text-center opacity-50">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Green Guardian</h3>
                <p className="text-sm text-gray-600">Report 10+ issues</p>
              </div>
              
              <div className="card text-center opacity-50">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Planet Protector</h3>
                <p className="text-sm text-gray-600">Report 25+ issues</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Report Form Modal */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Report Waste Issue</h2>
            <form onSubmit={handleCreateReport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newReport.title}
                  onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newReport.description}
                  onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewReport({ ...newReport, image_url: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                {newReport.image_url && (
                  <img
                    src={newReport.image_url}
                    alt="preview"
                    className="mt-3 w-full h-40 object-cover rounded-md"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
                <select
                  value={newReport.waste_type}
                  onChange={(e) => setNewReport({...newReport, waste_type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="general">General Waste</option>
                  <option value="recyclable">Recyclable</option>
                  <option value="organic">Organic Waste</option>
                  <option value="hazardous">Hazardous Waste</option>
                  <option value="construction">Construction Waste</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newReport.location}
                  onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary"
                >
                  {loading ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPickupForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Special Pickup</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateReport(e);
                setShowPickupForm(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newReport.title}
                  onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
                <select
                  value={newReport.waste_type}
                  onChange={(e) => setNewReport({...newReport, waste_type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="bulk">Bulk Items</option>
                  <option value="hazardous">Hazardous Waste</option>
                  <option value="electronic">Electronic Waste</option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newReport.location}
                  onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowPickupForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;