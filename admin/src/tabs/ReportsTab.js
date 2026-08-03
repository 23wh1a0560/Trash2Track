import React, { useState } from 'react';
import { 
  Eye, Trash2, X, MapPin, Clock, ShieldAlert,
  HardDrive
} from 'lucide-react';

const ReportsTab = () => {
  const [filter, setFilter] = useState('ALL');
  const [selectedReport, setSelectedReport] = useState(null);

  const complaints = [
    { id: 'REP-772', category: 'SENSOR', code: 'SENS_ERR_01', title: 'Hardware calibration required for Node_77', area: 'GANDHI_NAGAR', zone: 'ZONE_04', time: '20/03/2026', desc: 'Ultrasonic sensor reporting negative values consistently for 4 hours. Likely lens obstruction or hardware drift.', priority: 'HIGH' },
    { id: 'REP-881', category: 'WORKER', code: 'WRK_REP_22', title: 'Illegal dumping detected at Point_B', area: 'SILICON_VALLEY_HQ', zone: 'ZONE_01', time: '21/03/2026', desc: 'Construction debris found next to organic bin. Requires specialized removal vehicle.', priority: 'URGENT' },
    { id: 'REP-902', category: 'CITIZEN', code: 'CIT_APP_09', title: 'Bin lid broken - Sector 5', area: 'OLD_TOWN', zone: 'ZONE_02', time: '22/03/2026', desc: 'Citizen reported via app that the smart-lock is jammed and the lid is partially detached.', priority: 'MEDIUM' },
  ];

  const filteredData = filter === 'ALL' ? complaints : complaints.filter(c => c.category === filter);

  return (
    <div className="w-full h-full flex flex-col gap-4 md:gap-6 font-black italic uppercase tracking-tighter select-none pb-10">
      
      {/* 🏷️ FILTERS */}
      <div className="flex flex-wrap gap-2 md:gap-4 shrink-0">
        {['ALL', 'WORKER', 'SENSOR', 'CITIZEN'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex-grow md:flex-initial px-4 md:px-8 py-2 md:py-3 border-[3px] md:border-[4px] border-[#47510B] rounded-full transition-all shadow-[4px_4px_0_0_#47510B] text-[10px] md:text-sm ${filter === cat ? 'bg-[#AB1717] text-white' : 'bg-white text-[#47510B]'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 📊 TABLE */}
      <div className="flex-grow bg-[#47510B] rounded-[25px] md:rounded-[40px] border-[4px] md:border-[6px] border-[#47510B] overflow-hidden shadow-[8px_8px_0_0_#A1AED1]">
        <div className="w-full h-full overflow-auto bg-white custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead className="sticky top-0 z-20">
              <tr className="bg-[#CAD23C] border-b-[4px] md:border-b-[6px] border-[#47510B]">
                <th className="p-3 md:p-6 text-[#47510B] text-[10px] md:text-base">CODE</th>
                <th className="p-3 md:p-6 text-[#47510B] text-[10px] md:text-base w-[40%] md:w-[50%]">INCIDENT</th>
                <th className="p-3 md:p-6 text-[#47510B] text-[10px] md:text-base hidden sm:table-cell">TIME</th>
                <th className="p-3 md:p-6 text-[#47510B] text-[10px] md:text-base text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((report) => (
                <tr key={report.id} className="border-b-[2px] md:border-b-[4px] border-[#47510B]/10 hover:bg-[#FDFAD8] transition-colors group">
                  <td className="p-3 md:p-6">
                     <span className={`text-[9px] md:text-[11px] font-black px-2 py-0.5 rounded border-2 border-black whitespace-nowrap shadow-[2px_2px_0_0_#000] ${
                       report.category === 'SENSOR' ? 'bg-[#A1AED1]' : 
                       report.category === 'WORKER' ? 'bg-[#FFF24D]' : 'bg-[#CAD23C]'
                     }`}>
                       {report.code}
                     </span>
                  </td>
                  <td className="p-3 md:p-6 font-black text-[#47510B] text-xs md:text-lg leading-tight">
                    {report.title}
                  </td>
                  <td className="p-3 md:p-6 text-[10px] opacity-40 font-bold italic whitespace-nowrap hidden sm:table-cell">
                    {report.time}
                  </td>
                  <td className="p-3 md:p-6">
                    <div className="flex gap-2 md:gap-3 justify-end">
                      <button 
                        onClick={() => setSelectedReport(report)}
                        className="p-2 md:p-3 bg-[#CAD23C] border-2 border-[#47510B] rounded-lg md:rounded-xl shadow-[3px_3px_0_0_#47510B] hover:translate-x-0.5 transition-all"
                      >
                        <Eye size={18}/>
                      </button>
                      <button className="p-2 md:p-3 bg-[#AB1717] text-white border-2 border-[#47510B] rounded-lg md:rounded-xl shadow-[3px_3px_0_0_#47510B]">
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🚩 MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 md:p-8 lg:p-12">
          <div className="absolute inset-0 bg-[#47510B]/90 backdrop-blur-md" onClick={() => setSelectedReport(null)} />
          
          <div className="relative w-full max-w-4xl h-fit max-h-[90vh] bg-[#FDFAD8] border-[4px] md:border-[8px] border-[#47510B] rounded-[30px] md:rounded-[60px] shadow-[15px_15px_0_0_#000] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* MODAL HEADER */}
            <div className="bg-[#AB1717] p-4 md:p-8 text-white flex justify-between items-center border-b-[4px] md:border-b-[8px] border-[#47510B] shrink-0">
              <div className="flex gap-3 md:gap-6 items-center min-w-0">
                <div className="bg-white p-2 md:p-4 rounded-xl md:rounded-[24px] text-[#AB1717] border-2 md:border-4 border-[#47510B] shadow-[3px_3px_0_0_#000] shrink-0">
                  <ShieldAlert size={32} />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] md:text-xs font-black opacity-80 mb-0.5 tracking-widest">REF: {selectedReport.id}</p>
                  <h2 className="text-sm md:text-3xl leading-none truncate uppercase font-[1000]">{selectedReport.category}_INCIDENT</h2>
                </div>
              </div>
              <button onClick={() => setSelectedReport(null)} className="bg-white border-2 md:border-4 border-[#47510B] p-1.5 md:p-3 rounded-lg md:rounded-2xl text-[#47510B] shrink-0 transition-transform active:scale-90">
                <X size={24} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-4 md:p-10 overflow-y-auto custom-scrollbar space-y-4 md:space-y-8 pb-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div className="bg-white border-2 md:border-4 border-[#47510B] p-4 md:p-6 rounded-[20px] md:rounded-[30px] shadow-[4px_4px_0_0_#CAD23C]">
                  <label className="text-[8px] md:text-[11px] text-[#AB1717] block mb-1 font-black">AREA_LOCATION</label>
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-[#47510B]"/>
                    <p className="text-sm md:text-2xl font-black text-[#47510B]">{selectedReport.area}</p>
                  </div>
                </div>
                <div className="bg-white border-2 md:border-4 border-[#47510B] p-4 md:p-6 rounded-[20px] md:rounded-[30px] shadow-[4px_4px_0_0_#A1AED1]">
                  <label className="text-[8px] md:text-[11px] text-[#AB1717] block mb-1 font-black">ZONE_ID</label>
                  <div className="flex items-center gap-2">
                    <HardDrive size={20} className="text-[#47510B]"/>
                    <p className="text-sm md:text-2xl font-black text-[#47510B]">{selectedReport.zone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 md:border-4 border-[#47510B] p-5 md:p-10 rounded-[25px] md:rounded-[50px] shadow-[6px_6px_0_0_#47510B]">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <span className="text-[8px] md:text-xs bg-[#FFF24D] px-2 md:px-4 py-1 rounded-lg border-2 border-[#47510B] font-black uppercase italic">Summary</span>
                  <span className="text-[9px] md:text-xs font-black opacity-30 italic">LOGGED: {selectedReport.time}</span>
                </div>
                <h3 className="text-sm md:text-3xl text-[#47510B] leading-tight md:leading-none mb-3 font-[1000]">{selectedReport.title}</h3>
                <p className="text-[10px] md:text-lg italic font-bold text-[#47510B]/70 leading-relaxed lowercase first-letter:uppercase">
                  {selectedReport.desc}
                </p>
              </div>

              <div className="bg-[#CAD23C] border-2 md:border-4 border-[#47510B] p-5 md:p-8 rounded-[25px] md:rounded-[50px] shadow-[6px_6px_0_0_#47510B] flex flex-col md:flex-row gap-3 md:gap-6">
                 <button className="w-full bg-white border-2 md:border-[4px] border-[#47510B] py-3 md:py-5 rounded-xl md:rounded-[25px] font-[1000] text-xs md:text-lg shadow-[3px_3px_0_0_#47510B]">
                   DISPATCH_UNIT
                 </button>
                 <button onClick={() => setSelectedReport(null)} className="w-full bg-[#47510B] text-white border-2 md:border-[4px] border-[#CAD23C] py-3 md:py-5 rounded-xl md:rounded-[25px] font-[1000] text-xs md:text-lg">
                   RESOLVE_LOG
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsTab;