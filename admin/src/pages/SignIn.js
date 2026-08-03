import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, Eye, EyeOff, Activity, ShieldAlert } from 'lucide-react';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div className="w-full max-w-[480px] flex flex-col gap-5 p-6 animate-slot">

      {/* SECTION 1: THE ALERT HEADER (BEET RED) */}
      <div className="bg-[#AB1717] border-[6px] border-[#47510B] rounded-t-[50px] rounded-b-[15px] p-8 red-stack-shadow relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="bg-[#FDFAD8] p-3 rounded-xl border-4 border-[#47510B] shadow-[4px_4px_0_0_#47510B]">
              <ShieldAlert size={32} className="text-[#AB1717]" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FDFAD8] opacity-70 italic leading-none mb-1">Admin.Authentication</p>
              <h1 className="text-3xl font-black italic tracking-tighter text-[#FDFAD8] uppercase">
                TRASH<span className="text-[#CAD23C]">2</span>TRACK
              </h1>
            </div>
          </div>
          <Activity className="text-[#CAD23C] animate-pulse" size={24} />
        </div>
      </div>

      {/* SECTION 2: THE INPUT DECK */}
      <div className="bg-[#A1AED1] border-[6px] border-[#47510B] rounded-[25px] p-8 md:p-10 yellow-stack-shadow flex flex-col gap-8 relative">
        <div className="relative">
          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#AB1717] mb-3 block ml-2">Email</label>
          <div className="relative group">
            <Mail className="absolute left-6 top-6 text-[#AB1717] opacity-40 group-focus-within:opacity-100 transition-opacity" size={20} />
            <input
              type="email"
              placeholder="ADMIN EMAIL"
              className="w-full bg-white border-[5px] border-[#47510B] p-6 pl-16 rounded-[25px] font-black text-xl outline-none focus:ring-4 ring-[#CAD23C]/30 transition-all uppercase placeholder:opacity-20 shadow-inner"
            />
          </div>
        </div>

        <div className="relative">
          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#AB1717] mb-3 block ml-2">Password</label>
          <div className="relative group">
            <Lock className="absolute left-6 top-6 text-[#AB1717] opacity-40 group-focus-within:opacity-100 transition-opacity" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full bg-white border-[5px] border-[#47510B] p-6 pl-16 rounded-[25px] font-black text-xl outline-none focus:ring-4 ring-[#CAD23C]/30 transition-all shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-6 text-[#AB1717] opacity-40 hover:opacity-100"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3: SWIPE TO ACCESS */}
      <div className="bg-[#AB1717] border-[6px] border-[#47510B] rounded-t-[15px] rounded-b-[50px] p-8 red-stack-shadow flex items-center">

        {/* PILL */}
        <div
          className="w-full h-[70px] bg-[#FDFAD8] border-[5px] border-[#47510B] rounded-full relative flex items-center overflow-hidden"
          onMouseMove={(e) => {
            if (!isDragging) return;

            const rect = e.currentTarget.getBoundingClientRect();
            const max = rect.width - 70;
            const newX = e.clientX - rect.left - 35;

            const clamped = Math.min(Math.max(0, newX), max);

            setPosition(clamped);

            // ✅ TRIGGER ON SWIPE END
            if (clamped >= max - 5) {
              setIsDragging(false);
              alert("Access Granted 🚀");
              setPosition(0);
            }
          }}
          onMouseUp={() => {
            setIsDragging(false);
            setPosition(0);
          }}
          onMouseLeave={() => setIsDragging(false)}
        >

          {/* TEXT */}
          <span className="absolute w-full text-center text-[#AB1717] font-black text-xl uppercase pointer-events-none">
            Swipe to Access
          </span>

          {/* KNOB */}
          <div
            className="absolute top-1/2 -translate-y-1/2 bg-[#CAD23C] w-[70px] h-[70px] flex items-center justify-center rounded-full border-[5px] border-[#47510B] shadow-[4px_4px_0_0_#47510B] cursor-pointer"
            style={{
              left: `${position}px`,
              transition: isDragging ? "none" : "left 0.3s ease"
            }}
            onMouseDown={() => setIsDragging(true)}
          >
            <ArrowRight size={26} className="text-[#47510B]" strokeWidth={4} />
          </div>

        </div>
      </div>

      <p className="text-center text-[12px] font-black uppercase tracking-[0.5em] text-[#AB1717] opacity-80 mt-2">
        Admin.Node.Trash2Track
      </p>
    </div>
  );
};

export default SignIn;