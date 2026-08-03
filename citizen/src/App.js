import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import EntryCard from "./components/EntryCard";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<EntryCard isOpen={true} />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;