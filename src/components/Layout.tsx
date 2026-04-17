
import React, { useState, useEffect, useRef } from 'react';
import { ScreenName } from '../types';
import RewardView from './RewardView';

interface LayoutProps {
  currentScreen: ScreenName;
  children: React.ReactNode;
  onNavigate: (screen: ScreenName, params?: any) => void;
  goBack: () => void;
}

const Layout: React.FC<LayoutProps> = ({ currentScreen, children, onNavigate, goBack }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showMoreWheel, setShowMoreWheel] = useState(false);
  const [showScanPortal, setShowScanPortal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('reward');
  const [portalView, setPortalView] = useState<'main' | 'scan' | 'photo' | 'video'>('main');
  const lastScrollTop = useRef(0);
  const isHome = currentScreen === ScreenName.HOME;

  // Simplified Navbar visibility logic
  useEffect(() => {
    setIsMinimized(false);
  }, [currentScreen]);

  const showBottomNav = isHome;

  const hideTopNav = [
    ScreenName.SPLASH,
    ScreenName.ONBOARDING,
    ScreenName.LOGIN,
    ScreenName.SIGNUP,
    ScreenName.ROLE_SELECTION,
    ScreenName.GOAL_INPUT,
  ].includes(currentScreen);

  const displayTopNav = !hideTopNav;

  const getTitle = () => {
    switch (currentScreen) {
      case ScreenName.HOME: return 'Green Board';
      case ScreenName.WALLET: return 'My Wallet';
      case ScreenName.COMMUNITY: return 'Green Share';
      case ScreenName.IMPACT: return 'My Impact';
      case ScreenName.PROFILE: return 'Profile';
      case ScreenName.TARGET: return 'Eco Target';
      case ScreenName.FRIENDS: return 'My Circle';
      case ScreenName.SDG_DETAILS: return 'Global Goals';
      case ScreenName.CAMERA: return 'Scanner';
      case ScreenName.MARKETPLACE: return 'ECO Market Place';
      case ScreenName.SHOP: return 'ECO Market Place';
      default: return 'Sustain';
    }
  };

  const notifications = [
    { id: 1, icon: 'fa-coins', title: 'Points Received', desc: 'You earned 50 Wda for "Save Water"', time: '2h ago', color: 'bg-amber-50 text-amber-500' },
    { id: 2, icon: 'fa-users', title: 'Mentioned', desc: 'Ahmed mentioned you in a post', time: '5h ago', color: 'bg-indigo-50 text-indigo-500' },
    { id: 3, icon: 'fa-trophy', title: 'Badge Unlocked', desc: 'You earned the "Green Mentor" badge!', time: '1d ago', color: 'bg-emerald-50 text-emerald-500' },
  ];

  const handleNav = (screen: ScreenName) => {
    setIsMinimized(false);
    setShowMoreWheel(false);
    onNavigate(screen);
  };

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] text-slate-900 overflow-hidden flex flex-col font-jakarta">
      {/* Top Nav */}
      {displayTopNav && (
        <div className="absolute top-0 left-0 right-0 h-[100px] pt-[45px] bg-white/70 backdrop-blur-xl border-b border-white/20 z-40 flex items-center justify-between px-6">
          {isHome ? (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-lg shadow-emerald-200">
                <i className="fas fa-leaf text-sm"></i>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#065F46]">Sustain</span>
            </div>
          ) : (
            <button onClick={goBack} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-all border border-slate-100 shadow-sm active:scale-95">
              <i className="fas fa-chevron-left text-xs"></i>
            </button>
          )}

          {!isHome && <h1 className="text-sm font-black uppercase tracking-widest text-[#065F46] absolute left-1/2 -translate-x-1/2">{getTitle()}</h1>}

          <div className="flex items-center gap-3">
            {isHome && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-sm transition-all hover:bg-white/20">
                <i className="fas fa-fire text-orange-500 text-[10px] animate-pulse"></i>
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">12 Day Streak</span>
              </div>
            )}
            <button onClick={() => setShowNotifications(true)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-all border border-slate-100 shadow-sm relative">
              <i className="fas fa-bell text-sm"></i>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 z-[1000] flex justify-center items-start pt-[100px] px-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowNotifications(false)}></div>
          <div className="relative w-full max-w-[400px] bg-white rounded-[32px] shadow-2xl border border-white p-6 animate-[slideDown_0.3s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-slate-800 uppercase tracking-tighter">Notifications</h3>
              <button onClick={() => setShowNotifications(false)} className="text-xs font-bold text-gray-400">Close</button>
            </div>
            <div className="space-y-4">
              {notifications.map((not) => (
                <div key={not.id} className="flex gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                  <div className={`w-10 h-10 rounded-xl ${not.color} flex items-center justify-center shrink-0 shadow-sm`}>
                    <i className={`fas ${not.icon}`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-800">{not.title}</h4>
                      <span className="text-[9px] text-gray-400 font-bold uppercase">{not.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{not.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reward Modal */}
      {showRewards && (
        <div className="fixed inset-0 z-[1000] flex justify-center items-end bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowRewards(false)}>
          <div className="relative w-full max-w-[500px] h-[85vh] bg-white rounded-t-[48px] shadow-2xl animate-[slideUp_0.4s_ease-out] overflow-hidden flex flex-col pt-2" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-3 shrink-0"></div>
            <div className="flex-1 overflow-hidden">
              <RewardView />
            </div>
            <button onClick={() => setShowRewards(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 z-50">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        onScroll={(e) => {
          if (!isHome) return;
          const st = e.currentTarget.scrollTop;
          if (st > lastScrollTop.current && st > 100) {
            setIsMinimized(true);
          } else if (st < lastScrollTop.current) {
            setIsMinimized(false);
          }
          lastScrollTop.current = st <= 0 ? 0 : st;
        }}
        className={`flex-1 overflow-y-auto no-scrollbar w-full relative ${displayTopNav ? 'pt-[100px]' : ''} pb-[160px]`}
      >
        {children}
      </div>

      {/* Scan Portal Overlay */}
      {showScanPortal && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center px-4 pb-12">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowScanPortal(false)}></div>
          <div className="relative w-full max-w-[420px] bg-white rounded-[48px] shadow-2xl overflow-hidden p-8 animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="flex flex-col items-center">
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mb-6"></div>

              {portalView === 'main' && (
                <div className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
                  <h3 className="text-xl font-black text-[#064E3B] uppercase tracking-tighter mb-1">MY QR code</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">share to let others add you</p>

                  {/* Snapchat-style QR Code */}
                  <div className="w-64 h-64 bg-amber-400 rounded-[64px] flex items-center justify-center relative mb-10 shadow-2xl shadow-amber-200/50 group">
                    <div className="absolute inset-2 border-[3px] border-black/10 rounded-[56px] border-dashed"></div>
                    <div className="bg-white p-6 rounded-[40px] shadow-xl border-4 border-black/5 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <i className="fas fa-qrcode text-[100px] text-black"></i>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 w-full">
                    <ScanAction icon="fa-expand" label="Scan" color="bg-emerald-50 text-emerald-600" onClick={() => setPortalView('scan')} />
                    <ScanAction icon="fa-camera" label="Photo" color="bg-blue-50 text-blue-600" onClick={() => setPortalView('photo')} />
                    <ScanAction icon="fa-video" label="Video" color="bg-rose-50 text-rose-600" onClick={() => setPortalView('video')} />
                  </div>
                </div>
              )}

              {portalView === 'scan' && (
                <div className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
                  <div className="w-full flex justify-between items-center mb-6">
                    <button onClick={() => setPortalView('main')} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><i className="fas fa-arrow-left"></i></button>
                    <h3 className="text-sm font-black text-[#064E3B] uppercase tracking-widest">Scanning...</h3>
                    <div className="w-10"></div>
                  </div>

                  <div className="w-full aspect-square bg-[#0F172A] rounded-[48px] mb-8 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-12 border-2 border-white/20 rounded-3xl"></div>
                    <i className="fas fa-expand text-white/10 text-6xl"></i>
                    {/* Pulsing Scan Line */}
                    <div className="absolute inset-x-8 h-1 bg-emerald-400 shadow-[0_0_20px_#10B981] animate-[scan_2s_infinite]"></div>

                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
                      <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20"><i className="fas fa-bolt"></i></button>
                      <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20"><i className="fas fa-sync"></i></button>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] text-center px-4 leading-relaxed">
                    Point camera at a receipt or a Friend's QR code to verify impact
                  </p>
                </div>
              )}

              {portalView === 'photo' && (
                <div className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
                  <div className="w-full flex justify-between items-center mb-6">
                    <button onClick={() => setPortalView('main')} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><i className="fas fa-arrow-left"></i></button>
                    <h3 className="text-sm font-black text-[#064E3B] uppercase tracking-widest">Verify with Photo</h3>
                    <div className="w-10"></div>
                  </div>

                  <div className="w-full aspect-square bg-slate-900 rounded-[40px] mb-8 relative overflow-hidden flex items-center justify-center">
                    <i className="fas fa-camera text-white/20 text-5xl"></i>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <button className="flex flex-col items-center gap-2 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-100 active:scale-95 transition-all">
                      <i className="fas fa-dot-circle text-xl"></i>
                      Take Photo
                    </button>
                    <button className="flex flex-col items-center gap-2 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-xs border border-slate-100 active:scale-95 transition-all">
                      <i className="fas fa-upload text-xl"></i>
                      Upload
                    </button>
                  </div>
                </div>
              )}

              {portalView === 'video' && (
                <div className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
                  <div className="w-full flex justify-between items-center mb-6">
                    <button onClick={() => setPortalView('main')} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><i className="fas fa-arrow-left"></i></button>
                    <h3 className="text-sm font-black text-[#064E3B] uppercase tracking-widest">Verify with Video</h3>
                    <div className="w-10"></div>
                  </div>

                  <div className="w-full aspect-square bg-slate-900 rounded-[40px] mb-8 relative overflow-hidden flex items-center justify-center border-4 border-rose-500/20">
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-rose-500 text-white px-2 py-1 rounded-full text-[8px] font-bold animate-pulse">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div> REC
                    </div>
                    <i className="fas fa-video text-white/20 text-5xl"></i>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <button className="flex flex-col items-center gap-2 py-4 bg-rose-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-rose-100 active:scale-95 transition-all">
                      <i className="fas fa-circle text-xl"></i>
                      Record
                    </button>
                    <button className="flex flex-col items-center gap-2 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-xs border border-slate-100 active:scale-95 transition-all">
                      <i className="fas fa-file-video text-xl"></i>
                      Upload
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => { setShowScanPortal(false); setPortalView('main'); }}
                className="mt-8 text-xs font-black text-slate-400 uppercase tracking-[0.2em] hover:text-emerald-600 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* More Wheel Overlay */}
      {showMoreWheel && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={() => setShowMoreWheel(false)}></div>
          <div className="relative w-80 h-80 animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-full border border-white/50 shadow-2xl"></div>

            <WheelItem icon="fa-wallet" label="Wallet" angle={-90} delay={0.1} onClick={() => handleNav(ScreenName.WALLET)} />
            <WheelItem icon="fa-store" label="Market" angle={-18} delay={0.15} onClick={() => handleNav(ScreenName.MARKETPLACE)} />
            <WheelItem icon="fa-robot" label="AI" angle={54} delay={0.2} onClick={() => handleNav(ScreenName.CHAT)} />
            <WheelItem icon="fa-cog" label="Settings" angle={126} delay={0.25} onClick={() => { }} />
            <WheelItem icon="fa-question-circle" label="Help" angle={198} delay={0.3} onClick={() => { }} />

            <button
              onClick={() => setShowMoreWheel(false)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full bg-white border-4 border-emerald-50 text-emerald-600 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
      )}

      {/* Glassy Blur Layer at the bottom to smooth transition */}
      {showBottomNav && (
        <div className={`absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/40 to-white/0 backdrop-blur-xl z-[90] transition-all duration-700 pointer-events-none ${isMinimized ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}></div>
      )}

      {/* Premium Navbar Container */}
      {showBottomNav && (
        <div className={`absolute bottom-0 left-0 right-0 z-[100] px-2 pb-8 transition-all duration-700 ${isMinimized ? 'translate-y-[calc(100%+20px)] opacity-0' : 'translate-y-0 opacity-100'}`}>

          {/* Floating Expand Trigger (When Minimized - subtle floating indicator removed per request for "not interfering") */}

          {/* Global Transparent minimized bar (visual only) removed for cleaner scroll */}

          {/* The Real Navbar */}
          <div className="mx-auto w-full max-w-[520px] bg-white/90 backdrop-blur-2xl rounded-[34px] px-3 py-2.5 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white pointer-events-auto transition-all duration-500">
            <div className="flex flex-1 justify-between items-start px-1">
              <RoundNavItem
                icon="fa-home"
                label="Green Board"
                isActive={!showRewards && !showScanPortal && !showMoreWheel}
                onClick={() => handleNav(ScreenName.HOME)}
              />
              <RoundNavItem
                icon="fa-bullseye"
                label="Eco Target"
                isActive={false}
                onClick={() => handleNav(ScreenName.TARGET)}
              />
              <RoundNavItem
                icon="fa-chart-bar"
                label="Impact"
                isActive={false}
                onClick={() => handleNav(ScreenName.IMPACT)}
              />
            </div>

            {/* Large Center camera Button */}
            <div className="relative -top-5 px-1">
              <button
                onClick={() => { setShowScanPortal(true); setIsMinimized(false); }}
                className="group flex flex-col items-center justify-center active:scale-95 transition-all outline-none"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-[0_8px_25px_rgba(16,185,129,0.3)] mb-1 transition-all ${showScanPortal ? 'bg-[#059669] ring-4 ring-emerald-100' : 'bg-[#10B981] group-hover:bg-[#059669]'}`}>
                  <i className="fas fa-qrcode text-2xl"></i>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.06em] leading-none transition-colors ${showScanPortal ? 'text-[#10B981]' : 'text-[#065F46]'}`}>Mentor ID</span>
              </button>
            </div>

            <div className="flex flex-1 justify-between items-start px-1">
              <RoundNavItem
                icon="fa-trophy"
                label="Reward"
                isActive={showRewards}
                onClick={() => { setShowRewards(true); setIsMinimized(false); }}
              />
              <RoundNavItem
                icon="fa-exchange-alt"
                label="Green Share"
                isActive={false}
                onClick={() => { setActiveTab('feed'); handleNav(ScreenName.COMMUNITY); }}
              />
              <RoundNavItem
                icon="fa-bars"
                label="More"
                isActive={showMoreWheel}
                onClick={() => setShowMoreWheel(true)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Styles for scan animation and wheel */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const RoundNavItem: React.FC<{ icon: string; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-[48px] flex-col items-center group py-1"
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-[#10B981] text-white shadow-[0_8px_20px_rgba(16,185,129,0.4)] scale-105' : 'bg-[#ECFDF5] text-[#10B981] group-hover:bg-[#D1FAE5]'}`}>
      <i className={`fas ${icon} text-base`}></i>
    </div>
    <span className={`text-[8px] font-black mt-1.5 uppercase tracking-[0.03em] leading-tight text-center whitespace-normal transition-all duration-300 ${isActive ? 'text-[#065F46] opacity-100' : 'text-slate-400 opacity-75 group-hover:opacity-100'}`}>{label}</span>
  </button>
);

const ScanAction: React.FC<{ icon: string; label: string; color: string; onClick: () => void }> = ({ icon, label, color, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-2 p-4 rounded-3xl ${color} transition-transform active:scale-95 border border-white`}>
    <i className={`fas ${icon} text-lg`}></i>
    <span className="text-[10px] font-black uppercase tracking-tight">{label}</span>
  </button>
);

const WheelItem: React.FC<{ icon: string; label: string; angle: number; delay: number; onClick: () => void }> = ({ icon, label, angle, delay, onClick }) => {
  const radius = 98;
  const rad = (angle * Math.PI) / 180;
  const x = radius * Math.cos(rad);
  const y = radius * Math.sin(rad);

  return (
    <button
      onClick={onClick}
      className="absolute w-16 h-16 rounded-full bg-white border border-emerald-100 text-emerald-600 flex flex-col items-center justify-center shadow-lg hover:bg-emerald-50 transition-all duration-500 hover:scale-110"
      style={{
        left: `calc(50% + ${x}px - 32px)`,
        top: `calc(50% + ${y}px - 32px)`,
        animation: `scaleIn 0.3s ease-out ${delay}s both`
      }}
    >
      <i className={`fas ${icon} text-lg`}></i>
      <span className="text-[8px] font-black uppercase mt-0.5 tracking-[0.03em]">{label}</span>
    </button>
  );
};

export default Layout;
