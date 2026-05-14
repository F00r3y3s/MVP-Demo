import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Leaf,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import OrgChart from '../../components/organization/OrgChart';
import Skeleton from '../../components/organization/Skeleton';
import { ScreenName } from '../../types';
import { useDelayedReady } from '../../hooks/useDelayedReady';
import { useScrollPreservation } from '../../context/ScrollPositionContext';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
}

type ProgramStatus = 'active' | 'at-risk' | 'done';

interface Program {
  id: string;
  name: string;
  owner: string;
  milestones: number;
  completed: number;
  status: ProgramStatus;
  description: string;
  nextMilestone: string;
  milestoneList: string[];
}

const PROGRAMS: Program[] = [
  { id: 'p1', name: 'Net Zero Strategy 2050', owner: 'Climate Office', milestones: 8, completed: 3, status: 'active', description: 'Comprehensive roadmap to achieve net zero greenhouse gas emissions across all operations by 2050.', nextMilestone: 'Jun 2025: Scope 3 baseline finalised', milestoneList: ['Baseline assessment complete', 'Science-based targets validated', 'Scope 3 baseline', 'Interim 2030 target set', 'Energy transition plan', 'Supply chain engagement', 'Carbon offsets strategy', 'Disclosure report'] },
  { id: 'p2', name: 'Smart Buildings Retrofit', owner: 'Facilities', milestones: 5, completed: 2, status: 'active', description: 'Retrofit 40 buildings with smart energy management, LED, and HVAC optimisation by 2026.', nextMilestone: 'Jul 2025: Phase 2 buildings surveyed', milestoneList: ['Audit complete', 'Phase 1 retrofit (10 buildings)', 'Phase 2 buildings surveyed', 'BMS integration', 'ISO 50001 certification'] },
  { id: 'p3', name: 'National MRV Rollout', owner: 'Reporting Team', milestones: 6, completed: 5, status: 'active', description: 'Establish a Measurement, Reporting & Verification system aligned with UAE national standards.', nextMilestone: 'Aug 2025: Final validation', milestoneList: ['System design', 'Data architecture', 'Pilot deployment', 'Staff training', 'Third-party verification', 'Final validation'] },
  { id: 'p4', name: 'Biodiversity Action Plan', owner: 'Environment', milestones: 4, completed: 1, status: 'at-risk', description: 'Protect and restore local biodiversity across all operational sites, aligned with UAE biodiversity strategy.', nextMilestone: 'Sep 2025: Site assessments', milestoneList: ['Baseline biodiversity survey', 'Site assessments', 'Restoration plan', 'Annual monitoring'] },
  { id: 'p5', name: 'Green Procurement Policy', owner: 'Procurement', milestones: 3, completed: 3, status: 'done', description: 'Embed sustainability criteria in all procurement decisions — 100% green procurement by 2026.', nextMilestone: 'Completed Q4 2024', milestoneList: ['Policy drafted', 'Supplier assessment criteria', 'Policy launched & trained'] },
  { id: 'p6', name: 'Employee Green Commute', owner: 'HR & People', milestones: 3, completed: 1, status: 'active', description: 'Reduce employee commute emissions by 30% through EV incentives, cycling infrastructure, and remote work.', nextMilestone: 'Oct 2025: EV charging stations', milestoneList: ['Commute survey', 'EV charging stations installed', 'Cycling scheme launch'] },
];

const STATUS_CHIP: Record<ProgramStatus, { bg: string; text: string; label: string }> = {
  active:   { bg: 'bg-emerald-50', text: 'text-[var(--forest-medium)]', label: 'Active'   },
  'at-risk': { bg: 'bg-amber-50',   text: 'text-amber-700',             label: 'At Risk'  },
  done:     { bg: 'bg-slate-100',   text: 'text-slate-500',             label: 'Done'     },
};

const FILTER_OPTIONS = ['All', 'Active', 'At Risk', 'Done'] as const;

const TARGET_TREND_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Target completion',
      data: [42, 48, 51, 58, 63, 68],
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

const TARGET_CATEGORY_DATA = {
  labels: ['Energy', 'Water', 'Mobility', 'Biodiversity'],
  datasets: [
    {
      data: [35, 26, 22, 17],
      backgroundColor: ['#065F46', '#0284C7', '#F59E0B', '#7C3AED'],
      borderWidth: 0,
    },
  ],
};

const targetStats = [
  { label: '2030 targets', value: '18', detail: '6 federal priority areas', Icon: Target, color: '#059669' },
  { label: 'On-track actions', value: '71%', detail: '+8.2% this quarter', Icon: TrendingUp, color: '#0284C7' },
  { label: 'Teams assigned', value: '34', detail: '412 owners mapped', Icon: Users, color: '#7C3AED' },
  { label: 'Risk items', value: '5', detail: '2 need sponsor action', Icon: AlertTriangle, color: '#D97706' },
];

