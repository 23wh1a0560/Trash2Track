import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Loader2 } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/signin'), 6000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-[#47510B] flex flex-col items-center justify-center p-10 overflow-hidden">
      <div className="w-32 h-32 bg-[#CAD23C] rounded-[40px] flex items-center justify-center animate-bounce shadow-[0_20px_50px_rgba(202,210,60,0.3)]">
        <Truck size={60} className="text-[#47510B]" strokeWidth={2.5} />
      </div>
      
      <div className="mt-12 text-center">
        <h1 className="text-5xl font-black italic text-[#CAD23C] uppercase tracking-tighter">TRASH2TRACK</h1>
        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mt-4 flex items-center gap-2 justify-center">
          <Loader2 size={12} className="animate-spin" /> Initializing_Operator_Node
        </p>
      </div>

      {/* Progress Bar matching the 6s timer */}
      <div className="absolute bottom-20 w-64 h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#CAD23C] animate-[loading_6s_linear_forwards]" />
      </div>
    </div>
  );
};

export default Splash;