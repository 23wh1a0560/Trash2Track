import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, ArrowRight } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    navigate('/dashboard'); 
  };

  return (
    <div className="h-screen bg-[#FDFAD8] flex flex-col p-10 justify-center">
      <div className="mb-12">
        <h2 className="text-6xl font-black italic text-[#47510B] uppercase tracking-tighter leading-none">
          SYSTEM<br/><span className="text-[#CAD23C] stroke-black">ACCESS.</span>
        </h2>
        <p className="text-xs font-bold text-[#47510B]/40 uppercase mt-4">Enter operator credentials to begin shift</p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <input 
          type="text" 
          placeholder="OPERATOR_ID" 
          className="w-full p-6 bg-white border-4 border-[#47510B] rounded-[30px] font-black uppercase text-[#47510B] placeholder:text-[#47510B]/20 outline-none focus:shadow-[8px_8px_0_0_#CAD23C] transition-all"
        />
        <input 
          type="password" 
          placeholder="ACCESS_KEY" 
          className="w-full p-6 bg-white border-4 border-[#47510B] rounded-[30px] font-black uppercase text-[#47510B] placeholder:text-[#47510B]/20 outline-none focus:shadow-[8px_8px_0_0_#CAD23C] transition-all"
        />
        <button className="w-full bg-[#47510B] text-[#CAD23C] py-6 rounded-[30px] font-black uppercase text-xl flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all">
          Authorize <ArrowRight size={24} />
        </button>
      </form>
      
      <div className="mt-10 flex items-center gap-4 opacity-20 grayscale">
        <Fingerprint size={40} />
        <p className="text-[10px] font-black uppercase">Biometric_Ready</p>
      </div>
    </div>
  );
};

export default SignIn;