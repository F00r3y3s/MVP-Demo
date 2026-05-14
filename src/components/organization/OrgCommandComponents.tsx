import React from 'react';
import {
  Accessibility, AlertTriangle, ArrowRight, Bot, Building2, CheckCircle2, ChevronDown, Cloud, Droplets,
  FileBarChart, HelpCircle, Leaf, Link2, Map, Menu, Send, Settings, ShieldCheck, Sun,
  Target, Trophy, Users, X, Zap,
} from 'lucide-react';
import { ScreenName } from '../../types';
import uaeMapImage from '../../assets/uae-map.png';
import OrgChart from './OrgChart';
import {
  BCI_COMPOSITION,
  BCI_TREND_LABELS,
  BCI_TREND_VALUES,
  ORG_ALL_SDG_GOALS,
  ORG_EMIRATES,
  ORG_KPI_DETAILS,
  type OrgKpiId,
} from '../../data/orgCommandCenter';

const ICONS = {
  Accessibility,
  AlertTriangle,
  Bot,
  Building2,
  CheckCircle2,
  Cloud,
  Droplets,
  FileBarChart,
  HelpCircle,
  Leaf,
  Link2,
  Map,
  Menu,
  Send,
  Settings,
  ShieldCheck,
  Sun,
  Target,
  Trophy,
  Users,
  Zap,
};

export const lightChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.96)',
      titleColor: '#0F172A',
      bodyColor: '#475569',
      borderColor: '#E2E8F0',
      borderWidth: 1,
      cornerRadius: 10,
    },
  },
  scales: {
    x: { ticks: { color: '#94A3B8', font: { size: 8 } }, grid: { display: false }, border: { display: false } },
    y: { ticks: { color: '#94A3B8', font: { size: 8 } }, grid: { color: 'rgba(15,23,42,.05)' }, border: { display: false } },
  },
};

export const miniChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 }, line: { borderWidth: 1.8, tension: 0.4 } },
};

