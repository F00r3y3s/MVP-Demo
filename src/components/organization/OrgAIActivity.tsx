import React, { useEffect, useState } from 'react';
import { ArrowRight, Building2, Droplets, Sparkles, Sun, TrendingUp, Zap } from 'lucide-react';
import { ScreenName } from '../../types';
import OrgChart from './OrgChart';
import { miniChartOptions } from './OrgCommandComponents';
import { useOrgRoute } from '../../context/OrgRouteContext';

const SIGNAL_CYCLES = [
  {
    label: 'Evidence Graph',
    title: 'Supplier evidence coverage is rising, but top vendors still lag.',
    valueLabel: 'Scope 3 coverage',
    value: '64%',
    action: 'Escalate top 20 vendors',
    color: '#7C3AED',
    data: [48, 52, 54, 57, 60, 62, 64],
    Icon: TrendingUp,
  },
  {
    label: 'Retrofit Graph',
    title: 'Green building adoption needs permit and owner intervention.',
    valueLabel: 'Gap to Q2 target',
    value: '9 pts',
    action: 'Prioritize retrofit permits',
    color: '#D97706',
    data: [42, 45, 47, 50, 53, 56, 58],
    Icon: Building2,
  },
  {
    label: 'Mobility Graph',
    title: 'EV corridor readiness improves fastest around highway partners.',
    valueLabel: 'Network coverage',
    value: '61%',
    action: 'Invite corridor operators',
    color: '#059669',
    data: [46, 49, 52, 55, 57, 59, 61],
    Icon: Zap,
  },
];

const SHOWCASE_CYCLES = [
  {
    label: 'AI Insight',
    title: 'Energy demand expected to peak in Dubai this weekend.',
    valueLabel: 'Potential savings',
    value: '1.2 GWh',
    body: 'with recommended nudges',
    color: '#2563EB',
    Icon: Zap,
  },
  {
    label: 'Water Watch',
    title: 'Industrial water spike detected in Abu Dhabi facilities.',
    valueLabel: 'Nudges dispatched',
    value: '4,200',
    body: 'to high-usage sites',
    color: '#0284C7',
    Icon: Droplets,
  },
  {
    label: 'Solar Lift',
    title: 'Sharjah solar uptake is beating the forecast curve.',
    valueLabel: 'Campaign ROI',
    value: '18:1',
    body: 'from targeted incentives',
    color: '#F59E0B',
    Icon: Sun,
  },
];

const SUMMARY_CYCLES = [
  {
    label: 'Leadership Brief',
    title: 'District cooling demand is trending above plan before the weekend.',
    metricLabel: 'Priority sites',
    metric: '18K',
    color: '#2563EB',
    Icon: Zap,
  },
  {
    label: 'Procurement Cue',
    title: 'Green vendor onboarding is slowing across two departments.',
    metricLabel: 'Evidence gaps',
    metric: '37',
    color: '#7C3AED',
    Icon: Building2,
  },
  {
    label: 'Water Alert',
    title: 'Industrial meters show unusual overnight water usage.',
    metricLabel: 'Above baseline',
    metric: '11%',
    color: '#0284C7',
    Icon: Droplets,
  },
];

