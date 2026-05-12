import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  active:   { bg: 'bg-[var(--forest-light)]/15', text: 'text-[var(--forest-light)]', label: 'Active'   },
  'at-risk': { bg: 'bg-amber-500/15',             text: 'text-amber-400',             label: 'At Risk'  },
  done:     { bg: 'bg-white/8',                   text: 'text-[var(--text-muted)]',   label: 'Done'     },
};

const FILTER_OPTIONS = ['All', 'Active', 'At Risk', 'Done'] as const;

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
      <div ref={scrollRef} className="h-full overflow-y-auto no-scrollbar">
        <div className="px-5 py-5 space-y-5 pb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--forest-light)] mb-0.5">PROGRAMS · {PROGRAMS.filter(p => p.status === 'active').length} ACTIVE</p>
            <h1 className="text-2xl font-black text-[var(--text-primary)] font-jakarta">Program Portfolio</h1>
          </div>

          {!ready ? (
            <div className="space-y-3">
              <Skeleton height={200} rounded="rounded-2xl" />
              {[1,2,3].map(i => <Skeleton key={i} height={80} rounded="rounded-2xl" />)}
            </div>
          ) : (
            <>
              {/* Chart */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-4">Status Mix</p>
                <OrgChart kind="doughnut" data={chartData} height={180} />
              </div>

              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {FILTER_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => setFilter(opt)} className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shrink-0 transition ${filter === opt ? 'bg-[var(--forest-light)] text-white' : 'bg-white/5 text-[var(--text-muted)] border border-white/10 hover:border-white/25'}`}>{opt}</button>
                ))}
              </div>

              {/* List */}
              <div className="space-y-3">
                {filtered.map(p => {
                  const pct = Math.round((p.completed / p.milestones) * 100);
                  const s = STATUS_CHIP[p.status];
                  return (
                    <button key={p.id} onClick={() => setDetail(p)} className="w-full text-left rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-[var(--forest-light)]/30 active:scale-[0.98] transition">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-black text-sm text-[var(--text-primary)] leading-tight">{p.name}</h3>
                          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{p.owner} · {p.milestones} milestones</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                          <ChevronRight size={14} className="text-[var(--text-muted)]" />
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <div className="h-full rounded-full bg-[var(--forest-light)]" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[9px] text-[var(--text-muted)] mt-1">{pct}% complete</p>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="text-center py-10"><p className="text-3xl mb-2">📂</p><p className="font-bold text-sm text-[var(--text-muted)]">No programs match this filter</p></div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </OrganizationLayout>
  );
};

export default OrgPrograms;
