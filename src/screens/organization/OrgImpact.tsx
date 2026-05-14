import React from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Cloud,
  Droplets,
  Leaf,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import OrgChart from '../../components/organization/OrgChart';
import { lightChartOptions, OrgSectionCard } from '../../components/organization/OrgCommandComponents';
import { useOrgRoute } from '../../context/OrgRouteContext';
import { ScreenName } from '../../types';
import { BCI_TREND_LABELS, BCI_TREND_VALUES, ESG_ENV_BAR_DATA } from '../../data/orgCommandCenter';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
}

const impactTrendData = {
  labels: BCI_TREND_LABELS.slice(-7),
  datasets: [
    {
      data: BCI_TREND_VALUES.slice(-7),
      borderColor: '#059669',
      backgroundColor: 'rgba(5,150,105,.12)',
      borderWidth: 2.5,
      fill: true,
      tension: 0.42,
      pointRadius: 3,
      pointBackgroundColor: '#059669',
      pointBorderColor: '#fff',
      pointBorderWidth: 1.5,
    },
  ],
};

const quickMetrics = [
  { label: 'CO2 Reduced', value: '12,450', unit: 't', change: '+8.4%', Icon: Cloud, color: '#059669' },
  { label: 'Water Saved', value: '28.6M', unit: 'L', change: '+6.1%', Icon: Droplets, color: '#0284C7' },
  { label: 'Energy Offset', value: '96.3', unit: 'GWh', change: '+4.8%', Icon: Zap, color: '#F59E0B' },
  { label: 'Verified Actions', value: '1.84M', unit: '', change: '+12.2%', Icon: CheckCircle2, color: '#10B981' },
];

const activeTargets = [
  { title: 'Green building adoption', owner: 'Facilities', progress: 58, state: 'Behind target', color: '#D97706' },
  { title: 'Water security acceleration', owner: 'Utilities', progress: 64, state: 'Watch', color: '#0284C7' },
  { title: 'Clean energy capacity', owner: 'Climate Office', progress: 78, state: 'Ahead', color: '#059669' },
];

const impactLevers = [
  { title: 'Retrofit high-load buildings before summer peak.', value: '14.1K t', label: 'CO2e avoidable', color: '#059669', Icon: Building2 },
  { title: 'Extend industrial water reuse nudges to Sharjah.', value: '3.8B L', label: 'annual water upside', color: '#0284C7', Icon: Droplets },
  { title: 'Shift EV outreach to corridor operators.', value: '22%', label: 'adoption lift', color: '#D97706', Icon: Zap },
];

