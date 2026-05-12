import { ChartData } from 'chart.js';

export const ORG_EMIRATES = [
  { name: 'Dubai', short: 'DXB', score: 82.5, color: '#059669', tier: 'High Performer' },
  { name: 'Abu Dhabi', short: 'AD', score: 78.2, color: '#065F46', tier: 'High Performer' },
  { name: 'Sharjah', short: 'SHJ', score: 69.3, color: '#16A34A', tier: 'On Track' },
  { name: 'Ajman', short: 'AJM', score: 64.8, color: '#65A30D', tier: 'On Track' },
  { name: 'Ras Al Khaimah', short: 'RAK', score: 61.2, color: '#CA8A04', tier: 'Needs Attention' },
  { name: 'Umm Al Quwain', short: 'UAQ', score: 58.9, color: '#D97706', tier: 'Needs Attention' },
  { name: 'Fujairah', short: 'FUJ', score: 55.4, color: '#94A3B8', tier: 'Needs Attention' },
];

export const ORG_SDG_GOALS = [
  { id: 1, name: 'No Poverty', progress: 68, color: '#E5243B' },
  { id: 7, name: 'Clean Energy', progress: 54, color: '#FCC30B' },
  { id: 13, name: 'Climate Action', progress: 71, color: '#3F7E44' },
  { id: 8, name: 'Decent Work', progress: 42, color: '#A21942' },
  { id: 14, name: 'Life Below Water', progress: 58, color: '#0A97D9' },
  { id: 11, name: 'Sustainable Cities', progress: 66, color: '#FD9D24' },
];

export const ORG_ALL_SDG_GOALS = [
  { name: 'No Poverty', progress: 68, color: '#E5243B' },
  { name: 'Zero Hunger', progress: 52, color: '#DDA63A' },
  { name: 'Good Health', progress: 79, color: '#4C9F38' },
  { name: 'Quality Education', progress: 74, color: '#C5192D' },
  { name: 'Gender Equality', progress: 61, color: '#FF3A21' },
  { name: 'Clean Water', progress: 83, color: '#26BDE2' },
  { name: 'Clean Energy', progress: 54, color: '#FCC30B' },
  { name: 'Decent Work', progress: 42, color: '#A21942' },
  { name: 'Industry & Innovation', progress: 66, color: '#FD6925' },
  { name: 'Reduced Inequalities', progress: 48, color: '#DD1367' },
  { name: 'Sustainable Cities', progress: 71, color: '#FD9D24' },
  { name: 'Responsible Consumption', progress: 57, color: '#BF8B2E' },
  { name: 'Climate Action', progress: 71, color: '#3F7E44' },
  { name: 'Life Below Water', progress: 58, color: '#0A97D9' },
  { name: 'Life on Land', progress: 63, color: '#56C02B' },
  { name: 'Peace & Justice', progress: 82, color: '#00689D' },
  { name: 'Partnerships', progress: 75, color: '#19486A' },
];

export const ORG_KPI_DETAILS = {
  co2: {
    title: 'CO2 Reduction',
    icon: 'Cloud',
    color: '#065F46',
    stats: [
      { label: 'Today', value: '12,450 t' },
      { label: 'This Month', value: '384K t' },
      { label: 'YTD 2025', value: '4.1M t' },
      { label: 'vs Yesterday', value: '+8.4%' },
    ],
    chart: [10200, 11400, 10800, 12100, 11600, 13200, 12450],
    breakdown: [
      { label: 'Renewable Energy Adoption', value: 42, color: '#065F46' },
      { label: 'EV Fleet Transition', value: 28, color: '#0284C7' },
      { label: 'Industrial Efficiency', value: 18, color: '#D97706' },
      { label: 'Building Retrofits', value: 12, color: '#7C3AED' },
    ],
  },
  water: {
    title: 'Water Conservation',
    icon: 'Droplets',
    color: '#0284C7',
    stats: [
      { label: 'Today', value: '28.6M L' },
      { label: 'This Month', value: '842M L' },
      { label: 'YTD 2025', value: '9.8B L' },
      { label: 'vs Yesterday', value: '+6.1%' },
    ],
    chart: [22, 25, 24, 27, 26, 29, 28.6],
    breakdown: [
      { label: 'Smart Irrigation', value: 34, color: '#0284C7' },
      { label: 'Household Conservation', value: 28, color: '#0EA5E9' },
      { label: 'Industrial Reuse', value: 22, color: '#38BDF8' },
      { label: 'Desalination Efficiency', value: 16, color: '#7DD3FC' },
    ],
  },
  energy: {
    title: 'Energy Offset',
    icon: 'Zap',
    color: '#D97706',
    stats: [
      { label: 'Today', value: '96.3 GWh' },
      { label: 'This Month', value: '2.9 TWh' },
      { label: 'YTD 2025', value: '34.1 TWh' },
      { label: 'vs Yesterday', value: '+4.8%' },
    ],
    chart: [78, 85, 82, 91, 88, 98, 96.3],
    breakdown: [
      { label: 'Solar PV', value: 58, color: '#F59E0B' },
      { label: 'Wind', value: 18, color: '#6EE7B7' },
      { label: 'Nuclear Baseload', value: 14, color: '#60A5FA' },
      { label: 'Demand Response', value: 10, color: '#C4B5FD' },
    ],
  },
  actions: {
    title: 'Verified Actions',
    icon: 'CheckCircle2',
    color: '#7C3AED',
    stats: [
      { label: 'Today', value: '1.84M' },
      { label: 'This Month', value: '52.4M' },
      { label: 'YTD 2025', value: '624M' },
      { label: 'vs Yesterday', value: '+12.2%' },
    ],
    chart: [1.4, 1.5, 1.48, 1.6, 1.62, 1.78, 1.84],
    breakdown: [
      { label: 'Green Commuting', value: 31, color: '#7C3AED' },
      { label: 'Energy Saving', value: 26, color: '#A855F7' },
      { label: 'Recycling', value: 24, color: '#C084FC' },
      { label: 'Water Conservation', value: 19, color: '#DDD6FE' },
    ],
  },
  users: {
    title: 'Active Users',
    icon: 'Users',
    color: '#065F46',
    stats: [
      { label: 'This Week', value: '2.1M' },
      { label: 'This Month', value: '6.4M' },
      { label: 'YTD Sessions', value: '72.8M' },
      { label: 'WoW Growth', value: '+7.6%' },
    ],
    chart: [1.6, 1.7, 1.72, 1.8, 1.85, 1.95, 2.1],
    breakdown: [
      { label: 'Dubai', value: 38, color: '#065F46' },
      { label: 'Abu Dhabi', value: 32, color: '#059669' },
      { label: 'Sharjah', value: 18, color: '#6EE7B7' },
      { label: 'Other Emirates', value: 12, color: '#A7F3D0' },
    ],
  },
};

