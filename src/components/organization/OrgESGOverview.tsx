import React from 'react';
import { ArrowRight, Building2, FileBarChart, ShieldCheck, TrendingUp } from 'lucide-react';
import { ScreenName } from '../../types';
import OrgChart from './OrgChart';
import { miniChartOptions, OrgSectionCard } from './OrgCommandComponents';

const scopeTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [48, 52, 56, 59, 62, 64],
      borderColor: '#7C3AED',
      backgroundColor: 'rgba(124,58,237,.16)',
      fill: true,
      tension: 0.42,
    },
  ],
};

const OrgESGOverview: React.FC<{ onNavigate?: (screen: ScreenName) => void }> = ({ onNavigate }) => (
  <OrgSectionCard
    className="group flex h-full min-h-[178px] min-w-0 flex-col overflow-hidden p-3.5"
    onClick={() => onNavigate?.(ScreenName.ORG_ESG_REPORTS)}
    ariaLabel="View Scope 3 ESG report"
  >
    <div className="mb-3 flex items-start justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
          <FileBarChart size={18} strokeWidth={2.6} />
        </div>
        <div className="min-w-0">
          <h3 className="text-[10px] font-black uppercase leading-tight tracking-[0.04em] text-slate-800">Scope 3 ESG</h3>
          <p className="truncate text-[8px] font-bold uppercase tracking-wider text-slate-400">Supplier evidence</p>
        </div>
      </div>
      <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[8px] font-black uppercase text-violet-600">Q4</span>
    </div>

    <div className="rounded-2xl bg-[#F8FAFC] p-3">
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Evidence coverage</p>
          <p className="mt-0.5 font-jakarta text-[26px] font-black leading-none text-violet-700">64%</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-black text-[var(--forest-medium)]">
          <TrendingUp size={10} strokeWidth={3} />
          +12 pts
        </div>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-violet-100">
        <div className="h-full w-[64%] rounded-full bg-violet-600" />
      </div>
    </div>

    <div className="mt-2 grid grid-cols-[1fr_74px] gap-2">
      <div className="space-y-1.5">
        {[
          { label: 'Partners', value: '412', Icon: Building2 },
          { label: 'Verified CO2e', value: '78.4K t', Icon: ShieldCheck },
        ].map(item => {
          const Icon = item.Icon;
          return (
            <div key={item.label} className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-1.5 shadow-inner ring-1 ring-slate-100">
              <Icon size={13} className="shrink-0 text-slate-400" strokeWidth={2.6} />
              <span className="min-w-0">
                <span className="block truncate text-[8px] font-black uppercase text-slate-400">{item.label}</span>
                <span className="block truncate text-[11px] font-black text-slate-900">{item.value}</span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="rounded-xl bg-violet-950 p-2">
        <OrgChart kind="line" data={scopeTrendData} height={58} options={miniChartOptions} />
      </div>
    </div>

    <div className="mt-auto flex h-8 items-center justify-center gap-1 rounded-xl bg-violet-50 text-[10px] font-black text-violet-700">
      View report
      <ArrowRight size={12} strokeWidth={2.8} />
    </div>
  </OrgSectionCard>
);

export default OrgESGOverview;
