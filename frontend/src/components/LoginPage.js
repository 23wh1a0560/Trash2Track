import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Truck, Shield, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen',
      description: 'Report issues, track collection schedules, earn rewards',
      icon: User,
      color: 'from-emerald-400 to-green-600',
      canSignUp: true
    },
    {
      id: 'worker',
      title: 'Sanitation Worker',
      description: 'Manage routes, update collections, resolve complaints',
      icon: Truck,
      color: 'from-blue-400 to-blue-600',
      canSignUp: false
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Monitor operations, manage drivers, view analytics',
      icon: Shield,
      color: 'from-purple-400 to-purple-600',
      canSignUp: false
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id);
    setIsSignUp(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setIsSignUp(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (isSignUp && !formData.name) {
      alert('Please enter your name');
      return;
    }

    // Navigate to appropriate dashboard based on role
    switch (selectedRole) {
      case 'citizen':
        navigate('/dashboard/citizen');
        break;
      case 'worker':
        navigate('/dashboard/worker');
        break;
      case 'admin':
        navigate('/dashboard/admin');
        break;
      default:
        alert('Please select a role');
    }
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="min-h-screen bg-eco-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {!selectedRole ? (
          // Role Selection Screen
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-eco-primary mb-4">
                Welcome to T2T
              </h1>
              <p className="text-xl text-warm-gray">
                Choose your role to get started
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <Card
                    key={role.id}
                    onClick={() => handleRoleSelect(role)}
                    className="glass p-8 cursor-pointer hover:scale-105 transition-all duration-300 text-center group"
                  >
                    <div className={`bg-gradient-to-br ${role.color} p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-eco-primary mb-3">
                      {role.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed">
                      {role.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          // Login/Signup Form Screen
          <Card className="glass max-w-md mx-auto p-8">
            <div className="flex items-center mb-6">
              <button
                onClick={handleBackToRoles}
                className="mr-4 p-2 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-eco-primary" />
              </button>
              <div className="flex items-center">
                <div className={`bg-gradient-to-br ${selectedRoleData?.color} p-3 rounded-lg mr-3`}>
                  {React.createElement(selectedRoleData?.icon, { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-eco-primary">
                    {selectedRoleData?.title}
                  </h2>
                  <p className="text-sm text-warm-gray">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isSignUp ? "Create a password" : "Enter your password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full btn-primary">
                {isSignUp
                  ? `Sign Up as ${selectedRoleData?.title}`
                  : `Sign In as ${selectedRoleData?.title}`}
              </Button>
            </form>

            <div className="mt-6 text-center">
              {selectedRoleData?.canSignUp ? (
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-eco-primary hover:text-eco-emerald transition-colors"
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
              ) : (
                <p className="text-warm-gray text-sm">
                  {selectedRoleData?.title} accounts are managed by administrators
                </p>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
