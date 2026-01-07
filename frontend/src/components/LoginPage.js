import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Truck, Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';
// --- FIREBASE IMPORTS ---
import { auth } from "../firebase/firebase"; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// UI Components
const Card = ({ children, className, onClick }) => (
  <div onClick={onClick} className={`rounded-xl transition-all ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className, type }) => (
  <button type={type} className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}>
    {children}
  </button>
);

const Input = ({ ...props }) => (
  <input {...props} className={`w-full p-2 border rounded-md mb-2 focus:ring-2 focus:ring-green-500 outline-none ${props.className}`} />
);

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium mb-1 text-gray-700">
    {children}
  </label>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Controls toggle between Sign In and Create Account
  const [showPassword, setShowPassword] = useState(false);
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
      description: 'Report issues and earn rewards', 
      icon: User, 
      color: 'from-emerald-400 to-green-600'
    },
    { 
      id: 'worker', 
      title: 'Sanitation Worker', 
      description: 'Manage routes and collections', 
      icon: Truck, 
      color: 'from-blue-400 to-blue-600'
    },
    { 
      id: 'admin', 
      title: 'Administrator', 
      description: 'Monitor operations and analytics', 
      icon: Shield, 
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id);
    setIsSignUp(false); // Default to Sign In view when a role is clicked
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        return alert('Passwords do not match');
      }
      if (!formData.name) {
        return alert('Please enter your full name');
      }
    }

    try {
      if (isSignUp) {
        // Create Account Logic
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(userCredential.user, { displayName: formData.name });
        alert(`${selectedRoleData.title} account created successfully!`);
      } else {
        // Sign In Logic
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      
      // Redirect to root; App.js handles the role-based routing
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl">
        {!selectedRole ? (
          // --- ROLE SELECTION VIEW ---
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-green-700 mb-4">Welcome to T2T</h1>
              <p className="text-xl text-gray-600">Choose your role to get started</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {roles.map((role) => (
                <Card 
                  key={role.id} 
                  onClick={() => handleRoleSelect(role)} 
                  className="bg-white p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-1 border border-gray-200 text-center"
                >
                  <div className={`bg-gradient-to-br ${role.color} p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center text-white shadow-lg`}>
                    <role.icon size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{role.title}</h3>
                  <p className="text-gray-500 text-sm">{role.description}</p>
                </Card>
              ))}
            </div>
          </>
        ) : (
          // --- AUTH FORM VIEW ---
          <Card className="bg-white max-w-md mx-auto p-10 shadow-2xl border border-gray-100">
            <div className="flex items-center mb-8">
              <button 
                onClick={handleBackToRoles} 
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedRoleData?.title}</h2>
                <p className="text-sm text-gray-500">{isSignUp ? 'Create your account' : 'Sign in to your account'}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name" 
                    type="text" 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  name="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange} 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword"
                    name="confirmPassword" 
                    type="password" 
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              )}

              <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700 py-3 text-lg shadow-md mt-4">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            <button 
              onClick={() => setIsSignUp(!isSignUp)} 
              className="mt-6 w-full text-center text-green-600 text-sm hover:underline font-medium"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
            </button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LoginPage;