const nextActions = [
  { title: 'Finalize Scope 3 supplier baseline', due: 'Jun 2026', owner: 'Climate Office', color: '#065F46' },
  { title: 'Approve Phase 2 smart building audits', due: 'Jul 2026', owner: 'Facilities', color: '#0284C7' },
  { title: 'Schedule biodiversity site assessments', due: 'Sep 2026', owner: 'Environment', color: '#D97706' },
];

const OrgProgramDetail: React.FC<{ program: Program; onBack: () => void }> = ({ program, onBack }) => {
  const pct = Math.round((program.completed / program.milestones) * 100);
  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4 border-b border-white/8">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition" aria-label="Back"><ChevronLeft size={18} /></button>
        <div className="flex-1">
          <h1 className="font-black text-base text-[var(--text-primary)] font-jakarta leading-tight">{program.name}</h1>
          <p className="text-[10px] text-[var(--text-muted)]">{program.owner}</p>
        </div>
        <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-full ${STATUS_CHIP[program.status].bg} ${STATUS_CHIP[program.status].text}`}>{STATUS_CHIP[program.status].label}</span>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-5 space-y-5">
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{program.description}</p>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-2"><span>Milestone Progress</span><span>{program.completed}/{program.milestones}</span></div>
          <div className="h-2.5 rounded-full bg-white/8 overflow-hidden mb-2">
            <div className="h-full rounded-full bg-[var(--forest-light)] transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[10px] text-[var(--text-muted)]">Next: {program.nextMilestone}</p>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">Milestones</p>
          {program.milestoneList.map((m, i) => (
            <div key={m} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black ${i < program.completed ? 'bg-[var(--forest-light)] text-white' : 'bg-white/10 text-[var(--text-muted)]'}`}>{i < program.completed ? '✓' : i + 1}</div>
              <span className={`text-sm ${i < program.completed ? 'text-[var(--text-secondary)] line-through opacity-60' : 'text-[var(--text-primary)]'}`}>{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrgPrograms: React.FC<Props> = ({ onNavigate, onBack }) => {
  const ready = useDelayedReady(300);
  const scrollRef = useScrollPreservation(ScreenName.ORG_PROGRAMS);
  const [filter, setFilter] = useState<typeof FILTER_OPTIONS[number]>('All');
  const [detail, setDetail] = useState<Program | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'All') return PROGRAMS;
    return PROGRAMS.filter(p => {
      if (filter === 'Active') return p.status === 'active';
      if (filter === 'At Risk') return p.status === 'at-risk';
      if (filter === 'Done') return p.status === 'done';
      return true;
    });
  }, [filter]);

  const chartData = {
    labels: ['On Track', 'Watch', 'Done', 'Risk'],
    datasets: [{ data: [3, 1, 1, 1], backgroundColor: ['#4A7C59', '#D97706', '#64748B', '#E11D48'], borderWidth: 0 }],
  };

  if (detail) return <OrgProgramDetail program={detail} onBack={() => setDetail(null)} />;

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_PROGRAMS} onNavigate={onNavigate}>
      <div ref={scrollRef} className="h-full overflow-y-auto no-scrollbar bg-[#EEF2EF]">
        <div className="space-y-3 px-3.5 py-3 pb-28">
          <header className="overflow-hidden rounded-[28px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.07),0_12px_28px_rgba(15,23,42,0.06)]">
            <div className="bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#0E7490] p-4 text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/65">Eco Target</p>
                  <h1 className="mt-1 font-jakarta text-[26px] font-black leading-none">Target Portfolio</h1>
                  <p className="mt-2 max-w-[250px] text-[11px] font-semibold leading-5 text-white/78">
                    Strategic sustainability targets, milestone health, owners, and forecasted impact in one place.
                  </p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/16">
                  <Leaf size={24} strokeWidth={2.6} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-white/14 p-3">
                  <div className="text-[27px] font-black leading-none">68%</div>
                  <div className="mt-1 text-[8px] font-black uppercase leading-tight text-white/65">Portfolio completion</div>
                </div>
                <div className="rounded-2xl bg-white/14 p-3">
                  <div className="text-[27px] font-black leading-none">2026</div>
                  <div className="mt-1 text-[8px] font-black uppercase leading-tight text-white/65">Next review window</div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(ScreenName.ORG_IMPACT)}
                  className="rounded-2xl bg-white p-3 text-left text-[#065F46] active:scale-[0.98]"
                >
                  <BarChart3 size={18} strokeWidth={2.6} />
                  <div className="mt-2 text-[8px] font-black uppercase leading-tight">Impact view</div>
                </button>
              </div>
            </div>
          </header>

          {!ready ? (
            <div className="space-y-3">
              <Skeleton height={200} rounded="rounded-2xl" />
              {[1,2,3].map(i => <Skeleton key={i} height={80} rounded="rounded-2xl" />)}
            </div>
          ) : (
            <>
              <section className="grid grid-cols-2 gap-2">
                {targetStats.map(stat => {
                  const Icon = stat.Icon;
                  return (
                    <div key={stat.label} className="rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)]">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl" style={{ backgroundColor: `${stat.color}14`, color: stat.color }}>
                          <Icon size={18} strokeWidth={2.6} />
                        </div>
                        <CheckCircle2 size={15} className="text-emerald-400" />
                      </div>
                      <div className="text-[23px] font-black leading-none text-slate-950">{stat.value}</div>
                      <div className="mt-1 text-[8px] font-black uppercase tracking-wide text-slate-400">{stat.label}</div>
                      <div className="mt-1 text-[9px] font-semibold text-slate-500">{stat.detail}</div>
                    </div>
                  );
                })}
              </section>

              <section className="grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-white p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)]">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-xs font-black text-slate-900">Target Forecast</h2>
                      <p className="text-[9px] font-semibold text-slate-400">Six-month completion curve</p>
                    </div>
                    <TrendingUp size={18} className="text-[var(--forest-medium)]" />
                  </div>
                  <OrgChart
                    kind="line"
                    data={TARGET_TREND_DATA}
                    height={160}
                    options={{
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { ticks: { color: '#94A3B8', font: { size: 8 } }, grid: { display: false }, border: { display: false } },
                        y: { display: false, min: 35, max: 75 },
                      },
                    }}
                  />
                </div>

                <div className="rounded-2xl bg-white p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)]">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-xs font-black text-slate-900">Target Mix</h2>
                      <p className="text-[9px] font-semibold text-slate-400">Priority distribution</p>
                    </div>
                    <Zap size={18} className="text-amber-500" />
                  </div>
                  <OrgChart kind="doughnut" data={TARGET_CATEGORY_DATA} height={160} options={{ scales: {}, cutout: '68%', plugins: { legend: { display: false } } }} />
                </div>
              </section>

              <section className="rounded-2xl bg-white p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)]">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-black text-slate-900">Milestone Status Mix</h2>
                    <p className="text-[9px] font-semibold text-slate-400">Active, watch, completed, and risk targets</p>
                  </div>
                  <ClipboardCheck size={18} className="text-slate-400" />
                </div>
                <div className="grid grid-cols-[0.9fr_1.1fr] items-center gap-3">
                  <OrgChart kind="doughnut" data={chartData} height={130} options={{ scales: {}, cutout: '66%', plugins: { legend: { display: false } } }} />
                  <div className="space-y-2">
                    {[
                      ['On Track', '3 programs', '#4A7C59'],
                      ['Watch', '1 program', '#D97706'],
                      ['Complete', '1 program', '#64748B'],
                      ['Risk', '1 program', '#E11D48'],
                    ].map(([label, value, color]) => (
                      <div key={label} className="flex items-center justify-between gap-2">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                          <span className="truncate text-[10px] font-bold text-slate-600">{label}</span>
                        </span>
                        <span className="text-[10px] font-black text-slate-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {FILTER_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => setFilter(opt)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition ${filter === opt ? 'bg-[var(--forest-light)] text-white shadow-[0_6px_14px_rgba(16,185,129,.25)]' : 'border border-slate-200 bg-white text-slate-500'}`}>{opt}</button>
                ))}
              </div>

              <div className="space-y-3">
                {filtered.map(p => {
                  const pct = Math.round((p.completed / p.milestones) * 100);
                  const s = STATUS_CHIP[p.status];
                  return (
                    <button key={p.id} onClick={() => setDetail(p)} className="w-full rounded-[22px] bg-white p-4 text-left shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)] transition active:scale-[0.98]">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <h3 className="font-black text-sm leading-tight text-slate-900">{p.name}</h3>
                          <p className="mt-0.5 text-[10px] font-semibold text-slate-400">{p.owner} · {p.milestones} milestones</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                          <ChevronRight size={14} className="text-slate-300" />
                        </div>
                      </div>
                      <p className="mb-3 line-clamp-2 text-[11px] font-medium leading-5 text-slate-500">{p.description}</p>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-[var(--forest-light)]" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">{pct}% complete</p>
                        <span className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                          <CalendarClock size={11} />
                          {p.nextMilestone}
                        </span>
                      </div>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="py-10 text-center"><p className="font-bold text-sm text-slate-400">No programs match this filter</p></div>
                )}
              </div>

              <section className="rounded-2xl bg-white p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)]">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-black text-slate-900">Next Sponsor Actions</h2>
                    <p className="text-[9px] font-semibold text-slate-400">Critical moves to keep the portfolio on track</p>
                  </div>
                  <button type="button" onClick={onBack} className="rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-black text-slate-500">
                    Back
                  </button>
                </div>
                <div className="space-y-2">
                  {nextActions.map(action => (
                    <div key={action.title} className="grid grid-cols-[8px_minmax(0,1fr)_62px] items-center gap-2 rounded-2xl bg-[#F8FAFC] p-3">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: action.color }} />
                      <span className="min-w-0">
                        <span className="block truncate text-[11px] font-black text-slate-800">{action.title}</span>
                        <span className="block truncate text-[9px] font-semibold text-slate-400">{action.owner}</span>
                      </span>
                      <span className="text-right text-[9px] font-black text-slate-500">{action.due}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </OrganizationLayout>
  );
};

export default OrgPrograms;
