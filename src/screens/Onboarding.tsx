
import React, { useState, useEffect } from 'react';
import { ScreenName } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

interface SplashProps {
  onFinish: () => void;
}

// --- CINEMATIC INTRO COMPONENT ---
export const SplashScreen: React.FC<SplashProps> = ({ onFinish }) => {
  const [stage, setStage] = useState(0);
  // Stages: 0 = Brand Center, 1 = Brand Top + UAE Vision, 2 = Brand Top + Nature, 3 = Done

  useEffect(() => {
    // Fast-paced Timeline (~4s total)
    const timer1 = setTimeout(() => setStage(1), 800); // 0.8s: Logo moves up
    const timer2 = setTimeout(() => setStage(2), 2500); // 2.5s: Switch to Nature
    const timer3 = setTimeout(() => {
      setStage(3);
      onFinish();
    }, 4000); // 4.0s: Finish

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinish]);

  // Common AINAR Logo SVG
  const AinarLogo = () => (
    <svg width="240" height="80" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
      <text x="10" y="65" fontFamily="'Lora', serif" fontSize="56" fontWeight="bold" fill="white">A</text>
      <g transform="translate(62, 10)">
        <path d="M0 55 L0 5" stroke="#34D399" strokeWidth="5" strokeLinecap="round" className="draw-path" />
        <path d="M-4 5 L4 0 L-4 -5" stroke="#34D399" strokeWidth="3" strokeLinecap="round" fill="none" className="draw-path" />
      </g>
      <text x="85" y="65" fontFamily="'Lora', serif" fontSize="56" fontWeight="bold" fill="white">NAR</text>
    </svg>
  );

  return (
    <div className="relative h-full w-full bg-[#0F172A] overflow-hidden flex flex-col items-center">
      <style>{`
        @keyframes zoom-in { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
        @keyframes fade-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-zoom { animation: zoom-in 10s ease-out forwards; }
        .draw-path { stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw 1.5s ease-out forwards; }
        @keyframes draw { to { stroke-dashoffset: 0; } }
      `}</style>

      {/* --- PERSISTENT BRAND HEADER --- */}
      {/* 
         Logic: 
         Stage 0: Centered (top-1/2, -translate-y-1/2, scale-125)
         Stage 1+: Top (top-16, translate-y-0, scale-90)
      */}
      <div
        className={`absolute z-50 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out
          ${stage === 0 ? 'top-1/2 -translate-y-1/2 scale-110' : 'top-16 translate-y-0 scale-75'}`}
      >
        {/* Brand Label (Fades out when moving up to be cleaner, or keeps it subtle) */}
        <h2 className={`text-emerald-400 font-jakarta font-bold text-sm tracking-[0.5em] uppercase mb-6 transition-opacity duration-500 ${stage === 0 ? 'opacity-100' : 'opacity-0 h-0'}`}>
          ESTIDAMATY
        </h2>

        <AinarLogo />

        {/* Tagline - Appears only when logo is at the top */}
        <div className={`text-center flex flex-col items-center gap-1 transition-all duration-1000 ${stage >= 1 ? 'opacity-100 mt-2' : 'opacity-0 mt-0'}`}>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mb-1"></div>
          <p className="font-['Lora'] text-[12px] uppercase tracking-[0.2em] text-white/90 font-medium">
            Sustainability <span className="text-emerald-400">•</span> Innovation
          </p>
          <p className="font-['Lora'] text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">
            Advisory
          </p>
        </div>
      </div>

      {/* --- DYNAMIC BOTTOM CONTENT SLIDER --- */}
      {/* This container takes up the full screen but content is positioned lower */}
      <div className="absolute inset-0 w-full h-full">

        {/* SLIDE 1: UAE CONTEXT */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${stage === 1 ? 'opacity-100' : 'opacity-0'}`}>
          {/* Background */}
          <div className="absolute inset-0 bg-cover bg-center animate-zoom" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&q=80&w=800')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-[#0F172A]/90"></div>

          {/* Content (Positioned in lower half) */}
          <div className="absolute inset-x-0 bottom-0 h-[65%] flex flex-col items-center justify-center text-center px-8 pb-10">
            <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-6 bg-white/5 backdrop-blur-sm animate-[fade-up_0.6s_ease-out]">
              <div className="text-center">
                <div className="text-[8px] font-bold text-emerald-400 uppercase tracking-tighter">Net Zero</div>
                <div className="text-lg font-bold text-white leading-none">2050</div>
              </div>
            </div>

            <h1 className="text-3xl font-lora font-bold text-white mb-3 drop-shadow-lg animate-[fade-up_0.8s_ease-out_0.2s_both]">
              A National<br />Commitment
            </h1>

            <div className="flex gap-3 w-full max-w-xs animate-[fade-up_1s_ease-out_0.4s_both]">
              <div className="flex-1 bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                <i className="fas fa-solar-panel text-amber-400 text-xl mb-1"></i>
                <div className="text-[10px] text-gray-300">Clean Energy</div>
              </div>
              <div className="flex-1 bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                <i className="fas fa-leaf text-emerald-400 text-xl mb-1"></i>
                <div className="text-[10px] text-gray-300">Biodiversity</div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 2: SUSTAINABILITY GOAL */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${stage === 2 ? 'opacity-100' : 'opacity-0'}`}>
          {/* Background */}
          <div className="absolute inset-0 bg-cover bg-center animate-zoom" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1440342359726-591831b254d7?auto=format&fit=crop&q=80&w=800')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-[#0F172A]/90"></div>

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 h-[65%] flex flex-col items-center justify-center text-center px-8 pb-10">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-md animate-[fade-up_0.6s_ease-out]">
              <i className="fas fa-fingerprint text-2xl text-white/90"></i>
            </div>
            <h1 className="text-3xl font-lora font-bold text-white mb-2 drop-shadow-lg animate-[fade-up_0.8s_ease-out_0.2s_both]">
              Your Impact<br />Matters.
            </h1>
            <p className="text-white/70 font-jakarta text-sm max-w-xs leading-relaxed animate-[fade-up_1s_ease-out_0.4s_both]">
              Turning vision into reality through everyday actions.
            </p>
          </div>
        </div>

      </div>

      {/* Loading/Progress Indicator */}
      {stage > 0 && stage < 3 && (
        <div className="absolute bottom-8 z-50 flex gap-2">
          <div className={`h-1 rounded-full transition-all duration-500 ${stage === 1 ? 'bg-emerald-400 w-8' : 'bg-white/20 w-2'}`}></div>
          <div className={`h-1 rounded-full transition-all duration-500 ${stage === 2 ? 'bg-emerald-400 w-8' : 'bg-white/20 w-2'}`}></div>
        </div>
      )}
    </div>
  );
};


