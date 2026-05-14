import React, { useState } from 'react';
import { ScreenName } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';
import uaeOfficialEmblem from '../../assets/uae-official-emblem.svg';

interface Props {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName, params?: any) => void;
}

const OrgBottomNav: React.FC<Props> = ({ activeScreen, onNavigate }) => {
  const [showMoreWheel, setShowMoreWheel] = useState(false);
  const [showScanPortal, setShowScanPortal] = useState(false);
  const [portalView, setPortalView] = useState<'main' | 'scan' | 'photo' | 'video'>('main');
  const { selectedEntity } = useOrgRoute();
  const shortName = selectedEntity?.shortName ?? 'MOEI';
  const roleLabels = {
    guardian: 'Guardian',
    pioneer: 'Pioneer',
    advocate: 'Advocate',
    visionary: 'Visionary',
  } as const;
  const roleLabel = selectedEntity?.subRole ? roleLabels[selectedEntity.subRole] : 'Guardian';

  const handleNav = (screen: ScreenName, params?: any) => {
    setShowMoreWheel(false);
    setShowScanPortal(false);
    onNavigate(screen, params);
  };

  return (
    <>
      {showMoreWheel && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={() => setShowMoreWheel(false)} />
          <div className="relative h-80 w-80 animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="absolute inset-0 rounded-full border border-white/50 bg-white/40 shadow-2xl backdrop-blur-3xl" />

            <WheelItem icon="fa-chart-line" label="BCI" angle={-90} delay={0.1} onClick={() => handleNav(ScreenName.ORG_BCI_INDEX)} />
            <WheelItem icon="fa-flask" label="Simulator" angle={-18} delay={0.15} onClick={() => handleNav(ScreenName.ORG_POLICY_SIMULATOR)} />
            <WheelItem icon="fa-file-alt" label="ESG" angle={54} delay={0.2} onClick={() => handleNav(ScreenName.ORG_ESG_REPORTS)} />
            <WheelItem icon="fa-cog" label="Settings" angle={126} delay={0.25} onClick={() => handleNav(ScreenName.ORG_MORE)} />
            <WheelItem icon="fa-robot" label="AI" angle={198} delay={0.3} onClick={() => handleNav(ScreenName.ORG_AI_AGENT)} />

            <button
              onClick={() => setShowMoreWheel(false)}
              className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-emerald-50 bg-white text-emerald-600 shadow-lg transition-transform active:scale-95"
              aria-label="Close more menu"
            >
              <i className="fas fa-times text-xl" />
            </button>
          </div>
        </div>
      )}

      {showScanPortal && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center px-4 pb-12">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => { setShowScanPortal(false); setPortalView('main'); }} />
          <div className="relative w-full max-w-[420px] overflow-hidden rounded-[48px] bg-white p-8 shadow-2xl animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="flex flex-col items-center">
              <div className="mb-6 h-1.5 w-12 rounded-full bg-slate-100" />

              {portalView === 'main' && (
                <div className="flex w-full flex-col items-center animate-[fadeIn_0.3s_ease-out]">
                  <h3 className="mb-1 text-xl font-black uppercase tracking-tighter text-[#064E3B]">{roleLabel} ID</h3>
                  <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">verify {shortName} programs and partner access</p>

                  <div className="group relative mb-10 flex h-64 w-64 items-center justify-center rounded-[64px] bg-emerald-400 shadow-2xl shadow-emerald-200/50">
                    <div className="absolute inset-2 rounded-[56px] border-[3px] border-dashed border-black/10" />
                    <div className="rotate-[-3deg] rounded-[40px] border-4 border-black/5 bg-white p-5 shadow-xl transition-transform duration-500 group-hover:rotate-0">
                      <img src={uaeOfficialEmblem} alt={`${shortName} organization badge`} className="h-[112px] w-[112px] object-contain" />
                    </div>
                    <div className="absolute bottom-9 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#065F46]">{shortName}</div>
                  </div>

                  <div className="grid w-full grid-cols-3 gap-3">
                    <ScanAction icon="fa-expand" label="Scan" color="bg-emerald-50 text-emerald-600" onClick={() => setPortalView('scan')} />
                    <ScanAction icon="fa-camera" label="Photo" color="bg-blue-50 text-blue-600" onClick={() => setPortalView('photo')} />
                    <ScanAction icon="fa-video" label="Video" color="bg-rose-50 text-rose-600" onClick={() => setPortalView('video')} />
                  </div>
                </div>
              )}

              {portalView !== 'main' && (
                <div className="flex w-full flex-col items-center animate-[fadeIn_0.3s_ease-out]">
                  <div className="mb-6 flex w-full items-center justify-between">
                    <button onClick={() => setPortalView('main')} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                      <i className="fas fa-arrow-left" />
                    </button>
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#064E3B]">
                      {portalView === 'scan' ? 'Scanning...' : portalView === 'photo' ? 'Verify with Photo' : 'Verify with Video'}
                    </h3>
                    <div className="w-10" />
                  </div>

                  <div className="relative mb-8 flex aspect-square w-full items-center justify-center overflow-hidden rounded-[40px] bg-slate-900">
                    <i className={`fas ${portalView === 'scan' ? 'fa-expand' : portalView === 'photo' ? 'fa-camera' : 'fa-video'} text-6xl text-white/15`} />
                    {portalView === 'scan' && <div className="absolute inset-x-8 h-1 animate-[scan_2s_infinite] bg-emerald-400 shadow-[0_0_20px_#10B981]" />}
                    <div className="absolute inset-10 rounded-3xl border-2 border-white/20" />
                  </div>

                  <p className="px-4 text-center text-[10px] font-bold uppercase leading-relaxed tracking-[0.2em] text-slate-400">
                    Capture receipts, infrastructure proof, or partner QR codes for verified organization impact.
                  </p>
                </div>
              )}

              <button
                onClick={() => { setShowScanPortal(false); setPortalView('main'); }}
                className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-emerald-600"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[90] h-28 border-t border-white/20 bg-gradient-to-t from-white/50 via-white/10 to-transparent backdrop-blur-lg" />
      <div className="relative z-[100] shrink-0 px-2 pb-8 pt-2">
        <div className="pointer-events-auto mx-auto flex w-full max-w-[520px] items-center justify-between rounded-[34px] border border-white bg-white/90 px-3 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
          <div className="flex flex-1 items-start justify-between px-1">
            <RoundNavItem
              icon="fa-home"
              label="Green Board"
              isActive={activeScreen === ScreenName.ORG_DASHBOARD}
              onClick={() => handleNav(ScreenName.ORG_DASHBOARD)}
            />
            <RoundNavItem
              icon="fa-bullseye"
              label="Eco Target"
              isActive={activeScreen === ScreenName.ORG_PROGRAMS}
              onClick={() => handleNav(ScreenName.ORG_PROGRAMS)}
            />
            <RoundNavItem
              icon="fa-chart-bar"
              label="Impact"
              isActive={activeScreen === ScreenName.ORG_IMPACT}
              onClick={() => handleNav(ScreenName.ORG_IMPACT)}
            />
          </div>

          <div className="relative -top-5 px-1">
            <button
              onClick={() => { setShowScanPortal(true); setShowMoreWheel(false); }}
              className="group flex flex-col items-center justify-center outline-none transition-all active:scale-95"
              aria-label={`${roleLabel} ID`}
            >
              <div className={`mb-1 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-[0_8px_25px_rgba(16,185,129,0.3)] transition-all ${
                showScanPortal
                  ? 'bg-[#059669] ring-4 ring-emerald-100'
                  : 'bg-[#10B981] group-hover:bg-[#059669]'
              }`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 p-1.5">
                  <img src={uaeOfficialEmblem} alt={`${shortName} badge`} className="h-full w-full object-contain" />
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase leading-none tracking-[0.06em] transition-colors ${
                showScanPortal ? 'text-[#10B981]' : 'text-[#065F46]'
              }`}>
                {roleLabel}
              </span>
            </button>
          </div>

          <div className="flex flex-1 items-start justify-between px-1">
            <RoundNavItem
              icon="fa-trophy"
              label="Reward"
              isActive={activeScreen === ScreenName.ORG_REWARDS}
              onClick={() => handleNav(ScreenName.ORG_REWARDS)}
            />
            <RoundNavItem
              icon="fa-exchange-alt"
              label="Green Share"
              isActive={activeScreen === ScreenName.ORG_GREEN_SHARE}
              onClick={() => handleNav(ScreenName.ORG_GREEN_SHARE)}
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

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scan {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
      `}</style>
    </>
  );
};

