import React from 'react';
import { ScreenName } from '../../types';
import { DashboardActionCard } from './OrgCommandComponents';

const OrgAIActivity: React.FC<{ onNavigate?: (screen: ScreenName) => void }> = ({ onNavigate }) => (
  <DashboardActionCard
    title="Agentic AI Activity"
    icon="Bot"
    badge="Live"
    rows={[
      { label: 'Nudges Sent', value: '245,890' },
      { label: 'Goal Deviations', value: '18,423', color: '#D97706' },
      { label: 'Success Rate', value: '87.6%', color: '#065F46' },
    ]}
    action="View insights"
    onClick={() => onNavigate?.(ScreenName.ORG_AI_AGENT)}
  />
);

export default OrgAIActivity;
