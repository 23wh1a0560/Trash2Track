import React, { useState } from 'react';
import { User, Search, X, FileText, AlertOctagon, Calendar, CreditCard, ChevronRight, Fingerprint, Clock, ShieldCheck, Zap, HardDrive } from 'lucide-react';

const CitizensTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [activeFilter, setActiveFilter] = useState('PROFILE');

  const citizens = [
    { id: 'CZ-8821', name: 'ARJUN MEHTA', area: 'GANDHI_NAGAR', zone: 'ZONE_A', status: 'ACTIVE', phone: '+91 98XXX XXXXX', joined: '12_JAN_2025' },
    { id: 'CZ-4412', name: 'SARA KHAN', area: 'SILICON_VALLEY', zone: 'ZONE_C', status: 'OVERDUE', phone: '+91 88XXX XXXXX', joined: '05_FEB_2024' },
    { id: 'CZ-9003', name: 'VIKRAM SINGH', area: 'OLD_TOWN', zone: 'ZONE_B', status: 'ACTIVE', phone: '+91 77XXX XXXXX', joined: '22_NOV_2024' },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-6 font-black italic uppercase tracking-tighter select-none">
      
      {/* 📋 DIRECTORY HEADER */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#FFF24D] p-6 rounded-[32px] border-[5px] border-[#47510B] shadow-[8px_8px_0_0_#47510B] shrink-0">
        <div className="flex items-center gap-4 text-[#47510B]">
          <Fingerprint size={40} />
          <h1 className="text-3xl leading-none">CITIZEN_REGISTRY</h1>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#47510B]/40" size={20} />
          <input 
            type="text" 
            placeholder="SEARCH_RECORDS..." 
            className="w-full bg-white border-[4px] border-[#47510B] rounded-2xl p-4 pl-12 outline-none shadow-[4px_4px_0_0_#47510B]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 📋 GRID LIST: pb-28 is the 'Sweet Spot' for no cut-offs */}
      <div className="flex-grow overflow-y-auto pr-2 pb-28 custom-scrollbar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {citizens.map(c => (
          <div 
            key={c.id} 
            onClick={() => setSelectedCitizen(c)} 
            className="bg-white border-[4px] border-[#47510B] p-6 rounded-[35px] shadow-[6px_6px_0_0_#47510B] hover:translate-x-1 hover:shadow-[10px_10px_0_0_#CAD23C] transition-all cursor-pointer flex justify-between items-center group min-h-[110px]"
          >
            <div className="min-w-0">
              <p className="text-[10px] text-[#FF5B03] mb-1 font-bold">{c.id}</p>
              <h3 className="text-2xl text-[#47510B] leading-tight truncate">{c.name}</h3>
              <p className="text-[10px] opacity-50 italic">@{c.area}</p>
            </div>
            <div className="bg-[#47510B] p-2 rounded-xl text-[#FFF24D]">
              <ChevronRight size={24} strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>

      {/* 🏗️ DOSSIER MODAL */}
      {selectedCitizen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-[#47510B]/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedCitizen(null)} />
          
          <div className="relative w-full max-w-5xl h-[85vh] bg-[#FDFAD8] border-[6px] border-[#47510B] rounded-[50px] shadow-[20px_20px_0_0_#000] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* HEADER: No fixed height, let content breathe */}
            <div className="bg-[#47510B] p-8 text-white flex justify-between items-center border-b-[6px] border-[#CAD23C] shrink-0 relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><HardDrive size={200}/></div>
                <div className="flex gap-6 items-center relative z-10">
                    <div className="w-16 h-16 bg-[#FFF24D] border-4 border-white rounded-[20px] flex items-center justify-center text-[#47510B] shadow-[4px_4px_0_0_#000] shrink-0">
                        <User size={36} strokeWidth={3} />
                    </div>
                    <div className="min-w-0">
                        <span className="bg-[#FF5B03] px-3 py-1 rounded-full text-[10px] border-2 border-white shadow-[2px_2px_0_0_#000] inline-block mb-1">DATA_LOCKED</span>
                        <h2 className="text-3xl md:text-5xl leading-none truncate">{selectedCitizen.name}</h2>
                    </div>
                </div>
                <button onClick={() => setSelectedCitizen(null)} className="bg-[#AB1717] border-4 border-white p-3 rounded-2xl hover:scale-110 transition-all shadow-[4px_4px_0_0_#000] ml-4 shrink-0"><X size={28} /></button>
            </div>

            {/* TAB NAV: Using Blue Linen */}
            <div className="bg-[#A1AED1] p-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0 border-b-[4px] border-[#47510B]">
              {['PROFILE', 'REPORTS', 'PENALTIES', 'SCHEDULES', 'SUBS'].map(id => (
                <button 
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  className={`px-6 py-3 rounded-2xl text-[11px] font-black transition-all border-4 whitespace-nowrap ${activeFilter === id ? 'bg-[#FFF24D] text-[#47510B] border-[#47510B] shadow-[4px_4px_0_0_#000]' : 'bg-white/30 text-[#47510B] border-transparent hover:border-[#47510B]'}`}
                >
                  {id}
                </button>
              ))}
            </div>

            {/* CONTENT AREA: Fixed 'Out of Box' issues by removing forced grid spans */}
            <div className="flex-grow p-8 overflow-y-auto pb-16 custom-scrollbar">
              
              {activeFilter === 'PROFILE' && (
                <div className="flex flex-col lg:flex-row gap-8 animate-in slide-in-from-right-4">
                  <div className="flex-1 space-y-6">
                    <div className="bg-white p-6 rounded-[35px] border-4 border-[#47510B] shadow-[6px_6px_0_0_#47510B]">
                      <label className="text-[#AB1717] text-[10px] block mb-2 font-bold">ADDRESS_PRIMARY</label>
                      <p className="text-3xl leading-tight text-[#47510B]">{selectedCitizen.area}</p>
                      <p className="text-[10px] mt-2 opacity-50 underline decoration-2 decoration-[#CAD23C]">SECTOR_7_BLOCK_B_HYD</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl border-4 border-[#47510B] shadow-[4px_4px_0_0_#A1AED1]">
                            <label className="text-[9px] opacity-40">COMM_LINE</label>
                            <p className="text-lg text-[#47510B] truncate">{selectedCitizen.phone}</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border-4 border-[#47510B] shadow-[4px_4px_0_0_#CAD23C]">
                            <label className="text-[9px] opacity-40">TIMESTAMP</label>
                            <p className="text-lg text-[#47510B]">{selectedCitizen.joined}</p>
                        </div>
                    </div>
                  </div>
                  <div className="lg:w-1/3 bg-[#CAD23C] border-[6px] border-[#47510B] rounded-[40px] p-8 text-[#47510B] flex flex-col items-center justify-center text-center shadow-[10px_10px_0_0_#47510B]">
                     <ShieldCheck size={64} className="mb-4" />
                     <h3 className="text-3xl leading-none">VERIFIED</h3>
                     <p className="text-[10px] mt-2 font-bold bg-[#47510B] text-white px-4 py-1 rounded-full uppercase italic">{selectedCitizen.zone}</p>
                  </div>
                </div>
              )}

              {activeFilter === 'REPORTS' && (
                <div className="space-y-4 animate-in slide-in-from-right-4">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-white border-4 border-[#47510B] p-5 rounded-[25px] flex justify-between items-center shadow-[5px_5px_0_0_#47510B]">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="bg-[#FF5B03] p-2 rounded-lg text-white border-2 border-black shrink-0"><Zap size={20}/></div>
                        <h4 className="text-xl text-[#47510B] truncate">LOG_ENTRY_00{i}</h4>
                      </div>
                      <span className="text-[10px] font-black bg-[#47510B] text-white px-5 py-2 rounded-xl shrink-0 ml-2">RESOLVED</span>
                    </div>
                  ))}
                </div>
              )}

              {activeFilter === 'PENALTIES' && (
                <div className="animate-in slide-in-from-right-4">
                  <div className="bg-[#AB1717] border-4 border-black p-8 rounded-[40px] flex flex-col sm:flex-row justify-between items-center shadow-[10px_10px_0_0_#47510B] text-white gap-4">
                    <div className="text-center sm:text-left">
                      <h4 className="text-2xl italic">MIXED_WASTE_PENALTY</h4>
                      <p className="text-[10px] opacity-60 mt-1">REF: PNL-044 // 22_MAR</p>
                    </div>
                    <p className="text-5xl font-black bg-white text-[#AB1717] px-8 py-3 rounded-2xl border-4 border-black">₹500</p>
                  </div>
                </div>
              )}

              {activeFilter === 'SCHEDULES' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in slide-in-from-right-4">
                  {['MON_08:00', 'WED_10:30', 'FRI_09:00'].map(s => (
                    <div key={s} className="bg-white border-4 border-[#47510B] p-6 rounded-[30px] text-center shadow-[6px_6px_0_0_#CAD23C]">
                      <Calendar size={32} className="mx-auto mb-2 text-[#FF5B03]" />
                      <p className="text-sm text-[#AB1717]">{s.split('_')[0]}</p>
                      <p className="text-3xl leading-none text-[#47510B]">{s.split('_')[1]}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeFilter === 'SUBS' && (
                <div className="bg-[#FFF24D] border-[6px] border-[#47510B] p-8 rounded-[40px] flex flex-col md:flex-row justify-between items-center shadow-[10px_10px_0_0_#47510B] animate-in zoom-in-95 gap-6">
                   <div className="text-center md:text-left">
                      <h3 className="text-5xl text-[#47510B] leading-none">PREMIUM_ULTRA</h3>
                      <p className="text-sm opacity-60 mt-2 font-bold italic underline">RENEWAL: APR_2026</p>
                   </div>
                   <p className="text-5xl text-[#AB1717] font-black shrink-0">₹1,200</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizensTab;