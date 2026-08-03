import React, { useState } from "react";
// Added ArrowRight to the import list to fix the error
import { Trophy, AlertOctagon, Zap, ArrowUpRight, Gift, ShieldAlert, X, Wallet, Award, Star, Leaf, ArrowRight } from "lucide-react";

const RewardsTab = ({ user, onFormToggle }) => {
  const [isRedeeming, setIsRedeeming] = useState(false);

  const toggleFocus = (state) => {
    setIsRedeeming(state);
    if (onFormToggle) onFormToggle(state);
  };

  // Combining your badge logic into the new UI
  const badges = [
    { icon: <Star size={24} />, title: "Eco_Warrior", desc: "5+ Reports", active: true },
    { icon: <Award size={24} />, title: "Green_Guardian", desc: "10+ Reports", active: false },
    { icon: <Leaf size={24} />, title: "Planet_Protector", desc: "25+ Reports", active: false }
  ];

  return (
    <div className="w-full max-w-[1000px] h-full flex flex-col justify-center py-10 relative">
      
      {!isRedeeming ? (
        <div className="animate-in fade-in zoom-in-95 duration-700">
          
          {/* --- TOP HUD: YOUR POINTS (From your previous logic) --- */}
          <div className="flex gap-6 mb-8">
            <div className="flex-[2] bg-white p-8 rounded-[45px] shadow-xl border-b-[12px] border-[#CAD23C] flex items-center justify-between overflow-hidden relative group">
                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#A1AED1] mb-2">Impact_Score</p>
                    <h2 className="text-7xl font-black italic text-[#47510B] tracking-tighter">
                        {user?.eco_points || 0} <span className="text-[#FF5B03]">PTS</span>
                    </h2>
                    <div className="mt-4 flex items-center gap-2 text-[#CAD23C] font-black text-[10px] uppercase tracking-widest">
                        <Zap size={14} fill="currentColor"/> System_Rank: Advanced_Guardian
                    </div>
                </div>
                <Trophy size={180} className="absolute -right-10 -bottom-10 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
            </div>

            {/* QUICK PENALTY STATUS */}
            <div className="flex-1 bg-[#47510B] p-8 rounded-[45px] shadow-xl flex flex-col justify-center text-white">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#FF5B03] rounded-xl flex items-center justify-center">
                        <ShieldAlert size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Penalties</span>
                </div>
                <h4 className="text-2xl font-black italic uppercase tracking-tighter">Zero_Debt</h4>
                <p className="text-white/40 text-[9px] font-bold uppercase mt-1">Clearance: Level_01</p>
            </div>
          </div>

          {/* --- BADGES ROW (From your previous code) --- */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {badges.map((badge, i) => (
              <div key={i} className={`p-6 rounded-[35px] border-2 transition-all duration-500 flex items-center gap-5 ${badge.active ? 'bg-white border-[#CAD23C] shadow-lg scale-100' : 'bg-white/30 border-dashed border-[#A1AED1]/30 opacity-40 grayscale scale-95'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${badge.active ? 'bg-[#CAD23C] text-[#47510B]' : 'bg-gray-200'}`}>
                  {badge.icon}
                </div>
                <div>
                    <h3 className="font-black text-[#47510B] uppercase text-xs tracking-tight">{badge.title}</h3>
                    <p className="text-[9px] font-bold text-[#A1AED1] uppercase">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* --- REDEEM TRIGGER --- */}
          <div className="bg-[#CAD23C] rounded-[40px] p-6 flex items-center justify-between group cursor-pointer hover:shadow-2xl transition-all border-b-4 border-[#47510B]/20" onClick={() => toggleFocus(true)}>
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#47510B] rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Gift size={28} />
                </div>
                <div>
                    <h3 className="text-2xl font-black italic text-[#47510B] uppercase tracking-tighter leading-none">Redeem_Rewards</h3>
                    <p className="text-[10px] font-black uppercase text-[#47510B]/40 tracking-widest mt-1">Convert points to utility credits</p>
                </div>
            </div>
            <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center text-[#47510B]">
                <ArrowRight size={24} />
            </div>
          </div>

        </div>
      ) : (
        /* --- REDEEM MODAL (Focus Mode) --- */
        <div className="bg-white rounded-[60px] p-16 shadow-2xl animate-in slide-in-from-bottom-12 duration-700 relative overflow-hidden">
          <button onClick={() => toggleFocus(false)} className="absolute top-10 right-10 text-[#A1AED1] hover:text-[#AB1717] transition-colors"><X size={40}/></button>
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A1AED1]">Transaction_Interface</span>
            <h2 className="text-6xl font-black italic text-[#47510B] uppercase tracking-tighter">Vault_Redemption</h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { title: "Public_Transit", cost: "500", icon: <Zap/> },
              { title: "Energy_Credit", cost: "1200", icon: <Zap/> },
              { title: "Tax_Rebate", cost: "5000", icon: <Trophy/> }
            ].map((item, i) => (
              <div key={i} className="bg-[#FDFAD8]/50 p-8 rounded-[40px] border-2 border-white hover:border-[#CAD23C] transition-all cursor-pointer group text-center">
                 <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#CAD23C] group-hover:scale-110 transition-transform shadow-sm">{item.icon}</div>
                 <h4 className="font-black uppercase text-[#47510B] tracking-tight mb-2">{item.title}</h4>
                 <p className="text-[#CAD23C] font-black italic text-2xl">{item.cost} <span className="text-[10px] uppercase font-bold text-[#A1AED1]">pts</span></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsTab;