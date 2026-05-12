import { OrgNavItem, ScreenName } from '../types';

export const ORG_NAV_ITEMS: OrgNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', iconKey: 'LayoutDashboard', screen: ScreenName.ORG_DASHBOARD },
  { id: 'bci_index', label: 'BCI Index', iconKey: 'LineChart',       screen: ScreenName.ORG_BCI_INDEX },
  { id: 'ai_agent',  label: 'AI Agent',  iconKey: 'Bot',             screen: ScreenName.ORG_AI_AGENT },
  { id: 'policy',    label: 'Simulator', iconKey: 'LayoutGrid',      screen: ScreenName.ORG_POLICY_SIMULATOR },
  { id: 'esg',       label: 'ESG',       iconKey: 'FileBarChart',    screen: ScreenName.ORG_ESG_REPORTS },
  { id: 'more',      label: 'More',      iconKey: 'Menu',            screen: ScreenName.ORG_MORE },
];
