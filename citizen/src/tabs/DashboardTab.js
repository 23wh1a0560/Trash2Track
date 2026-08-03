import React from "react";
import { MapPin, Calendar, Award, Zap, Bell, ChevronRight, Activity, ChevronsUpDown } from "lucide-react";

const DashboardTab = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center max-w-[1100px] mx-auto scale-[0.9]">
      
      {/* ========================================================== */}
      {/* 1. PRIMARY: REPORT CANVAS (Depth & Typography) */}
      {/* ========================================================== */}
      <div className="absolute top-10 left-0 w-[65%] h-[420px] bg-white rounded-[70px] 
                      shadow-[0_40px_100px_rgba(161,174,209,0.15)] p-12 
                      z-10 hover:z-50 hover:scale-[1.05] hover:shadow-[0_60px_120px_rgba(161,174,209,0.25)] 
                      transition-all duration-700 cursor-pointer group overflow-hidden">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'radial-gradient(#47510B 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="flex flex-col h-full justify-between z-10 relative">
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 bg-[#FF5B03] rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-[#FF5B03]/20 group-hover:rotate-12 transition-transform">
              <MapPin size={32} />
            </div>
            <div className="p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white group-hover:border-[#FF5B03]/10 transition-colors">
                <Bell size={20} className="text-[#A1AED1] group-hover:text-[#FF5B03]" />
            </div>
          </div>
          
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A1AED1]">Incoming_Signal</span>
            <h2 className="text-8xl font-black italic uppercase tracking-tighter leading-[0.8] text-[#47510B] mt-4 transition-transform group-hover:translate-x-2">
              Latest <br/> Waste <span className="text-[#FF5B03]">Log.</span>
            </h2>
          </div>
        </div>

        {/* Dynamic Detail (Only shows on hover) */}
        <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-100 transition-opacity flex gap-2 rotate-[-15deg] z-0">
            <ChevronsUpDown size={150} className="text-[#FDFAD8]" />
            <ChevronsUpDown size={150} className="text-[#FF5B03]/10" />
        </div>
      </div>

      {/* ========================================================== */}
      {/* 2. SECONDARY: REWARDS ORB (Glassmorphism & Texture) */}
      {/* ========================================================== */}
      <div className="absolute top-0 right-0 w-[40%] h-[380px] bg-[#FFB6A9]/80 backdrop-blur-md rounded-[70px] 
                      shadow-[0_30px_70px_rgba(255,182,169,0.5)] p-10 
                      z-20 hover:z-50 hover:scale-[1.08] hover:shadow-[0_50px_90px_rgba(255,182,169,0.7)] 
                      transition-all duration-700 flex flex-col justify-between border-4 border-white/70 cursor-pointer group overflow-hidden">
        
        {/* Glowing Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <Award size={50} className="text-[#AB1717] z-10 group-hover:scale-110 transition-transform" />
        
        <div className="z-10">
          <p className="text-[110px] font-black text-[#AB1717] leading-none tracking-tighter drop-shadow-[0_4px_10px_rgba(171,23,23,0.3)]">00</p>
          <p className="text-[11px] font-black uppercase text-[#AB1717]/60 tracking-[0.3em] mt-2 text-right">Points_Stored</p>
        </div>

        {/* Large Decorative Chevron */}
        <div className="absolute right-[-30px] top-[-30px] text-[200px] font-black italic opacity-[0.04] text-[#AB1717] pointer-events-none group-hover:translate-x-[-10px] transition-transform duration-700">
          V
        </div>
      </div>

      {/* ========================================================== */}
      {/* 3. TERTIARY: SCHEDULE BAR (Interactive & Kinetic) */}
      {/* ========================================================== */}
      <div className="absolute bottom-10 right-20 w-[55%] h-[170px] bg-[#FFF24D] rounded-[45px] 
                      shadow-[0_25px_60px_rgba(255,242,77,0.4)] p-8 
                      z-30 hover:z-50 hover:scale-[1.05] hover:shadow-[0_40px_80px_rgba(255,242,77,0.6)] 
                      transition-all duration-700 flex items-center gap-8 group border-4 border-white cursor-pointer overflow-hidden">
         
         <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center text-[#FF5B03] shadow-inner group-hover:rotate-[-10deg] transition-transform">
           <Calendar size={32} />
         </div>
         <div className="flex-1 z-10 relative">
            <p className="text-[10px] font-black text-[#FF5B03]/60 uppercase tracking-[0.3em]">Next_Window</p>
            <h3 className="text-4xl font-black italic uppercase text-[#FF5B03] tracking-tighter transition-all group-hover:translate-x-2">
              Waiting_Data
            </h3>
         </div>
         
         {/* Kinetic Zap Graphic (fills space on hover) */}
         <div className="relative group-hover:scale-110 transition-transform">
           <Zap size={60} className="text-[#FF5B03] opacity-10" />
           <Activity size={30} className="absolute inset-0 m-auto text-[#FF5B03] opacity-0 group-hover:opacity-50 transition-all duration-500 scale-150 group-hover:scale-100" />
         </div>
      </div>

    </div>
  );
};

export default DashboardTab;