export type OrgKpiId = keyof typeof ORG_KPI_DETAILS;

export const BCI_TREND_LABELS = ['Apr 12', 'Apr 16', 'Apr 20', 'Apr 24', 'Apr 28', 'May 2', 'May 6', 'May 10', 'May 14', 'May 18', 'May 20'];
export const BCI_TREND_VALUES = [67.2, 68.8, 69.5, 70.1, 70.8, 71.5, 72.2, 73.1, 73.9, 74.5, 74.8];

export const BCI_COMPOSITION = [
  { label: 'Energy Behavior', value: 28, color: '#065F46' },
  { label: 'Water Usage', value: 22, color: '#0284C7' },
  { label: 'Transport', value: 19, color: '#D97706' },
  { label: 'Waste Mgmt', value: 16, color: '#7C3AED' },
  { label: 'Air Quality', value: 15, color: '#059669' },
];

export const AI_INSIGHTS = [
  { icon: 'Zap', bg: '#EFF6FF', title: 'Dubai EV adoption +22%', body: 'Nudge campaign exceeded targets. Recommend expanding to Sharjah corridor for Q3.', time: '2 min ago · High priority' },
  { icon: 'Droplets', bg: '#FEF3C7', title: 'Water spike - Abu Dhabi Industrial Zone', body: '15% above baseline detected. 4,200 targeted nudges dispatched. AI monitoring response.', time: '18 min ago · Medium priority' },
  { icon: 'Trophy', bg: '#ECFDF5', title: 'Ramadan Energy Challenge - 94.2% participation', body: 'Highest engagement ever recorded. Behavior sustained 3 weeks post-challenge.', time: '1 hour ago · Completed' },
  { icon: 'Sun', bg: '#FFF7ED', title: 'Sharjah solar installs exceed target by 34%', body: 'Incentive nudge triggered 2.1x install rate. ROI: 18:1 on campaign spend.', time: '3 hours ago · Completed' },
];

export const POLICY_DATA = {
  water: { label: 'Water Conservation Challenge', water: 4.3, energy: 118, carbon: 2.3, users: 89 },
  energy: { label: 'Energy Efficiency Drive', water: 1.2, energy: 890, carbon: 12.4, users: 142 },
  transport: { label: 'Green Transport Initiative', water: 0.8, energy: 340, carbon: 8.9, users: 210 },
  waste: { label: 'Zero Waste Campaign', water: 2.1, energy: 220, carbon: 4.2, users: 76 },
  solar: { label: 'Solar Adoption Program', water: 0.6, energy: 1400, carbon: 18.6, users: 34 },
  carbon: { label: 'Carbon Neutral Buildings', water: 3.4, energy: 560, carbon: 9.8, users: 118 },
};

export type PolicyKey = keyof typeof POLICY_DATA;

export const ESG_ENV_BAR_DATA: ChartData<'bar'> = {
  labels: ['Energy', 'Transport', 'Buildings', 'Industry', 'Waste', 'Water'],
  datasets: [{
    data: [24.2, 18.6, 14.1, 10.8, 6.4, 4.3],
    backgroundColor: ['#065F46cc', '#059669cc', '#0284C7cc', '#D97706cc', '#7C3AEDcc', '#10B981cc'],
    borderRadius: 8,
  }],
};

export const ESG_MONTHLY_TREND: ChartData<'line'> = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    data: [580, 560, 545, 530, 510, 490, 480, 465, 450, 435, 420, 410],
    borderColor: '#065F46',
    backgroundColor: 'rgba(6,95,70,.08)',
    borderWidth: 2.5,
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointBackgroundColor: '#065F46',
    pointBorderColor: '#fff',
    pointBorderWidth: 1.5,
  }],
};

export const SOCIAL_DONUT_DATA: ChartData<'doughnut'> = {
  labels: ['Green Commuting', 'Energy Saving', 'Recycling', 'Water Saving', 'Other'],
  datasets: [{
    data: [28, 25, 22, 16, 9],
    backgroundColor: ['#065F46', '#0284C7', '#D97706', '#7C3AED', '#9CA3AF'],
    borderWidth: 0,
  }],
};
