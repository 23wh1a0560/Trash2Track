import React, { useState, useEffect } from "react";
import { auth } from "./firebase/firebase"; // Firebase authentication
import { fetchReports } from "./services/api"; // API service to fetch reports
import Dashboard from "./components/Dashboard"; // Your dashboard component
import Login from "./components/Login"; // Your login component
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


function App() {
  const [user, setUser] = useState(null); // To store logged-in user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's a logged-in user using Firebase auth
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);  // Set the user state when user is logged in
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {/* {user ? (
        // If the user is logged in, show the Dashboard
        <Dashboard uid={user.uid} />
      ) : (
        // If no user is logged in, show the Login component
        <Login />
      )} */}
      <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
        />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard uid={user.uid} /> : <Navigate to="/login" replace />}
        />

        {/* Redirect root to login or dashboard */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />

        {/* Catch-all redirect */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
