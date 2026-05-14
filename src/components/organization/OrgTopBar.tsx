import React from 'react';
import { Bell, Leaf, UserRound } from 'lucide-react';
import { useOrgRoute } from '../../context/OrgRouteContext';
import { ScreenName } from '../../types';

const OrgTopBar: React.FC<{ onNavigate?: (screen: ScreenName) => void; onSwitchPath?: () => void }> = ({ onNavigate, onSwitchPath }) => {
  const { selectedEntity } = useOrgRoute();
  const commandLabel = `${selectedEntity?.shortName ?? 'MOEI'} Command Center`;

  return (
    <div className="h-[110px] pt-[56px] px-5 pb-0 bg-white/80 backdrop-blur-xl border-b border-white/30 shrink-0 z-50 flex items-center justify-between">
      <button
        type="button"
        onClick={() => onNavigate?.(ScreenName.ORG_MORE)}
        className="flex min-w-0 items-center gap-2.5 rounded-2xl pr-2 text-left active:scale-[0.99] transition-transform"
        aria-label="Open organization profile settings"
      >
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[var(--forest-medium)] to-teal-600 text-white flex items-center justify-center shadow-[0_2px_8px_rgba(6,95,70,0.28)] shrink-0">
          <Leaf size={16} strokeWidth={2.6} />
        </div>
        <div className="min-w-0">
          <h1 className="font-extrabold text-[15px] text-[var(--forest-medium)] leading-tight font-jakarta">Estidamaty</h1>
          <p className="text-[10px] font-semibold text-slate-400 leading-tight truncate max-w-[145px]">{commandLabel}</p>
        </div>
      </button>

      <div className="flex items-center gap-1.5 shrink-0 pl-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-[var(--forest-medium)] rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest-light)] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-wide">Active</span>
        </div>

        {onSwitchPath && (
          <button
            type="button"
            onClick={onSwitchPath}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-[var(--forest-medium)] transition-colors active:bg-emerald-100"
            aria-label="Switch to individual demo"
            title="Switch to individual"
          >
            <UserRound size={16} strokeWidth={2.6} />
          </button>
        )}

        <button className="relative w-8 h-8 flex items-center justify-center text-slate-600 bg-slate-100 active:bg-slate-200 rounded-full transition-colors" aria-label="Notifications">
          <Bell size={17} strokeWidth={2.5} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
        </button>
      </div>
    </div>
  );
};

export default OrgTopBar;