const OrgImpact: React.FC<Props> = ({ onNavigate }) => {
  const { selectedEntity } = useOrgRoute();
  const shortName = selectedEntity?.shortName ?? 'MOEI';
  const entityName = selectedEntity?.name ?? 'Ministry of Energy and Infrastructure';

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_IMPACT} onNavigate={onNavigate}>
      <div className="h-full overflow-y-auto no-scrollbar bg-[#F7F9F8]">
        <div className="space-y-4 px-3.5 py-3 pb-28">
          <section className="relative overflow-hidden rounded-[30px] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-slate-950 via-[#064E3B] to-[#0F766E]" />
            <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="relative text-white">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/12 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-white/70">
                  {shortName} impact ledger
                </span>
                <span className="flex items-center gap-1 rounded-full bg-white/14 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-emerald-100">
                  <ShieldCheck size={11} strokeWidth={3} />
                  Verified
                </span>
              </div>
              <p className="mt-4 text-[9px] font-black uppercase tracking-[0.18em] text-emerald-100/70">Organization impact</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-jakarta text-[36px] font-black leading-none tracking-[-0.04em]">78,450</span>
                <span className="text-[11px] font-black uppercase text-emerald-100/70">t CO2e</span>
              </div>
              <h1 className="mt-2 text-[18px] font-black leading-6">Avoided through verified policy, infrastructure, and behavior shifts.</h1>
              <p className="mt-2 line-clamp-2 text-[10px] font-semibold leading-4 text-white/68">{entityName} impact portfolio across climate, water, energy, and public engagement.</p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: 'Water', value: '28.6M L', Icon: Droplets },
                  { label: 'Energy', value: '96.3 GWh', Icon: Zap },
                  { label: 'Actions', value: '1.84M', Icon: CheckCircle2 },
                ].map(item => {
                  const Icon = item.Icon;
                  return (
                    <div key={item.label} className="rounded-2xl bg-white/12 p-2.5">
                      <Icon size={14} className="mb-1 text-emerald-100" strokeWidth={2.8} />
                      <p className="truncate text-[12px] font-black leading-none">{item.value}</p>
                      <p className="mt-1 text-[8px] font-black uppercase tracking-wide text-white/50">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-2">
            {quickMetrics.map(metric => {
              const Icon = metric.Icon;
              return (
                <OrgSectionCard key={metric.label} className="p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: `${metric.color}14`, color: metric.color }}>
                      <Icon size={16} strokeWidth={2.6} />
                    </div>
                    <p className="min-w-0 text-[10px] font-black leading-tight text-slate-900">{metric.label}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-jakarta text-[23px] font-black leading-none tracking-[-0.05em] text-slate-950">{metric.value}</span>
                    {metric.unit && <span className="text-[11px] font-semibold text-slate-700">{metric.unit}</span>}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[9px] font-black text-[var(--forest-medium)]">
                    <TrendingUp size={10} strokeWidth={3} />
                    {metric.change}
                  </div>
                </OrgSectionCard>
              );
            })}
          </section>

          <OrgSectionCard className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Currently Active</h2>
                <p className="text-[9px] font-semibold text-slate-400">Priority org targets under execution</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-black text-slate-500">(3) View all</span>
            </div>
            <div className="space-y-2.5">
              {activeTargets.map(target => (
                <button
                  key={target.title}
                  type="button"
                  onClick={() => onNavigate(ScreenName.ORG_PROGRAMS)}
                  className="w-full rounded-2xl bg-[#F8FAFC] p-3 text-left active:scale-[0.99]"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ backgroundColor: target.color }}>
                      <Leaf size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-xs font-black text-slate-900">{target.title}</h3>
                      <p className="text-[9px] font-semibold" style={{ color: target.color }}>{target.owner} · {target.state}</p>
                    </div>
                    <ArrowRight size={14} className="text-slate-300" />
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full" style={{ width: `${target.progress}%`, backgroundColor: target.color }} />
                  </div>
                </button>
              ))}
            </div>
          </OrgSectionCard>

          <section className="grid grid-cols-[1fr_120px] gap-2">
            <OrgSectionCard className="p-3.5">
              <div className="mb-2 flex items-center gap-2">
                <Building2 size={16} className="text-slate-400" />
                <h2 className="text-xs font-black text-slate-900">Impact Forecast</h2>
              </div>
              <OrgChart
                kind="line"
                data={impactTrendData}
                height={134}
                options={{
                  ...lightChartOptions,
                  scales: {
                    x: { ticks: { color: '#94A3B8', font: { size: 8 } }, grid: { display: false }, border: { display: false } },
                    y: { display: false, min: 68, max: 76 },
                  },
                }}
              />
            </OrgSectionCard>
            <OrgSectionCard className="p-3.5">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase leading-tight text-slate-400">BCI Index</p>
                  <p className="mt-1 font-jakarta text-[34px] font-black leading-none text-[var(--forest-medium)]">74.8</p>
                  <p className="mt-1 text-[9px] font-bold text-emerald-600">+3.2% today</p>
                </div>
                <button onClick={() => onNavigate(ScreenName.ORG_BCI_INDEX)} className="mt-2 rounded-xl bg-emerald-50 py-2 text-[9px] font-black text-[var(--forest-medium)]">
                  Details
                </button>
              </div>
            </OrgSectionCard>
          </section>

          <OrgSectionCard className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Impact Levers</h2>
                <p className="text-[9px] font-semibold text-slate-400">Highest-return moves by verified outcome</p>
              </div>
              <Target size={18} className="text-slate-400" />
            </div>
            <div className="space-y-2">
              {impactLevers.map(suggestion => {
                const Icon = suggestion.Icon;
                return (
                <button
                  key={suggestion.title}
                  type="button"
                  onClick={() => onNavigate(ScreenName.ORG_PROGRAMS)}
                  className="grid w-full grid-cols-[38px_minmax(0,1fr)_64px] items-center gap-3 rounded-2xl bg-[#F8FAFC] p-3 text-left active:scale-[0.99]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${suggestion.color}14`, color: suggestion.color }}>
                    <Icon size={17} strokeWidth={2.6} />
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-[11px] font-black leading-4 text-slate-900">{suggestion.title}</p>
                    <p className="mt-1 text-[9px] font-semibold text-slate-400">{suggestion.label}</p>
                  </div>
                  <p className="text-right text-[15px] font-black" style={{ color: suggestion.color }}>{suggestion.value}</p>
                </button>
                );
              })}
            </div>
          </OrgSectionCard>

          <OrgSectionCard className="p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-black text-slate-900">Sector Impact</h2>
                <p className="text-[9px] font-semibold text-slate-400">CO2 avoided by source</p>
              </div>
              <Users size={17} className="text-slate-400" />
            </div>
            <OrgChart kind="bar" data={ESG_ENV_BAR_DATA} height={160} options={lightChartOptions} />
          </OrgSectionCard>
        </div>
      </div>
    </OrganizationLayout>
  );
};

export default OrgImpact;
