import React, { useState } from 'react';
import { Play, X, Zap, Cpu, Fingerprint } from 'lucide-react';

const TrainingTab = ({ onFormToggle }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  const modules = [
    { title: 'Waste Segregation', id: '2SoH2d5wru4', color: '#CAD23C', tag: 'ENV_01' },
    { id: 'dBNbA80Snb8', title: 'Recycling 101', color: '#FFB6A9', tag: 'RE_101' },
    { id: 'otmKoaKBbWk', title: 'Home Composting', color: '#E2E98B', tag: 'BIO_X' },
    { id: 'Bb1n_EE-9dQ', title: 'Hazardous Disposal', color: '#A1AED1', tag: 'HAZ_09' },
    { id: 'qS_1_rXvO1s', title: 'Plastic Policy', color: '#FF5B03', tag: 'LAW_12' },
  ];

  const handleOpen = (v) => {
    setActiveVideo(v);
    if (onFormToggle) onFormToggle(true);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-10 overflow-x-auto no-scrollbar">
      
      {/* --- SHUTTER CONTAINER --- */}
      <div className={`flex h-[450px] gap-4 transition-all duration-700 ${activeVideo ? 'opacity-0 scale-95' : 'opacity-100'}`}>
        {modules.map((mod, i) => (
          <div 
            key={i}
            onClick={() => handleOpen(mod)}
            className="relative h-full w-24 hover:w-[450px] bg-white rounded-[40px] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden border-2 border-white shadow-xl group"
          >
            {/* BACKGROUND IMAGE (Shows when shutter opens) */}
            <div className="absolute inset-0 bg-[#47510B]">
               <img 
                src={`https://img.youtube.com/vi/${mod.id}/hqdefault.jpg`} 
                className="w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                alt=""
               />
            </div>

            {/* VERTICAL TITLE (Hidden when closed, or visible as a side-label) */}
            <div className="absolute inset-0 flex items-center justify-center group-hover:hidden transition-all">
                <p className="rotate-180 [writing-mode:vertical-lr] font-black text-[#47510B] uppercase tracking-[0.3em] text-sm opacity-60">
                   {mod.title.replace(' ', '_')}
                </p>
            </div>

            {/* EXPANDED CONTENT (Only visible on hover) */}
            <div className="absolute inset-0 p-10 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
               <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#47510B] shadow-lg">
                     <Fingerprint size={24} />
                  </div>
                  <span className="text-[10px] font-black px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white tracking-widest border border-white/30">
                    {mod.tag}
                  </span>
               </div>

               <div>
                  <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-2">
                    {mod.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-[2px]" style={{ backgroundColor: mod.color }} />
                    <div className="flex items-center gap-2 text-white font-black italic text-sm">
                       <Zap size={16} fill="#FF5B03" className="text-[#FF5B03]" /> +150_XP
                    </div>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#47510B] hover:scale-110 transition-transform">
                     <Play fill="currentColor" size={24} />
                  </div>
                  <p className="text-[10px] font-black text-white/60 tracking-widest uppercase">Initiate_Training_Sequence</p>
               </div>
            </div>

            {/* COLOR ACCENT BAR (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full h-3 group-hover:h-0 transition-all duration-500" style={{ backgroundColor: mod.color }} />
          </div>
        ))}
      </div>

      {/* --- PLAYER VIEWPORT --- */}
      {activeVideo && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-10 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-[#47510B]/98 backdrop-blur-3xl" />
          
          <div className="relative w-full max-w-6xl z-10">
            <div className="flex justify-between items-center mb-8 px-6">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-10 bg-[#FF5B03] rounded-full" />
                    <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">{activeVideo.title}</h2>
                </div>
                <button 
                  onClick={() => { setActiveVideo(null); onFormToggle(false); }}
                  className="bg-[#AB1717] text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black text-[10px] tracking-widest hover:bg-[#FF5B03] transition-all"
                >
                  <X size={20} /> ABORT_MODULE
                </button>
            </div>

            <div className="aspect-video bg-black rounded-[60px] overflow-hidden border-[12px] border-white/5 shadow-2xl">
              <iframe 
                width="100%" height="100%" 
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&modestbranding=1`} 
                frameBorder="0" allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingTab;