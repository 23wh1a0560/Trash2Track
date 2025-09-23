import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Users, Truck, BarChart3, ArrowLeft } from 'lucide-react';
import { useAuth } from '../App';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState(location.state?.role || '');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen',
      description: 'Report waste issues, track progress, earn rewards',
      icon: Users,
      color: 'from-emerald-400 to-green-500',
      demoEmail: 'citizen@demo.com'
    },
    {
      id: 'worker',
      title: 'Sanitation Worker',
      description: 'Manage schedules, optimize routes, handle complaints',
      icon: Truck,
      color: 'from-blue-400 to-emerald-500',
      demoEmail: 'worker@demo.com'
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Monitor operations, assign drivers, view analytics',
      icon: BarChart3,
      color: 'from-purple-400 to-blue-500',
      demoEmail: 'admin@demo.com'
    }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!selectedRole || !email) return;

    setLoading(true);
    try {
      await login(email, selectedRole);
      navigate(`/${selectedRole}`);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role, demoEmail) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    setLoading(true);
    
    try {
      await login(demoEmail, role);
      navigate(`/${role}`);
    } catch (error) {
      console.error('Demo login failed:', error);
      alert('Demo login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-lime-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-2 rounded-xl">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-emerald-900">T2T</h1>
                <p className="text-xs text-emerald-600">Trash to Treasure</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12">
        <div className="max-w-4xl w-full mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-emerald-900 mb-4">Welcome to T2T</h1>
            <p className="text-xl text-gray-600">Choose your role to access your dashboard</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <div
                  key={role.id}
                  className={`card cursor-pointer transition-all duration-300 ${
                    selectedRole === role.id
                      ? 'ring-2 ring-emerald-500 scale-105'
                      : 'hover:scale-102'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className={`bg-gradient-to-br ${role.color} p-4 rounded-xl mb-4 w-fit mx-auto`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">{role.title}</h3>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDemoLogin(role.id, role.demoEmail);
                    }}
                    disabled={loading}
                    className="btn-primary w-full text-sm"
                  >
                    {loading && selectedRole === role.id ? 'Signing in...' : 'Try Demo Account'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Login Form */}
          {selectedRole && (
            <div className="max-w-md mx-auto">
              <div className="card">
                <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
                  Sign in as {roles.find(r => r.id === selectedRole)?.title}
                </h2>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={`Enter your email or use: ${roles.find(r => r.id === selectedRole)?.demoEmail}`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !selectedRole || !email}
                    className="btn-primary w-full py-3"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>

                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <h4 className="font-medium text-emerald-900 mb-2">Demo Accounts:</h4>
                  <div className="space-y-1 text-sm text-emerald-700">
                    <p><strong>Citizen:</strong> citizen@demo.com</p>
                    <p><strong>Worker:</strong> worker@demo.com</p>
                    <p><strong>Admin:</strong> admin@demo.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;