const RoundNavItem: React.FC<{ icon: string; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button onClick={onClick} className="group flex w-[48px] flex-col items-center py-1" aria-label={label} aria-current={isActive ? 'page' : undefined}>
    <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
      isActive
        ? 'scale-105 bg-[#10B981] text-white shadow-[0_8px_20px_rgba(16,185,129,0.4)]'
        : 'bg-[#ECFDF5] text-[#10B981] group-hover:bg-[#D1FAE5]'
    }`}>
      <i className={`fas ${icon} text-base`} />
    </div>
    <span className={`mt-1.5 whitespace-normal text-center text-[8px] font-black uppercase leading-tight tracking-[0.03em] transition-all duration-300 ${
      isActive ? 'text-[#065F46] opacity-100' : 'text-slate-400 opacity-75 group-hover:opacity-100'
    }`}>
      {label}
    </span>
  </button>
);

const ScanAction: React.FC<{ icon: string; label: string; color: string; onClick: () => void }> = ({ icon, label, color, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-2 rounded-3xl border border-white p-4 transition-transform active:scale-95 ${color}`}>
    <i className={`fas ${icon} text-lg`} />
    <span className="text-[10px] font-black uppercase tracking-tight">{label}</span>
  </button>
);

const WheelItem: React.FC<{ icon: string; label: string; angle: number; delay: number; onClick: () => void }> = ({ icon, label, angle, delay, onClick }) => {
  const radius = 98;
  const radians = (angle * Math.PI) / 180;
  const x = radius * Math.cos(radians);
  const y = radius * Math.sin(radians);

  return (
    <button
      onClick={onClick}
      className="absolute flex h-16 w-16 flex-col items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-600 shadow-lg transition-all duration-500 hover:scale-110 hover:bg-emerald-50"
      style={{
        left: `calc(50% + ${x}px - 32px)`,
        top: `calc(50% + ${y}px - 32px)`,
        animation: `scaleIn 0.3s ease-out ${delay}s both`,
      }}
    >
      <i className={`fas ${icon} text-lg`} />
      <span className="mt-0.5 text-[8px] font-black uppercase tracking-[0.03em]">{label}</span>
    </button>
  );
};

export default OrgBottomNav;
