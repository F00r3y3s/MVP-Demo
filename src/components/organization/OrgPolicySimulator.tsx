import React from 'react';
import { ScreenName } from '../../types';
import { DashboardActionCard } from './OrgCommandComponents';

const OrgPolicySimulator: React.FC<{ onNavigate?: (screen: ScreenName) => void }> = ({ onNavigate }) => (
  <DashboardActionCard
    title="Policy Impact Simulator"
    icon="Target"
    rows={[
      { label: 'Water Saved', value: '4.3M L' },
      { label: 'Energy Saved', value: '118K kWh' },
      { label: 'CO2 Avoided', value: '2,300 t' },
    ]}
    action="Run simulation"
    onClick={() => onNavigate?.(ScreenName.ORG_POLICY_SIMULATOR)}
  />
);

export default OrgPolicySimulator;
