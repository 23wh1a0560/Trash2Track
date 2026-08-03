import React from 'react';
// Adding the missing imports that caused your crash
import { Trash2, Filter, Search } from 'lucide-react';

const BinMonitoringTab = () => {
  const binData = [
    { id: 'BN-401', zone: 'North Sector', capacity: 85, health: 'Good', status: 'Active', code: 'T2T-01' },
    { id: 'BN-402', zone: 'Central Park', capacity: 32, health: 'Needs Cleaning', status: 'Active', code: 'T2T-02' },
    { id: 'BN-403', zone: 'Industrial Area', capacity: 98, health: 'Sensor Error', status: 'Warning', code: 'T2T-03' },
    { id: 'BN-404', zone: 'South Wharf', capacity: 12, health: 'Good', status: 'Offline', code: 'T2T-04' },
    { id: 'BN-405', zone: 'West Plaza', capacity: 65, health: 'Good', status: 'Active', code: 'T2T-05' },
    { id: 'BN-406', zone: 'East Gate', capacity: 45, health: 'Good', status: 'Active', code: 'T2T-06' },
  ];

  return (
    <div className="w-full animate-slot flex flex-col gap-6">
      {/* MODULE TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#A1AED1] p-4 border-[6px] border-[#47510B] rounded-2xl shadow-[4px_4px_0_0_#47510B]">
        <div className="flex items-center gap-3">
          <Trash2 size={24} className="text-[#AB1717]" />
          <h2 className="text-xl font-black italic text-[#47510B] uppercase tracking-tighter">01_BIN_TELEMETRY</h2>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1.5 text-[#47510B] opacity-50" size={14} />
            <input 
              type="text" 
              placeholder="SEARCH_ID..." 
              className="bg-[#FDFAD8] border-2 border-[#47510B] pl-8 pr-3 py-1 text-[10px] font-black rounded-lg focus:outline-none w-32 md:w-48" 
            />
          </div>
          <div className="bg-[#CAD23C] p-1.5 rounded-lg border-2 border-[#47510B] cursor-pointer hover:bg-[#FDFAD8] transition-colors shadow-[2px_2px_0_0_#47510B]">
            <Filter size={16} />
          </div>
        </div>
      </div>

      {/* BIN CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {binData.map((bin) => (
          <div key={bin.id} className="bg-white border-[6px] border-[#47510B] rounded-[30px] p-5 shadow-[8px_8px_0_0_#A1AED1] hover:translate-y-[-4px] transition-all relative overflow-hidden group">
            {/* Bin Card Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[8px] font-black text-[#AB1717] tracking-[0.3em] uppercase opacity-60">Node_ID</span>
                <h3 className="text-xl font-black text-[#47510B] leading-none mt-1 italic">{bin.id}</h3>
              </div>
              <div className={`flex items-center gap-2 px-2 py-1 border-2 border-[#47510B] rounded-md text-[8px] font-black ${
                bin.status === 'Active' ? 'bg-[#CAD23C]/20 text-[#47510B]' : 'bg-[#AB1717]/20 text-[#AB1717]'
              }`}>
                <div className={`w-2 h-2 rounded-full ${bin.status === 'Active' ? 'bg-[#CAD23C] animate-pulse' : 'bg-[#AB1717]'}`} />
                {bin.status.toUpperCase()}
              </div>
            </div>

            {/* CAPACITY METER */}
            <div className="mb-6">
              <div className="flex justify-between text-[10px] font-black uppercase mb-1.5">
                <span className="tracking-widest opacity-70">Capacity_Load</span>
                <span className={bin.capacity > 85 ? 'text-[#AB1717]' : 'text-[#47510B]'}>{bin.capacity}%</span>
              </div>
              <div className="w-full h-5 bg-[#FDFAD8] border-[3px] border-[#47510B] rounded-full overflow-hidden shadow-inner">
                <div 
                  className={`h-full transition-all duration-1000 border-r-2 border-[#47510B] ${bin.capacity > 85 ? 'bg-[#AB1717]' : 'bg-[#CAD23C]'}`}
                  style={{ width: `${bin.capacity}%` }}
                />
              </div>
            </div>

            {/* STATS TABLE */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t-2 border-[#47510B]/10 pt-4">
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase opacity-40 text-[#47510B]">Sector</span>
                <span className="text-[10px] font-bold text-[#47510B] truncate tracking-tighter">{bin.zone}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase opacity-40 text-[#47510B]">Health_Index</span>
                <span className={`text-[10px] font-bold ${bin.health !== 'Good' ? 'text-[#AB1717]' : 'text-[#47510B]'}`}>{bin.health}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase opacity-40 text-[#47510B]">System_Code</span>
                <span className="text-[10px] font-mono font-bold italic text-[#47510B]">{bin.code}</span>
              </div>
              <button className="bg-[#47510B] text-[#CAD23C] text-[8px] font-black rounded-lg py-2 hover:bg-[#AB1717] hover:text-[#FDFAD8] transition-all shadow-[2px_2px_0_0_#CAD23C] active:shadow-none active:translate-y-0.5 self-end">
                ACCESS_LOGS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinMonitoringTab;