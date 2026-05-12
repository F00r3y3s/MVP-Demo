import React from 'react';
import { ScreenName } from '../types';
import UAEPasSButton from '../components/UAEPasSButton';
import { motion } from 'framer-motion';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onBack: () => void;
}

const LoginScreen: React.FC<Props> = ({ onNavigate, onBack }) => {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden pb-12">
      {/* Header - Compact and Elegant */}
      <div className="h-[25vh] bg-gradient-to-br from-[var(--forest-deep)] to-[var(--teal)] relative rounded-b-[40px] flex items-center justify-center shrink-0 shadow-xl overflow-hidden">
        <button onClick={onBack} className="absolute top-14 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20">
          <i className="fas fa-arrow-left text-sm"></i>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white z-10"
        >
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center text-3xl mb-3 shadow-lg border border-white/20">
            <i className="fas fa-leaf text-[var(--emerald)]"></i>
          </div>
          <h1 className="text-2xl font-bold font-jakarta uppercase tracking-widest">Estidamaty</h1>
          <p className="opacity-70 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Welcome Back</p>
        </motion.div>

        {/* Decorative Ambient Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full bg-emerald-400/20 blur-[80px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 rounded-full bg-teal-400/20 blur-[60px]"></div>
      </div>

      <div className="flex-1 px-8 py-8 flex flex-col justify-center items-stretch gap-6 animate-[fadeIn_0.5s_ease-out]">

        {/* Email Form - Centered Content */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="bg-[var(--bg-tertiary)] rounded-2xl px-6 py-3 border-2 border-transparent focus-within:border-[var(--forest-light)] focus-within:bg-white transition-all shadow-sm">
              <label className="block text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Your Email</label>
              <input type="email" placeholder="example@sustain.ae" className="w-full bg-transparent outline-none text-base text-[var(--text-primary)] font-semibold" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="bg-[var(--bg-tertiary)] rounded-2xl px-6 py-3 border-2 border-transparent focus-within:border-[var(--forest-light)] focus-within:bg-white transition-all shadow-sm">
              <label className="block text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-transparent outline-none text-base text-[var(--text-primary)] font-semibold" />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs px-1 font-bold">
            <label className="flex items-center gap-2 text-[var(--text-secondary)]">
              <input type="checkbox" className="w-4 h-4 rounded-md text-[var(--forest-light)] border-gray-300 focus:ring-0" />
              <span>Remember me</span>
            </label>
            <button className="text-[var(--forest-medium)] uppercase tracking-wider font-extrabold hover:text-[var(--forest-light)] transition-colors">Forgot?</button>
          </div>
        </div>

        <div className="space-y-4">
          <button onClick={() => onNavigate(ScreenName.HOME)} className="w-full py-4 bg-gradient-to-r from-[var(--forest-light)] to-[var(--forest-deep)] text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all">
            Login
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px]">
              <span className="px-6 bg-white text-[var(--text-muted)] font-black uppercase tracking-[0.3em]">Quick Access</span>
            </div>
          </div>

          {/* SOCIAL / GOVT LOGIN */}
          <div className="flex flex-col gap-3">
            <UAEPasSButton onClick={() => onNavigate(ScreenName.HOME)} />

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => onNavigate(ScreenName.HOME)} className="py-3.5 bg-white border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-3 text-sm text-[var(--text-primary)] shadow-sm active:scale-[0.95] transition-all">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button onClick={() => onNavigate(ScreenName.HOME)} className="py-3.5 bg-white border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-3 text-sm text-[var(--text-primary)] shadow-sm active:scale-[0.95] transition-all">
                <i className="fab fa-apple text-lg"></i>
                Apple
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-sm text-[var(--text-secondary)] font-medium">
            Don't have an account? <button onClick={() => onNavigate(ScreenName.ROLE_SELECTION)} className="font-extrabold text-[var(--forest-light)] uppercase ml-1 hover:underline underline-offset-4">Sign Up</button>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;