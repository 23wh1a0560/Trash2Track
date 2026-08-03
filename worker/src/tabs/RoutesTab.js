import React from 'react';
import { MapPin, Navigation, ShieldCheck, ChevronRight } from 'lucide-react';

const RoutesTab = () => {
  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* MAP VIEW PORT */}
      <div className="w-full h-72 bg-[#CAD23C]/20 rounded-[50px] border-4 border-white shadow-xl relative overflow-hidden group">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* Floating Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#47510B] px-6 py-4 rounded-[30px] text-[#CAD23C] shadow-2xl flex items-center gap-3 border-2 border-white animate-pulse">
          <Navigation size={20} fill="currentColor" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Live_GPS_Link_Active</span>
        </div>

        {/* Map Detail Card Overlay */}
        <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-[25px] flex items-center justify-between border border-white">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#CAD23C] rounded-xl flex items-center justify-center text-[#47510B]"><MapPin size={18}/></div>
                <div>
                    <p className="text-[8px] font-black opacity-40 uppercase">Next Node</p>
                    <p className="text-xs font-black text-[#47510B] uppercase italic">Sector 4 // 5th Ave</p>
                </div>
            </div>
            <ChevronRight size={20} className="text-[#47510B]/20" />
        </div>
      </div>

      {/* ROUTE TELEMETRY */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[35px] border-2 border-[#47510B]/5 shadow-sm">
          <p className="text-[8px] font-black opacity-30 uppercase mb-1">Total Distance</p>
          <p className="text-2xl font-black italic text-[#47510B]">12.4 <span className="text-[10px] not-italic">KM</span></p>
        </div>
        <div className="bg-white p-6 rounded-[35px] border-2 border-[#47510B]/5 shadow-sm">
          <p className="text-[8px] font-black opacity-30 uppercase mb-1">Traffic Delay</p>
          <p className="text-2xl font-black italic text-[#AB1717]">+04 <span className="text-[10px] not-italic text-[#47510B]">MIN</span></p>
        </div>
      </div>

      {/* TURN BY TURN LOG */}
      <div className="bg-[#47510B] rounded-[50px] p-8 text-[#FDFAD8] shadow-2xl border-t-[10px] border-[#CAD23C]">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-8 flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#CAD23C]" /> Optimized_Path_v.2.0
        </h4>
        
        <div className="space-y-10">
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#CAD23C] shadow-[0_0_15px_#CAD23C]"></div>
              <div className="w-0.5 h-16 border-l-2 border-dashed border-[#CAD23C]/20 my-2"></div>
            </div>
            <div className="pt-0">
              <p className="text-[11px] font-black uppercase text-[#CAD23C] italic leading-none mb-2">Depart_Hub</p>
              <p className="text-sm font-bold opacity-80 leading-snug">Exit East Gate via heavy vehicle ramp.</p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-3 h-3 rounded-full bg-white animate-ping"></div>
            <div className="pt-0">
              <p className="text-[11px] font-black uppercase text-white italic leading-none mb-2">Current_Instruction</p>
              <p className="text-lg font-black leading-tight">Turn Left onto 5th Ave toward Sector 4 Overflow.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacer for Dock */}
      <div className="h-32 w-full" />
    </div>
  );
};

export default RoutesTab;