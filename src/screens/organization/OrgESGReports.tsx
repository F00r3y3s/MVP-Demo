import React, { useEffect, useState } from 'react';
import {
  Accessibility,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  FileBarChart,
  GraduationCap,
  Leaf,
  Scale,
  ShieldCheck,
  SmilePlus,
  Users,
} from 'lucide-react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import OrgChart from '../../components/organization/OrgChart';
import { ScreenName } from '../../types';
import { ESG_ENV_BAR_DATA, ESG_MONTHLY_TREND, SOCIAL_DONUT_DATA } from '../../data/orgCommandCenter';
import { lightChartOptions, OrgScreenShell, OrgSectionCard } from '../../components/organization/OrgCommandComponents';
import { useOrgRoute } from '../../context/OrgRouteContext';

type EsgTab = 'env' | 'social' | 'gov' | 'sdg';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  initialTab?: EsgTab;
}

const tabs: Array<{ id: EsgTab; label: string; Icon: typeof Leaf; color: string }> = [
  { id: 'env', label: 'Environmental', Icon: Leaf, color: '#059669' },
  { id: 'social', label: 'Social', Icon: Users, color: '#2563EB' },
  { id: 'gov', label: 'Governance', Icon: ShieldCheck, color: '#7C3AED' },
  { id: 'sdg', label: 'SDG Progress', Icon: FileBarChart, color: '#D97706' },
];

const overview = {
  env: [
    { Icon: Building2, value: '412', label: 'Companies', color: '#059669' },
    { Icon: Users, value: '1.2M', label: 'Employees', color: '#2563EB' },
    { Icon: ClipboardCheck, value: '6.8M', label: 'Actions Logged', color: '#7C3AED' },
    { Icon: Cloud, value: '78,450 t', label: 'CO2e Avoided', color: '#065F46' },
  ],
  social: [
    { Icon: GraduationCap, value: '284K', label: 'Training Hours', color: '#2563EB' },
    { Icon: Accessibility, value: '91.4%', label: 'Accessibility', color: '#059669' },
    { Icon: Users, value: '1,240', label: 'Community Projects', color: '#D97706' },
    { Icon: SmilePlus, value: '7.8', label: 'Wellbeing Index', color: '#7C3AED' },
  ],
  gov: [
    { Icon: CheckCircle2, value: '97.2%', label: 'Compliance Rate', color: '#059669' },
    { Icon: ShieldCheck, value: 'A+', label: 'Security Rating', color: '#2563EB' },
    { Icon: FileBarChart, value: '34', label: 'Policies Published', color: '#7C3AED' },
    { Icon: Scale, value: '18', label: 'Audits Completed', color: '#D97706' },
  ],
};

const tabSummaries = {
  env: {
    eyebrow: 'Environmental ledger',
    title: 'Scope 3 remains the largest disclosure surface.',
    body: 'Operational emissions are trending down while value-chain evidence collection needs continued supplier follow-up.',
    metric: '64%',
    metricLabel: 'Scope 3 evidence',
    color: '#059669',
  },
  social: {
    eyebrow: 'Social performance',
    title: 'Employee participation is strong across training and verified actions.',
    body: 'Accessibility readiness and community project participation are high enough to support public reporting.',
    metric: '74.2%',
    metricLabel: 'Green action participation',
    color: '#2563EB',
  },
  gov: {
    eyebrow: 'Governance assurance',
    title: 'Disclosure controls are mature and audit cadence is stable.',
    body: 'Policy coverage, certifications, and committee rhythm are aligned with national reporting expectations.',
    metric: '97.2%',
    metricLabel: 'Compliance rate',
    color: '#7C3AED',
  },
};

const scopeRows = {
  env: [
    ['Scope 1 - Direct Emissions', '124,300 t', 'Fleet, generators, on-site combustion'],
    ['Scope 2 - Indirect Energy', '89,600 t', 'Purchased electricity and heating'],
    ['Scope 3 - Value Chain', '341,200 t', 'Supply chain, travel, waste'],
    ['Total Avoided vs Baseline', '78,450 t', 'Verified reduction portfolio'],
  ],
  social: [
    ['Green Action Participation', '74.2%', 'Employees completing verified behavior actions'],
    ['Sustainability Training', '68.9%', 'Completion across required learning paths'],
    ['Gender Balance', '48% female', 'Reported workforce representation'],
    ['Emiratisation Rate', '62.4%', 'National workforce participation'],
    ['Community Volunteer Hours', '42,800 h', 'Verified community contribution'],
  ],
  gov: [
    ['Board Diversity', '42%', 'Gender representation across board seats'],
    ['Sustainability Committee Meetings', '12 / year', 'Monthly governance cadence'],
    ['SBTi Targets Aligned', '1.5 C', 'Science-based pathway alignment'],
    ['TCFD Disclosure', 'Full', 'Climate-risk disclosure status'],
    ['GRI Standards', 'GRI 2021', 'Reporting framework baseline'],
    ['ISO 14001 Certification', 'Certified', 'Environmental management system'],
  ],
};

