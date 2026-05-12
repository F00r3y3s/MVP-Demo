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

interface Person {
  id: string;
  name: string;
  role: string;
  department: string;
  engagementScore: number;
  assignedKpis: string[];
  activityTimeline: string[];
}

const PEOPLE: Person[] = [
  { id: 'p1', name: 'Dr. Fatima Al Hammadi', role: 'Head of Climate Office', department: 'Climate & Environment', engagementScore: 94, assignedKpis: ['Scope 1 & 2 Emissions', 'Carbon Capture', 'MRV Readiness'], activityTimeline: ['Filed Q1 climate disclosure', 'Updated emission factor database', 'Completed TCFD training', 'Presented to Board'] },
  { id: 'p2', name: 'Eng. Khalid Al Mazroui', role: 'Facilities Director', department: 'Facilities Management', engagementScore: 81, assignedKpis: ['Energy Intensity', 'Water Consumption', 'Building Certifications'], activityTimeline: ['Completed HVAC optimisation audit', 'Submitted smart meter RFP', 'GSAS re-certification started'] },
  { id: 'p3', name: 'Sara Al Nuaimi', role: 'Procurement Manager', department: 'Procurement', engagementScore: 76, assignedKpis: ['Green Procurement %', 'Supplier ESG Score', 'Sustainable Spend'], activityTimeline: ['Launched supplier ESG assessment', 'Updated procurement policy', 'Green vendor onboarding'] },
  { id: 'p4', name: 'Ahmed Al Dhaheri', role: 'IT Sustainability Lead', department: 'Information Technology', engagementScore: 69, assignedKpis: ['Data Centre Energy', 'E-waste Diverted', 'Digital Carbon'], activityTimeline: ['Switched 2 servers to renewable energy', 'Launched e-waste drive', 'Remote work policy updated'] },
  { id: 'p5', name: 'Maryam Al Hosani', role: 'HR Sustainability Officer', department: 'Human Resources', engagementScore: 88, assignedKpis: ['Employee Engagement %', 'Green Commute %', 'Training Completions'], activityTimeline: ['Launched Green Champions programme', 'Completed all-staff sustainability survey', 'EV policy approved'] },
  { id: 'p6', name: 'Dr. Rashed Al Qubaisi', role: 'Reporting & Disclosure Lead', department: 'Sustainability Reporting', engagementScore: 91, assignedKpis: ['ESG Score', 'TCFD Disclosure', 'SDG Alignment'], activityTimeline: ['Published SDG Progress Report', 'Carbon audit third-party review', 'Board ESG briefing prepared'] },
];

const DEPT_CONTRIBUTIONS = {
  labels: ['Climate', 'Facilities', 'Reporting', 'HR', 'Procurement', 'IT'],
  datasets: [{
    label: 'Contribution Score',
    data: [94, 81, 91, 88, 76, 69],
    backgroundColor: '#4A7C59',
    borderRadius: 8,
  }],
};

const OrgPersonDetail: React.FC<{ person: Person; onBack: () => void }> = ({ person, onBack }) => (
  <div className="h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
    <div className="flex items-center gap-3 px-5 pt-12 pb-4 border-b border-white/8">
      <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition" aria-label="Back"><ChevronLeft size={18} /></button>
      <div className="flex-1">
        <h1 className="font-black text-base text-[var(--text-primary)] font-jakarta">{person.name}</h1>
        <p className="text-[10px] text-[var(--text-muted)]">{person.role} · {person.department}</p>
      </div>
      <div className="w-10 h-10 rounded-xl bg-[var(--forest-light)]/20 flex items-center justify-center font-black text-[var(--forest-light)] text-sm">{person.engagementScore}</div>
    </div>
    <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-5 space-y-5">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2">
        <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-2">KPIs Owned</p>
        {person.assignedKpis.map(kpi => (
          <div key={kpi} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
            <span className="w-2 h-2 rounded-full bg-[var(--forest-light)] shrink-0" />
            <span className="text-sm text-[var(--text-secondary)]">{kpi}</span>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2">
        <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-2">Activity Timeline</p>
        {person.activityTimeline.map((a, i) => (
          <div key={a} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
            <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--forest-light)]" />
              {i < person.activityTimeline.length - 1 && <span className="w-px h-4 bg-white/10" />}
            </div>
            <span className="text-sm text-[var(--text-secondary)] leading-tight">{a}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const OrgPeople: React.FC<Props> = ({ onNavigate, onBack }) => {
  const ready = useDelayedReady(300);
  const scrollRef = useScrollPreservation(ScreenName.ORG_PEOPLE);
  const [view, setView] = useState<'individual' | 'department'>('individual');
  const [detail, setDetail] = useState<Person | null>(null);

  if (detail) return <OrgPersonDetail person={detail} onBack={() => setDetail(null)} />;

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_PEOPLE} onNavigate={onNavigate}>
      <div ref={scrollRef} className="h-full overflow-y-auto no-scrollbar">
        <div className="px-5 py-5 space-y-5 pb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--forest-light)] mb-0.5">PEOPLE · {PEOPLE.length} CONTRIBUTORS</p>
            <h1 className="text-2xl font-black text-[var(--text-primary)] font-jakarta">Contributors</h1>
          </div>

          {!ready ? (
            <div className="space-y-3"><Skeleton height={200} rounded="rounded-2xl" />{[1,2,3].map(i => <Skeleton key={i} height={80} rounded="rounded-2xl" />)}</div>
          ) : (
            <>
              {/* Chart */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-4">Contributions by Department</p>
                <OrgChart kind="bar" data={DEPT_CONTRIBUTIONS} height={180} />
              </div>

              {/* Segment control */}
              <div className="flex gap-1 bg-white/5 rounded-2xl p-1">
                {(['individual', 'department'] as const).map(v => (
                  <button key={v} onClick={() => setView(v)} className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${view === v ? 'bg-[var(--forest-light)] text-white shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}>
                    By {v === 'individual' ? 'Individual' : 'Department'}
                  </button>
                ))}
              </div>

              {/* People list */}
              <div className="space-y-3">
                {PEOPLE.map(p => (
                  <button key={p.id} onClick={() => setDetail(p)} className="w-full text-left rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-[var(--forest-light)]/30 active:scale-[0.98] transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--forest-light)]/20 flex items-center justify-center font-black text-[var(--forest-light)] text-sm shrink-0">
                        {p.engagementScore}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-sm text-[var(--text-primary)] truncate">{p.name}</h3>
                        <p className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">{p.role} · {p.department}</p>
                      </div>
                      <ChevronRight size={14} className="text-[var(--text-muted)] shrink-0" />
                    </div>
                    <div className="mt-3 flex gap-1.5 overflow-hidden">
                      {p.assignedKpis.slice(0, 2).map(kpi => (
                        <span key={kpi} className="px-2 py-1 rounded-full bg-white/5 text-[9px] font-semibold text-[var(--text-muted)] border border-white/8 truncate max-w-[120px]">{kpi}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </OrganizationLayout>
  );
};

export default OrgPeople;
