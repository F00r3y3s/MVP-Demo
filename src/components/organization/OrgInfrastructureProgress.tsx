import React from 'react';
import { ArrowRight, Building2, Car, Droplets, Zap } from 'lucide-react';

const INFRASTRUCTURE_ITEMS = [
  { id: 'clean-energy', label: 'Clean Energy Capacity', value: 78, color: '#F59E0B', Icon: Zap },
  { id: 'water-security', label: 'Water Security', value: 64, color: '#0EA5E9', Icon: Droplets },
  { id: 'smart-grid', label: 'Smart Grid Coverage', value: 72, color: '#059669', Icon: Building2 },
  { id: 'ev-network', label: 'EV Charging Network', value: 61, color: '#10B981', Icon: Car },
  { id: 'green-building', label: 'Green Building Adoption', value: 58, color: '#16A34A', Icon: Building2 },
];

const OrgInfrastructureProgress: React.FC = () => (
  <div className="flex h-full flex-col rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.06)]">
    <div className="mb-2 flex items-start justify-between gap-2">
      <div className="min-w-0">
        <h3 className="text-[11px] font-black uppercase leading-tight text-slate-900">Infrastructure Progress</h3>
        <p className="mt-0.5 text-[8.5px] font-bold leading-tight text-slate-400">Key national infrastructure indicators</p>
      </div>
      <span className="shrink-0 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[8px] font-black text-emerald-600">Active</span>
    </div>

    <div className="flex-1 space-y-2">
      {INFRASTRUCTURE_ITEMS.map(item => {
        const Icon = item.Icon;

        return (
          <div key={item.id} className="grid grid-cols-[20px_minmax(0,1fr)_28px] items-center gap-2">
            <Icon size={17} strokeWidth={2.7} style={{ color: item.color }} />
            <div className="min-w-0">
              <div className="truncate text-[9px] font-black text-slate-700">{item.label}</div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
              </div>
            </div>
            <span className="text-right text-[10px] font-black text-slate-800">{item.value}%</span>
          </div>
        );
      })}
    </div>

    <button
      type="button"
      className="mt-3 flex h-8 w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 text-[10px] font-black text-[var(--forest-medium)] transition-transform active:scale-[0.99]"
    >
      Explore All Infrastructure
      <ArrowRight size={13} strokeWidth={2.6} />
    </button>
  </div>
);

export default OrgInfrastructureProgress;
