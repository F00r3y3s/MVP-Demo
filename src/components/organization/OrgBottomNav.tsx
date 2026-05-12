import React from 'react';
import {
  LayoutDashboard, LineChart, Bot, LayoutGrid, FileText, Menu, Layers, FileBarChart, Users, Settings
} from 'lucide-react';
import { ScreenName } from '../../types';
import { ORG_NAV_ITEMS } from '../../data/orgNavRegistry';

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string; fill?: string; strokeWidth?: number }>> = {
  LayoutDashboard,
  LineChart,
  Bot,
  LayoutGrid,
  FileText,
  Menu,
  Layers,
  FileBarChart,
  Users,
  Settings,
};

interface Props {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

const OrgBottomNav: React.FC<Props> = ({ activeScreen, onNavigate }) => {
  return (
    <div className="relative z-[100] shrink-0 px-2 pb-8 pt-2">
      <div className="mx-auto flex w-full max-w-[520px] items-center justify-between rounded-[34px] border border-white bg-white/90 px-2.5 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
      {ORG_NAV_ITEMS.map(item => {
        const Icon = ICON_MAP[item.iconKey] ?? LayoutDashboard;
        const isActive = activeScreen === item.screen;
        const isAgent = item.id === 'ai_agent';

        if (isAgent) {
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.screen)}
              className="relative flex h-[58px] flex-1 flex-col items-center justify-end transition-all active:scale-95"
              aria-label={item.label}
            >
              <div className={`absolute -top-5 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white shadow-[0_8px_25px_rgba(16,185,129,0.3)] ${isActive ? 'bg-[#059669] ring-4 ring-emerald-100' : 'bg-[#10B981]'}`}>
                <Icon size={21} className="text-white" strokeWidth={2.5} />
              </div>
              <span className={`text-[8px] font-black uppercase leading-tight transition-colors ${isActive ? 'text-[var(--forest-medium)]' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.screen)}
            className={`flex h-[58px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl transition-all ${
              isActive ? 'text-[var(--forest-medium)]' : 'hover:bg-slate-50 active:scale-95'
            }`}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${isActive ? 'bg-[#10B981] text-white shadow-[0_8px_20px_rgba(16,185,129,0.35)]' : 'bg-[#ECFDF5] text-[#10B981]'}`}>
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span
              className={`text-[8px] font-black uppercase leading-tight transition-colors ${
                isActive ? 'text-[var(--forest-medium)]' : 'text-slate-400'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
      </div>
    </div>
  );
};

export default OrgBottomNav;
