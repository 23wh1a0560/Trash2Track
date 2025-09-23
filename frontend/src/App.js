import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Components
import LandingPage from './components/LandingPage';
import CitizenDashboard from './components/CitizenDashboard';
import WorkerDashboard from './components/WorkerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Auth Context
const AuthContext = React.createContext();

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('t2t_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, role) => {
    try {
      const response = await axios.post(`${API}/auth/login`, { email, role });
      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem('t2t_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('t2t_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Main App Router
const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-700 font-medium">Loading T2T...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      {user && (
        <>
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route path="/worker" element={<WorkerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </>
      )}
    </Routes>
  );
};

function App() {
  // Initialize demo data on app start
  useEffect(() => {
    const initDemoData = async () => {
      try {
        await axios.post(`${API}/init-demo-data`);
        console.log('Demo data initialized');
      } catch (error) {
        console.error('Failed to initialize demo data:', error);
      }
    };
    
    initDemoData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;