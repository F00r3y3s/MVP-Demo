import React from 'react';
import { ArrowRight, Cloud, Gauge, Play, SlidersHorizontal, Zap } from 'lucide-react';
import { ScreenName } from '../../types';
import { OrgSectionCard } from './OrgCommandComponents';

const OrgPolicySimulator: React.FC<{ onNavigate?: (screen: ScreenName) => void }> = ({ onNavigate }) => (
  <OrgSectionCard
    className="group relative flex h-full min-h-[178px] min-w-0 flex-col overflow-hidden p-3.5"
    onClick={() => onNavigate?.(ScreenName.ORG_POLICY_SIMULATOR)}
    ariaLabel="Open policy impact simulator"
  >
    <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full bg-amber-200/40 blur-2xl" />
    <div className="relative mb-3 flex items-start justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
          <SlidersHorizontal size={18} strokeWidth={2.6} />
        </div>
        <div className="min-w-0">
          <h3 className="text-[10px] font-black uppercase leading-tight tracking-[0.04em] text-slate-800">Policy Simulator</h3>
          <p className="truncate text-[8px] font-bold uppercase tracking-wider text-slate-400">30-day forecast</p>
        </div>
      </div>
      <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[8px] font-black uppercase text-amber-700">
        <Gauge size={10} strokeWidth={3} />
        Live
      </span>
    </div>

    <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-[#92400E] to-[#065F46] p-3 text-white">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-white/45">Modeled lift</p>
          <p className="mt-0.5 font-jakarta text-[26px] font-black leading-none">4.3M L</p>
          <p className="mt-1 text-[9px] font-semibold text-white/62">water saved</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/12">
          <Play size={15} fill="currentColor" />
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/18">
        <div className="h-full w-[72%] rounded-full bg-amber-300" />
      </div>
    </div>

    <div className="mt-2 grid grid-cols-2 gap-2">
      {[
        { label: 'Energy', value: '118K kWh', Icon: Zap, color: '#D97706' },
        { label: 'CO2', value: '2.3K t', Icon: Cloud, color: '#059669' },
      ].map(item => {
        const Icon = item.Icon;
        return (
          <div key={item.label} className="rounded-xl bg-[#F8FAFC] p-2.5">
            <div className="mb-1 flex items-center gap-1.5">
              <Icon size={12} style={{ color: item.color }} strokeWidth={2.8} />
              <p className="text-[8px] font-black uppercase text-slate-400">{item.label}</p>
            </div>
            <p className="truncate text-[12px] font-black text-slate-900">{item.value}</p>
          </div>
        );
      })}
    </div>

    <div className="mt-auto flex h-8 items-center justify-center gap-1 rounded-xl bg-amber-50 text-[10px] font-black text-amber-700">
      Run simulation
      <ArrowRight size={12} strokeWidth={2.8} />
    </div>
  </OrgSectionCard>
);

export default OrgPolicySimulator;
