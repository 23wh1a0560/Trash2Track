import React, { useState } from 'react';
import { 
  Trash2, Map, Calendar, Star, LineChart, Users, 
  HardHat, FileText, Activity, ShieldAlert, ChevronLeft, AlertCircle 
} from 'lucide-react';

// --- TAB IMPORTS ---
// Ensure these files exist in your /tabs folder
// --- TAB IMPORTS ---
// Use ../ to go out of the 'pages' folder and into the 'tabs' folder
import BinMonitoringTab from '../tabs/BinMonitoringTab';
import AreasZonesTab from '../tabs/AreasZonesTab';
import CollectionScheduleTab from '../tabs/CollectionScheduleTab';
import PointsTab from '../tabs/PointsTab';
import AnalyticsTab from '../tabs/AnalyticsTab';
import CitizenInfoTab from '../tabs/CitizenInfoTab';
import WorkersTab from '../tabs/WorkersTab';
import ReportsTab from '../tabs/ReportsTab';

// --- SHARED SUB-COMPONENTS ---

const Header = () => (
  <div className="bg-[#AB1717] border-[8px] border-[#47510B] rounded-t-[50px] rounded-b-[20px] p-6 md:p-8 red-stack-shadow shrink-0">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="bg-[#FDFAD8] p-3 rounded-2xl border-4 border-[#47510B] shadow-[5px_5px_0_0_#47510B]">
          <ShieldAlert size={32} className="text-[#AB1717]" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FDFAD8] opacity-60 italic mb-1">Command.Master.Console</p>
          <h1 className="text-2xl md:text-5xl font-black italic text-[#FDFAD8] uppercase tracking-tighter leading-none">
            TRASH<span className="text-[#CAD23C]">2</span>TRACK
          </h1>
        </div>
      </div>
      <Activity className="text-[#CAD23C] animate-pulse" size={32} />
    </div>
  </div>
);

const Footer = () => (
  <div className="flex flex-col items-center gap-2 opacity-40 py-4">
    <div className="w-full h-1 bg-[#47510B]/20 rounded-full mb-2" />
    <p className="text-[9px] font-black uppercase tracking-[1em] text-[#47510B] text-center">
      Secure.Industrial.Admin.Terminal.v3.0
    </p>
  </div>
);

const UnderConstruction = ({ viewName }) => (
  <div className="bg-white border-[8px] border-[#47510B] rounded-[40px] p-12 md:p-20 text-center flex flex-col items-center justify-center shadow-2xl min-h-[500px]">
    <AlertCircle size={80} className="text-[#AB1717] mb-6 animate-pulse" />
    <h2 className="text-4xl md:text-6xl font-black italic text-[#47510B] uppercase tracking-tighter mb-4">
      {viewName.replace(/_/g, ' ')}
    </h2>
    <div className="w-24 h-2 bg-[#CAD23C] rounded-full mb-6" />
    <p className="text-sm font-bold text-[#47510B] opacity-50 uppercase tracking-[0.5em]">
      Module_Pending_Deployment
    </p>
  </div>
);

// --- MAIN DASHBOARD COMPONENT ---

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('MENU');

  const allTabs = [
    { id: 'BINS', label: '01_BIN_MONITORING', icon: <Trash2 size={32}/> },
    { id: 'ZONES', label: '02_AREAS_&_ZONES', icon: <Map size={32}/> },
    { id: 'SCHEDULE', label: '03_COLL_SCHEDULE', icon: <Calendar size={32}/> },
    { id: 'POINTS', label: '04_REWARDS_POINTS', icon: <Star size={32}/> },
    { id: 'ANALYTICS', label: '05_SYS_ANALYTICS', icon: <LineChart size={32}/> },
    { id: 'CITIZENS', label: '06_CITIZEN_INFO', icon: <Users size={32}/> },
    { id: 'WORKERS', label: '07_WORKER_NODES', icon: <HardHat size={32}/> },
    { id: 'REPORTS', label: '08_SYS_REPORTS', icon: <FileText size={32}/> },
  ];

  const renderContent = () => {
    // 1. THE MAIN HUB
    if (currentView === 'MENU') {
      return (
        <div className="w-full bg-[#A1AED1] border-[8px] border-[#47510B] rounded-[40px] p-6 md:p-10 yellow-stack-shadow animate-slot">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#AB1717] mb-8 ml-2">Select_Operational_Node</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-[30px] border-[6px] border-[#47510B] bg-[#FDFAD8] transition-all hover:-translate-y-2 hover:bg-[#CAD23C] active:translate-y-1 shadow-[0_12px_0_0_#47510B] hover:shadow-[0_4px_0_0_#47510B]"
              >
                <div className="text-[#AB1717] group-hover:text-[#47510B] transition-transform group-hover:scale-110">
                  {tab.icon}
                </div>
                <span className="text-xs font-[1000] uppercase tracking-tighter text-[#47510B] text-center leading-tight">
                  {tab.label.replace(/_/g, ' ')}
                </span>
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#47510B] border-2 border-[#AB1717]/20 group-hover:bg-[#AB1717]" />
              </button>
            ))}
          </div>
        </div>
      );
    }

    // 2. INDIVIDUAL TAB ROUTING
    return (
      <div className="w-full flex flex-col gap-6 animate-slot">
        <button 
          onClick={() => setCurrentView('MENU')}
          className="flex items-center gap-2 bg-[#47510B] text-[#FDFAD8] px-6 py-3 rounded-2xl font-black uppercase text-xs w-fit hover:bg-[#AB1717] transition-all shadow-[4px_4px_0_0_#CAD23C] active:translate-y-1 active:shadow-none"
        >
          <ChevronLeft size={20} /> Back_to_Console
        </button>

        {currentView === 'BINS' && <BinMonitoringTab />}
        {currentView === 'ZONES' && <AreasZonesTab />}
        {currentView === 'SCHEDULE' && <CollectionScheduleTab />}
        {currentView === 'POINTS' && <PointsTab />}
        {currentView === 'ANALYTICS' && <AnalyticsTab />}
        {currentView === 'CITIZENS' && <CitizenInfoTab />}
        {currentView === 'WORKERS' && <WorkersTab />}
        {currentView === 'REPORTS' && <ReportsTab />}
        
        {/* Fallback for safety */}
        {!allTabs.find(t => t.id === currentView) && <UnderConstruction viewName={currentView} />}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFAD8] p-4 md:p-8 flex items-center justify-center font-sans overflow-x-hidden">
      <div className="w-full max-w-[1200px] flex flex-col gap-8">
        <Header />
        {renderContent()}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;