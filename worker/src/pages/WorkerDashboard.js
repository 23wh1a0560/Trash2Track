import React, { useState, useRef } from "react";
import { 
  X, User, Truck, AlertCircle, BookOpen, 
  CheckCircle, Activity, MapPin 
} from "lucide-react";
import ScheduleTab from "../tabs/ScheduleTab";
import ReportsTab from "../tabs/ReportsTab";
import TrainingTab from "../tabs/TrainingTab";
import RoutesTab from "../tabs/RoutesTab";  

const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  
  const [isAtTop, setIsAtTop] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const scrollRef = useRef(null);

  const reportData = {
    'LOC_04': {
      id: 'REP-772',
      title: 'Waste Overflow',
      loc: 'Sector 4',
      citizen: 'A. Smith',
      time: '10:45 AM',
      description: 'The bin at the corner of 5th Ave is completely overflowing. Plastic bottles everywhere.',
      img: 'https://images.unsplash.com/photo-1605600611284-19561ad7ddf0?q=80&w=600',
    },
    'LOC_15': {
      id: 'REP-801',
      title: 'Illegal Dumping',
      loc: 'East Gate',
      citizen: 'P. Kumar',
      time: '09:20 AM',
      description: 'Old furniture and construction debris near the park entrance.',
      img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600',
    }
  };

  const tabs = [
    { id: "schedule", label: "Tasks", icon: <Truck size={24} />, title: "Todays Schedule" },
    { id: "routes", label: "Routes", icon: <MapPin size={24} />, title: "Optimized Path" },
    { id: "reports", label: "Issues", icon: <AlertCircle size={24} />, title: "Reports" },
    { id: "training", label: "Learn", icon: <BookOpen size={24} /> , title: "Watch to Learn" },
  ];

  const handleOpenReport = (locationId) => {
    if (reportData[locationId]) setSelectedReport(reportData[locationId]);
  };

  const scrollToTab = (tabId) => {
  const index = tabs.findIndex(t => t.id === tabId);
  
  setIsManualScrolling(true); // Lock the listener
  setActiveTab(tabId);
  
  if (scrollRef.current) {
    scrollRef.current.scrollTo({ 
      left: index * window.innerWidth, 
      behavior: "smooth" 
    });

    // Unlock after the animation completes
    setTimeout(() => setIsManualScrolling(false), 500); 
  }
};

  const handleHorizontalScroll = () => {
  if (scrollRef.current && !isManualScrolling) {
    const index = Math.round(scrollRef.current.scrollLeft / window.innerWidth);
    if (tabs[index] && tabs[index].id !== activeTab) {
      setActiveTab(tabs[index].id);
    }
  }
};

  const handleVerticalScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setIsAtTop(scrollTop < 15);
    
    const atBottom = scrollTop + clientHeight >= scrollHeight - 80;
    const isScrollingDown = scrollTop > (scrollRef.current.lastScrollTop || 0);
    
    if (scrollTop < 15 || atBottom || !isScrollingDown) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
    scrollRef.current.lastScrollTop = scrollTop;
  };

  return (
    <div className="h-screen bg-[#FDFAD8] font-sans relative overflow-hidden perspective-1000">

      {/* 2. REPORT DETAIL MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-[#47510B]/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#FDFAD8] w-full max-w-sm rounded-[50px] border-[8px] border-white overflow-hidden animate-slide-up flex flex-col max-h-[90vh] shadow-2xl">
            <div className="h-48 w-full relative shrink-0">
              <img src={selectedReport.img} alt="Evidence" className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedReport(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#AB1717] shadow-xl active:scale-90 transition-all"
              >
                <X size={20} strokeWidth={3} />
              </button>
              <div className="absolute bottom-4 left-4 bg-[#AB1717] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase">
                Evidence_File_{selectedReport.id ? selectedReport.id.split('-')[1] : '772'}
              </div>
            </div>
            <div className="p-8 overflow-y-auto no-scrollbar flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-2xl font-black text-[#47510B] uppercase italic leading-none">{selectedReport.title}</h4>
                  <div className="flex items-center gap-2 mt-2 opacity-40">
                    <MapPin size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{selectedReport.loc}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-black opacity-30 uppercase">Submitted</p>
                  <p className="text-[10px] font-black text-[#47510B]">{selectedReport.time}</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border-2 border-[#47510B]/5">
                  <User size={16} className="text-[#CAD23C]" />
                  <p className="text-[10px] font-bold text-[#47510B]">Reported by: <span className="opacity-50">{selectedReport.citizen}</span></p>
                </div>
                <div className="p-5 bg-white rounded-3xl border-2 border-[#47510B]/10 italic text-sm text-[#47510B]/80 shadow-inner">
                  "{selectedReport.description}"
                </div>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="mt-auto w-full py-5 bg-[#47510B] text-[#CAD23C] rounded-[25px] font-black uppercase text-sm shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <CheckCircle size={18} /> Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PROFILE LAYER */}
      <div className={`absolute inset-0 z-[300] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center p-4 md:p-12 ${isProfileOpen ? "opacity-100 scale-100" : "opacity-0 scale-125 pointer-events-none"}`}>
        <div className="w-full h-full bg-[#FDFAD8] rounded-[60px] shadow-2xl relative overflow-hidden flex flex-col border-[12px] border-white">
          <button onClick={() => setIsProfileOpen(false)} className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#47510B] hover:rotate-90 transition-transform shadow-xl z-50 border-2 border-[#47510B]/5">
            <X size={24} />
          </button>
          
          <div className="flex-1 overflow-y-auto no-scrollbar p-8 md:p-16">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <div>
                <h3 className="text-5xl font-black italic text-[#47510B] uppercase tracking-tighter leading-none mb-4">Marcus<br/><span className="text-[#CAD23C]">Sterling.</span></h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#47510B] text-[#CAD23C] rounded-lg text-[9px] font-black uppercase tracking-widest">UNIT_7729</span>
                  <span className="px-3 py-1 border-2 border-[#47510B] text-[#47510B] rounded-lg text-[9px] font-black uppercase tracking-widest">SECTOR_04</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-[#CAD23C] px-6 py-4 rounded-[25px] border-2 border-[#47510B] text-center shadow-[4px_4px_0_0_#47510B]">
                  <p className="text-[8px] font-black opacity-60 uppercase text-[#47510B]">Badges</p>
                  <p className="text-xl font-black italic text-[#47510B]">12</p>
                </div>
                <div className="bg-[#AB1717] px-6 py-4 rounded-[25px] border-2 border-[#47510B] text-center text-white shadow-[4px_4px_0_0_#47510B]">
                  <p className="text-[8px] font-black opacity-60 uppercase text-[#FDFAD8]">Strikes</p>
                  <p className="text-xl font-black italic text-[#FDFAD8]">01</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="p-5 bg-white rounded-[30px] border-2 border-[#47510B]/10 shadow-sm">
                <p className="text-[9px] font-black text-[#A1AED1] uppercase mb-1 tracking-widest">Registry_Email</p>
                <p className="font-bold text-[#47510B] text-sm lowercase">m.sterling@trash2track.gov</p>
              </div>
              <div className="p-5 bg-white rounded-[30px] border-2 border-[#47510B]/10 shadow-sm">
                <p className="text-[9px] font-black text-[#A1AED1] uppercase mb-1 tracking-widest">Comm_Line</p>
                <p className="font-bold text-[#47510B] text-sm">+44 7700 90001</p>
              </div>
              <div className="p-5 bg-white rounded-[30px] border-2 border-[#47510B]/10 shadow-sm">
                <p className="text-[9px] font-black text-[#A1AED1] uppercase mb-1 tracking-widest">License_Class</p>
                <p className="font-bold text-[#47510B] text-sm uppercase">HGV / Heavy_Lift</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h4 className="flex items-center gap-2 text-xl font-black italic text-[#47510B] uppercase tracking-tighter mb-4 px-2"><Truck size={18} /> Pickup_Archive</h4>
                <div className="max-h-[300px] overflow-y-auto pr-3 space-y-2 no-scrollbar">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className={`p-4 rounded-[20px] border-2 border-[#47510B] flex items-center justify-between transition-all ${i <= 3 ? 'bg-white shadow-[4px_4px_0_0_#CAD23C]' : 'bg-white/40 border-dashed opacity-50'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FDFAD8] flex items-center justify-center"><CheckCircle size={14} className="text-[#47510B]" /></div>
                        <div><p className="text-[10px] font-black text-[#47510B] uppercase">Sector_0{i}_Node</p><p className="text-[8px] font-bold opacity-30 italic">MAR 1{i}_2026</p></div>
                      </div>
                      <span className="text-[8px] font-black bg-[#47510B] text-[#CAD23C] px-2 py-0.5 rounded uppercase">Verified</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-xl font-black italic text-[#47510B] uppercase tracking-tighter mb-4 px-2"><Activity size={18} /> Resolution_Logs</h4>
                <div className="max-h-[300px] overflow-y-auto pr-3 space-y-2 no-scrollbar">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className={`p-4 rounded-[20px] border-2 border-[#47510B] flex items-center justify-between transition-all ${i <= 3 ? 'bg-white shadow-[4px_4px_0_0_#AB1717]' : 'bg-white/40 border-dashed opacity-50'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FDFAD8] flex items-center justify-center text-[#AB1717]"><AlertCircle size={14} /></div>
                        <div><p className="text-[10px] font-black text-[#47510B] uppercase">Issue_Fixed_0{i}</p><p className="text-[8px] font-bold opacity-30 italic">MAR 0{i}_2026</p></div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[#CAD23C]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAIN SWIPEABLE CONTENT LAYER */}
      <div className={`h-[100dvh] w-screen transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col ${(isProfileOpen || selectedReport) ? "scale-90 blur-2xl opacity-40 pointer-events-none" : "scale-100 opacity-100"}`}>
        <main 
          ref={scrollRef} 
          onScroll={handleHorizontalScroll} 
          className="flex-1 flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)' }}
        >
          {tabs.map((tab) => (
            <section 
  key={tab.id} 
  onScroll={handleVerticalScroll} 
  className="min-w-full h-full snap-start flex flex-col items-center overflow-y-auto no-scrollbar pt-20"
>
  <div className="w-full max-w-[min(90vw,450px)] flex flex-col items-center pb-64 px-4"> 
    
    {/* 3D PERSPECTIVE SYSTEM HEADER */}
    <div className="w-full flex items-end justify-between mb-12 relative group/header">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#AB1717] animate-pulse" />
          <span className="text-[10px] font-black text-[#47510B]/40 uppercase tracking-[0.4em]">System_Live // 2026</span>
        </div>
        <h2 className="text-6xl font-[1000] italic text-[#47510B] uppercase tracking-[-0.06em] leading-[0.8]">
          {tab.title}<span className="text-[#CAD23C]">_</span>
        </h2>
      </div>
      
      {/* THE SMART CARD: Crazy 3D Hover Effect */}
      <button 
        onClick={() => setIsProfileOpen(true)}
        className="relative perspective-1000 group/card"
      >
        <div className="relative w-16 h-24 bg-[#47510B] rounded-xl border-[3px] border-white shadow-2xl overflow-hidden transition-all duration-500 ease-out transform-gpu group-hover/card:rotate-y-12 group-hover/card:rotate-x-12 group-active:scale-90">
          
          {/* 1. The Scanning Laser (Visual Polish) */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#CAD23C] blur-[2px] opacity-0 group-hover/card:opacity-100 group-hover/card:animate-scan z-30" />
          
          {/* 2. Ghosted User Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover/card:opacity-30 transition-opacity">
            <User size={48} className="text-[#CAD23C]" strokeWidth={1} />
          </div>

          {/* 3. The "Magnetic Strip" Branding */}
          <div className="absolute top-4 left-0 w-full h-4 bg-white/5 skew-y-12" />

          {/* 4. The Data Foot (Yellow Section) */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#CAD23C] flex flex-col justify-center px-2 border-t-2 border-[#47510B]/20">
            <span className="text-[6px] font-black text-[#47510B]/60 uppercase tracking-tighter">Clearance_Lvl</span>
            <p className="text-[10px] font-black text-[#47510B] leading-none uppercase italic">Class_A</p>
            <div className="mt-1 flex gap-0.5">
              <div className="w-1 h-1 rounded-full bg-[#47510B]" />
              <div className="w-1 h-1 rounded-full bg-[#47510B]" />
              <div className="w-4 h-1 rounded-full bg-[#47510B]" />
            </div>
          </div>
        </div>

        {/* Floating Notification Badge */}
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#AB1717] text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-[#FDFAD8] shadow-lg z-40">
          !
        </div>
      </button>
    </div>
    
    <div className="w-full flex flex-col items-center">
      {tab.id === 'schedule' && (<ScheduleTab onViewReport={handleOpenReport} jumpToTab={scrollToTab}/>)}
      {tab.id === 'routes' && <RoutesTab />}
      {tab.id === 'reports' && <ReportsTab onSelectReport={setSelectedReport} />}
      {tab.id === 'training' && <TrainingTab />}
    </div>
  </div>
</section>
          ))}
        </main>

        {/* 5. STATIC FOOTER NAV */}
        <footer className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${(showFooter && !selectedReport) ? "translate-y-0 opacity-100 scale-100" : "translate-y-32 opacity-0 scale-90 pointer-events-none"}`}>
          <nav className="bg-[#47510B]/80 backdrop-blur-2xl border border-white/20 px-3 py-2 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-2">
            {tabs.map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => scrollToTab(tab.id)} 
                className={`flex items-center gap-3 px-6 py-4 rounded-[30px] transition-all duration-500 ${activeTab === tab.id ? "bg-[#CAD23C] text-[#47510B] shadow-xl scale-105" : "text-white/40 hover:text-white/60"}`}
              >
                <div className={`transition-transform duration-500 ${activeTab === tab.id ? "scale-110" : "scale-100"}`}>
                  {tab.icon}
                </div>
                {activeTab === tab.id && (
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in zoom-in duration-300">
                    {tab.label}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default WorkerDashboard;