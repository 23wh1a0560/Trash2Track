import React from 'react';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    /* We keep the wrapper transparent so your index.css background shows through */
    <div className="App min-h-screen flex items-center justify-center">
      
      {/* STEP 1: To switch to Dashboard, comment out <SignIn /> and uncomment <Dashboard /> */}
      
      {/* <SignIn /> */}
      <Dashboard />

    </div>
  );
}

export default App;