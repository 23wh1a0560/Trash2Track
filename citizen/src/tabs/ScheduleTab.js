import React, { useState } from "react";
import { Clock, Truck, ArrowRight, Zap, Calendar, Hash, Trash2, X } from "lucide-react";

const mockSchedule = [
  { day: "Monday", time: "07:00", type: "General Waste", color: "#47510B" },
  { day: "Wednesday", time: "07:00", type: "Recyclables", color: "#CAD23C" },
  { day: "Friday", time: "07:00", type: "Organic Waste", color: "#FF5B03" },
];

const ScheduleTab = ({ onFormToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync with Dashboard's menu visibility
  const handleToggle = (state) => {
    setIsExpanded(state);
    if (onFormToggle) onFormToggle(state); // This hides/shows the menu
  };

  return (
    <div className="w-full max-w-[900px] h-full flex flex-col justify-center py-10 relative">
      
      {/* --- MINIMALIST HEADER --- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#47510B] rounded-2xl flex items-center justify-center text-[#FDFAD8]">
          <Calendar size={24} />
        </div>
        <div>
          <h2 className="text-4xl font-black italic text-[#47510B] uppercase tracking-tighter leading-none">
            Dispatch_Plan<span className="text-[#FF5B03]">.</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A1AED1]">Region_04 / Weekly_Rotation</p>
        </div>
      </div>

      {/* --- COMPACT RECTANGULAR CARDS --- */}
      <div className="space-y-3 mb-6">
        {mockSchedule.map((item, index) => (
          <div key={index} className="bg-white/60 backdrop-blur-sm p-4 rounded-3xl flex items-center justify-between border border-white/50 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-24 text-center py-2 rounded-2xl font-black uppercase text-[11px] tracking-widest text-white shadow-md" style={{ backgroundColor: item.color }}>
                {item.day}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-[#A1AED1] tracking-widest">Type</p>
                <p className="text-sm font-bold text-[#47510B] uppercase">{item.type}</p>
              </div>
            </div>
            <div className="text-right pr-4">
              <p className="text-[10px] font-black uppercase text-[#A1AED1] tracking-widest">Window</p>
              <div className="flex items-center gap-1.5 text-sm font-black text-[#47510B]">
                <Clock size={14} className="text-[#CAD23C]" /> {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- EXPANDABLE SPECIAL PICKUP MODULE (Linked to Menu) --- */}
      <div className={`bg-[#47510B] rounded-[35px] transition-all duration-500 overflow-hidden border border-white/10 shadow-2xl ${isExpanded ? 'p-8' : 'p-6'}`}>
        
        {!isExpanded ? (
          /* CLOSED STATE */
          <div 
            onClick={() => handleToggle(true)}
            className="flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#CAD23C] rounded-2xl flex items-center justify-center text-[#47510B] group-hover:rotate-12 transition-transform">
                <Truck size={28} />
              </div>
              <div>
                <h4 className="text-xl font-black italic text-white uppercase tracking-tighter">Special_Pickup_Request</h4>
                <p className="text-[9px] font-black uppercase text-white/40 tracking-[0.2em]">Initialize Priority Extraction Protocol</p>
              </div>
            </div>
            <div className="bg-[#FF5B03] text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Zap size={20} fill="currentColor" />
            </div>
          </div>
        ) : (
          /* OPEN STATE (The Form) */
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-black italic text-white uppercase tracking-tighter">Priority_Dispatch_Details</h4>
                <button 
                  onClick={() => handleToggle(false)} 
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X size={20}/>
                </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-white/40 ml-2">Extraction_Date</label>
                <div className="bg-white/10 rounded-2xl flex items-center px-4 py-3 border border-white/10">
                  <Calendar size={16} className="text-[#CAD23C] mr-3" />
                  <input type="date" className="bg-transparent text-white text-xs font-bold outline-none w-full [color-scheme:dark]" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-white/40 ml-2">Waste_Category</label>
                <div className="bg-white/10 rounded-2xl flex items-center px-4 py-3 border border-white/10">
                  <Trash2 size={16} className="text-[#FF5B03] mr-3" />
                  <select className="bg-transparent text-white text-xs font-bold outline-none w-full appearance-none">
                    <option className="bg-[#47510B]">Bulk_Waste</option>
                    <option className="bg-[#47510B]">Hazardous</option>
                    <option className="bg-[#47510B]">Electronic</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-white/40 ml-2">Area_Code</label>
                <div className="bg-white/10 rounded-2xl flex items-center px-4 py-3 border border-white/10">
                  <Hash size={16} className="text-[#A1AED1] mr-3" />
                  <input type="text" placeholder="e.g. SEC-04" className="bg-transparent text-white text-xs font-bold outline-none w-full placeholder:text-white/20" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleToggle(false)}
              className="w-full bg-[#CAD23C] text-[#47510B] py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-xl active:scale-95"
            >
              Confirm_Extraction_Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleTab;