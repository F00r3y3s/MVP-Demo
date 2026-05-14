import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  Droplets,
  RefreshCw,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import OrgChart from '../../components/organization/OrgChart';
import { ScreenName } from '../../types';
import { AI_INSIGHTS } from '../../data/orgCommandCenter';
import { lightChartOptions, OrgScreenShell, OrgSectionCard } from '../../components/organization/OrgCommandComponents';
import { useOrgRoute } from '../../context/OrgRouteContext';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
}

const ICONS = { Zap, Droplets, Trophy: CheckCircle2, Sun: Sparkles };

const aiDonutData = {
  labels: ['Energy Saving', 'Water Conservation', 'Green Transport', 'Recycling', 'Solar Adoption'],
  datasets: [{
    data: [32, 24, 20, 15, 9],
    backgroundColor: ['#065F46', '#0284C7', '#D97706', '#7C3AED', '#059669'],
    borderWidth: 0,
    hoverOffset: 4,
  }],
};

const aiTrendData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Success Rate %',
    data: [82, 85, 87, 84, 88, 90, 87.6],
    borderColor: '#2563EB',
    backgroundColor: 'rgba(37,99,235,.1)',
    borderWidth: 2.5,
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointBackgroundColor: '#2563EB',
    pointBorderColor: '#fff',
    pointBorderWidth: 1.5,
  }],
};

const forecastData = {
  labels: ['Now', '+2h', '+4h', '+6h', '+8h'],
  datasets: [{
    label: 'Expected load',
    data: [71, 76, 83, 88, 92],
    borderColor: '#F59E0B',
    backgroundColor: 'rgba(245,158,11,.15)',
    borderWidth: 2.5,
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointBackgroundColor: '#F59E0B',
    pointBorderColor: '#fff',
    pointBorderWidth: 1.5,
  }],
};

const stats = [
  { icon: Send, label: 'Nudges Sent', value: '245,890', sub: 'Today', color: '#065F46' },
  { icon: AlertTriangle, label: 'Deviations', value: '18,423', sub: 'Detected', color: '#D97706' },
  { icon: RefreshCw, label: 'Habit Converts', value: '64,210', sub: 'This Week', color: '#2563EB' },
  { icon: CheckCircle2, label: 'Goal Compliance', value: '91.4%', sub: 'vs 88.2% last wk', color: '#065F46' },
];

const focusRows = [
  { label: 'Green building adoption', value: '58%', state: 'Behind', color: '#D97706', action: 'Push retrofit incentives to building owners' },
  { label: 'EV charging network', value: '61%', state: 'Behind', color: '#D97706', action: 'Prioritize highway corridor partners' },
  { label: 'Water security', value: '64%', state: 'Watch', color: '#0284C7', action: 'Extend high-conversion nudges to industrial zones' },
  { label: 'Clean energy capacity', value: '78%', state: 'Ahead', color: '#059669', action: 'Keep current solar adoption campaign active' },
];

const upcomingRows = [
  { title: 'Peak demand weekend', owner: 'Dubai facilities', due: 'Next 48h', icon: Zap, color: '#F59E0B' },
  { title: 'Supplier evidence chase', owner: 'Scope 3 disclosure', due: 'This week', icon: Target, color: '#7C3AED' },
  { title: 'Water reuse partner lab', owner: 'Utilities cluster', due: '28 May', icon: Droplets, color: '#0284C7' },
];

const metTargets = [
  { label: 'AI nudge success', value: '87.6%', detail: '+4.1 pts above plan' },
  { label: 'Dubai BCI tier', value: '82.5', detail: 'High performer' },
  { label: 'Clean energy', value: '78%', detail: 'Ahead of Q2 target' },
];