const OrgAIActivity: React.FC<{ onNavigate?: (screen: ScreenName) => void }> = ({ onNavigate }) => {
  const { selectedEntity } = useOrgRoute();
  const shortName = selectedEntity?.shortName ?? 'MOEI';
  const [summaryIndex, setSummaryIndex] = useState(0);
  const [signalIndex, setSignalIndex] = useState(0);
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const activeSummary = SUMMARY_CYCLES[summaryIndex];
  const activeSignal = SIGNAL_CYCLES[signalIndex];
  const activeShowcase = SHOWCASE_CYCLES[showcaseIndex];
  const SummaryIcon = activeSummary.Icon;
  const SignalIcon = activeSignal.Icon;
  const ShowcaseIcon = activeShowcase.Icon;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSummaryIndex(index => (index + 1) % SUMMARY_CYCLES.length);
      setSignalIndex(index => (index + 1) % SIGNAL_CYCLES.length);
      setShowcaseIndex(index => (index + 1) % SHOWCASE_CYCLES.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  const chartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        data: activeSignal.data,
        borderColor: activeSignal.color,
        backgroundColor: `${activeSignal.color}18`,
        fill: true,
      },
    ],
  };

  return (
    <div className="col-span-2 overflow-hidden rounded-[26px] bg-white p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_10px_26px_rgba(15,23,42,0.07)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Sparkles size={18} strokeWidth={2.6} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-900">AI Suggestions</p>
            <p className="truncate text-[8px] font-bold uppercase tracking-wider text-slate-400">{shortName} live command context</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-[var(--forest-medium)]">
          Live
        </span>
      </div>

      <div className="rounded-[22px] border border-slate-100 bg-[#F8FAFC] p-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${activeSummary.color}14`, color: activeSummary.color }}>
              <SummaryIcon size={16} strokeWidth={2.7} />
            </span>
            <span className="truncate text-[9px] font-black uppercase tracking-widest" style={{ color: activeSummary.color }}>{activeSummary.label}</span>
          </div>
          <span className="shrink-0 text-right">
            <span className="block text-[17px] font-black leading-none text-slate-950">{activeSummary.metric}</span>
            <span className="block text-[7px] font-black uppercase tracking-wide text-slate-400">{activeSummary.metricLabel}</span>
          </span>
        </div>
        <p className="line-clamp-2 text-[15px] font-black leading-6 text-slate-900">{activeSummary.title}</p>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="flex min-h-[142px] min-w-0 flex-col rounded-[20px] bg-slate-950 p-2.5 text-white">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${activeSignal.color}22`, color: activeSignal.color }}>
              <SignalIcon size={13} strokeWidth={2.7} />
            </span>
            <span className="truncate text-right text-[7px] font-black uppercase tracking-widest text-white/45">{activeSignal.label}</span>
          </div>
          <p className="line-clamp-2 text-[10px] font-black leading-[14px] text-white">{activeSignal.title}</p>
          <div className="mt-2 flex items-end justify-between gap-2">
            <div>
              <p className="text-[7px] font-black uppercase tracking-widest text-white/40">{activeSignal.valueLabel}</p>
              <p className="mt-0.5 text-[20px] font-black leading-none">{activeSignal.value}</p>
            </div>
          </div>
          <div className="mt-1.5 h-[44px]">
            <OrgChart kind="line" data={chartData} height={44} options={miniChartOptions} />
          </div>
          <div className="mt-auto">
            <p className="line-clamp-1 text-[8px] font-bold leading-3 text-white/70">{activeSignal.action}</p>
            <div className="mt-1.5 grid grid-cols-3 gap-1">
              {SIGNAL_CYCLES.map((cycle, index) => (
                <button
                  key={cycle.label}
                  type="button"
                  onClick={() => setSignalIndex(index)}
                  aria-label={`Show ${cycle.label}`}
                  className={`h-1.5 rounded-full transition-all ${index === signalIndex ? 'bg-white' : 'bg-white/25'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.(ScreenName.ORG_AI_AGENT)}
          className="group flex min-h-[142px] min-w-0 flex-col rounded-[20px] border border-slate-100 bg-white p-2.5 text-left active:scale-[0.98]"
        >
          <div className="mb-1.5 flex items-center gap-1.5">
            <Sparkles size={13} className="shrink-0 text-blue-600" strokeWidth={2.7} />
            <span className="truncate text-[8px] font-black uppercase tracking-[0.1em] text-slate-900">{activeShowcase.label}</span>
          </div>
          <p className="line-clamp-2 text-[10px] font-black leading-[14px] text-slate-900">{activeShowcase.title}</p>

          <div className="relative my-2 h-[46px] overflow-hidden rounded-2xl bg-[#F8FAFC]">
            <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at 72% 28%, ${activeShowcase.color}22, transparent 42%)` }} />
            <div className="absolute bottom-2 right-4 h-7 w-12 rounded-[8px] shadow-sm" style={{ backgroundColor: `${activeShowcase.color}28` }} />
            <div className="absolute bottom-4 right-8 h-7 w-8 rounded-[8px] shadow-sm" style={{ backgroundColor: `${activeShowcase.color}1C` }} />
            <div className="absolute bottom-2 right-10 h-8 w-6 rounded-[7px] shadow-sm" style={{ backgroundColor: `${activeShowcase.color}18` }} />
            <div className="absolute bottom-2.5 right-6 flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-lg transition-transform group-hover:scale-105" style={{ backgroundColor: activeShowcase.color }}>
              <ShowcaseIcon size={19} strokeWidth={2.7} />
            </div>
            <div className="absolute bottom-2 left-2 h-1.5 w-12 rounded-full bg-slate-100" />
          </div>

          <div className="mt-auto">
            <p className="text-[7px] font-black uppercase tracking-wide text-slate-400">{activeShowcase.valueLabel}</p>
            <div className="mt-0.5 flex items-end justify-between gap-2">
              <span className="text-[20px] font-black leading-none text-slate-950">{activeShowcase.value}</span>
              <ArrowRight size={13} className="mb-0.5 text-slate-300 transition-transform group-hover:translate-x-0.5" strokeWidth={2.8} />
            </div>
            <p className="mt-0.5 line-clamp-1 text-[8px] font-bold leading-3 text-slate-500">{activeShowcase.body}</p>
            <div className="mt-1.5 grid grid-cols-3 gap-1">
              {SHOWCASE_CYCLES.map((cycle, index) => (
                <span
                  key={cycle.label}
                  className={`h-1.5 rounded-full transition-all ${index === showcaseIndex ? 'bg-blue-600' : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default OrgAIActivity;
