import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Users, Award, Recycle, Truck, BarChart3, ChevronRight, Play, MapPin, Clock, Star } from 'lucide-react';
import { useAuth } from '../App';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    wasteCollected: 0,
    citizensInvolved: 0,
    ecoPoints: 0
  });

  // Animated counter effect
  useEffect(() => {
    const animateStats = () => {
      const targets = { wasteCollected: 1247, citizensInvolved: 8932, ecoPoints: 45678 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          wasteCollected: Math.floor(targets.wasteCollected * progress),
          citizensInvolved: Math.floor(targets.citizensInvolved * progress),
          ecoPoints: Math.floor(targets.ecoPoints * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    };
    
    const timeout = setTimeout(animateStats, 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleDashboardAccess = (role) => {
    if (user && user.role === role) {
      navigate(`/${role}`);
    } else {
      navigate('/login', { state: { role } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-lime-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-2 rounded-xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-900">T2T</h1>
                <p className="text-sm text-emerald-600">Trash to Treasure</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-emerald-700">Welcome, {user.name}!</span>
                  <button
                    onClick={() => navigate(`/${user.role}`)}
                    className="btn-primary"
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="btn-secondary"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="title-hero mb-6 animate-fade-in-up">
              Transform Trash to Treasure
            </h1>
            <p className="subtitle max-w-3xl mx-auto mb-8 animate-fade-in-up">
              Join our community-driven waste management platform. Report issues, track collections, 
              earn rewards, and help build a cleaner, more sustainable future for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up">
              <button className="btn-primary text-lg px-8 py-4">
                Start Making Impact <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" /> Watch How It Works
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-pulse opacity-30">
          <Recycle className="h-16 w-16 text-emerald-400" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse opacity-30">
          <Leaf className="h-20 w-20 text-green-400" />
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-emerald-100 to-green-200 p-8 rounded-2xl mb-4">
                <h3 className="text-4xl font-bold text-emerald-800 mb-2">
                  {stats.wasteCollected.toLocaleString()}
                </h3>
                <p className="text-emerald-600 font-medium">Tons of Waste Collected</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-emerald-200 p-8 rounded-2xl mb-4">
                <h3 className="text-4xl font-bold text-blue-800 mb-2">
                  {stats.citizensInvolved.toLocaleString()}
                </h3>
                <p className="text-blue-600 font-medium">Active Citizens</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-8 rounded-2xl mb-4">
                <h3 className="text-4xl font-bold text-amber-800 mb-2">
                  {stats.ecoPoints.toLocaleString()}
                </h3>
                <p className="text-amber-600 font-medium">Eco-Points Earned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">How T2T Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to make a lasting environmental impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card card-eco text-center group">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">1. Report</h3>
              <p className="text-gray-600">
                Citizens report waste issues with photos and GPS location. 
                Track your reports from submission to resolution.
              </p>
            </div>
            
            <div className="card card-eco text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-emerald-600 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">2. Collect</h3>
              <p className="text-gray-600">
                Sanitation workers receive optimized routes and schedules. 
                Real-time updates ensure efficient waste collection.
              </p>
            </div>
            
            <div className="card card-eco text-center group">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <Award className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">3. Reward</h3>
              <p className="text-gray-600">
                Earn eco-points for participation. Unlock badges, climb leaderboards, 
                and contribute to a cleaner community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Access */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 to-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Access Your Dashboard</h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Choose your role to access the appropriate dashboard and start making an impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Citizen Dashboard */}
            <div className="glass p-8 text-center group cursor-pointer" onClick={() => handleDashboardAccess('citizen')}>
              <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Citizen Dashboard</h3>
              <ul className="text-emerald-100 space-y-2 mb-6 text-left">
                <li>• Report waste issues with photos</li>
                <li>• Track resolution status</li>
                <li>• View collection schedules</li>
                <li>• Earn eco-points and badges</li>
                <li>• Access training videos</li>
              </ul>
              <button className="btn-primary w-full group-hover:shadow-xl transition-shadow">
                Access Citizen Portal <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            {/* Worker Dashboard */}
            <div className="glass p-8 text-center group cursor-pointer" onClick={() => handleDashboardAccess('worker')}>
              <div className="bg-gradient-to-br from-blue-400 to-emerald-500 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Worker Dashboard</h3>
              <ul className="text-emerald-100 space-y-2 mb-6 text-left">
                <li>• View daily collection schedules</li>
                <li>• Access optimized routes</li>
                <li>• Manage citizen complaints</li>
                <li>• Training modules & resources</li>
                <li>• Performance tracking</li>
              </ul>
              <button className="btn-primary w-full group-hover:shadow-xl transition-shadow">
                Access Worker Portal <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            {/* Admin Dashboard */}
            <div className="glass p-8 text-center group cursor-pointer" onClick={() => handleDashboardAccess('admin')}>
              <div className="bg-gradient-to-br from-purple-400 to-blue-500 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Admin Dashboard</h3>
              <ul className="text-emerald-100 space-y-2 mb-6 text-left">
                <li>• Monitor bin fill levels</li>
                <li>• Assign drivers & routes</li>
                <li>• Track worker performance</li>
                <li>• Analytics & reporting</li>
                <li>• Manage rewards & penalties</li>
              </ul>
              <button className="btn-primary w-full group-hover:shadow-xl transition-shadow">
                Access Admin Portal <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">What Our Community Says</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">SM</span>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900">Sarah Martinez</h4>
                  <p className="text-gray-600">Local Resident</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">
                "T2T has transformed how our neighborhood handles waste. I've earned over 500 eco-points 
                and our street is cleaner than ever!"
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MJ</span>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900">Mike Johnson</h4>
                  <p className="text-gray-600">Sanitation Worker</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">
                "The route optimization feature saves me hours every day. I can serve more areas 
                efficiently and citizens get faster responses."
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">DC</span>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900">Dr. Chen</h4>
                  <p className="text-gray-600">Municipal Administrator</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">
                "The analytics dashboard gives us unprecedented insight into waste patterns. 
                We've improved efficiency by 40% since implementing T2T."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-2 rounded-xl">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">T2T - Trash to Treasure</h3>
                  <p className="text-emerald-200">Building sustainable communities</p>
                </div>
              </div>
              <p className="text-emerald-100 mb-4">
                Join the movement towards a cleaner, more sustainable future. 
                Every report, every collection, every point earned makes a difference.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Impact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Download App</h4>
              <div className="space-y-3">
                <div className="bg-emerald-800 p-3 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-emerald-700 transition-colors">
                  <div className="bg-white p-1 rounded">
                    <Clock className="h-4 w-4 text-emerald-900" />
                  </div>
                  <span className="text-sm">Coming Soon to App Store</span>
                </div>
                <div className="bg-emerald-800 p-3 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-emerald-700 transition-colors">
                  <div className="bg-white p-1 rounded">
                    <Clock className="h-4 w-4 text-emerald-900" />
                  </div>
                  <span className="text-sm">Coming Soon to Google Play</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-emerald-800 mt-8 pt-8 text-center text-emerald-200">
            <p>&copy; 2024 T2T - Trash to Treasure. All rights reserved. Building a sustainable future together.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;