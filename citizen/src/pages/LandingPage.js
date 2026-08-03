import React, { useState, useRef } from "react";
import { Zap, Globe, Layout, Sparkles, ArrowRight, ChevronDown, Trash2,Truck, UserPlus, LogIn } from "lucide-react";
import EntryCard from '../components/EntryCard';
import { setAuthToken } from "../api/axios";
const SystemViewfinder = ({ label = "UNIT_SCAN" }) => (
  <div className="relative w-full h-64 bg-[#47510B]/5 border border-[#47510B]/20 rounded-3xl overflow-hidden group">
    {/* The "Scanning" Line */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-[#CAD23C] opacity-50 shadow-[0_0_15px_#CAD23C] animate-scan" />
    
    {/* Corner Brackets */}
    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#47510B]" />
    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#47510B]" />
    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#47510B]" />
    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#47510B]" />
    
    {/* Center Crosshair */}
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <div className="w-10 h-[1px] bg-[#47510B]" />
      <div className="h-10 w-[1px] bg-[#47510B]" />
    </div>

    {/* Label */}
    <div className="absolute bottom-6 left-6 flex items-center gap-2">
       <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
       <span className="text-[10px] font-black tracking-widest uppercase opacity-40">{label}</span>
    </div>

    <div className="w-full h-full flex items-center justify-center font-black text-[#47510B]/10 text-4xl italic group-hover:scale-110 transition-transform duration-700">
      NO_SIGNAL
    </div>
  </div>
);

const LandingPage = ({ onStart }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const isHorizontalScrolling = useRef(false);

  const cards = [
    { 
        title: "T2T.", 
        sub: "RECLAIM.", 
        color: "#CAD23C", 
        text: "#47510B", 
        isEntry: true, // Special flag for the first card
        tag: "01" 
    },
    { title: "CITY", sub: "REBORN.", color: "#AB1717", text: "#FFFFFF", icon: <Globe size={48} />, tag: "02" },
    { title: "SYSTEM", sub: "GLIMPSE.", color: "#A1AED1", text: "#47510B", icon: <Layout size={48} />, tag: "03" },
    { title: "PURE", sub: "ACTION.", color: "#FF5B03", text: "#FFFFFF", icon: <Sparkles size={48} />, tag: "04" }
  ];

  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (isHorizontalScrolling.current) return;
      if (Math.abs(e.deltaX) > 20) {
        isHorizontalScrolling.current = true;
        if (e.deltaX > 0) {
          setIndex((prev) => (prev + 1) % cards.length);
        } else {
          setIndex((prev) => (prev - 1 + cards.length) % cards.length);
        }
        setTimeout(() => { isHorizontalScrolling.current = false; }, 600);
      }
    }
  };

  const getCardClass = (i) => {
    if (i === index) return "tuck-active";
    if (i === (index + 1) % cards.length) return "tuck-next";
    if (i === (index - 1 + cards.length) % cards.length) return "tuck-prev";
    return "tuck-hidden";
  };

  return (
    <div className="relative bg-[#FDFAD8]" onWheel={handleWheel}>
      
      <section className="deck-stage">
        <div className="blob w-[800px] h-[800px] bg-[#CAD23C] top-[-200px] left-[-200px]" />
        
        <div className="deck-wrapper">
          {cards.map((card, i) => (
            <div key={i} className={`tuck-card ${getCardClass(i)}`} style={{ backgroundColor: card.color, color: card.text }}>
              
              {/* TOP TAG */}
              <div className="flex justify-between items-start">
                <span className="font-black tracking-[0.5em] text-[10px] opacity-40 italic">UNIT_0{card.tag}</span>
                {card.icon && <div className="opacity-80">{card.icon}</div>}
              </div>

              {/* CENTER CONTENT */}
              <div>
                <h1 className="text-[12vw] font-black italic leading-[0.75] tracking-tighter uppercase">
                  {card.title} <br/> <span className="opacity-30">{card.sub}</span>
                </h1>

                {/* SIGN IN / SIGN UP AREA (Only on Card 1) */}
                {card.isEntry && (
                  <div className="mt-12 flex flex-col items-center w-full max-w-[280px]">
                    <button 
                        onClick={() => setIsAuthOpen(true)}
                        className="flex items-center justify-center gap-6 w-full bg-[#47510B] text-[#CAD23C] px-8 py-5 rounded-[25px] font-black uppercase text-2xl tracking-[0.2em] hover:scale-105 transition-all shadow-[0_12px_0_0_#2A3106] active:translate-y-2 active:shadow-none group"
                    >
                        LET'S GO <div className="bg-[#CAD23C] text-[#47510B] rounded-full p-2 group-hover:rotate-12 transition-transform">
                          <UserPlus size={28} strokeWidth={3} />
                        </div>
                    </button>
                    <p className="mt-6 text-[10px] font-black text-[#47510B]/40 uppercase tracking-[0.3em]">
                      Click to access Citizen Portal
                    </p>
                  </div>
                )}
              </div>

              {/* FOOTER OF CARD */}
              <div className="flex justify-between items-end border-t border-current/10 pt-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] max-w-[220px]">
                    {card.isEntry ? "Swipe to explore the spectrum." : "Scroll down for technical brief."}
                </p>
                <div className="opacity-20"><Zap size={20}/></div>
              </div>

            </div>
          ))}
        </div>

        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30">
            <span className="text-[10px] font-black uppercase tracking-widest">Scroll down </span>
            <ChevronDown className="animate-bounce" />
        </div>
      </section>

      {/* FAQ SECTION (Untouched as requested) */}
      <section className="content-floor">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-40">
            <div>
    <h2 className="text-[8vw] font-black italic uppercase leading-none text-[#CAD23C] mb-10">About <br/> US !</h2>
    
    <div className="p-10 rounded-[40px] bg-white/5 border border-white/10 relative overflow-hidden group">
        {/* Visual "Flow" between the Bin and the Truck */}
        <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-[#CAD23C] text-[#47510B] rounded-2xl rotate-[-5deg] shadow-lg">
                <Trash2 size={32} strokeWidth={2.5} />
            </div>
            
            {/* A small "connecting" line to show the system link */}
            <div className="h-[2px] w-12 border-t-2 border-dashed border-white/20" />

            <div className="p-4 bg-white/10 text-[#CAD23C] rounded-2xl rotate-[5deg] border border-white/10">
                <Truck size={32} strokeWidth={2.5} />
            </div>
        </div>
        
        <div className="relative z-10">
            <p className="text-xl font-bold leading-relaxed opacity-80 italic text-white">
                "T2T tracks every bit of waste from the smart-bin to the center, so you can see your real-world impact grow in real-time."
            </p>
        </div>

        {/* Unconventional Background Decorative Text */}
        <div className="absolute -bottom-4 -right-4 opacity-[0.03] font-black text-[100px] pointer-events-none select-none">
            LOGISTICS
        </div>
    </div>
</div>
            
            <div className="space-y-12 py-10">
              {[
                { q: "RECLAMATION?", a: "Locate and tag high-impact waste sectors. Our system verifies the impact." },
                { q: "ECO-CREDITS?", a: "Earn native T2T assets for every successful recovery action." },
                { q: "NETWORK?", a: "Built on a peer-to-peer ledger to ensure complete transparency." }
              ].map((faq, i) => (
                <div key={i} className="border-b border-white/10 pb-8 group cursor-pointer hover:border-[#FF5B03] transition-colors">
                  <h4 className="text-2xl font-black italic uppercase flex justify-between items-center">
                    {faq.q} <ArrowRight className="group-hover:translate-x-4 transition-transform text-[#FF5B03]" />
                  </h4>
                  <p className="mt-4 font-bold text-white/40 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/10 pt-20 pb-10 opacity-30">
            <p className="text-[10px] font-black uppercase tracking-[1em]">T2T // PROTOCOL</p>
            <div className="flex md:justify-end gap-10 font-black text-[10px] uppercase">
                <span>Sector 72</span><span>Earth</span>
            </div>
          </div>
        </div>
      </section>
      <EntryCard
  isOpen={isAuthOpen}
  onClose={() => setIsAuthOpen(false)}
  onLogin={(data) => {
    console.log("LOGIN SUCCESS:", data);
    setAuthToken(data.token);
  }}
/>
    </div>
  );
};

export default LandingPage;