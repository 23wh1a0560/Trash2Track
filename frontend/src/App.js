import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";

// Pages
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import CitizenDashboard from "./components/CitizenDashboard";
import WorkerDashboard from "./components/WorkerDashboard"; 
import AdminDashboard from "./components/AdminDashboard";

import "./App.css";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Protected Route Component
const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading">Loading...</div>;
  
  // If not logged in, go to login
  if (!user) return <Navigate to="/login" replace />;
  
  // If role doesn't match, go to landing (or a "unauthorized" page)
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Normalize email for role checking
        const email = firebaseUser.email?.toLowerCase() || "";
        let role = "citizen"; 
        
        if (email.includes("admin")) role = "admin";
        else if (email.includes("worker")) role = "worker";

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "User",
          role,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Helper to determine where to send a logged-in user
  const getHomeRedirect = () => {
    if (!user) return <LandingPage />;
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "worker") return <Navigate to="/worker" replace />;
    return <Navigate to="/citizen" replace />;
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      <BrowserRouter>
        <Routes>
          {/* Landing Logic: If logged in, redirect to dashboard */}
          <Route path="/" element={getHomeRedirect()} />
          
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <LoginPage />
          } />

          {/* Protected Routes */}
          <Route
            path="/citizen"
            element={
              <PrivateRoute role="citizen">
                <CitizenDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/worker"
            element={
              <PrivateRoute role="worker">
                <WorkerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;