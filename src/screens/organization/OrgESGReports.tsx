import React, { useState } from 'react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import OrgChart from '../../components/organization/OrgChart';
import { ScreenName } from '../../types';
import { ESG_ENV_BAR_DATA, ESG_MONTHLY_TREND, SOCIAL_DONUT_DATA } from '../../data/orgCommandCenter';
import { lightChartOptions, OrgScreenShell, OrgSectionCard, SdgProgressList } from '../../components/organization/OrgCommandComponents';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

type EsgTab = 'env' | 'social' | 'gov' | 'sdg';

const tabs: Array<{ id: EsgTab; label: string }> = [
  { id: 'env', label: 'Environmental' },
  { id: 'social', label: 'Social' },
  { id: 'gov', label: 'Governance' },
  { id: 'sdg', label: 'SDG Progress' },
];

const overview = {
  env: [
    ['🏢', '412', 'Companies'],
    ['👥', '1.2M', 'Employees'],
    ['📋', '6.8M', 'Actions Logged'],
    ['🌿', '78,450 t', 'CO2e Avoided'],
  ],
  social: [
    ['🎓', '284K', 'Training Hours'],
    ['♿', '91.4%', 'Accessibility'],
    ['🌍', '1,240', 'Community Projects'],
    ['😊', '7.8', 'Wellbeing Index'],
  ],
  gov: [
    ['✅', '97.2%', 'Compliance Rate'],
    ['🛡️', 'A+', 'Security Rating'],
    ['📑', '34', 'Policies Published'],
    ['🔍', '18', 'Audits Completed'],
  ],
};

const ScopeRows: React.FC<{ rows: Array<[string, string, string?]> }> = ({ rows }) => (
  <OrgSectionCard className="p-3.5">
    <div className="space-y-0">
      {rows.map(([label, value, sub]) => (
        <div key={label} className="flex items-center justify-between gap-3 border-b border-slate-100 py-2.5 last:border-b-0">
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold text-slate-600">{label}</span>
            {sub && <span className="mt-0.5 block text-[9px] font-medium text-slate-400">{sub}</span>}
          </span>
          <span className="shrink-0 text-right text-[13px] font-black text-slate-900">{value}</span>
        </div>
      ))}
    </div>
  </OrgSectionCard>
);

const OverviewGrid: React.FC<{ rows: string[][] }> = ({ rows }) => (
  <div className="grid grid-cols-2 gap-2">
    {rows.map(([icon, value, label]) => (
      <OrgSectionCard key={label} className="p-3 text-center">
        <div className="text-[22px]">{icon}</div>
        <div className="mt-1 text-xl font-black leading-none tracking-[-0.04em] text-slate-900">{value}</div>
        <div className="mt-1 text-[9px] font-bold text-slate-400">{label}</div>
      </OrgSectionCard>
    ))}
  </div>
);

const OrgESGReports: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<EsgTab>('env');

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_ESG_REPORTS} onNavigate={onNavigate}>
      <OrgScreenShell className="px-0 pt-0">
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white px-3.5 pt-3">
          <h1 className="text-[17px] font-black text-slate-900">ESG Reports</h1>
          <p className="mt-0.5 text-[10px] font-semibold text-slate-400">Environmental · Social · Governance · SDG Progress</p>
          <div className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto pb-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[11px] font-bold transition-all ${
                  activeTab === tab.id
                    ? 'border-[var(--forest-medium)] bg-[var(--forest-medium)] text-white shadow-[0_4px_12px_rgba(6,95,70,.3)]'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 px-3.5 pt-2">
          {activeTab === 'env' && (
            <>
              <OverviewGrid rows={overview.env} />
              <ScopeRows rows={[
                ['Scope 1 - Direct Emissions', '124,300 t', 'Fleet, generators, on-site combustion'],
                ['Scope 2 - Indirect Energy', '89,600 t', 'Purchased electricity & heating'],
                ['Scope 3 - Value Chain', '341,200 t', 'Supply chain, travel, waste'],
                ['Total Avoided (vs baseline)', '78,450 t'],
              ]} />
              <OrgSectionCard className="p-3.5">
                <h3 className="mb-3 text-xs font-black text-slate-900">CO2 Reduction by Sector</h3>
                <OrgChart kind="bar" data={ESG_ENV_BAR_DATA} height={160} options={lightChartOptions} />
              </OrgSectionCard>
              <OrgSectionCard className="p-3.5">
                <h3 className="mb-3 text-xs font-black text-slate-900">Monthly Emission Trend</h3>
                <OrgChart kind="line" data={ESG_MONTHLY_TREND} height={160} options={lightChartOptions} />
              </OrgSectionCard>
            </>
          )}

          {activeTab === 'social' && (
            <>
              <OverviewGrid rows={overview.social} />
              <ScopeRows rows={[
                ['Green Action Participation', '74.2%'],
                ['Sustainability Training', '68.9%'],
                ['Gender Balance', '48% female'],
                ['Emiratisation Rate', '62.4%'],
                ['Community Volunteer Hours', '42,800 h'],
              ]} />
              <OrgSectionCard className="p-3.5">
                <h3 className="mb-3 text-xs font-black text-slate-900">Employee Green Actions by Category</h3>
                <OrgChart kind="doughnut" data={SOCIAL_DONUT_DATA} height={150} options={{ ...lightChartOptions, scales: {}, cutout: '62%', plugins: { legend: { position: 'right', labels: { font: { size: 9 }, boxWidth: 9, padding: 6, color: '#475569' } } } }} />
              </OrgSectionCard>
            </>
          )}

          {activeTab === 'gov' && (
            <>
              <OverviewGrid rows={overview.gov} />
              <ScopeRows rows={[
                ['Board Diversity (gender)', '42%'],
                ['Sustainability Committee Meetings', '12 / year'],
                ['SBTi Targets Aligned', '1.5 C'],
                ['TCFD Disclosure', 'Full'],
                ['GRI Standards', 'GRI 2021'],
                ['ISO 14001 Certification', 'Certified'],
              ]} />
            </>
          )}

          {activeTab === 'sdg' && (
            <OrgSectionCard className="p-3.5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black text-slate-900">All 17 SDG Goals</h3>
                  <p className="mt-0.5 text-[10px] font-semibold text-slate-400">3 achieved · 14 in progress</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-[var(--forest-medium)]">3/17</span>
              </div>
              <SdgProgressList full />
            </OrgSectionCard>
          )}
        </div>
      </OrgScreenShell>
    </OrganizationLayout>
  );
};

export default OrgESGReports;