const OrgAIAgent: React.FC<Props> = ({ onNavigate }) => {
  const { selectedEntity } = useOrgRoute();
  const shortName = selectedEntity?.shortName ?? 'MOEI';

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_AI_AGENT} onNavigate={onNavigate}>
      <OrgScreenShell>
        <section className="rounded-[28px] bg-gradient-to-br from-[#111827] via-[#1E3A8A] to-[#0F766E] p-4 text-white shadow-[0_14px_34px_rgba(30,58,138,.24)]">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/18">
              <Bot size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/60">Live AI Command</p>
              <h1 className="mt-1 text-[20px] font-black leading-none">{shortName} AI Engine</h1>
              <p className="mt-1 text-[10px] font-semibold leading-4 text-white/72">Nudges, risk signals, target catch-up, and leadership-ready recommendations.</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[1fr_118px] gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-blue-100">AI Insight</p>
              <p className="mt-2 text-[16px] font-black leading-6">Energy demand expected to peak in Dubai this weekend.</p>
              <p className="mt-3 text-[10px] font-bold text-white/65">Potential savings</p>
              <div className="mt-1 text-[34px] font-black leading-none">1.2 GWh</div>
              <p className="mt-1 text-[11px] font-semibold text-white/72">with recommended nudges.</p>
            </div>
            <div className="rounded-[24px] bg-white/12 p-2">
              <OrgChart
                kind="line"
                data={forecastData}
                height={126}
                options={{
                  ...lightChartOptions,
                  plugins: { legend: { display: false }, tooltip: lightChartOptions.plugins.tooltip },
                  scales: {
                    x: { display: false },
                    y: { display: false, min: 68, max: 96 },
                  },
                }}
              />
            </div>
          </div>
        </section>

        <div className="mt-2 grid grid-cols-2 gap-2">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <OrgSectionCard key={stat.label} className="p-3">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: `${stat.color}14`, color: stat.color }}>
                    <Icon size={16} strokeWidth={2.6} />
                  </div>
                  <span className="text-[9px] font-black uppercase leading-tight text-slate-400">{stat.label}</span>
                </div>
                <div className="text-[23px] font-black leading-none tracking-[-0.03em]" style={{ color: stat.color }}>{stat.value}</div>
                <div className="mt-1 text-[10px] font-semibold text-slate-400">{stat.sub}</div>
              </OrgSectionCard>
            );
          })}
        </div>

        <OrgSectionCard className="mt-2 p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-slate-900">Target Catch-Up Queue</h3>
              <p className="text-[9px] font-semibold text-slate-400">Where AI recommends intervention now</p>
            </div>
            <Target size={18} className="text-slate-400" />
          </div>
          <div className="space-y-2.5">
            {focusRows.map(row => (
              <div key={row.label} className="rounded-2xl bg-[#F8FAFC] p-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate text-[11px] font-black text-slate-900">{row.label}</span>
                    <span className="block text-[9px] font-semibold" style={{ color: row.color }}>{row.state}</span>
                  </span>
                  <span className="text-[18px] font-black" style={{ color: row.color }}>{row.value}</span>
                </div>
                <p className="text-[10px] font-semibold leading-4 text-slate-500">{row.action}</p>
              </div>
            ))}
          </div>
        </OrgSectionCard>

        <section className="mt-2 grid grid-cols-2 gap-2">
          <OrgSectionCard className="p-3.5">
            <h3 className="mb-3 text-xs font-black text-slate-900">Nudge Mix</h3>
            <OrgChart kind="doughnut" data={aiDonutData} height={150} options={{ ...lightChartOptions, scales: {}, cutout: '62%', plugins: { legend: { display: false } } }} />
          </OrgSectionCard>

          <OrgSectionCard className="p-3.5">
            <h3 className="mb-3 text-xs font-black text-slate-900">Response Rate</h3>
            <OrgChart
              kind="line"
              data={aiTrendData}
              height={150}
              options={{
                ...lightChartOptions,
                scales: {
                  x: { ticks: { color: '#94A3B8', font: { size: 8 } }, grid: { display: false }, border: { display: false } },
                  y: { display: false, min: 75, max: 95 },
                },
              }}
            />
          </OrgSectionCard>
        </section>

        <OrgSectionCard className="mt-2 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-3.5 py-3">
            <div>
              <h3 className="text-xs font-black text-slate-900">AI Insights</h3>
              <p className="text-[9px] font-semibold text-slate-400">Fresh analysis from live dashboard signals</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-black text-[var(--forest-medium)]">4 new</span>
          </div>
          {AI_INSIGHTS.map(insight => {
            const Icon = ICONS[insight.icon as keyof typeof ICONS] ?? Sparkles;
            return (
              <button key={insight.title} type="button" className="flex w-full items-start gap-3 border-b border-slate-100 px-3.5 py-3 text-left last:border-b-0 active:bg-slate-50">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: insight.bg }}>
                  <Icon size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-black leading-snug text-slate-900">{insight.title}</span>
                  <span className="mt-1 block text-[10px] font-medium leading-relaxed text-slate-600">{insight.body}</span>
                  <span className="mt-1 block text-[9px] font-semibold text-slate-400">{insight.time}</span>
                </span>
              </button>
            );
          })}
        </OrgSectionCard>

        <OrgSectionCard className="mt-2 p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-slate-900">Coming Up</h3>
              <p className="text-[9px] font-semibold text-slate-400">AI-monitored operational moments</p>
            </div>
            <CalendarClock size={18} className="text-slate-400" />
          </div>
          <div className="space-y-2">
            {upcomingRows.map(row => {
              const Icon = row.icon;
              return (
                <div key={row.title} className="grid grid-cols-[36px_minmax(0,1fr)_58px] items-center gap-2 rounded-2xl bg-[#F8FAFC] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${row.color}14`, color: row.color }}>
                    <Icon size={16} strokeWidth={2.6} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-black text-slate-900">{row.title}</p>
                    <p className="truncate text-[9px] font-semibold text-slate-400">{row.owner}</p>
                  </div>
                  <p className="text-right text-[9px] font-black text-slate-500">{row.due}</p>
                </div>
              );
            })}
          </div>
        </OrgSectionCard>

        <OrgSectionCard className="mt-2 p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-slate-900">Targets Met</h3>
              <p className="text-[9px] font-semibold text-slate-400">Wins the AI recommends protecting</p>
            </div>
            <CheckCircle2 size={18} className="text-[var(--forest-medium)]" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {metTargets.map(target => (
              <div key={target.label} className="rounded-2xl bg-emerald-50 p-3">
                <p className="text-[17px] font-black leading-none text-[var(--forest-medium)]">{target.value}</p>
                <p className="mt-1 text-[8px] font-black uppercase leading-tight text-slate-600">{target.label}</p>
                <p className="mt-1 text-[8px] font-semibold leading-tight text-slate-500">{target.detail}</p>
              </div>
            ))}
          </div>
        </OrgSectionCard>

        <button
          type="button"
          onClick={() => onNavigate(ScreenName.ORG_AI_CHAT)}
          className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-black uppercase tracking-wide text-white shadow-[0_10px_24px_rgba(15,23,42,.22)] active:scale-[0.98]"
        >
          Ask the organization AI
          <ArrowRight size={16} strokeWidth={2.8} />
        </button>
      </OrgScreenShell>
    </OrganizationLayout>
  );
};

export default OrgAIAgent;
