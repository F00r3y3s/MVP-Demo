import React from 'react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import OrgChart from '../../components/organization/OrgChart';
import { ScreenName } from '../../types';
import {
  BCI_TREND_LABELS,
  BCI_TREND_VALUES,
  ORG_EMIRATES,
} from '../../data/orgCommandCenter';
import { BciCompositionCard, BciSummaryHero, lightChartOptions, OrgScreenShell, OrgSectionCard } from '../../components/organization/OrgCommandComponents';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

const trendData = {
  labels: BCI_TREND_LABELS,
  datasets: [{
    data: BCI_TREND_VALUES,
    borderColor: '#065F46',
    backgroundColor: 'rgba(6,95,70,.1)',
    borderWidth: 2.5,
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointBackgroundColor: '#065F46',
    pointBorderColor: '#fff',
    pointBorderWidth: 1.5,
  }],
};

const emiratesBarData = {
  labels: ORG_EMIRATES.map(emirate => emirate.name.split(' ')[0]),
  datasets: [{
    data: ORG_EMIRATES.map(emirate => emirate.score),
    backgroundColor: ORG_EMIRATES.map(emirate => `${emirate.color}cc`),
    borderColor: ORG_EMIRATES.map(emirate => emirate.color),
    borderWidth: 1.5,
    borderRadius: 8,
  }],
};

const BCI_STATS = [
  { icon: 'LineChart', label: 'Weekly Change', value: '+1.8 pts', sub: 'Positive trend', color: '#065F46' },
  { icon: 'Trophy', label: 'Top Emirate', value: 'Dubai', sub: '82.5 pts · #1' },
  { icon: 'Users', label: 'Participants', value: '2.1M', sub: '+7.6% WoW' },
  { icon: 'Target', label: 'Gap to Target', value: '10.2 pts', sub: 'to 2030 goal' },
];

const OrgBCIIndex: React.FC<Props> = ({ onNavigate }) => (
  <OrganizationLayout activeScreen={ScreenName.ORG_BCI_INDEX} onNavigate={onNavigate}>
    <OrgScreenShell>
      <BciSummaryHero />

      <div className="mt-2 grid grid-cols-2 gap-2">
        {BCI_STATS.map(stat => (
          <OrgSectionCard key={stat.label} className="p-3">
            <div className="mb-1 text-[20px]">{stat.label === 'Weekly Change' ? '📈' : stat.label === 'Top Emirate' ? '🏆' : stat.label === 'Participants' ? '👥' : '🎯'}</div>
            <div className="text-[8px] font-black uppercase tracking-[0.04em] text-slate-400">{stat.label}</div>
            <div className="mt-1 truncate text-xl font-black leading-none text-slate-900" style={{ color: stat.color }}>{stat.value}</div>
            <div className="mt-1 truncate text-[9px] font-semibold text-slate-400">{stat.sub}</div>
          </OrgSectionCard>
        ))}
      </div>

      <OrgSectionCard className="mt-2 p-3.5">
        <h3 className="mb-3 text-xs font-black text-slate-900">30-Day BCI Trend</h3>
        <OrgChart kind="line" data={trendData} height={160} options={{ ...lightChartOptions, scales: { ...lightChartOptions.scales, y: { ...lightChartOptions.scales.y, min: 64, max: 88 } } }} />
      </OrgSectionCard>

      <OrgSectionCard className="mt-2 p-3.5">
        <h3 className="mb-3 text-xs font-black text-slate-900">Emirates BCI Performance</h3>
        <OrgChart kind="bar" data={emiratesBarData} height={160} options={{ ...lightChartOptions, scales: { ...lightChartOptions.scales, y: { ...lightChartOptions.scales.y, min: 40, max: 90 } } }} />
      </OrgSectionCard>

      <div className="mt-2">
        <BciCompositionCard />
      </div>
    </OrgScreenShell>
  </OrganizationLayout>
);

export default OrgBCIIndex;
