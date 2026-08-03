import React, { useState } from 'react';
import { 
  User, Search, X, Calendar, Clock, ShieldCheck, Zap, 
  ChevronRight, Trophy, AlertOctagon, Fingerprint, 
  Phone, ClipboardList, CheckCircle2, MapPin, MessageSquare,
  History as HistoryIcon 
} from 'lucide-react';

const WorkersTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [activeFilter, setActiveFilter] = useState('INFO');
  const [selectedShift, setSelectedShift] = useState(null);

  const workers = [
    { id: 'WK-102', name: 'KESHAV RAO', code: 'OP_ALPHA_01', area: 'GANDHI_NAGAR_DEPOT', status: 'ACTIVE', phone: '+91 98XXX XXXXX', joined: '12_JAN_2025' },
    { id: 'WK-205', name: 'PRIYA DAS', code: 'OP_BETA_22', area: 'SILICON_VALLEY_HQ', status: 'ON_ROUTE', phone: '+91 88XXX XXXXX', joined: '05_FEB_2024' },
  ];

  const workerStats = {
    currentSchedule: { 
      id: 'SCH-99', date: '22 MAR 2026', time: '06:00 - 14:00', route: 'CIRCUIT_A', zone: 'ZONE_04',
      pickups: [
        { area: 'GULMOHAR_COLONY', bins: 12, status: 'COMPLETED' },
        { area: 'SECTOR_V_MARKET', bins: 8, status: 'IN_PROGRESS' },
        { area: 'PARK_AVENUE_RES', bins: 15, status: 'PENDING' }
      ],
      // DETAILED REPORTS ADDED HERE
      resolvedReports: [
        { id: 'REP-402', type: 'BIN_OVERFLOW', loc: 'GULMOHAR_B3', detail: 'CLEARED_&_DISINFECTED', time: '07:45' },
        { id: 'REP-405', type: 'BLOCKAGE', loc: 'MARKET_ST_01', detail: 'MANUAL_REMOVAL_DONE', time: '09:12' },
        { id: 'REP-410', type: 'CITIZEN_REQ', loc: 'BLOCK_C_RES', detail: 'EXTRA_PICKUP_COMPLETED', time: '10:30' }
      ]
    },
    history: [
      { id: 'SCH-98', date: '21 MAR 2026', time: '06:00 - 14:00', route: 'CIRCUIT_B', zone: 'ZONE_02',
        pickups: [{ area: 'OLD_TOWN_SQ', bins: 20, status: 'COMPLETED' }],
        resolvedReports: [{ id: 'REP-390', type: 'DAMAGED_LID', loc: 'OLD_TOWN_MAIN', detail: 'REPLACED_WITH_SPARE', time: '08:00' }]
      }
    ],
    rewards: [{ id: 'RW-01', title: 'PERFECT_ATTENDANCE', prize: '₹2,000', date: 'MAR_2026' }],
    penalties: [{ id: 'PN-12', title: 'UNAUTHORIZED_STOP', fine: '₹200', date: '10_MAR' }]
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 font-black italic uppercase tracking-tighter select-none">
      
      {/* 🔍 HEADER */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#CAD23C] p-6 rounded-[32px] border-[5px] border-[#47510B] shadow-[8px_8px_0_0_#47510B] shrink-0">
        <div className="flex items-center gap-4 text-[#47510B]">
          <Fingerprint size={40} />
          <h1 className="text-3xl leading-none">WORKER_OPERATIONS</h1>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#47510B]/40" size={20} />
          <input 
            type="text" 
            placeholder="FILTER_STAFF..." 
            className="w-full bg-white border-[4px] border-[#47510B] rounded-2xl p-4 pl-12 outline-none shadow-[4px_4px_0_0_#47510B]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 📋 LIST GRID */}
      <div className="flex-grow overflow-y-auto pr-2 pb-28 custom-scrollbar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {workers.map(w => (
          <div key={w.id} onClick={() => setSelectedWorker(w)} className="bg-white border-[4px] border-[#47510B] p-6 rounded-[35px] shadow-[6px_6px_0_0_#47510B] hover:translate-x-1 transition-all cursor-pointer flex justify-between items-center min-h-[110px]">
            <div className="min-w-0">
              <p className="text-[10px] text-[#AB1717] mb-1 font-bold">{w.code}</p>
              <h3 className="text-2xl text-[#47510B] truncate leading-none mb-1">{w.name}</h3>
              <p className="text-[10px] opacity-40 font-bold">LOC: {w.area}</p>
            </div>
            <ChevronRight size={24} className="text-[#47510B] shrink-0" />
          </div>
        ))}
      </div>

      {/* 🏗️ DOSSIER MODAL */}
      {selectedWorker && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-[#47510B]/90 backdrop-blur-md" onClick={() => setSelectedWorker(null)} />
          
          <div className="relative w-full max-w-5xl h-[85vh] bg-[#FDFAD8] border-[6px] border-[#47510B] rounded-[50px] shadow-[20px_20px_0_0_#000] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* HEADER */}
            <div className="bg-[#47510B] p-6 md:p-8 text-white flex justify-between items-center border-b-[6px] border-[#CAD23C] shrink-0">
              <div className="flex gap-4 items-center min-w-0">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#CAD23C] border-4 border-white rounded-[20px] flex items-center justify-center text-[#47510B] shadow-[4px_4px_0_0_#000] shrink-0">
                  <User size={30} strokeWidth={3} />
                </div>
                <div className="min-w-0">
                  <span className="bg-[#FF5B03] px-3 py-0.5 rounded-full text-[10px] border-2 border-white inline-block mb-1">REF: {selectedWorker.id}</span>
                  <h2 className="text-2xl md:text-4xl leading-none truncate tracking-tighter uppercase">{selectedWorker.name}</h2>
                </div>
              </div>
              <button onClick={() => setSelectedWorker(null)} className="bg-[#AB1717] border-4 border-white p-2 rounded-2xl hover:scale-110 shadow-[4px_4px_0_0_#000] shrink-0 ml-4"><X size={24} /></button>
            </div>

            {/* NAV TABS */}
            <div className="bg-[#A1AED1] p-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0 border-b-[4px] border-[#47510B]">
              {['INFO', 'SCHEDULES', 'HISTORY', 'REWARDS', 'PENALTIES'].map(tab => (
                <button key={tab} onClick={() => setActiveFilter(tab)} className={`px-6 py-3 rounded-2xl text-[11px] font-black border-4 whitespace-nowrap transition-all ${activeFilter === tab ? 'bg-[#FFF24D] border-[#47510B] shadow-[4px_4px_0_0_#000]' : 'bg-white/30 border-transparent hover:border-[#47510B]'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* MODAL CONTENT */}
            <div className="flex-grow p-6 md:p-10 overflow-y-auto pb-16 custom-scrollbar">
              
              {activeFilter === 'INFO' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in slide-in-from-right-4">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white p-6 md:p-8 rounded-[40px] border-4 border-[#47510B] shadow-[8px_8px_0_0_#CAD23C]">
                      <label className="text-[#AB1717] text-[10px] block mb-2 font-bold uppercase tracking-widest">RESIDENCE_LOC</label>
                      <p className="text-2xl md:text-3xl leading-tight text-[#47510B] font-black">{selectedWorker.area}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-6 rounded-3xl border-4 border-[#47510B] shadow-[6px_6px_0_0_#47510B]">
                        <label className="text-[10px] opacity-40 block mb-1">COMM_LINE</label>
                        <p className="text-lg md:text-xl text-[#47510B]">{selectedWorker.phone}</p>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border-4 border-[#47510B] shadow-[6px_6px_0_0_#A1AED1]">
                        <label className="text-[10px] opacity-40 block mb-1">JOIN_DATE</label>
                        <p className="text-lg md:text-xl text-[#47510B]">{selectedWorker.joined}</p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-4 bg-[#CAD23C] border-[6px] border-[#47510B] rounded-[40px] p-8 flex flex-col items-center justify-center text-center shadow-[10px_10px_0_0_#47510B]">
                    <ShieldCheck size={50} className="mb-4 text-[#47510B]" />
                    <h3 className="text-2xl leading-none text-[#47510B] font-black">STATUS:<br/>VERIFIED</h3>
                  </div>
                </div>
              )}

              {activeFilter === 'SCHEDULES' && (
                <div 
                  onClick={() => setSelectedShift(workerStats.currentSchedule)}
                  className="bg-white border-[5px] border-[#FF5B03] p-8 md:p-10 rounded-[40px] shadow-[12px_12px_0_0_#47510B] cursor-pointer hover:bg-[#FDFAD8] flex justify-between items-center group animate-in slide-in-from-bottom-4"
                >
                  <div className="min-w-0">
                    <p className="text-[#FF5B03] text-xs font-black mb-2 uppercase italic">● Live_Operational_Shift</p>
                    <h4 className="text-3xl md:text-4xl text-[#47510B] leading-none truncate font-black">{workerStats.currentSchedule.route}</h4>
                    <p className="text-lg opacity-50 mt-2 font-bold">{workerStats.currentSchedule.time}</p>
                  </div>
                  <ChevronRight size={40} className="text-[#47510B] group-hover:translate-x-2 transition-transform shrink-0 ml-4" />
                </div>
              )}

              {activeFilter === 'HISTORY' && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4">
                  {workerStats.history.map((h, i) => (
                    <div key={i} onClick={() => setSelectedShift(h)} className="bg-white border-4 border-[#47510B] p-6 rounded-[30px] flex justify-between items-center shadow-[6px_6px_0_0_#CAD23C] cursor-pointer hover:scale-[1.01] transition-all">
                      <div className="flex items-center gap-4 min-w-0">
                        <HistoryIcon size={24} className="text-[#47510B] shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-xl md:text-2xl text-[#47510B] truncate leading-none font-black">{h.route}</h4>
                          <p className="text-[10px] opacity-40 font-bold mt-1 uppercase">{h.date}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black bg-[#47510B] text-white px-4 py-2 rounded-xl shrink-0 ml-4 italic">VIEW_LOG</span>
                    </div>
                  ))}
                </div>
              )}

              {activeFilter === 'REWARDS' && (
                <div className="space-y-4 animate-in slide-in-from-right-4">
                  {workerStats.rewards.map(r => (
                    <div key={r.id} className="bg-[#FFF24D] border-4 border-[#47510B] p-8 rounded-[40px] shadow-[10px_10px_0_0_#CAD23C] flex justify-between items-center">
                      <h4 className="text-2xl text-[#47510B] leading-none font-black">{r.title}</h4>
                      <p className="text-4xl md:text-5xl text-[#47510B] font-black shrink-0 ml-4">{r.prize}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeFilter === 'PENALTIES' && (
                <div className="space-y-4 animate-in slide-in-from-right-4">
                  {workerStats.penalties.map(p => (
                    <div key={p.id} className="bg-[#AB1717] border-4 border-black p-8 rounded-[40px] shadow-[10px_10px_0_0_#47510B] flex justify-between items-center text-white">
                      <h4 className="text-2xl italic font-black">{p.title}</h4>
                      <p className="text-4xl md:text-5xl font-black bg-white text-[#AB1717] px-6 py-2 rounded-2xl border-4 border-black shrink-0 ml-4">{p.fine}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 🧾 SHIFT MANIFEST SUB-MODAL (Expanded with Reports) */}
      {selectedShift && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedShift(null)} />
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#FDFAD8] border-[6px] border-[#47510B] rounded-[50px] shadow-[20px_20px_0_0_#000] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
             
             <div className="bg-[#47510B] p-6 text-white flex justify-between items-center border-b-4 border-[#CAD23C] shrink-0">
                <h3 className="text-xl flex items-center gap-3 italic font-black uppercase"><ClipboardList size={28}/> SHIFT_LOG_{selectedShift.id}</h3>
                <button onClick={() => setSelectedShift(null)} className="bg-[#AB1717] border-2 border-white p-2 rounded-xl shrink-0"><X size={24}/></button>
             </div>

             <div className="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar pb-20">
                {/* ZONE & DATE */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border-4 border-[#47510B] shadow-[4px_4px_0_0_#CAD23C]">
                        <label className="text-[10px] opacity-60 block uppercase font-bold">OPERATIONAL_ZONE</label>
                        <p className="text-2xl font-black text-[#47510B] leading-none">{selectedShift.zone}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border-4 border-[#47510B] shadow-[4px_4px_0_0_#A1AED1]">
                        <label className="text-[10px] opacity-60 block uppercase font-bold">LOG_DATE</label>
                        <p className="text-xl font-black text-[#47510B] leading-none">{selectedShift.date}</p>
                    </div>
                </div>

                {/* PICKUP LOCATIONS */}
                <div className="space-y-3">
                    <label className="text-xs text-[#AB1717] font-bold block mb-2 underline underline-offset-4 decoration-2">PICKUP_AREA_LISTING</label>
                    {selectedShift.pickups.map((item, idx) => (
                        <div key={idx} className="bg-white border-2 border-[#47510B] p-4 rounded-2xl flex justify-between items-center shadow-[3px_3px_0_0_#47510B]">
                            <div className="flex items-center gap-3 min-w-0">
                                <MapPin size={18} className="text-[#AB1717] shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-sm font-black text-[#47510B] truncate uppercase italic">{item.area}</p>
                                    <p className="text-[9px] opacity-50 uppercase font-bold">{item.bins} BINS_IDENTIFIED</p>
                                </div>
                            </div>
                            <span className={`text-[9px] font-black px-3 py-1 rounded-lg border-2 border-black shrink-0 uppercase ${item.status === 'COMPLETED' ? 'bg-[#CAD23C]' : item.status === 'IN_PROGRESS' ? 'bg-[#FFF24D]' : 'bg-gray-200'}`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>

                {/* RESOLVED INCIDENT REPORTS DETAILS */}
                <div className="space-y-4">
                    <label className="text-xs text-[#47510B] font-bold block mb-2 border-b-4 border-[#CAD23C] w-fit">INCIDENT_REPORTS_RESOLVED</label>
                    {selectedShift.resolvedReports.length > 0 ? (
                        selectedShift.resolvedReports.map((rep, idx) => (
                            <div key={idx} className="bg-[#A1AED1]/30 border-l-8 border-[#47510B] p-5 rounded-r-2xl space-y-2">
                                <div className="flex justify-between items-center border-b-2 border-black/10 pb-1">
                                    <p className="text-[10px] font-black text-[#AB1717]">{rep.id} // {rep.time}</p>
                                    <span className="text-[9px] font-black bg-[#47510B] text-white px-2 py-0.5 rounded uppercase">RESOLVED</span>
                                </div>
                                <div className="flex gap-3">
                                    <MessageSquare size={16} className="text-[#47510B] shrink-0 mt-1" />
                                    <div className="min-w-0">
                                        <p className="text-sm font-black text-[#47510B] uppercase">{rep.type} @ {rep.loc}</p>
                                        <p className="text-xs opacity-70 italic font-bold tracking-tight lowercase first-letter:uppercase">{rep.detail}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-gray-100 p-4 rounded-xl text-center text-[10px] opacity-50 font-bold italic">NO_INCIDENTS_REPORTED_DURING_THIS_SHIFT</div>
                    )}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkersTab;