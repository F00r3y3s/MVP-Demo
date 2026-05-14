import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Crown,
  Droplets,
  Flame,
  Globe,
  Leaf,
  LineChart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import OrgChart from '../../components/organization/OrgChart';
import { ScreenName } from '../../types';
import {
  BCI_COMPOSITION,
  BCI_TREND_LABELS,
  BCI_TREND_VALUES,
  ORG_EMIRATES,
} from '../../data/orgCommandCenter';
import { lightChartOptions, OrgSectionCard } from '../../components/organization/OrgCommandComponents';
import { useOrgRoute } from '../../context/OrgRouteContext';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

const trendData = {
  labels: BCI_TREND_LABELS,
  datasets: [{
    data: BCI_TREND_VALUES,
    borderColor: '#065F46',
    backgroundColor: 'rgba(6,95,70,.1)',
    borderWidth: 2.5,
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointBackgroundColor: '#065F46',
    pointBorderColor: '#fff',
    pointBorderWidth: 1.5,
  }],
};

const emiratesBarData = {
  labels: ORG_EMIRATES.map(e => e.name.split(' ')[0]),
  datasets: [{
    data: ORG_EMIRATES.map(e => e.score),
    backgroundColor: ORG_EMIRATES.map(e => `${e.color}cc`),
    borderColor: ORG_EMIRATES.map(e => e.color),
    borderWidth: 1.5,
    borderRadius: 8,
  }],
};

const quickStats = [
  { Icon: TrendingUp, label: 'Weekly Change', value: '+1.8', unit: 'pts', sub: 'Positive trend', color: '#059669' },
  { Icon: Crown, label: 'Top Emirate', value: 'Dubai', unit: '', sub: '82.5 pts · #1', color: '#D97706' },
  { Icon: Users, label: 'Participants', value: '2.1M', unit: '', sub: '+7.6% WoW', color: '#2563EB' },
  { Icon: Target, label: 'Gap to Target', value: '10.2', unit: 'pts', sub: 'to 2030 goal', color: '#7C3AED' },
];

const behaviorSignals = [
  { icon: Zap, title: 'EV adoption surging in Dubai', body: 'Charging station utilization up 22% week-over-week. Contributing +0.4 to BCI.', time: '2h ago', color: '#059669', trend: '+0.4' },
  { icon: Droplets, title: 'Water conservation dip in RAK', body: 'Smart meter readings show 8% increase in consumption. AI nudges dispatched.', time: '4h ago', color: '#0284C7', trend: '-0.2' },
  { icon: Leaf, title: 'Green building compliance rising', body: '34 new buildings certified this week. Strongest growth in Sharjah district.', time: '6h ago', color: '#065F46', trend: '+0.3' },
];

type ViewTab = 'overview' | 'emirates' | 'composition';
const viewTabs: Array<{ id: ViewTab; label: string; Icon: typeof LineChart }> = [
  { id: 'overview', label: 'Overview', Icon: LineChart },
  { id: 'emirates', label: 'Emirates', Icon: MapPin },
  { id: 'composition', label: 'Breakdown', Icon: BarChart3 },
];

