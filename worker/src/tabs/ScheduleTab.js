import React, { useState, useEffect } from 'react';
import { Navigation, AlertCircle, Database, CheckCircle2, Clock, MapPin, Loader2 } from 'lucide-react';

const ScheduleTab = ({ onViewReport, jumpToTab }) => {
  const [verifyingId, setVerifyingId] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (isSyncing) {
      const timer = setTimeout(() => setIsSyncing(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isSyncing]);

  const schedule = [
    { id: 'LOC_04', time: '08:00', area: 'Sector 4', hasReport: true, status: 'pending', type: 'Biohazard' },
    { id: 'LOC_09', time: '10:30', area: 'Zone B', hasReport: false, status: 'pending', type: 'General' },
    { id: 'LOC_12', time: '13:00', area: 'Plaza SQ', hasReport: false, status: 'done', type: 'Recycle' },
    { id: 'LOC_15', time: '15:30', area: 'East Gate', hasReport: true, status: 'pending', type: 'General' },
  ];

  return (
    <div className="w-full flex flex-col relative">
      
      {isSyncing && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[300] bg-[#47510B] text-[#CAD23C] px-6 py-3 rounded-2xl border-2 border-white shadow-2xl flex items-center gap-3 animate-bounce">
          <Loader2 size={18} className="animate-spin" />
          <span className="font-black text-[10px] uppercase tracking-widest text-white">GPS_Syncing_With_Backend...</span>
        </div>
      )}

      <div className="h-[450px] overflow-y-auto no-scrollbar pr-4 -mr-4">
        <div className="relative border-l-4 border-[#47510B]/10 ml-8 pl-6 space-y-10 mr-2">
          {schedule.map((item) => (
            <div key={item.id} className="relative">
              <div className={`absolute -left-[38px] top-1 w-6 h-6 rounded-full border-4 border-[#FDFAD8] z-10 ${item.status === 'done' ? 'bg-[#CAD23C]' : 'bg-[#47510B]'}`} />
              
              <div className="group relative w-full">
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={12} className="text-[#47510B]/40" />
                  <span className="text-[10px] font-black text-[#47510B]/40 uppercase tracking-widest">{item.time}</span>
                  {item.hasReport && (
                    <button 
                      onClick={() => onViewReport(item.id)}
                      className="flex items-center gap-1 bg-[#AB1717] text-white px-2 py-0.5 rounded text-[8px] font-black animate-pulse shadow-md"
                    >
                      <AlertCircle size={10} /> ISSUE_REPORTED
                    </button>
                  )}
                </div>

                <div className={`p-5 rounded-[30px] border-2 flex items-center justify-between ${item.status === 'done' ? 'bg-white/40 border-dashed border-[#47510B]/10' : 'bg-white border-[#47510B] shadow-[6px_6px_0_0_#47510B]'}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className={item.status === 'done' ? 'opacity-20' : 'text-[#CAD23C]'} />
                        <h4 className={`text-xl font-black uppercase italic leading-none ${item.status === 'done' ? 'opacity-20' : 'text-[#47510B]'}`}>{item.area}</h4>
                    </div>
                    <p className="text-[9px] font-bold opacity-30 mt-2 uppercase tracking-tighter">{item.type} // {item.id}</p>
                  </div>

                  {item.status !== 'done' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setVerifyingId(item.id)} 
                        className="p-3 rounded-xl bg-[#FDFAD8] text-[#47510B] border border-[#47510B]/10 hover:bg-[#CAD23C] transition-colors"
                      >
                        <CheckCircle2 size={20} strokeWidth={2.5} />
                      </button>
                      <button 
  onClick={() => {
    setIsSyncing(true);
    // Wait for the GPS sync animation to finish, then jump
    setTimeout(() => {
      jumpToTab("routes"); 
    }, 1500);
  }} 
  className="p-3 rounded-xl bg-[#47510B] text-[#CAD23C] shadow-lg active:scale-90 transition-transform"
>
  <Navigation size={20} strokeWidth={3} />
</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-28 w-full shrink-0"></div>
      </div>

      {verifyingId && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#47510B]/95 backdrop-blur-md">
           <div className="bg-[#FDFAD8] p-8 rounded-[50px] border-[10px] border-white w-full max-w-sm text-center">
             <Database size={40} className="mx-auto text-[#47510B] mb-4" />
             <h3 className="text-xl font-black uppercase italic text-[#47510B]">Admin_Sensor_Sync</h3>
             <button onClick={() => setVerifyingId(null)} className="w-full py-5 bg-[#47510B] text-[#CAD23C] rounded-[25px] font-black uppercase text-sm mt-6 shadow-xl">
                Confirm Completion
             </button>
           </div>
         </div>
      )}
    </div>
  );
};

export default ScheduleTab;