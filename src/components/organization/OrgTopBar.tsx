import React from 'react';
import { Bell, Leaf, Menu as MenuIcon } from 'lucide-react';
import { useOrgRoute } from '../../context/OrgRouteContext';

const OrgTopBar: React.FC = () => {
  const { selectedEntity } = useOrgRoute();
  const avatarLetter = selectedEntity?.name ? selectedEntity.name.charAt(0).toUpperCase() : 'M';
  const commandLabel = `${selectedEntity?.shortName ?? 'MOEI'} Command Center`;

  return (
    <div className="h-[110px] pt-[56px] px-6 pb-0 bg-white/80 backdrop-blur-xl border-b border-white/30 shrink-0 z-50 flex items-center justify-between">
      <div className="flex items-center gap-2 min-w-0">
        <button className="w-8 h-8 flex items-center justify-center text-slate-600 active:bg-slate-100 rounded-full transition-colors shrink-0" aria-label="Menu">
          <MenuIcon size={22} strokeWidth={2.5} />
        </button>
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[var(--forest-medium)] to-teal-600 text-white flex items-center justify-center shadow-[0_2px_8px_rgba(6,95,70,0.28)] shrink-0">
          <Leaf size={16} strokeWidth={2.6} />
        </div>
        <div className="min-w-0">
          <h1 className="font-extrabold text-[15px] text-[var(--forest-medium)] leading-tight font-jakarta">Estidamaty</h1>
          <p className="text-[10px] font-semibold text-slate-400 leading-tight truncate max-w-[145px]">{commandLabel}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-[var(--forest-medium)] rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest-light)] animate-pulse" />
          <span className="text-[10px] font-black uppercase">Live</span>
        </div>

        <button className="relative w-8 h-8 flex items-center justify-center text-slate-600 bg-slate-100 active:bg-slate-200 rounded-full transition-colors" aria-label="Notifications">
          <Bell size={17} strokeWidth={2.5} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--forest-medium)] to-teal-600 flex items-center justify-center text-white font-black text-xs shadow-sm shrink-0">
          {avatarLetter}
        </div>
      </div>
    </div>
  );
};

export default OrgTopBar;
