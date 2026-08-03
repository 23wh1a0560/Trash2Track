import React, { useState } from 'react';
import { Calendar, ChevronDown, AlertCircle, User, MapPin, LayoutGrid, Hash, FileText } from 'lucide-react';

const CollectionSchedule = () => {
  const [day, setDay] = useState('22');
  const [month, setMonth] = useState('MARCH');
  const [year, setYear] = useState('2026');
  const [viewMode, setViewMode] = useState('DAY');

  const scheduleLogs = [
    { id: 'SCH-1092', date: '22 MAR', time: '08:45', zone: 'NORTH_SEC', area: 'Hillside Drive', code: 'HSD-44', worker: 'RAVI_KUMAR', bins: '401, 405, 409', report: 'SENSOR_OFFLINE: BIN_405_UNREACHABLE' },
    { id: 'SCH-1104', date: '22 MAR', time: '13:20', zone: 'CENTRAL_HUB', area: 'Main Square', code: 'MSQ-01', worker: 'SITA_MAHESH', bins: '101, 102', report: null },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-6 font-black italic uppercase tracking-tighter">
      
      {/* 🛠️ NAVIGATION ENGINE (REVERTED TO PREVIOUS RIGID STYLE) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-center">
        <div className="xl:col-span-4 flex bg-[#47510B] p-1.5 rounded-2xl border-[3px] border-[#47510B] shadow-[4px_4px_0_0_#A1AED1]">
          <button onClick={() => setViewMode('DAY')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-xs ${viewMode === 'DAY' ? 'bg-[#FFB6A9] text-[#47510B]' : 'text-white/40'}`}><Calendar size={16} /> DAILY_LOG</button>
          <button onClick={() => setViewMode('MONTH')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-xs ${viewMode === 'MONTH' ? 'bg-[#A1AED1] text-[#47510B]' : 'text-white/40'}`}><LayoutGrid size={16} /> MONTHLY_LOG</button>
        </div>

        <div className="xl:col-span-8 flex bg-[#FFF24D] border-[4px] border-[#47510B] rounded-2xl px-4 py-2 items-center gap-4 shadow-[4px_4px_0_0_#47510B]">
          {viewMode === 'DAY' && (
            <div className="flex-1 relative border-r-2 border-[#47510B]/20 pr-2">
              <select value={day} onChange={(e) => setDay(e.target.value)} className="w-full appearance-none bg-transparent text-xl text-[#47510B] outline-none font-black cursor-pointer">
                {[...Array(31)].map((_, i) => <option key={i+1} value={i+1}>{String(i+1).padStart(2, '0')}</option>)}
              </select>
              <ChevronDown className="absolute right-0 top-1 text-[#47510B] pointer-events-none" size={18} />
            </div>
          )}
          <div className="flex-[2] relative border-r-2 border-[#47510B]/20 pr-2">
             <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full appearance-none bg-transparent text-xl text-[#47510B] outline-none font-black cursor-pointer">
                {['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'].map(m => <option key={m} value={m}>{m}</option>)}
             </select>
             <ChevronDown className="absolute right-0 top-1 text-[#47510B] pointer-events-none" size={18} />
          </div>
          <div className="flex-1 relative">
             <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full appearance-none bg-transparent text-xl text-[#47510B] outline-none font-black cursor-pointer">
                {['2025', '2026', '2027'].map(y => <option key={y} value={y}>{y}</option>)}
             </select>
             <ChevronDown className="absolute right-0 top-1 text-[#47510B] pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      {/* 🌊 LOGISTICS MANIFEST (FIXED REPORT PART ONLY) */}
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6 pb-20">
        {scheduleLogs.map((log) => (
          <div key={log.id} className="relative group">
            <div className="absolute inset-0 bg-[#47510B] translate-x-1 translate-y-1 rounded-[32px]" />
            <div className="relative bg-white border-[4px] border-[#47510B] rounded-[32px] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[140px]">
              
              {/* TIME/DATE BLOCK */}
              <div className="md:col-span-2 bg-[#A1AED1] border-b-[4px] md:border-b-0 md:border-r-[4px] border-[#47510B] p-6 flex flex-col items-center justify-center">
                <p className="text-[10px] text-[#47510B] opacity-40 mb-1">{log.date}</p>
                <h2 className="text-4xl text-[#47510B] leading-none mb-2">{log.time}</h2>
                <span className="text-[9px] bg-[#47510B] text-white px-2 py-0.5 rounded uppercase">ID_{log.id}</span>
              </div>

              {/* LOGISTICS CORE */}
              <div className="md:col-span-6 p-6 flex flex-col justify-center gap-4 bg-white hover:bg-[#FDFAD8] transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={14} className="text-[#AB1717]" />
                    <span className="text-[10px] text-[#AB1717] tracking-widest">{log.zone} // {log.code}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl text-[#47510B] leading-tight truncate">{log.area}</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="flex items-center gap-3 bg-[#47510B] p-3 rounded-2xl border-2 border-white shadow-[3px_3px_0_0_#47510B]">
                      <User size={18} className="text-[#FFB6A9]" />
                      <div className="truncate"><p className="text-[8px] text-[#A1AED1] mb-1">UNIT_OPERATOR</p><p className="text-sm text-white truncate">{log.worker}</p></div>
                   </div>
                   <div className="flex items-center gap-3 bg-[#FFF24D] p-3 rounded-2xl border-2 border-[#47510B] shadow-[3px_3px_0_0_#47510B]">
                      <Hash size={18} className="text-[#47510B]" />
                      <div className="truncate"><p className="text-[8px] opacity-50 mb-1">BIN_TELEMETRY</p><p className="text-sm text-[#47510B] truncate">{log.bins}</p></div>
                   </div>
                </div>
              </div>

              {/* ⚠️ THE REPORT PART (FIXED: PROFESSIONAL & READABLE) */}
              <div className={`md:col-span-4 p-6 border-t-[4px] md:border-t-0 md:border-l-[4px] border-[#47510B] flex flex-col justify-center gap-2 ${log.report ? 'bg-[#AB1717]/10' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  {log.report ? <AlertCircle size={20} className="text-[#AB1717]" /> : <FileText size={20} className="opacity-20" />}
                  <span className={`text-[10px] font-black ${log.report ? 'text-[#AB1717]' : 'opacity-20'}`}>
                    {log.report ? 'INCIDENT_LOG_DETAILS' : 'REMARKS'}
                  </span>
                </div>
                
                <p className={`text-sm leading-tight lowercase tracking-normal ${log.report ? 'text-[#47510B] font-black italic' : 'text-[#47510B]/20 italic'}`}>
                  {log.report ? log.report : 'No manual incidents reported for this session.'}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CollectionSchedule;