import React from 'react';
import { BarChart3, TrendingUp, Zap, Target } from 'lucide-react';

const AnalyticsTab = () => (
  <div className="animate-slot flex flex-col gap-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* STAT CARDS */}
      {[
        { label: 'EFFICIENCY', val: '94%', color: '#FF5B03' },
        { label: 'RECOVERY', val: '12.4T', color: '#CAD23C' },
        { label: 'COMPLIANCE', val: '88%', color: '#AB1717' }
      ].map((stat, i) => (
        <div key={i} className="relative">
          <div className="absolute inset-0 bg-[#47510B] translate-x-2 translate-y-2 rounded-[30px]" />
          <div className="relative bg-white border-[5px] border-[#47510B] p-6 rounded-[30px] flex flex-col items-center">
            <p className="text-[10px] font-black text-[#47510B] opacity-40 uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-5xl font-[1000] italic text-[#47510B]" style={{ color: stat.color }}>{stat.val}</h4>
          </div>
        </div>
      ))}
    </div>

    {/* LARGE CHART PLACEHOLDER */}
    <div className="relative">
      <div className="absolute inset-0 bg-[#47510B] translate-x-3 translate-y-3 rounded-[40px]" />
      <div className="relative bg-[#A1AED1] border-[6px] border-[#47510B] p-10 rounded-[40px] h-80 flex items-center justify-center">
        <div className="flex items-end gap-4 h-full w-full max-w-2xl justify-between">
          {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
            <div key={i} className="w-12 bg-[#47510B] rounded-t-xl border-x-[3px] border-t-[3px] border-[#FDFAD8]/20 transition-all hover:bg-[#FF5B03]" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default AnalyticsTab;