// --- MAIN ONBOARDING COMPONENT ---

export const OnboardingScreen: React.FC<Props> = ({ onNavigate }) => {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      id: 0, // NEW SLIDE: UAE VISION
      icon: "fa-flag",
      title: "National Vision",
      desc: "Contributing to the UAE's strategic Net Zero 2050 initiative for a sustainable future.",
      // Visual Styles - Gold/Sand Theme for UAE
      mainGradient: "from-amber-500 to-yellow-600",
      bgPattern: "url('https://www.transparenttextures.com/patterns/arches.png')",
      glowColor: "shadow-amber-500/50",
      fact: {
        icon: "fa-landmark",
        bg: "bg-amber-100 text-amber-600",
        title: "National Goal",
        text: "The UAE is investing $163 billion in clean energy by 2050."
      }
    },
    {
      id: 1,
      icon: "fa-globe-americas", // Global Impact
      title: "Track Your Impact",
      desc: "Monitor your carbon footprint, water savings, and energy efficiency in real-time.",
      // Visual Styles - Emerald
      mainGradient: "from-emerald-400 to-teal-600",
      bgPattern: "url('https://www.transparenttextures.com/patterns/earth.png')",
      glowColor: "shadow-emerald-500/50",
      fact: {
        icon: "fa-leaf",
        bg: "bg-emerald-100 text-emerald-600",
        title: "Did You Know?",
        text: "The average person saves 2.5 tons of CO₂ annually by tracking habits!"
      }
    },
    {
      id: 2,
      icon: "fa-people-carry", // Community
      title: "Join the Tribe",
      desc: "Connect with local communities and contribute to sustainability goals.",
      // Visual Styles - Blue
      mainGradient: "from-blue-500 to-indigo-600",
      bgPattern: "url('https://www.transparenttextures.com/patterns/connected.png')",
      glowColor: "shadow-blue-500/50",
      fact: {
        icon: "fa-hands-helping",
        bg: "bg-blue-100 text-blue-600",
        title: "Community Power",
        text: "Our community has planted over 50,000 trees this year!"
      }
    },
    {
      id: 3,
      icon: "fa-coins", // Rewards
      title: "Earn Real Value",
      desc: "Convert your sustainable actions into Wehda tokens and redeem rewards.",
      // Visual Styles - Orange/Amber
      mainGradient: "from-orange-400 to-red-500",
      bgPattern: "url('https://www.transparenttextures.com/patterns/cubes.png')",
      glowColor: "shadow-orange-500/50",
      fact: {
        icon: "fa-gift",
        bg: "bg-orange-100 text-orange-600",
        title: "Start Earning",
        text: "Complete your first action to earn +500 WEHDA immediately!"
      },
      bonus: true
    }
  ];

  const handleNext = () => {
    if (slide < 3) setSlide(slide + 1);
    else onNavigate(ScreenName.LOGIN);
  };

  const handlePrev = () => {
    if (slide > 0) setSlide(slide - 1);
  };

  const current = slides[slide];

  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)] relative overflow-hidden transition-colors duration-500">

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-all duration-700">
        {/* Subtle pattern overlay changes per slide */}
        <div className="absolute inset-0 opacity-5 mix-blend-multiply transition-all duration-500" style={{ backgroundImage: current.bgPattern }}></div>

        {/* Gradient Orbs */}
        <div className={`absolute top-[-10%] right-[-20%] w-96 h-96 bg-gradient-to-br ${current.mainGradient} opacity-20 rounded-full blur-[80px] transition-all duration-700`}></div>
        <div className={`absolute bottom-[10%] left-[-10%] w-72 h-72 bg-gradient-to-tr ${current.mainGradient} opacity-10 rounded-full blur-[60px] transition-all duration-700`}></div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-end items-center px-6 pt-14 pb-4">
        <button
          onClick={() => onNavigate(ScreenName.LOGIN)}
          className="px-5 py-2 bg-white/50 border border-white/60 rounded-full text-xs font-bold text-[var(--text-secondary)] hover:bg-white/80 transition-colors uppercase tracking-wide backdrop-blur-md shadow-sm"
        >
          Skip
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center relative z-10 pt-16">

        {/* PREMIUM HERO ICON CONTAINER */}
        <div className="relative mb-10 group">
          {/* Outer Glow Ring */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${current.mainGradient} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`}></div>

          {/* Glassmorphism Sphere */}
          <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-white/80 to-white/20 backdrop-blur-xl border border-white/50 shadow-2xl flex items-center justify-center animate-float">
            {/* Inner Circle */}
            <div className={`w-36 h-36 rounded-full bg-gradient-to-br ${current.mainGradient} flex items-center justify-center text-white text-6xl shadow-inner relative overflow-hidden`}>
              {/* Shine effect */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-t-full blur-md"></div>
              <i className={`fas ${current.icon} drop-shadow-md relative z-10`}></i>
            </div>
          </div>

          {/* Decorative floating particles (CSS only) */}
          <div className={`absolute -top-4 right-0 w-8 h-8 rounded-full bg-gradient-to-br ${current.mainGradient} opacity-60 animate-bounce delay-700`}></div>
          <div className={`absolute bottom-0 -left-4 w-6 h-6 rounded-full bg-gradient-to-br ${current.mainGradient} opacity-40 animate-bounce delay-100`}></div>
        </div>

        {/* Title & Desc */}
        <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3 font-jakarta animate-[fadeIn_0.3s_ease-out] tracking-tight">
          {current.title}
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed text-sm mx-auto mb-10 animate-[fadeIn_0.4s_ease-out] h-12 max-w-xs font-medium">
          {current.desc}
        </p>

        {/* Fact Card (Floating) */}
        <div className="w-full bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-4 flex items-start gap-4 mb-6 animate-[slideUp_0.5s_ease-out] shadow-sm hover:shadow-md transition-shadow">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-sm ${current.fact.bg}`}>
            <i className={`fas ${current.fact.icon}`}></i>
          </div>
          <div className="text-left flex-1">
            <div className="text-[10px] font-bold text-[var(--text-primary)] opacity-60 uppercase tracking-wider mb-0.5">{current.fact.title}</div>
            <div className="text-xs text-[var(--text-primary)] leading-relaxed font-semibold">{current.fact.text}</div>
          </div>
        </div>

        {/* Custom Progress Indicators */}
        <div className="flex gap-3 mt-2">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? `w-8 bg-gradient-to-r ${current.mainGradient}` : 'w-2 bg-gray-300'}`}></div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-8 pb-16 relative z-10">
        <div className="flex gap-4">
          {slide > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 py-4 bg-white border border-gray-200 text-[var(--text-secondary)] rounded-2xl font-bold text-sm transition-transform active:scale-95 hover:bg-gray-50 shadow-sm"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className={`flex-[2] py-4 bg-gradient-to-r ${current.mainGradient} text-white rounded-2xl font-bold text-lg shadow-lg ${current.glowColor} active:scale-95 transition-all hover:brightness-110 flex items-center justify-center gap-2`}
          >
            {slide === 3 ? "Get Started" : "Next"} <i className="fas fa-arrow-right text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
