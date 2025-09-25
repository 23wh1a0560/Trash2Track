import React, { useState, useEffect } from "react";
import { auth } from "./firebase/firebase"; // Firebase authentication
import { fetchReports } from "./services/api"; // API service to fetch reports
import Dashboard from "./components/Dashboard"; // Your dashboard component
import Login from "./components/Login"; // Your login component (you will create it)
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
        <Route path="/*" element={<Login/>}/>
        {user &&
          <Route path="/dashboard" element={<Dashboard/>}/>}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
