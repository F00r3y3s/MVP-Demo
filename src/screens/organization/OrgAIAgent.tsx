import React from 'react';
import { AlertTriangle, Bot, CheckCircle2, Droplets, RefreshCw, Send, Sun, Trophy, Zap } from 'lucide-react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import OrgChart from '../../components/organization/OrgChart';
import { ScreenName } from '../../types';
import { AI_INSIGHTS } from '../../data/orgCommandCenter';
import { lightChartOptions, OrgScreenShell, OrgSectionCard } from '../../components/organization/OrgCommandComponents';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

const ICONS = { Zap, Droplets, Trophy, Sun };

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
    borderColor: '#312E81',
    backgroundColor: 'rgba(49,46,129,.1)',
    borderWidth: 2.5,
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointBackgroundColor: '#312E81',
    pointBorderColor: '#fff',
    pointBorderWidth: 1.5,
  }],
};

const stats = [
  { icon: Send, label: 'Nudges Sent', value: '245,890', sub: 'Today', color: '#065F46' },
  { icon: AlertTriangle, label: 'Deviations', value: '18,423', sub: 'Detected', color: '#D97706' },
  { icon: RefreshCw, label: 'Habit Converts', value: '64,210', sub: 'This Week' },
  { icon: CheckCircle2, label: 'Goal Compliance', value: '91.4%', sub: 'vs 88.2% last wk', color: '#065F46' },
];

const OrgAIAgent: React.FC<Props> = ({ onNavigate }) => (
  <OrganizationLayout activeScreen={ScreenName.ORG_AI_AGENT} onNavigate={onNavigate}>
    <OrgScreenShell>
      <div className="rounded-2xl bg-gradient-to-br from-[#1e1b4b] to-[#312e81] p-4 text-white shadow-[0_8px_24px_rgba(30,27,75,.3)]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/20">
            <Bot size={22} />
          </div>
          <div className="min-w-0">
            <h1 className="text-[15px] font-black">Behavioral AI Engine</h1>
            <p className="mt-0.5 text-[10px] font-medium leading-snug text-white/75">Agentic nudges, deviations & habit formation across UAE</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ['87.6%', 'Success Rate'],
            ['245K', 'Nudges Today'],
            ['64K', 'Conversions'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl bg-white/15 p-2.5 text-center">
              <div className="text-base font-black leading-none">{value}</div>
              <div className="mt-1 text-[8px] font-bold text-white/75">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <OrgSectionCard key={stat.label} className="p-3">
              <div className="mb-2 flex items-center gap-2">
                <Icon size={15} style={{ color: stat.color ?? '#64748B' }} />
                <span className="text-[9px] font-black uppercase text-slate-400">{stat.label}</span>
              </div>
              <div className="text-[22px] font-black leading-none tracking-[-0.03em]" style={{ color: stat.color }}>{stat.value}</div>
              <div className="mt-1 text-[10px] font-semibold text-slate-400">{stat.sub}</div>
            </OrgSectionCard>
          );
        })}
      </div>

      <OrgSectionCard className="mt-2 p-3.5">
        <h3 className="mb-3 text-xs font-black text-slate-900">Nudge Category Breakdown</h3>
        <OrgChart kind="doughnut" data={aiDonutData} height={150} options={{ ...lightChartOptions, scales: {}, cutout: '62%', plugins: { legend: { position: 'right', labels: { font: { size: 9 }, boxWidth: 9, padding: 7, color: '#475569' } } } }} />
      </OrgSectionCard>

      <OrgSectionCard className="mt-2 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-3.5 py-3">
          <h3 className="text-xs font-black text-slate-900">AI Insights</h3>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-black text-[var(--forest-medium)]">4 new</span>
        </div>
        {AI_INSIGHTS.map(insight => {
          const Icon = ICONS[insight.icon as keyof typeof ICONS];
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
        <h3 className="mb-3 text-xs font-black text-slate-900">Nudge Response Rate - 7 Days</h3>
        <OrgChart kind="line" data={aiTrendData} height={160} options={{ ...lightChartOptions, scales: { ...lightChartOptions.scales, y: { ...lightChartOptions.scales.y, min: 75, max: 95 } } }} />
      </OrgSectionCard>
    </OrgScreenShell>
  </OrganizationLayout>
);

export default OrgAIAgent;