const OrgBCIIndex: React.FC<Props> = ({ onNavigate }) => {
  const { selectedEntity } = useOrgRoute();
  const shortName = selectedEntity?.shortName ?? 'MOEI';
  const [activeTab, setActiveTab] = useState<ViewTab>('overview');

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_BCI_INDEX} onNavigate={onNavigate}>
      <div className="h-full overflow-y-auto no-scrollbar bg-[#F7F9F8]">
        <div className="space-y-3 px-3.5 py-3 pb-28">

          {/* ── Hero Section ── */}
          <section className="relative overflow-hidden rounded-[30px] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-slate-950 via-[#064E3B] to-[#0F766E]" />
            <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-teal-400/15 blur-2xl" />

            <div className="relative text-white">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/12 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-white/70">
                  {shortName} behavioral index
                </span>
                <span className="flex items-center gap-1 rounded-full bg-white/14 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-emerald-100">
                  <Activity size={10} strokeWidth={3} />
                  Live
                </span>
              </div>

              <p className="mt-4 text-[9px] font-black uppercase tracking-[0.18em] text-emerald-100/70">UAE Behavioral Change Index</p>

              <div className="mt-1 flex items-end gap-3">
                <span className="font-jakarta text-[56px] font-black leading-none tracking-[-0.06em]">74.8</span>
                <div className="mb-2">
                  <div className="flex items-center gap-1 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[11px] font-black text-emerald-200">
                    <ArrowUpRight size={13} strokeWidth={3} />
                    +3.2%
                  </div>
                  <p className="mt-1 text-[10px] font-semibold text-white/55">vs yesterday</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: '2030 Target', value: '85.0' },
                  { label: 'Progress', value: '88%' },
                  { label: 'Time Left', value: '4.2 yrs' },
                ].map(item => (
                  <div key={item.label} className="rounded-2xl bg-white/12 p-2.5">
                    <p className="truncate text-[13px] font-black leading-none">{item.value}</p>
                    <p className="mt-1 text-[8px] font-black uppercase tracking-wide text-white/50">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="relative h-full w-[88%] overflow-hidden rounded-full bg-gradient-to-r from-emerald-300 to-emerald-100">
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                </div>
                <div className="mt-1.5 flex justify-between text-[8px] font-bold text-white/50">
                  <span>0</span>
                  <span>Current: 74.8</span>
                  <span>Target: 85</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Quick Stats ── */}
          <section className="grid grid-cols-2 gap-2">
            {quickStats.map(stat => {
              const Icon = stat.Icon;
              return (
                <OrgSectionCard key={stat.label} className="p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: `${stat.color}14`, color: stat.color }}>
                      <Icon size={16} strokeWidth={2.6} />
                    </div>
                    <p className="min-w-0 text-[9px] font-black uppercase tracking-wide text-slate-400">{stat.label}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-jakarta text-[22px] font-black leading-none tracking-[-0.04em] text-slate-950">{stat.value}</span>
                    {stat.unit && <span className="text-[11px] font-bold text-slate-500">{stat.unit}</span>}
                  </div>
                  <p className="mt-1.5 text-[9px] font-semibold text-slate-400">{stat.sub}</p>
                </OrgSectionCard>
              );
            })}
          </section>

          {/* ── Tab Navigation ── */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {viewTabs.map(tab => {
              const active = activeTab === tab.id;
              const Icon = tab.Icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-[10px] font-black transition-all ${
                    active
                      ? 'border-transparent bg-[#065F46] text-white shadow-[0_4px_12px_rgba(6,95,70,.22)]'
                      : 'border-white bg-white text-slate-500'
                  }`}
                >
                  <Icon size={12} strokeWidth={2.7} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ── Overview Tab ── */}
          {activeTab === 'overview' && (
            <>
              <OrgSectionCard className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">30-Day BCI Trend</h2>
                    <p className="text-[9px] font-semibold text-slate-400">National index movement across all emirates</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black text-[var(--forest-medium)]">
                    <TrendingUp size={10} strokeWidth={3} />
                    Upward
                  </div>
                </div>
                <OrgChart kind="line" data={trendData} height={170} options={{ ...lightChartOptions, scales: { ...lightChartOptions.scales, y: { ...lightChartOptions.scales.y, min: 64, max: 78 } } }} />
              </OrgSectionCard>

              {/* Behavior Signals */}
              <OrgSectionCard className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Behavior Signals</h2>
                    <p className="text-[9px] font-semibold text-slate-400">AI-detected behavioral shifts affecting BCI</p>
                  </div>
                  <Sparkles size={17} className="text-slate-400" />
                </div>
                <div className="space-y-2">
                  {behaviorSignals.map(signal => {
                    const Icon = signal.icon;
                    const isPositive = signal.trend.startsWith('+');
                    return (
                      <div key={signal.title} className="rounded-2xl bg-[#F8FAFC] p-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${signal.color}14`, color: signal.color }}>
                            <Icon size={17} strokeWidth={2.6} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="truncate text-[11px] font-black text-slate-900">{signal.title}</h3>
                              <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-black ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                {signal.trend}
                              </span>
                            </div>
                            <p className="mt-1 line-clamp-2 text-[10px] font-semibold leading-4 text-slate-500">{signal.body}</p>
                            <p className="mt-1.5 text-[8px] font-bold text-slate-400">{signal.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </OrgSectionCard>
            </>
          )}

          {/* ── Emirates Tab ── */}
          {activeTab === 'emirates' && (
            <>
              <OrgSectionCard className="overflow-hidden">
                <div className="border-b border-slate-100 px-3.5 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xs font-black text-slate-900">Emirates BCI Ranking</h2>
                      <p className="mt-0.5 text-[9px] font-semibold text-slate-400">Live performance across all 7 emirates</p>
                    </div>
                    <Globe size={17} className="text-slate-400" />
                  </div>
                </div>
                <div>
                  {ORG_EMIRATES.map((emirate, index) => {
                    const isTop = index < 2;
                    const tierBg = emirate.score >= 75 ? '#ECFDF5' : emirate.score >= 65 ? '#FFFBEB' : '#FEF2F2';
                    return (
                      <div key={emirate.name} className="grid grid-cols-[32px_minmax(0,1fr)_64px] items-center gap-3 border-b border-slate-100 px-3.5 py-3 last:border-b-0">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white"
                          style={{ backgroundColor: emirate.color }}
                        >
                          {isTop ? <Crown size={14} /> : index + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-[11px] font-black text-slate-900">{emirate.name}</span>
                            <span className="shrink-0 rounded-full px-1.5 py-0.5 text-[7px] font-black uppercase" style={{ backgroundColor: tierBg, color: emirate.color }}>
                              {emirate.tier}
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(emirate.score / 100) * 100}%`, backgroundColor: emirate.color }} />
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[18px] font-black tracking-[-0.04em]" style={{ color: emirate.color }}>{emirate.score}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </OrgSectionCard>

              <OrgSectionCard className="p-3.5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black text-slate-900">Emirates Comparison</h3>
                    <p className="mt-0.5 text-[9px] font-semibold text-slate-400">BCI score distribution by emirate</p>
                  </div>
                  <BarChart3 size={17} className="text-slate-400" />
                </div>
                <OrgChart kind="bar" data={emiratesBarData} height={170} options={{ ...lightChartOptions, scales: { ...lightChartOptions.scales, y: { ...lightChartOptions.scales.y, min: 40, max: 90 } } }} />
              </OrgSectionCard>
            </>
          )}

          {/* ── Composition Tab ── */}
          {activeTab === 'composition' && (
            <>
              <OrgSectionCard className="overflow-hidden p-0">
                <div className="grid grid-cols-[1fr_92px] gap-3 p-3.5">
                  <div className="min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#065F46]">Score composition</p>
                    <h2 className="mt-1 text-[15px] font-black leading-5 text-slate-900">BCI is powered by 5 behavioral pillars.</h2>
                    <p className="mt-1.5 line-clamp-2 text-[10px] font-semibold leading-4 text-slate-500">Each pillar captures verified behavior shifts from smart meters, mobility sensors, and AI-verified actions.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-[22px] bg-[#065F46] p-3 text-white">
                    <p className="text-[8px] font-black uppercase tracking-wide text-white/55">Pillars</p>
                    <p className="mt-1 text-[28px] font-black leading-none">5</p>
                    <ArrowRight size={14} className="mt-2 text-white/70" strokeWidth={2.8} />
                  </div>
                </div>
              </OrgSectionCard>

              <OrgSectionCard className="p-3.5">
                <h3 className="mb-3 text-xs font-black text-slate-900">Score Distribution</h3>
                <OrgChart
                  kind="doughnut"
                  height={160}
                  data={{
                    labels: BCI_COMPOSITION.map(c => c.label),
                    datasets: [{ data: BCI_COMPOSITION.map(c => c.value), backgroundColor: BCI_COMPOSITION.map(c => c.color), borderWidth: 0, hoverOffset: 5 }],
                  }}
                  options={{ ...lightChartOptions, cutout: '68%', scales: {} }}
                />
              </OrgSectionCard>

              <OrgSectionCard className="overflow-hidden">
                <div className="border-b border-slate-100 px-3.5 py-3">
                  <h3 className="text-xs font-black text-slate-900">Pillar Breakdown</h3>
                  <p className="mt-0.5 text-[9px] font-semibold text-slate-400">Weighted contribution to overall BCI score</p>
                </div>
                <div>
                  {BCI_COMPOSITION.map(pillar => {
                    const pillIcons: Record<string, typeof Zap> = {
                      'Energy Behavior': Zap,
                      'Water Usage': Droplets,
                      'Transport': Activity,
                      'Waste Mgmt': Leaf,
                      'Air Quality': Flame,
                    };
                    const Icon = pillIcons[pillar.label] ?? Leaf;
                    return (
                      <div key={pillar.label} className="grid grid-cols-[40px_minmax(0,1fr)_52px] items-center gap-3 border-b border-slate-100 px-3.5 py-3 last:border-b-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${pillar.color}14`, color: pillar.color }}>
                          <Icon size={17} strokeWidth={2.4} />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[11px] font-black text-slate-800">{pillar.label}</span>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full" style={{ width: `${pillar.value * 3.3}%`, backgroundColor: pillar.color }} />
                          </div>
                        </div>
                        <span className="text-right text-[16px] font-black" style={{ color: pillar.color }}>{pillar.value}%</span>
                      </div>
                    );
                  })}
                </div>
              </OrgSectionCard>
            </>
          )}

          {/* ── Data Sources Footer ── */}
          <OrgSectionCard className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Data Sources</h2>
                <p className="text-[9px] font-semibold text-slate-400">Live feeds powering the BCI computation</p>
              </div>
              <ShieldCheck size={17} className="text-[var(--forest-medium)]" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Smart Meters', count: '4.2M', status: 'Active' },
                { label: 'Mobility Sensors', count: '890K', status: 'Active' },
                { label: 'Consumption APIs', count: '12', status: 'Connected' },
                { label: 'AI Verification', count: '3.1M', status: 'Processing' },
              ].map(source => (
                <div key={source.label} className="rounded-2xl bg-[#F8FAFC] p-3">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={11} className="text-[var(--forest-medium)]" strokeWidth={3} />
                    <span className="text-[9px] font-black uppercase text-slate-400">{source.label}</span>
                  </div>
                  <p className="mt-1 text-[15px] font-black leading-none text-slate-900">{source.count}</p>
                  <p className="mt-1 text-[8px] font-bold text-emerald-600">{source.status}</p>
                </div>
              ))}
            </div>
          </OrgSectionCard>

          {/* Aligned with badge */}
          <div className="flex items-center justify-center gap-2 py-2 text-[9px] font-bold text-slate-400">
            <ShieldCheck size={12} className="text-slate-400" />
            Aligned with UAE Net Zero 2050 Strategy
          </div>

        </div>
      </div>
    </OrganizationLayout>
  );
};

export default OrgBCIIndex;
