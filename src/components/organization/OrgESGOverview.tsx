import React from 'react';
import { ScreenName } from '../../types';
import { DashboardActionCard } from './OrgCommandComponents';

const OrgESGOverview: React.FC<{ onNavigate?: (screen: ScreenName) => void }> = ({ onNavigate }) => (
  <DashboardActionCard
    title="Scope 3 (ESG) Overview"
    icon="FileBarChart"
    badge="Q4"
    rows={[
      { label: 'Companies', value: '412' },
      { label: 'Employees', value: '1.2M' },
      { label: 'CO2e Avoided', value: '78,450 t', color: '#065F46' },
    ]}
    action="View report"
    onClick={() => onNavigate?.(ScreenName.ORG_ESG_REPORTS)}
  />
);

export default OrgESGOverview;