export const OrgSectionCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}> = ({ children, className = '', onClick, ariaLabel }) => {
  const classes = `bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.06)] border border-white/70 ${className}`;

  if (!onClick) return <div className={classes}>{children}</div>;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${classes} block w-full text-left active:scale-[0.98] transition-transform`}
    >
      {children}
    </button>
  );
};

export const OrgScreenShell: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`h-full overflow-y-auto no-scrollbar bg-[#EEF2EF] px-3.5 pt-3 pb-6 ${className}`}>
    {children}
  </div>
);

export const BciSummaryHero: React.FC<{ compact?: boolean; onInfo?: () => void }> = ({ compact = false, onInfo }) => {
  const chartData = {
    labels: BCI_TREND_LABELS.slice(-6),
    datasets: [{
      data: BCI_TREND_VALUES.slice(-6),
      borderColor: '#065F46',
      backgroundColor: 'rgba(6,95,70,.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: compact ? 0 : 3,
      pointBackgroundColor: '#065F46',
    }],
  };

  if (!compact) {
    return (
      <div className="mx-3.5 mt-2 rounded-2xl bg-gradient-to-br from-[var(--forest-medium)] to-teal-600 p-4 text-white shadow-[0_8px_24px_rgba(6,95,70,.3)]">
        <p className="text-[10px] font-black uppercase tracking-[0.05em] text-white/75">UAE Behavioral Change Index</p>
        <div className="mt-1 text-[64px] font-black leading-none tracking-[-0.06em]">74.8</div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-bold">
          <span className="rounded-full bg-white/20 px-2.5 py-1">+3.2% today</span>
          <span className="text-white/75">Target: 85.0 by 2030</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/25">
          <div className="h-full w-[88%] rounded-full bg-white" />
        </div>
        <div className="mt-1.5 flex justify-between text-[9px] font-semibold text-white/75">
          <span>0</span>
          <span>Current: 74.8</span>
          <span>Target: 85</span>
        </div>
      </div>
    );
  }

  return (
    <OrgSectionCard className="mx-3.5 mt-2 overflow-hidden">
      <div className="flex items-start gap-2 p-3.5">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1">
            <span className="text-[8.5px] font-black uppercase text-slate-400">UAE Behavioral Change Index (BCI)</span>
            <button
              type="button"
              onClick={onInfo}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-[#EEF2EF] text-[10px] font-black text-slate-500"
              aria-label="About the BCI"
            >
              i
            </button>
          </div>
          <div className="font-jakarta text-[48px] font-black leading-none text-[var(--forest-medium)]">74.8</div>
          <div className="my-1 flex items-center gap-1.5">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-[var(--forest-medium)]">+3.2%</span>
            <span className="text-[10px] font-semibold text-slate-400">vs yesterday</span>
          </div>
          <p className="text-[10px] font-semibold leading-snug text-slate-400">Progress toward national 2030 sustainability goals</p>
        </div>
        <div className="w-[118px] shrink-0">
          <div className="rounded-[10px] bg-[#EEF2EF] py-1.5 text-center">
            <div className="text-base font-black leading-none text-slate-900">85.0</div>
            <div className="text-[8px] font-bold text-slate-400">2030 Target</div>
          </div>
          <div className="my-1 text-right">
            <div className="text-[9px] font-semibold text-slate-400">On Track</div>
            <div className="text-[10px] font-black text-[var(--forest-medium)]">4.2 yrs left</div>
          </div>
          <OrgChart kind="line" data={chartData} height={68} options={lightChartOptions} />
        </div>
      </div>
    </OrgSectionCard>
  );
};

export const UaeMiniMap: React.FC<{ compact?: boolean; highlightedName?: string; onSelect?: (name: string) => void }> = ({ compact = false }) => (
  <div className={compact ? 'grid w-full place-items-center overflow-hidden' : 'grid h-full w-full place-items-center overflow-hidden'} style={compact ? { aspectRatio: '220 / 164' } : undefined}>
    <img src={uaeMapImage} alt="UAE emirates map" className="max-h-full max-w-full object-contain object-center" draggable={false} />
  </div>
);

export const BreakdownRows: React.FC<{ rows: Array<{ label: string; value: number; color: string }> }> = ({ rows }) => (
  <div className="space-y-2.5">
    {rows.map(row => (
      <div key={row.label} className="grid grid-cols-[8px_minmax(0,1fr)_56px_30px] items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: row.color }} />
        <span className="truncate text-[10px] font-semibold text-slate-600">{row.label}</span>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full" style={{ width: `${row.value}%`, backgroundColor: row.color }} />
        </div>
        <span className="text-right text-[10px] font-black text-slate-700">{row.value}%</span>
      </div>
    ))}
  </div>
);

export const OrgMetricSheet: React.FC<{
  activeId: OrgKpiId | 'bci-info' | 'emirates' | null;
  onClose: () => void;
}> = ({ activeId, onClose }) => {
  if (!activeId) return null;
  const isMetric = activeId in ORG_KPI_DETAILS;
  const detail = isMetric ? ORG_KPI_DETAILS[activeId as OrgKpiId] : null;
  const Icon = detail ? ICONS[detail.icon as keyof typeof ICONS] : FileBarChart;

  const chartData = detail ? {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: detail.chart,
      borderColor: detail.color,
      backgroundColor: `${detail.color}1A`,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: detail.color,
      pointBorderColor: '#fff',
      pointBorderWidth: 1.5,
    }],
  } : null;

  return (
    <div className="absolute inset-0 z-[120] flex items-end justify-center bg-slate-900/45 backdrop-blur-sm" onClick={onClose}>
      <div
        className="max-h-[78%] w-full overflow-y-auto rounded-t-[32px] bg-white pb-8 shadow-2xl"
        onClick={event => event.stopPropagation()}
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-slate-200" />
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2EF]" style={{ color: detail?.color ?? '#065F46' }}>
              <Icon size={19} strokeWidth={2.6} />
            </div>
            <h2 className="truncate text-base font-black text-slate-900">{detail?.title ?? (activeId === 'emirates' ? 'Emirates BCI Ranking' : 'About the BCI')}</h2>
          </div>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500" aria-label="Close">
            <X size={17} />
          </button>
        </div>

        {detail && chartData && (
          <div className="space-y-4 px-5">
            <div className="grid grid-cols-2 gap-2">
              {detail.stats.map(stat => (
                <div key={stat.label} className="rounded-2xl bg-[#F8FAFC] p-3 text-center">
                  <div className="text-lg font-black leading-none" style={{ color: stat.value.startsWith('+') ? detail.color : '#0F172A' }}>{stat.value}</div>
                  <div className="mt-1 text-[9px] font-bold uppercase text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] p-3">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.05em] text-slate-400">7-day trend</div>
              <OrgChart kind="line" data={chartData} height={150} options={lightChartOptions} />
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] p-3">
              <div className="mb-3 text-[10px] font-black uppercase tracking-[0.05em] text-slate-400">Breakdown by source</div>
              <BreakdownRows rows={detail.breakdown} />
            </div>
          </div>
        )}

        {activeId === 'bci-info' && (
          <div className="space-y-4 px-5">
            <p className="text-[12px] font-medium leading-7 text-slate-600">
              The Behavioral Change Index measures aggregate behavioral shift toward sustainable practices across smart meters,
              mobility sensors, consumption data, and AI-verified green actions across all seven Emirates.
            </p>
            <div className="space-y-3 rounded-2xl bg-[#F8FAFC] p-4">
              {[
                ['Score Range', '0-100'],
                ['2030 National Target', '85.0'],
                ['Current Score', '74.8 (88% of target)'],
                ['Aligned with', 'UAE Net Zero 2050'],
                ['Data Sources', '12 live feeds'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3 text-[11px]">
                  <span className="font-semibold text-slate-500">{label}</span>
                  <span className="text-right font-black text-slate-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeId === 'emirates' && (
          <div className="space-y-2 px-5">
            {ORG_EMIRATES.map((emirate, index) => (
              <div key={emirate.name} className="flex items-center gap-3 rounded-2xl p-3" style={{ backgroundColor: emirate.score >= 75 ? '#ECFDF5' : emirate.score >= 65 ? '#FFFBEB' : '#FEF2F2' }}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white" style={{ backgroundColor: emirate.color }}>{index + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-black text-slate-900">{emirate.name}</div>
                  <div className="text-[9px] font-bold" style={{ color: emirate.color }}>{emirate.tier}</div>
                </div>
                <div className="text-2xl font-black tracking-[-0.05em]" style={{ color: emirate.color }}>{emirate.score}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const BciCompositionCard: React.FC = () => (
  <OrgSectionCard className="p-3.5">
    <h3 className="mb-3 text-xs font-black text-slate-900">BCI Score Composition</h3>
    <OrgChart
      kind="doughnut"
      height={150}
      data={{
        labels: BCI_COMPOSITION.map(item => item.label),
        datasets: [{ data: BCI_COMPOSITION.map(item => item.value), backgroundColor: BCI_COMPOSITION.map(item => item.color), borderWidth: 0, hoverOffset: 5 }],
      }}
      options={{ ...lightChartOptions, cutout: '68%', scales: {} }}
    />
    <div className="mt-3">
      <BreakdownRows rows={BCI_COMPOSITION} />
    </div>
  </OrgSectionCard>
);

export const SdgProgressList: React.FC<{ full?: boolean }> = ({ full = false }) => {
  const goals = full ? ORG_ALL_SDG_GOALS.map((goal, index) => ({ ...goal, id: index + 1 })) : ORG_ALL_SDG_GOALS.slice(0, 6).map((goal, index) => ({ ...goal, id: index + 1 }));
  return (
    <div className="space-y-2.5">
      {goals.map(goal => (
        <div key={`${goal.id}-${goal.name}`}>
          <div className="mb-1 flex items-center gap-1.5">
            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] text-[7px] font-black text-white" style={{ backgroundColor: goal.color }}>{goal.id}</div>
            <span className="min-w-0 flex-1 truncate text-[9px] font-semibold text-slate-600">SDG {goal.id}: {goal.name}</span>
            <span className="text-[9px] font-black" style={{ color: goal.progress >= 75 ? '#065F46' : goal.progress >= 60 ? '#D97706' : '#DC2626' }}>{goal.progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full" style={{ width: `${goal.progress}%`, backgroundColor: goal.color }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const DashboardActionCard: React.FC<{
  title: string;
  icon: keyof typeof ICONS;
  badge?: string;
  rows: Array<{ label: string; value: string; color?: string }>;
  action: string;
  onClick: () => void;
}> = ({ title, icon, badge, rows, action, onClick }) => {
  const Icon = ICONS[icon];
  return (
    <OrgSectionCard className="flex h-full min-h-[178px] min-w-0 flex-col p-3" onClick={onClick} ariaLabel={title}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--forest-medium)] shadow-inner">
          <Icon size={18} strokeWidth={2.6} />
        </div>
        {badge && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-black text-[var(--forest-medium)]">{badge}</span>}
      </div>
      <h3 className="text-[10px] font-black uppercase leading-tight tracking-[0.04em] text-slate-500">{title}</h3>
      <div className="mt-3 flex-1 space-y-2">
        {rows.map(row => (
          <div key={row.label} className="rounded-xl bg-[#F8FAFC] px-2.5 py-1.5">
            <div className="text-[8px] font-black uppercase leading-tight text-slate-400">{row.label}</div>
            <div className="truncate text-[15px] font-black leading-tight text-slate-950" style={{ color: row.color }}>{row.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-8 items-center justify-center gap-1 rounded-xl bg-emerald-50 text-[10px] font-black text-[var(--forest-medium)]">
        <span>{action}</span>
        <ArrowRight size={12} strokeWidth={2.8} />
      </div>
    </OrgSectionCard>
  );
};

export const MoreRow: React.FC<{ icon: keyof typeof ICONS; title: string; subtitle: string; onClick?: () => void }> = ({ icon, title, subtitle, onClick }) => {
  const Icon = ICONS[icon];
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-2xl bg-white p-3.5 text-left shadow-[0_1px_3px_rgba(0,0,0,.06)] active:scale-[0.99]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2EF] text-[var(--forest-medium)]">
        <Icon size={18} strokeWidth={2.4} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-xs font-black text-slate-900">{title}</h4>
        <p className="mt-0.5 truncate text-[10px] font-semibold text-slate-400">{subtitle}</p>
      </div>
      <ChevronDown size={15} className="-rotate-90 text-slate-300" />
    </button>
  );
};

export const routeFromDashboardCard = (screen: ScreenName) => screen;
