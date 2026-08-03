import React from 'react';
import { PlayCircle } from 'lucide-react';

const TrainingTab = () => {
  return (
    <div className="w-full max-w-lg animate-slide-up px-4">      
      <div className="bg-[#A1AED1] p-8 rounded-[50px] border-4 border-[#47510B] shadow-[12px_12px_0_0_#47510B]">
        <div className="aspect-video bg-[#47510B] rounded-[35px] flex items-center justify-center group cursor-pointer overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400')] bg-cover" />
          <PlayCircle size={64} className="text-[#CAD23C] group-hover:scale-125 transition-transform duration-500 relative z-10" />
        </div>
        <div className="mt-6">
          <h4 className="text-xl font-black text-[#47510B] uppercase italic">Proper_Biohazard_Disposal</h4>
          <p className="text-[10px] font-black text-white uppercase tracking-widest mt-1 opacity-60">Module 04 // Duration 05:40</p>
        </div>
      </div>
    </div>
  );
};

export default TrainingTab;