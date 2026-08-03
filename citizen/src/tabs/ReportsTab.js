import React, { useState } from "react";
import { MapPin, Clock, Plus, Trash2, UserCheck, Truck, Camera, Hash, X, AlertTriangle } from "lucide-react";

const ReportsTab = ({ reports = [], onFormToggle }) => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportType, setReportType] = useState(null);

  // CRITICAL: This function must be used to change the form state
  const toggleForm = (state) => {
    setShowReportForm(state);
    if (onFormToggle) onFormToggle(state);
  };

  const recentReports = reports.slice(0, 3);

  return (
    <div className="w-full max-w-[1200px] h-full flex flex-col justify-center py-20 relative">
      
      {!showReportForm ? (
        /* --- LIST VIEW --- */
        <div className="animate-in fade-in zoom-in-95 duration-700">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A1AED1]">Registry_Archives</span>
              <h2 className="text-7xl font-black italic text-[#47510B] uppercase tracking-tighter leading-none">
                Incident <br/> <span className="text-[#FF5B03]">Logs.</span>
              </h2>
            </div>
            <button
              onClick={() => toggleForm(true)}
              className="group bg-[#FF5B03] text-white p-2 pr-10 rounded-[30px] font-black uppercase tracking-widest flex items-center gap-4 hover:shadow-[0_20px_40px_rgba(255,91,3,0.3)] transition-all active:scale-95"
            >
              <div className="w-14 h-14 bg-white/20 rounded-[22px] flex items-center justify-center group-hover:rotate-90 transition-transform">
                <Plus size={24} />
              </div>
              Initialize_Report
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {recentReports.map((report) => (
              <div key={report.id} className="bg-white p-8 rounded-[50px] shadow-xl border-2 border-transparent hover:border-[#FF5B03] transition-all hover:-translate-y-4 duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                  {report.type === 'worker' ? <UserCheck size={40}/> : <Truck size={40}/>}
                </div>
                <span className="text-[10px] font-black text-[#FF5B03] uppercase tracking-widest">{report.status}</span>
                <h3 className="text-2xl font-black text-[#47510B] uppercase italic tracking-tighter mt-2">{report.title}</h3>
                <div className="mt-8 flex items-center gap-3 text-[#A1AED1] font-bold text-[10px] uppercase">
                  <MapPin size={14} /> {report.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* --- FORM VIEW --- */
        <div className="z-[100] bg-white rounded-[60px] p-12 shadow-2xl animate-in slide-in-from-bottom-12 duration-700 relative overflow-hidden">
          <button 
            onClick={() => { toggleForm(false); setReportType(null); }}
            className="absolute top-10 right-10 text-[#A1AED1] hover:text-[#AB1717] transition-colors z-[110]"
          >
            <X size={32} />
          </button>

          {!reportType ? (
            <div className="py-20 text-center">
              <h3 className="text-4xl font-black italic text-[#47510B] uppercase tracking-tighter mb-12">Select_Incident_Protocol</h3>
              <div className="flex justify-center gap-8">
                <button onClick={() => setReportType('waste')} className="w-64 h-80 bg-[#FDFAD8] rounded-[50px] flex flex-col items-center justify-center gap-6 group hover:bg-[#FF5B03] transition-all">
                   <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[#FF5B03] group-hover:scale-110 transition-transform shadow-lg"><Truck size={40}/></div>
                   <span className="font-black uppercase tracking-widest text-[#47510B] group-hover:text-white">Waste & Service</span>
                </button>
                <button onClick={() => setReportType('worker')} className="w-64 h-80 bg-[#FDFAD8] rounded-[50px] flex flex-col items-center justify-center gap-6 group hover:bg-[#CAD23C] transition-all">
                   <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[#CAD23C] group-hover:scale-110 transition-transform shadow-lg"><UserCheck size={40}/></div>
                   <span className="font-black uppercase tracking-widest text-[#47510B] group-hover:text-white">Worker Behavior</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-12 animate-in fade-in duration-500">
              <div className="space-y-6">
                <div className="bg-[#FDFAD8] p-2 rounded-2xl inline-flex gap-2 text-[10px] font-black uppercase mb-4">
                  <span className="px-4 py-2 bg-white rounded-xl shadow-sm">{reportType}</span>
                </div>
                <input type="text" placeholder={reportType === 'waste' ? "Incident Title" : "Worker ID / Name"} className="w-full bg-[#FDFAD8]/50 border-none rounded-[25px] p-6 font-bold text-[#47510B] focus:ring-4 ring-[#FF5B03]/20" />
                <textarea placeholder="Observation details..." rows="4" className="w-full bg-[#FDFAD8]/50 border-none rounded-[25px] p-6 font-bold text-[#47510B] focus:ring-4 ring-[#FF5B03]/20" />
                <div className="flex gap-4">
                    <div className="flex-1 bg-[#FDFAD8]/50 rounded-[25px] p-4 flex items-center gap-4 border-2 border-dashed border-[#A1AED1]"><Camera size={20} className="text-[#A1AED1]" /> <span className="text-[10px] font-black text-[#A1AED1] uppercase tracking-widest">Attach_Image</span></div>
                    <div className="flex-1 bg-[#FDFAD8]/50 rounded-[25px] p-4 flex items-center gap-4 border-2 border-white"><Hash size={20} className="text-[#FF5B03]" /> <input type="text" placeholder="Entry_Code" className="bg-transparent border-none w-full text-[10px] font-black uppercase" /></div>
                </div>
                <button className="w-full bg-[#47510B] text-white py-6 rounded-[30px] font-black uppercase tracking-[0.3em] hover:bg-[#FF5B03] transition-colors">Submit_Transmission</button>
              </div>
              <div className="bg-[#A1AED1]/10 rounded-[40px] p-10 flex flex-col justify-center">
                 <AlertTriangle size={40} className="text-[#FF5B03] mb-6" />
                 <h4 className="text-2xl font-black italic text-[#47510B] uppercase tracking-tighter mb-4">Submission_Guide</h4>
                 <p className="text-[#47510B]/60 font-bold text-sm leading-relaxed">
                   Reports require biometric validation and photographic evidence for priority dispatch. Unauthorized entries will be flagged.
                 </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportsTab;