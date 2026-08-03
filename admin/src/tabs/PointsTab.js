import React, { useState } from 'react';
import { Calendar, ChevronDown, LayoutGrid, PlusCircle, MinusCircle, Trophy, AlertOctagon, User, X, CheckCircle2 } from 'lucide-react';

const PointsTab = () => {
  const [day, setDay] = useState('22');
  const [month, setMonth] = useState('MARCH');
  const [year, setYear] = useState('2026');
  const [viewMode, setViewMode] = useState('DAY');

  const [activeProtocol, setActiveProtocol] = useState(null);
  const [entry, setEntry] = useState({ worker: '', points: '', reason: '' });
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const rewards = [
    { id: 'RWD-99', worker: 'RAVI_KUMAR', points: '+50', reason: 'RAPID_RESPONSE_ZONE_B', time: '09:00' },
    { id: 'RWD-87', worker: 'SITA_MAHESH', points: '+20', reason: 'CITIZEN_KUDOS_FEEDBACK', time: '14:30' },
  ];

  const penalties = [
    { id: 'PNL-42', worker: 'JOHN_DOE', points: '-30', reason: 'DELAYED_START_ZONE_A', time: '08:15' },
    { id: 'PNL-12', worker: 'RAHUL_V', points: '-100', reason: 'UNREPORTED_SENSOR_FAILURE', time: '11:45' },
  ];

  const closeAllDropdowns = () => {
    setIsDayOpen(false);
    setIsMonthOpen(false);
    setIsYearOpen(false);
  };

  const closeProtocol = () => {
    setActiveProtocol(null);
    setEntry({ worker: '', points: '', reason: '' });
  };

  return (
    <div className="relative w-full h-full flex flex-col gap-6 font-black italic uppercase tracking-tighter select-none">

      {/* 🛠️ NAVIGATION ENGINE */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">

        {/* VIEW TOGGLE */}
        <div className="xl:col-span-4 flex bg-[#47510B] p-1.5 rounded-2xl border-[3px] border-[#47510B] shadow-[4px_4px_0_0_#A1AED1]">
          <button onClick={() => setViewMode('DAY')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-xs ${viewMode === 'DAY' ? 'bg-[#FFB6A9] text-[#47510B]' : 'text-white/40'}`}><Calendar size={16} /> DAILY_LOG</button>
          <button onClick={() => setViewMode('MONTH')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-xs ${viewMode === 'MONTH' ? 'bg-[#A1AED1] text-[#47510B]' : 'text-white/40'}`}><LayoutGrid size={16} /> MONTHLY_LOG</button>
        </div>

        {/* SELECTOR RIG */}
        <div className="xl:col-span-8 flex bg-[#FFF24D] border-[4px] border-[#47510B] rounded-2xl p-2 items-center shadow-[4px_4px_0_0_#47510B] relative">

          {/* 🎯 CUSTOM DAY */}
          {viewMode === 'DAY' && (
            <div className="relative w-24 border-r-2 border-[#47510B]/20 shrink-0">
              <button onClick={() => { closeAllDropdowns(); setIsDayOpen(!isDayOpen); }} className="w-full flex items-center justify-center gap-1 text-xl text-[#47510B] font-black py-1">
                {String(day).padStart(2, '0')} <ChevronDown size={14} className={isDayOpen ? 'rotate-180' : ''} />
              </button>
              {isDayOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={closeAllDropdowns} />
                  <div className="absolute top-full left-0 mt-2 w-20 bg-white border-[3px] border-[#47510B] rounded-xl shadow-[4px_4px_0_0_#47510B] z-20 overflow-hidden">
                    <div className="max-h-40 overflow-y-auto custom-scrollbar-mini">
                      {[...Array(31)].map((_, i) => (
                        <div key={i} onClick={() => { setDay(i + 1); setIsDayOpen(false); }} className={`p-2 text-center text-sm cursor-pointer hover:bg-[#FFF24D] border-b border-[#47510B]/10 last:border-0 ${day == i + 1 ? 'bg-[#FFB6A9]' : ''}`}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* 🎯 CUSTOM MONTH */}
          <div className="flex-grow relative border-r-2 border-[#47510B]/20 px-4">
            <button onClick={() => { closeAllDropdowns(); setIsMonthOpen(!isMonthOpen); }} className="w-full flex items-center justify-between text-xl text-[#47510B] font-black py-1">
              {month} <ChevronDown size={14} className={isMonthOpen ? 'rotate-180' : ''} />
            </button>
            {isMonthOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={closeAllDropdowns} />
                <div className="absolute top-full left-0 mt-2 w-full bg-white border-[3px] border-[#47510B] rounded-xl shadow-[4px_4px_0_0_#47510B] z-20 overflow-hidden">
                  <div className="max-h-48 overflow-y-auto custom-scrollbar-mini">
                    {['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'].map(m => (
                      <div key={m} onClick={() => { setMonth(m); setIsMonthOpen(false); }} className={`p-3 text-left text-sm cursor-pointer hover:bg-[#FFF24D] border-b border-[#47510B]/10 last:border-0 ${month === m ? 'bg-[#FFB6A9]' : ''}`}>
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 🎯 CUSTOM YEAR */}
          <div className="w-32 relative px-4">
            <button onClick={() => { closeAllDropdowns(); setIsYearOpen(!isYearOpen); }} className="w-full flex items-center justify-between text-xl text-[#47510B] font-black py-1">
              {year} <ChevronDown size={14} className={isYearOpen ? 'rotate-180' : ''} />
            </button>
            {isYearOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={closeAllDropdowns} />
                <div className="absolute top-full left-0 mt-2 w-full bg-white border-[3px] border-[#47510B] rounded-xl shadow-[4px_4px_0_0_#47510B] z-20 overflow-hidden">
                  <div className="max-h-40 overflow-y-auto custom-scrollbar-mini">
                    {['2025', '2026', '2027'].map(y => (
                      <div key={y} onClick={() => { setYear(y); setIsYearOpen(false); }} className={`p-3 text-left text-sm cursor-pointer hover:bg-[#FFF24D] border-b border-[#47510B]/10 last:border-0 ${year === y ? 'bg-[#FFB6A9]' : ''}`}>
                        {y}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div> {/* <-- THIS TAG WAS MISSING */}

      {/* ⚖️ THE LEDGER: DUAL-CHANNEL SCROLL */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
        {/* REWARDS CHANNEL */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="bg-[#CAD23C] border-4 border-[#47510B] p-4 rounded-2xl flex items-center gap-3 shadow-[4px_4px_0_0_#47510B]">
            <Trophy size={20} strokeWidth={3} /> <h2 className="text-xl">INCENTIVE_FEED</h2>
          </div>
          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-4">
            {rewards.map(r => (
              <div key={r.id} className="bg-white border-4 border-[#47510B] p-5 rounded-[32px] flex items-center gap-6 shadow-[4px_4px_0_0_#CAD23C] hover:translate-x-1 transition-transform cursor-crosshair">
                <span className="text-5xl text-[#CAD23C] leading-none">{r.points}</span>
                <div className="min-w-0">
                  <p className="text-[10px] opacity-30 mb-1">{r.id} // {r.time}</p>
                  <h3 className="text-xl truncate">{r.reason}</h3>
                  <p className="text-[10px] bg-[#47510B] text-white px-2 py-0.5 rounded inline-block mt-2">{r.worker}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PENALTIES CHANNEL */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="bg-[#AB1717] border-4 border-[#47510B] p-4 rounded-2xl flex items-center gap-3 shadow-[4px_4px_0_0_#47510B] text-white">
            <AlertOctagon size={20} strokeWidth={3} /> <h2 className="text-xl">INFRACTION_FEED</h2>
          </div>
          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-4">
            {penalties.map(p => (
              <div key={p.id} className="bg-white border-4 border-[#47510B] p-5 rounded-[32px] flex items-center gap-6 shadow-[4px_4px_0_0_#AB1717] hover:translate-x-1 transition-transform cursor-crosshair">
                <span className="text-5xl text-[#AB1717] leading-none">{p.points}</span>
                <div className="min-w-0">
                  <p className="text-[10px] opacity-30 mb-1">{p.id} // {p.time}</p>
                  <h3 className="text-xl truncate">{p.reason}</h3>
                  <p className="text-[10px] bg-[#47510B] text-white px-2 py-0.5 rounded inline-block mt-2">{p.worker}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📥 BOTTOM COMMAND DOCK */}
      <div className="bg-[#47510B] p-5 rounded-[40px] border-[4px] border-white shadow-[10px_10px_0_0_#A1AED1] flex flex-col md:flex-row items-center gap-6">
        <h2 className="text-white text-lg tracking-[0.3em] opacity-50">ADMIN_COMMANDS:</h2>
        <div className="flex-grow grid grid-cols-2 gap-4 w-full">
          <button onClick={() => setActiveProtocol('REWARD')} className="bg-[#CAD23C] border-4 border-white p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#FFF24D] transition-colors active:scale-95">
            <PlusCircle size={20} strokeWidth={3} /> <span className="text-sm">GRANT_REWARD</span>
          </button>
          <button onClick={() => setActiveProtocol('PENALTY')} className="bg-[#AB1717] text-white border-4 border-white p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#FF4D4D] transition-colors active:scale-95">
            <MinusCircle size={20} strokeWidth={3} /> <span className="text-sm">ISSUE_PENALTY</span>
          </button>
        </div>
      </div>

      {/* 🏗️ TRANSACTION PROTOCOL OVERLAY */}
      {activeProtocol && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#47510B]/90 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeProtocol} />
          <div className="relative w-full max-w-xl bg-white border-[8px] border-[#47510B] rounded-[50px] shadow-[20px_20px_0_0_#000] overflow-hidden animate-in zoom-in-95 duration-200">
             {/* ... Modal content stays exactly as you had it ... */}
             <div className={`p-6 border-b-[8px] border-[#47510B] flex justify-between items-center ${activeProtocol === 'REWARD' ? 'bg-[#CAD23C]' : 'bg-[#AB1717] text-white'}`}>
              <div className="flex items-center gap-4">
                {activeProtocol === 'REWARD' ? <Trophy size={32} /> : <AlertOctagon size={32} />}
                <h2 className="text-3xl font-[1000]">{activeProtocol}_ENTRY</h2>
              </div>
              <button onClick={closeProtocol} className="hover:rotate-90 transition-transform"><X size={32} /></button>
            </div>

            <div className="bg-[#FDFAD8] p-6 border-b-[4px] border-[#47510B] italic text-center">
              <p className="text-[10px] opacity-40 mb-2 tracking-[0.5em]">LIVE_TRANSACTION_PREVIEW</p>
              <div className="flex items-center justify-center gap-6">
                <span className={`text-6xl ${activeProtocol === 'REWARD' ? 'text-[#CAD23C]' : 'text-[#AB1717]'}`}>{entry.points || '00'}</span>
                <div className="text-left border-l-4 border-[#47510B] pl-4 max-w-[200px]">
                  <p className="text-xs font-black truncate">{entry.worker || 'PENDING_ID'}</p>
                  <p className="text-[10px] opacity-60 leading-none truncate mt-1">{entry.reason || 'WAITING_FOR_REASON...'}</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] opacity-40">OPERATOR_IDENTIFIER</label>
                  <input type="text" placeholder="RAVI_K" className="w-full bg-gray-100 border-4 border-[#47510B] p-4 rounded-2xl focus:bg-[#FFF24D] outline-none" onChange={e => setEntry({ ...entry, worker: e.target.value.toUpperCase() })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] opacity-40">POINT_MAGNITUDE</label>
                  <input type="number" placeholder="50" className="w-full bg-gray-100 border-4 border-[#47510B] p-4 rounded-2xl focus:bg-[#FFF24D] outline-none" onChange={e => setEntry({ ...entry, points: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] opacity-40">JUSTIFICATION_MANIFEST</label>
                <textarea rows="2" placeholder="STATE THE REASON FOR THIS PROTOCOL..." className="w-full bg-gray-100 border-4 border-[#47510B] p-4 rounded-2xl focus:bg-[#FFF24D] outline-none resize-none" onChange={e => setEntry({ ...entry, reason: e.target.value.toUpperCase() })} />
              </div>

              <button
                disabled={!entry.worker || !entry.reason}
                className={`w-full py-6 rounded-[30px] border-4 border-[#47510B] shadow-[8px_8px_0_0_#47510B] flex items-center justify-center gap-4 text-2xl active:translate-y-2 active:shadow-none transition-all disabled:opacity-20 disabled:grayscale ${activeProtocol === 'REWARD' ? 'bg-[#CAD23C]' : 'bg-[#AB1717] text-white'}`}
              >
                <CheckCircle2 size={28} /> AUTHORIZE_LOG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsTab;