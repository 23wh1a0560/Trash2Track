import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import SignIn from './pages/SignIn';
import WorkerDashboard from './pages/WorkerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* The app starts here */}
        <Route path="/" element={<Splash />} />
        
        {/* Moves here after 10 seconds */}
        <Route path="/signin" element={<SignIn />} />
        
        {/* Moves here after successful login */}
        <Route path="/dashboard" element={<WorkerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;