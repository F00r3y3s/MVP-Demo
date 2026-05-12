import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
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

type ReportStatus = 'Filed' | 'Draft' | 'Overdue';
type ReportType = 'Board' | 'Regulatory' | 'ESG';

interface Report {
  id: string;
  title: string;
  type: ReportType;
  dateFiled: string;
  status: ReportStatus;
  summary: string;
  sections: string[];
  filingStatus: string;
}

const REPORTS: Report[] = [
  { id: 'r1', title: 'UAE Climate Disclosure Q1 2025', type: 'Regulatory', dateFiled: '15 Apr 2025', status: 'Filed', summary: 'Quarterly disclosure aligned with UAE Securities & Commodities Authority climate risk reporting requirements.', sections: ['Executive Summary', 'Scope 1 & 2 Emissions', 'Climate Risk Assessment', 'Adaptation Measures', 'Forward-looking Targets'], filingStatus: 'Accepted — SCA Portal' },
  { id: 'r2', title: 'ESG Board Report H1 2025', type: 'Board', dateFiled: '01 Jul 2025', status: 'Draft', summary: 'Semi-annual board report covering E, S, and G performance against 2025 targets.', sections: ['Board Summary', 'Environmental KPIs', 'Social Metrics', 'Governance Scorecard', 'Recommendations'], filingStatus: 'Draft — Board review 10 Jul' },
  { id: 'r3', title: 'GSAS Compliance Filing 2024', type: 'Regulatory', dateFiled: '28 Feb 2025', status: 'Filed', summary: 'Annual compliance submission to the Green Building Council for GSAS certified assets.', sections: ['Asset List', 'Energy Performance', 'Water Performance', 'Certification Status'], filingStatus: 'Accepted — GSAS Portal' },
  { id: 'r4', title: 'SDG Progress Report 2024', type: 'ESG', dateFiled: '31 Mar 2025', status: 'Filed', summary: 'Annual report mapping organisational activities to the 17 UN Sustainable Development Goals.', sections: ['SDG Alignment Matrix', 'Key Contributions by Goal', 'Partnerships', 'Case Studies', 'Forward Plan'], filingStatus: 'Published — Internal & Public' },
  { id: 'r5', title: 'Carbon Audit 2024', type: 'ESG', dateFiled: '30 Jun 2025', status: 'Overdue', summary: 'Third-party verified carbon footprint audit for Scope 1, 2, and 3 emissions for FY 2024.', sections: ['Methodology', 'Scope 1 Detail', 'Scope 2 Detail', 'Scope 3 Categories', 'Third-party Statement'], filingStatus: 'Overdue — Verifier awaited' },
];

const STATUS_CHIP: Record<ReportStatus, { bg: string; text: string }> = {
  Filed:   { bg: 'bg-[var(--forest-light)]/15', text: 'text-[var(--forest-light)]' },
  Draft:   { bg: 'bg-amber-500/15',             text: 'text-amber-400'             },
  Overdue: { bg: 'bg-rose-500/15',              text: 'text-rose-400'              },
};

const FILTER_OPTIONS = ['All', 'Board', 'Regulatory', 'ESG'] as const;

const OrgReportDetail: React.FC<{ report: Report; onBack: () => void }> = ({ report, onBack }) => {
  const s = STATUS_CHIP[report.status];
  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4 border-b border-white/8">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition" aria-label="Back"><ChevronLeft size={18} /></button>
        <div className="flex-1"><h1 className="font-black text-sm text-[var(--text-primary)] font-jakarta leading-tight">{report.title}</h1><p className="text-[10px] text-[var(--text-muted)]">{report.type} · {report.dateFiled}</p></div>
        <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-full ${s.bg} ${s.text}`}>{report.status}</span>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-5 space-y-5">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-2">Summary</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{report.summary}</p>
          <p className="text-[10px] text-[var(--forest-light)] font-semibold mt-3">{report.filingStatus}</p>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">Sections</p>
          {report.sections.map((s, i) => (
            <div key={s} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-black text-[var(--text-muted)]">{i + 1}</span>
              <span className="text-sm text-[var(--text-secondary)]">{s}</span>
            </div>
          ))}
        </div>
        <button className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-[var(--forest-light)]/15 border border-[var(--forest-light)]/30 text-[var(--forest-light)] font-black text-sm uppercase tracking-wider active:scale-95 transition">
          <Download size={16} />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
};

const OrgReports: React.FC<Props> = ({ onNavigate, onBack }) => {
  const ready = useDelayedReady(300);
  const scrollRef = useScrollPreservation(ScreenName.ORG_REPORTS);
  const [filter, setFilter] = useState<typeof FILTER_OPTIONS[number]>('All');
  const [detail, setDetail] = useState<Report | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'All') return REPORTS;
    return REPORTS.filter(r => r.type === filter);
  }, [filter]);

  const chartData = {
    labels: ['Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
    datasets: [{
      label: 'Reports Filed',
      data: [2, 3, 4, 5],
      backgroundColor: '#4A7C59',
      borderRadius: 8,
    }],
  };

  if (detail) return <OrgReportDetail report={detail} onBack={() => setDetail(null)} />;

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_REPORTS} onNavigate={onNavigate}>
      <div ref={scrollRef} className="h-full overflow-y-auto no-scrollbar">
        <div className="px-5 py-5 space-y-5 pb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--forest-light)] mb-0.5">REPORTS · {REPORTS.filter(r => r.status === 'Filed').length} FILED</p>
            <h1 className="text-2xl font-black text-[var(--text-primary)] font-jakarta">Reporting Hub</h1>
          </div>

          {!ready ? (
            <div className="space-y-3"><Skeleton height={200} rounded="rounded-2xl" />{[1,2,3].map(i => <Skeleton key={i} height={80} rounded="rounded-2xl" />)}</div>
          ) : (
            <>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-4">Reports Filed Per Quarter</p>
                <OrgChart kind="bar" data={chartData} height={180} />
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {FILTER_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => setFilter(opt)} className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shrink-0 transition ${filter === opt ? 'bg-[var(--forest-light)] text-white' : 'bg-white/5 text-[var(--text-muted)] border border-white/10 hover:border-white/25'}`}>{opt}</button>
                ))}
              </div>

              <div className="space-y-3">
                {filtered.map(r => {
                  const s = STATUS_CHIP[r.status];
                  return (
                    <button key={r.id} onClick={() => setDetail(r)} className="w-full text-left rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-[var(--forest-light)]/30 active:scale-[0.98] transition">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-black text-sm text-[var(--text-primary)] leading-tight">{r.title}</h3>
                          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{r.type} · {r.dateFiled}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${s.bg} ${s.text}`}>{r.status}</span>
                          <ChevronRight size={14} className="text-[var(--text-muted)]" />
                        </div>
                      </div>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="text-center py-10"><p className="text-3xl mb-2">📄</p><p className="font-bold text-sm text-[var(--text-muted)]">No reports match this filter</p></div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </OrganizationLayout>
  );
};

export default OrgReports;
