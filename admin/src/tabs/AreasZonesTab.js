import React, { useState } from 'react';
import { MapPin, ChevronRight, ChevronLeft, Search, Box, Globe, Radio, Activity } from 'lucide-react';

const AreasZonesTab = () => {
  const [viewLevel, setViewLevel] = useState('ZONES'); 
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // --- DATA ---
  const zoneData = [
    {
      id: 'Z-1', name: 'NORTH_SECTOR', code: 'NS-ALPHA', theme: '#FF5B03', 
      areas: [
        { id: 'A-1', name: 'Hillside Drive', location: 'North Ridge', code: 'HSD-44', bins: ['BN-401', 'BN-405'] },
        { id: 'A-2', name: 'University Road', location: 'East Campus', code: 'URD-12', bins: ['BN-502', 'BN-503', 'BN-508'] }
      ]
    },
    {
      id: 'Z-2', name: 'CENTRAL_HUB', code: 'CH-BRAVO', theme: '#CAD23C', 
      areas: [
        { id: 'A-3', name: 'Main Square', location: 'Downtown', code: 'MSQ-01', bins: ['BN-101', 'BN-102'] }
      ]
    }
  ];

  const filteredData = viewLevel === 'ZONES' 
    ? zoneData.filter(z => z.name.includes(searchQuery.toUpperCase()))
    : selectedZone?.areas.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full h-full flex flex-col gap-8 animate-slot">
      
      {/* 🟥 THE "HEAVY BLOCK" HEADER */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#47510B] translate-x-2 translate-y-2 rounded-[40px]" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 bg-[#AB1717] p-6 border-[6px] border-[#47510B] rounded-[40px]">
          <div className="flex items-center gap-5">
            {viewLevel !== 'ZONES' && (
              <button 
                onClick={() => setViewLevel(viewLevel === 'BINS' ? 'AREAS' : 'ZONES')} 
                className="w-12 h-12 flex items-center justify-center bg-[#FDFAD8] text-[#47510B] rounded-full border-[4px] border-[#47510B] hover:scale-110 transition-all"
              >
                <ChevronLeft size={28} strokeWidth={4} />
              </button>
            )}
            <div className="text-white">
              <h2 className="text-4xl font-[1000] italic uppercase tracking-tighter leading-none">
                {viewLevel === 'ZONES' ? 'SECTOR_02' : viewLevel === 'AREAS' ? selectedZone.name : selectedArea.name}
              </h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-1 text-[#FDFAD8]">Matrix_System_Active</p>
            </div>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3 text-[#47510B]" size={20} />
            <input 
              type="text" placeholder="FILTER_NODES..." 
              className="w-full bg-[#FDFAD8] border-[4px] border-[#47510B] rounded-full py-2 pl-12 pr-6 text-xs font-[1000] uppercase outline-none focus:ring-4 focus:ring-[#FFF24D]"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 🌊 CONTENT SCROLL BOX */}
      <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar">
        
        {/* LEVEL 1: ZONES (Sticker Style) */}
        {viewLevel === 'ZONES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-4">
            {filteredData.map(zone => (
              <div key={zone.id} onClick={() => {setSelectedZone(zone); setViewLevel('AREAS');}} className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-[#47510B] translate-x-3 translate-y-3 rounded-[55px]" />
                <div className="relative bg-[#A1AED1] p-8 rounded-[55px] border-[6px] border-[#47510B] transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
                  <div className="flex justify-between items-start mb-10">
                    <div className="bg-[#CAD23C] border-[4px] border-[#47510B] p-4 rounded-[25px] shadow-[4px_4px_0_0_#47510B]">
                      <Globe size={32} className="text-[#47510B]" />
                    </div>
                    <span className="bg-[#AB1717] text-white text-[10px] font-[1000] px-4 py-1.5 rounded-full border-[3px] border-[#47510B] italic uppercase shadow-[3px_3px_0_0_#47510B]">
                      {zone.code}
                    </span>
                  </div>
                  <h3 className="text-4xl font-[1000] text-[#47510B] italic uppercase leading-none">{zone.name}</h3>
                  <div className="mt-6 flex items-center gap-3">
                    <Activity size={16} className="text-[#AB1717]" />
                    <span className="text-xs font-black text-[#47510B] uppercase opacity-60">{zone.areas.length} Areas Found</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LEVEL 2: AREAS (Long-Block Style) */}
        {viewLevel === 'AREAS' && (
          <div className="flex flex-col gap-8 max-w-5xl mx-auto py-4">
            {filteredData.map(area => (
              <div key={area.id} onClick={() => {setSelectedArea(area); setViewLevel('BINS');}} className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-[#47510B] translate-x-2 translate-y-2 rounded-[40px]" />
                <div className="relative flex flex-col md:flex-row items-center bg-[#FDFAD8] border-[6px] border-[#47510B] p-5 rounded-[40px] group-hover:bg-[#FFF24D] transition-colors">
                  <div className="w-20 h-20 rounded-[25px] bg-[#CAD23C] border-[4px] border-[#47510B] flex items-center justify-center text-[#47510B] shadow-[5px_5px_0_0_#47510B]">
                    <MapPin size={36} strokeWidth={3} />
                  </div>
                  <div className="md:ml-8 flex-grow text-center md:text-left mt-4 md:mt-0">
                    <h4 className="text-3xl font-[1000] text-[#47510B] uppercase italic tracking-tighter leading-none">{area.name}</h4>
                    <p className="text-[10px] font-black text-[#AB1717] mt-1 tracking-widest uppercase italic">{area.location} // {area.code}</p>
                  </div>
                  <div className="mt-4 md:mt-0 px-10 py-4 bg-[#47510B] text-[#CAD23C] rounded-[30px] text-2xl font-[1000] italic shadow-[6px_6px_0_0_#AB1717]">
                    {area.bins.length} UNITS
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LEVEL 3: BINS (Hardware Node Style) */}
        {viewLevel === 'BINS' && (
          <div className="flex flex-wrap justify-center gap-10 py-12">
            {selectedArea.bins.map(binId => (
              <div key={binId} className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-[#47510B] translate-x-3 translate-y-3 rounded-[50px]" />
                <div className="relative w-44 h-44 bg-[#CAD23C] rounded-[50px] border-[6px] border-[#47510B] flex flex-col items-center justify-center gap-3 hover:bg-[#FF5B03] transition-colors">
                  <div className="bg-[#47510B] p-3 rounded-full border-[3px] border-white/20">
                    <Box size={24} className="text-white" />
                  </div>
                  <span className="text-[#47510B] font-[1000] text-2xl italic tracking-tighter">{binId}</span>
                  <div className="w-10 h-2 bg-[#47510B]/10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🧭 FOOTER PROGRESS */}
      <div className="flex justify-center p-4">
        <div className="bg-[#47510B] px-8 py-3 rounded-full border-4 border-[#FDFAD8] shadow-[4px_4px_0_0_#AB1717] flex gap-6">
          <div className={`w-3 h-3 rounded-full transition-all ${viewLevel === 'ZONES' ? 'bg-[#FF5B03] scale-150' : 'bg-white/20'}`} />
          <div className={`w-3 h-3 rounded-full transition-all ${viewLevel === 'AREAS' ? 'bg-[#CAD23C] scale-150' : 'bg-white/20'}`} />
          <div className={`w-3 h-3 rounded-full transition-all ${viewLevel === 'BINS' ? 'bg-[#AB1717] scale-150' : 'bg-white/20'}`} />
        </div>
      </div>

    </div>
  );
};

export default AreasZonesTab;