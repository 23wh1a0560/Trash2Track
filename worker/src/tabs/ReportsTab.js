import React, { useState } from 'react';
import { AlertTriangle, X, MapPin, User, CheckCircle } from 'lucide-react';

const ReportsTab = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    { 
      id: 'REP-772', 
      title: 'Waste Overflow', 
      cat: 'Waste', 
      loc: 'Sector 4', 
      citizen: 'A. Smith',
      time: '10:45 AM',
      description: 'The bin at the corner of 5th Ave is completely overflowing. Plastic bottles are everywhere on the sidewalk.',
      img: 'https://images.unsplash.com/photo-1605600611284-19561ad7ddf0?auto=format&fit=crop&q=80&w=600',
      status: 'pending' 
    },
    { 
      id: 'REP-801', 
      title: 'Illegal Dumping', 
      cat: 'Waste', 
      loc: 'Zone B', 
      citizen: 'P. Kumar',
      time: '09:20 AM',
      description: 'Someone left old furniture and construction debris near the park entrance.',
      img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=600',
      status: 'pending' 
    }
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      
      <div className="px-6 space-y-4">
        {reports.map((r) => (
          <div 
            key={r.id} 
            onClick={() => setSelectedReport(r)}
            className="bg-white p-5 rounded-[35px] border-4 border-[#47510B] flex items-center gap-5 group cursor-pointer active:scale-95 transition-all shadow-[6px_6px_0_0_#47510B]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#AB1717] text-white flex items-center justify-center animate-pulse">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-black text-[#47510B] uppercase italic leading-none">{r.title}</h4>
              <p className="text-[9px] font-bold opacity-40 mt-1 uppercase tracking-tighter">{r.loc} // {r.id}</p>
            </div>
            <button className="bg-[#CAD23C] px-3 py-2 rounded-xl border-2 border-[#47510B] font-black text-[9px] uppercase">
              View
            </button>
          </div>
        ))}
        <div className="h-64 w-full shrink-0" aria-hidden="true" />
      </div>

      {/* --- REPORT DETAIL MODAL --- */}
      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#47510B]/95 backdrop-blur-xl">
          <div className="bg-[#FDFAD8] w-full max-w-sm rounded-[50px] border-[8px] border-white overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
            
            {/* Header Image */}
            <div className="h-48 w-full relative">
              <img src={selectedReport.img} alt="Evidence" className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedReport(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#AB1717] shadow-xl"
              >
                <X size={20} strokeWidth={3} />
              </button>
              <div className="absolute bottom-4 left-4 bg-[#AB1717] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase">
                Evidence_File_772
              </div>
            </div>

            <div className="p-8 overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-2xl font-black text-[#47510B] uppercase italic leading-none">{selectedReport.title}</h4>
                  <div className="flex items-center gap-2 mt-2 opacity-40">
                    <MapPin size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{selectedReport.loc}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-black opacity-30 uppercase">Submitted</p>
                  <p className="text-[10px] font-black text-[#47510B]">{selectedReport.time}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border-2 border-[#47510B]/5">
                  <User size={16} className="text-[#CAD23C]" />
                  <p className="text-[10px] font-bold text-[#47510B]">Reported by: <span className="opacity-50">{selectedReport.citizen}</span></p>
                </div>
                <div className="p-5 bg-white rounded-3xl border-2 border-[#47510B]/10 italic text-sm text-[#47510B]/80 leading-relaxed">
                  "{selectedReport.description}"
                </div>
              </div>

              <button 
                onClick={() => setSelectedReport(null)}
                className="w-full py-5 bg-[#47510B] text-[#CAD23C] rounded-[25px] font-black uppercase text-sm shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <CheckCircle size={18} /> Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsTab;