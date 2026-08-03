import React, { useState, useRef , useEffect} from "react";
import { Settings, LayoutGrid, Clipboard, Calendar, Trophy, LogOut, Bell, User, X, Shield, Mail, Zap, Fingerprint, Activity, AlertCircle, CheckCircle, Info, BookOpen, FileText, ArrowLeft } from "lucide-react";
import DashboardTab from "../tabs/DashboardTab";
import ReportsTab from "../tabs/ReportsTab";
import ScheduleTab from "../tabs/ScheduleTab";
import RewardsTab from "../tabs/RewardsTab";
import TrainingTab from "../tabs/TrainingTab";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  navigate("/"); 
};
const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const scrollRef = useRef(null);
  const isScrollingRef = useRef(false);
  

  const [reports, setReports] = useState([
    { id: 1, title: "Overflowing Bin", status: "reported", location: "Sector 4", created_at: "10:30 AM", type: "waste" },
    { id: 2, title: "Pickup Missed", status: "in_progress", location: "Zone B", created_at: "Yesterday", type: "waste" },
    { id: 3, title: "John Doe", status: "resolved", location: "Route 09", created_at: "2 days ago", type: "worker" }
  ]);

  const tabs = [
    { id: "home", label: "Core", icon: <LayoutGrid size={24} />, color: "#FF5B03" },
    { id: "report", label: "Log", icon: <FileText size={24} />, color: "#CAD23C" },
    { id: "training", label: "Learn", icon: <BookOpen size={24} />, color: "#E2E98B" },
    { id: "schedule", label: "Plan", icon: <Calendar size={24} />, color: "#FFB6A9" },
    { id: "rewards", label: "Vault", icon: <Trophy size={24} />, color: "#A1AED1" },
  ];

  const alerts = [
    { id: 1, type: "success", title: "Credit_Sync", msg: "+50 EcoPoints verified", time: "2m ago", icon: <CheckCircle size={14} /> },
    { id: 2, type: "alert", title: "Log_Warning", msg: "Area_04 reporting overflow", time: "1h ago", icon: <AlertCircle size={14} /> },
    { id: 3, type: "info", title: "System_Update", msg: "V2.4 Node active", time: "5h ago", icon: <Info size={14} /> },
  ];

  const scrollToTab = (tabId) => {
    const index = tabs.findIndex(t => t.id === tabId);
    isScrollingRef.current = true;
    setActiveTab(tabId);
    scrollRef.current.scrollTo({ left: index * window.innerWidth, behavior: "smooth" });
    setTimeout(() => { isScrollingRef.current = false; }, 600);
  };

  const handleScroll = () => {
    if (scrollRef.current && !isScrollingRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / window.innerWidth);
      if (tabs[index] && tabs[index].id !== activeTab) {
        setActiveTab(tabs[index].id);
      }
    }
  };
  

  return (
    <div className="h-screen bg-[#FDFAD8] font-sans relative overflow-hidden perspective-1000">

      {/* --- NOTIFICATION HUD --- */}
      <div className={`fixed inset-0 z-[70] transition-all duration-500 ${isNotifyOpen ? "visible" : "invisible pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-[#47510B]/5 backdrop-blur-sm transition-opacity ${isNotifyOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsNotifyOpen(false)} />
        <aside className={`absolute top-0 right-0 h-full w-[350px] bg-white/80 backdrop-blur-2xl border-l border-white/50 p-10 shadow-2xl transition-transform duration-500 ease-out ${isNotifyOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center mb-12">
            <h4 className="text-xl font-black italic text-[#47510B] uppercase tracking-tighter">System_Alerts</h4>
            <button onClick={() => setIsNotifyOpen(false)} className="text-[#A1AED1] hover:text-[#FF5B03] transition-colors"><X size={24} /></button>
          </div>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-5 rounded-[28px] bg-white border border-[#FDFAD8] shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                <div className="flex gap-4 items-start relative z-10">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${alert.type === 'success' ? 'bg-[#CAD23C]/20 text-[#47510B]' : 'bg-[#FFB6A9]/20 text-[#AB1717]'}`}>{alert.icon}</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#A1AED1] mb-1">{alert.title}</p>
                    <p className="text-sm font-bold text-[#47510B] leading-tight">{alert.msg}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* --- PROFILE LAYER --- */}
      <div className={`absolute inset-0 z-[80] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center p-6 md:p-12 ${isProfileOpen ? "opacity-100 scale-100 rotate-0 translate-z-0" : "opacity-0 scale-125 rotate-12 translate-z-[-500px] pointer-events-none"}`}>
        <div className="w-full h-full bg-[#FDFAD8] rounded-[60px] shadow-2xl relative overflow-hidden flex flex-col border-[12px] border-white">
          <button onClick={() => setIsProfileOpen(false)} className="absolute top-8 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#47510B] hover:rotate-90 transition-transform shadow-xl z-50">
            <X size={28} />
          </button>

          <div className="flex-1 overflow-y-auto no-scrollbar p-10 md:p-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
              <div className="flex-1">
                <h3 className="text-6xl md:text-7xl font-black italic text-[#47510B] uppercase tracking-tighter leading-[0.85]">
                  {user?.fullName || "Alex"}<br />
                  <span className="text-[#CAD23C]">Vanguard.</span>
                </h3>
              </div>
              <div className="bg-[#47510B] text-[#CAD23C] p-8 rounded-[40px] min-w-[300px] shadow-2xl rotate-3">
                <div className="flex justify-between items-start mb-6">
                  <Fingerprint size={40} />
                  <span className="text-[10px] font-black border border-[#CAD23C]/30 px-3 py-1 rounded-full">LEVEL_04</span>
                </div>
                <p className="font-black uppercase tracking-widest text-xs opacity-60">Active Plan</p>
                <h4 className="text-3xl font-black italic uppercase">Urban_Elite</h4>
                <p className="mt-4 text-[10px] font-bold opacity-80 uppercase tracking-tighter">Next Renewal: 24 May 2026</p>
              </div>
            </div>

            {/* UPGRADED HEADER: BIG BUTTON & ECO POINTS */}
            <div className="flex justify-between items-center mb-10 px-4">
              <button
                onClick={() => setIsEditOpen(true)}
                className="group flex items-center gap-4 bg-[#47510B] text-[#FFF24D] px-10 py-5 rounded-[24px] font-[1000] text-xl uppercase italic tracking-tighter border-4 border-[#FFF24D]/20 shadow-[12px_12px_0px_0px_#2A3106] hover:shadow-[4px_4px_0px_0px_#2A3106] hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 active:shadow-none transition-all duration-150"
              >
                <Settings size={28} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500" />
                <span>Edit_Profile</span>
              </button>

              <div className="flex flex-col items-end rotate-3">
                <p className="text-[10px] font-black text-[#47510B]/40 uppercase tracking-[0.3em]">Total_Rewards</p>
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-black text-[#FF5B03] italic leading-none">
                    {user?.eco_points || "1,250"}
                  </span>
                  <div className="bg-[#FFF24D] px-2 py-1 rounded-lg border-2 border-[#47510B] text-[10px] font-black text-[#47510B]">
                    PTS
                  </div>
                </div>
              </div>
            </div>

            {/* --- ACTIVITY HISTORY --- */}
            <div className="mt-12 mb-8 border-t border-[#47510B]/10 pt-12">
              <div className="flex items-baseline gap-4">
                <h4 className="text-4xl md:text-5xl font-black italic text-[#47510B] uppercase tracking-tighter">
                  My_History<span className="text-[#CAD23C]">.</span>
                </h4>
                <p className="text-[10px] font-black text-[#A1AED1] uppercase tracking-[0.3em] mb-1">90_Day_Archive</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full max-w-full overflow-hidden">
              {/* COL 1: REPORTS */}
              <div className="flex flex-col bg-white/40 rounded-[35px] p-5 border border-white/60 shadow-sm w-full">
                <h5 className="flex items-center gap-2 font-black uppercase tracking-widest text-[#47510B] text-[11px] mb-4"><Activity size={16} /> REPORTS</h5>
                <div className="h-[320px] overflow-y-auto pr-1 space-y-3 custom-scrollbar w-full">
                  {[...reports].reverse().map(r => (
                    <div key={r.id} className="bg-white p-4 rounded-[24px] border border-[#A1AED1]/10 min-h-[90px] flex flex-col justify-center w-full">
                      <p className="text-[9px] font-black text-[#A1AED1] uppercase tracking-tighter">{r.created_at}</p>
                      <p className="font-black text-[#47510B] text-base leading-tight uppercase italic">{r.title}</p>
                      <div className="mt-1"><span className="text-[8px] font-black uppercase bg-[#CAD23C]/30 px-2 py-0.5 rounded-full text-[#47510B]">{r.status}</span></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* COL 2: PICKUPS */}
              <div className="flex flex-col bg-white/40 rounded-[35px] p-5 border border-white/60 shadow-sm w-full">
                <h5 className="flex items-center gap-2 font-black uppercase tracking-widest text-[#47510B] text-[11px] mb-4"><Calendar size={16} /> PICKUPS</h5>
                <div className="h-[320px] overflow-y-auto pr-1 space-y-3 custom-scrollbar w-full">
                  {[{ d: "MAR 05", s: "OK" }, { d: "MAR 02", s: "OK" }, { d: "FEB 28", s: "FAIL" }, { d: "FEB 24", s: "OK" }].map((item, i) => (
                    <div key={i} className="bg-white/60 border-2 border-dashed border-[#A1AED1]/20 rounded-[24px] p-4 flex items-center justify-between min-h-[90px] w-full">
                      <div><p className="text-xl font-black text-[#47510B] italic">{item.d}</p><p className="text-[8px] font-black opacity-40 uppercase tracking-widest">Confirmed</p></div>
                      <div className={`text-[10px] font-black px-3 py-1 rounded-xl ${item.s === 'OK' ? 'bg-[#CAD23C] text-[#47510B]' : 'bg-red-500 text-white'}`}>{item.s}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* COL 3: SUBSCRIPTIONS */}
              <div className="flex flex-col bg-[#47510B]/5 rounded-[35px] p-5 border border-[#47510B]/10 w-full">
                <h5 className="flex items-center gap-2 font-black uppercase tracking-widest text-[#47510B] text-[11px] mb-4"><Zap size={16} /> SUBSCRIPTIONS</h5>
                <div className="h-[320px] overflow-y-auto pr-1 space-y-2 custom-scrollbar w-full">
                  {["MAR_26", "FEB_26", "JAN_26", "DEC_25"].map((month) => (
                    <div key={month} className="flex justify-between items-center bg-white p-5 rounded-[20px] shadow-sm min-h-[90px] w-full group hover:bg-[#CAD23C] transition-all">
                      <div><span className="font-black text-lg text-[#47510B] tracking-tight group-hover:text-white uppercase italic">{month}</span><p className="text-[8px] font-black opacity-30 group-hover:text-white/60 uppercase italic">Verified</p></div>
                      <div className="flex items-center gap-2"><span className="font-black text-[10px] text-[#47510B] group-hover:text-white">$29.00</span><CheckCircle size={16} className="text-[#CAD23C] group-hover:text-white" /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- DASHBOARD LAYER --- */}
      <div className={`h-full w-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col origin-left z-20 ${isProfileOpen ? "scale-50 opacity-0 -translate-x-full rotate-y-45 pointer-events-none" : "scale-100 opacity-100 translate-x-0 rotate-y-0"}`}>
        <header className={`fixed top-0 w-full max-w-[1100px] left-1/2 -translate-x-1/2 pt-10 px-8 flex justify-between items-center z-50 transition-all duration-500 ${isFormActive ? "-translate-y-32 opacity-0" : "translate-y-0 opacity-100"}`}>
  <h2 className="text-3xl font-black italic text-[#47510B] uppercase tracking-tighter">{activeTab}<span className="text-[#FF5B03]">.</span></h2>
  
  {/* --- ACTION HUD GROUP --- */}
  <div className="flex items-center gap-3">
    {/* Notification */}
    <button 
      onClick={() => setIsNotifyOpen(true)} 
      className="bg-white/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 text-[#47510B]/60 hover:text-[#47510B] transition-all relative shadow-sm"
    >
      <Bell size={20} />
      <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 bg-[#FF5B03] rounded-full" />
    </button>

    {/* Profile */}
    <button 
      onClick={() => setIsProfileOpen(true)} 
      className="bg-white/60 backdrop-blur-md p-1.5 pr-5 rounded-2xl flex items-center gap-3 border border-white shadow-sm text-[#47510B] hover:bg-white transition-all group"
    >
      <div className="w-9 h-9 rounded-xl bg-[#47510B] flex items-center justify-center text-[#CAD23C] group-hover:scale-105 transition-transform">
        <User size={18} />
      </div>
      <span className="font-black text-[10px] uppercase tracking-[0.2em]">
  {user ? JSON.stringify(user) : "NO USER"}
</span>
    </button>

    {/* Logout - Pure Minimal Icon */}
<button 
  onClick={handleLogout} 
  className="p-3.5 text-[#AB1717] hover:scale-110 active:scale-90 transition-all group relative ml-1"
  title="Exit System"
>
  <div className="absolute inset-0 rounded-full bg-[#AB1717]/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
  
  <LogOut size={22} className="relative z-10 group-hover:-translate-x-1 transition-transform" />
</button>
  </div>
</header>

        <main ref={scrollRef} onScroll={handleScroll} className="flex-1 flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
          <section className="min-w-full h-full snap-start flex items-center justify-center px-10"><DashboardTab /></section>
          <section className="min-w-full h-full snap-start flex items-center justify-center px-10"><ReportsTab reports={reports} onFormToggle={(isActive) => setIsFormActive(isActive)} /></section>
          <section className="min-w-full h-full snap-start flex items-center justify-center px-10"><TrainingTab onFormToggle={(isActive) => setIsFormActive(isActive)} /></section>
          <section className="min-w-full h-full snap-start flex items-center justify-center px-10"><ScheduleTab onFormToggle={(isActive) => setIsFormActive(isActive)} /></section>
          <section className="min-w-full h-full snap-start flex items-center justify-center px-10"><RewardsTab onFormToggle={(isActive) => setIsFormActive(isActive)} /></section>
        </main>

        <footer className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isFormActive ? "translate-y-32 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
          <nav className="bg-[#A1AED1]/85 backdrop-blur-3xl border border-white/30 px-4 py-3.5 rounded-[40px] shadow-2xl flex items-center gap-3">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => scrollToTab(tab.id)} className={`flex items-center gap-3 px-6 py-4 rounded-[30px] transition-all duration-500 group ${activeTab === tab.id ? "bg-white shadow-xl scale-110" : "text-white/50 hover:text-white"}`}>
                <div className="group-hover:scale-110 transition-transform" style={{ color: activeTab === tab.id ? tab.color : 'inherit' }}>{tab.icon}</div>
                {activeTab === tab.id && <span className="text-[11px] font-black uppercase tracking-widest text-[#47510B]">{tab.label}</span>}
              </button>
            ))}
          </nav>
        </footer>
      </div>

      {/* --- EDIT PROFILE MODAL --- */}
      {isEditOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#47510B]/80 backdrop-blur-sm transition-opacity" onClick={() => setIsEditOpen(false)} />
          <div className="relative bg-[#FDFAD8] w-full max-w-lg rounded-[50px] border-[10px] border-[#FFF24D] p-8 shadow-[25px_25px_0px_#2A3106] animate-in fade-in zoom-in duration-300">
            {!isVerifying ? (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-4xl font-black italic text-[#47510B] uppercase tracking-tighter leading-none">Update<br />PROFILE</h3>
                    <div className="h-1.5 w-16 bg-[#FF5B03] mt-2" />
                  </div>
                  <button onClick={() => setIsEditOpen(false)} className="text-[#AB1717] hover:scale-110 transition-transform"><X size={35} strokeWidth={3} /></button>
                </div>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#47510B] uppercase ml-2 opacity-50">Phone</label>
                    <input type="tel" defaultValue={user?.phone} placeholder="+91 00000 00000" className="w-full p-4 bg-white rounded-2xl border-4 border-[#A1AED1]/20 focus:border-[#47510B] outline-none font-black text-[#47510B]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#47510B] uppercase ml-2 opacity-50">Email_address</label>
                    <input type="email" defaultValue={user?.email} placeholder="citizen@vanguard.com" className="w-full p-4 bg-white rounded-2xl border-4 border-[#A1AED1]/20 focus:border-[#47510B] outline-none font-black text-[#47510B]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#47510B] uppercase ml-2 opacity-50">Residence</label>
                    <textarea defaultValue={user?.address} placeholder="Street, Sector, Zone..." className="w-full p-4 bg-white rounded-2xl border-4 border-[#A1AED1]/20 focus:border-[#47510B] outline-none font-black text-[#47510B] h-24 resize-none" />
                  </div>
                  <div className="space-y-1 border-t-2 border-[#47510B]/5 pt-4">
                    <label className="text-[10px] font-black text-[#FF5B03] uppercase ml-2">New_Password</label>
                    <input type="password" placeholder="LEAVE BLANK IF NO CHANGE" className="w-full p-4 bg-white rounded-2xl border-4 border-[#FF5B03]/20 focus:border-[#FF5B03] outline-none font-black text-[#47510B]" />
                  </div>
                </div>
                <div className="mt-8 flex gap-3">
                  <button onClick={() => setIsEditOpen(false)} className="flex-1 py-4 bg-white border-4 border-[#47510B] rounded-2xl font-black uppercase text-[#47510B]">Abort</button>
                  <button onClick={() => setIsVerifying(true)} className="flex-1 py-4 bg-[#47510B] text-[#CAD23C] rounded-2xl font-black uppercase shadow-[0_6px_0_0_#2A3106] active:translate-y-1 active:shadow-none">Verify_Save</button>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-[#FFF24D] rounded-full border-4 border-[#47510B] flex items-center justify-center mx-auto mb-6 animate-bounce"><Zap size={40} className="text-[#47510B]" /></div>
                <h3 className="text-3xl font-black italic text-[#47510B] uppercase">Verifying</h3>
                <p className="text-[11px] font-black text-[#47510B]/60 uppercase tracking-widest mt-2 px-10 leading-relaxed">A security link has been dispatched to your contact points. Confirm to finalize system update.</p>
                <button onClick={() => { setIsVerifying(false); setIsEditOpen(false); }} className="mt-8 w-full py-4 bg-[#AB1717] text-white rounded-2xl font-black uppercase italic shadow-[0_6px_0_0_#5E0E0E] active:translate-y-1 active:shadow-none">done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;