const ScopeRows: React.FC<{ rows: string[][]; color: string }> = ({ rows, color }) => (
  <OrgSectionCard className="overflow-hidden">
    <div className="border-b border-slate-100 px-3.5 py-3">
      <h3 className="text-xs font-black text-slate-900">Disclosure Breakdown</h3>
      <p className="mt-0.5 text-[9px] font-semibold text-slate-400">Auditable rows used in the active report view</p>
    </div>
    <div>
      {rows.map(([label, value, sub]) => (
        <div key={label} className="grid grid-cols-[4px_minmax(0,1fr)_72px] items-center gap-3 border-b border-slate-100 px-3.5 py-3 last:border-b-0">
          <span className="h-9 rounded-full" style={{ backgroundColor: color }} />
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-black text-slate-800">{label}</span>
            {sub && <span className="mt-0.5 block truncate text-[9px] font-semibold text-slate-400">{sub}</span>}
          </span>
          <span className="shrink-0 text-right text-[13px] font-black text-slate-900">{value}</span>
        </div>
      ))}
    </div>
  </OrgSectionCard>
);

const OverviewGrid: React.FC<{ rows: Array<{ Icon: typeof Leaf; value: string; label: string; color: string }> }> = ({ rows }) => (
  <div className="grid grid-cols-2 gap-2">
    {rows.map(({ Icon, value, label, color }) => (
      <OrgSectionCard key={label} className="p-3">
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}14`, color }}>
          <Icon size={16} strokeWidth={2.6} />
        </div>
        <div className="text-xl font-black leading-none tracking-[-0.04em] text-slate-900">{value}</div>
        <div className="mt-1 text-[9px] font-bold text-slate-400">{label}</div>
      </OrgSectionCard>
    ))}
  </div>
);

const OrgESGReports: React.FC<Props> = ({ onNavigate, initialTab = 'env' }) => {
  const { selectedEntity } = useOrgRoute();
  const shortName = selectedEntity?.shortName ?? 'MOEI';
  const [activeTab, setActiveTab] = useState<EsgTab>(initialTab === 'sdg' ? 'env' : initialTab);
  const activeConfig = tabs.find(tab => tab.id === activeTab) ?? tabs[0];
  const summary = tabSummaries[activeTab as keyof typeof tabSummaries] ?? tabSummaries.env;

  useEffect(() => {
    if (initialTab === 'sdg') {
      onNavigate(ScreenName.ORG_SDG_DETAILS);
    }
  }, [initialTab, onNavigate]);

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_ESG_REPORTS} onNavigate={onNavigate}>
      <OrgScreenShell className="px-0 pt-0">
        <div className="px-3.5 pt-3">
          <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-950 via-[#064E3B] to-[#1E3A8A] p-4 text-white shadow-[0_14px_34px_rgba(15,23,42,.18)]">
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/16">
                  <FileBarChart size={24} strokeWidth={2.7} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/60">{shortName} disclosure hub</p>
                  <h1 className="mt-1 text-[20px] font-black leading-none">ESG Reports</h1>
                  <p className="mt-1 line-clamp-2 text-[10px] font-semibold leading-4 text-white/70">Environmental, social, and governance evidence for leadership reporting.</p>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/14 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-emerald-100">
                <CheckCircle2 size={11} strokeWidth={3} />
                Q4 Ready
              </span>
            </div>

            <div className="relative mt-4 grid grid-cols-3 gap-2">
              {[
                ['Scope 3', '64%'],
                ['CO2e Avoided', '78.4K t'],
                ['Readiness', '91%'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/12 p-2.5">
                  <p className="truncate text-[12px] font-black leading-none">{value}</p>
                  <p className="mt-1 text-[8px] font-black uppercase tracking-wide text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="sticky top-0 z-20 bg-[#EEF2EF]/95 px-3.5 py-2 backdrop-blur-xl">
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {tabs.map(tab => {
              const active = activeTab === tab.id;
              const Icon = tab.Icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (tab.id === 'sdg') {
                      onNavigate(ScreenName.ORG_SDG_DETAILS);
                      return;
                    }

                    setActiveTab(tab.id);
                  }}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-[10px] font-black transition-all ${
                    active
                      ? 'border-transparent text-white shadow-[0_4px_12px_rgba(6,95,70,.22)]'
                      : 'border-white bg-white text-slate-500'
                  }`}
                  style={active ? { backgroundColor: tab.color } : undefined}
                >
                  <Icon size={12} strokeWidth={2.7} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 px-3.5 pb-28">
          <OrgSectionCard className="overflow-hidden p-0">
            <div className="grid grid-cols-[1fr_92px] gap-3 p-3.5">
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.16em]" style={{ color: activeConfig.color }}>{summary.eyebrow}</p>
                <h2 className="mt-1 text-[15px] font-black leading-5 text-slate-900">{summary.title}</h2>
                <p className="mt-1.5 line-clamp-2 text-[10px] font-semibold leading-4 text-slate-500">{summary.body}</p>
              </div>
              <div className="rounded-[22px] p-3 text-white" style={{ backgroundColor: summary.color }}>
                <p className="text-[8px] font-black uppercase tracking-wide text-white/55">{summary.metricLabel}</p>
                <p className="mt-2 text-[25px] font-black leading-none">{summary.metric}</p>
                <ArrowRight size={14} className="mt-3 text-white/70" strokeWidth={2.8} />
              </div>
            </div>
          </OrgSectionCard>

          {activeTab === 'env' && (
            <>
              <OverviewGrid rows={overview.env} />
              <ScopeRows rows={scopeRows.env} color={activeConfig.color} />
              <OrgSectionCard className="p-3.5">
                <h3 className="mb-1 text-xs font-black text-slate-900">CO2 Reduction by Sector</h3>
                <p className="mb-3 text-[9px] font-semibold text-slate-400">Avoided emissions by operational source</p>
                <OrgChart kind="bar" data={ESG_ENV_BAR_DATA} height={160} options={lightChartOptions} />
              </OrgSectionCard>
              <OrgSectionCard className="p-3.5">
                <h3 className="mb-1 text-xs font-black text-slate-900">Monthly Emission Trend</h3>
                <p className="mb-3 text-[9px] font-semibold text-slate-400">Total emissions trending toward the disclosure target</p>
                <OrgChart kind="line" data={ESG_MONTHLY_TREND} height={160} options={lightChartOptions} />
              </OrgSectionCard>
            </>
          )}

          {activeTab === 'social' && (
            <>
              <OverviewGrid rows={overview.social} />
              <ScopeRows rows={scopeRows.social} color={activeConfig.color} />
              <OrgSectionCard className="p-3.5">
                <h3 className="mb-1 text-xs font-black text-slate-900">Employee Green Actions</h3>
                <p className="mb-3 text-[9px] font-semibold text-slate-400">Participation by verified action category</p>
                <OrgChart kind="doughnut" data={SOCIAL_DONUT_DATA} height={150} options={{ ...lightChartOptions, scales: {}, cutout: '62%', plugins: { legend: { position: 'right', labels: { font: { size: 9 }, boxWidth: 9, padding: 6, color: '#475569' } } } }} />
              </OrgSectionCard>
            </>
          )}

          {activeTab === 'gov' && (
            <>
              <OverviewGrid rows={overview.gov} />
              <ScopeRows rows={scopeRows.gov} color={activeConfig.color} />
              <OrgSectionCard className="p-3.5">
                <h3 className="mb-3 text-xs font-black text-slate-900">Assurance Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['TCFD ready', 'GRI mapped', 'ISO certified', 'Board reviewed'].map(item => (
                    <div key={item} className="flex items-center gap-2 rounded-2xl bg-[#F8FAFC] p-3">
                      <CheckCircle2 size={15} className="text-[var(--forest-medium)]" strokeWidth={2.7} />
                      <span className="text-[10px] font-black text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </OrgSectionCard>
            </>
          )}
        </div>
      </OrgScreenShell>
    </OrganizationLayout>
  );
};

export default OrgESGReports;
