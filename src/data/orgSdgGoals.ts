import { ORG_ALL_SDG_GOALS } from './orgCommandCenter';

export interface OrgSdgTask {
  title: string;
  status: 'active' | 'completed' | 'pending';
}

export interface OrgSdgGoal {
  number: number;
  name: string;
  color: string;
  icon: string;
  progress: number;
  description: string;
  activeTasks: OrgSdgTask[];
  completedTasks: OrgSdgTask[];
}

const goalMeta: Record<number, { icon: string; description: string; active: string[]; completed: string[] }> = {
  1: {
    icon: 'fa-hands-helping',
    description: 'Institutional programs reducing vulnerable household cost burdens and expanding access to sustainable infrastructure.',
    active: ['Green tariff assistance pilot', 'Low-income housing efficiency retrofits'],
    completed: ['Federal utility subsidy impact baseline'],
  },
  2: {
    icon: 'fa-utensils',
    description: 'Food security and waste-reduction initiatives across public facilities and national behavior campaigns.',
    active: ['Public canteen food-waste dashboard'],
    completed: ['National surplus food donation protocol', 'Ministry food waste audit'],
  },
  3: {
    icon: 'fa-heartbeat',
    description: 'Health and wellbeing outcomes tied to cleaner mobility, air quality, and workplace sustainability.',
    active: ['Active commute challenge for staff'],
    completed: ['Healthy buildings ventilation review', 'Air quality awareness campaign'],
  },
  4: {
    icon: 'fa-graduation-cap',
    description: 'Sustainability education, training, and capability-building for government teams and citizens.',
    active: ['Green literacy training for departments', 'School energy awareness toolkit'],
    completed: ['Sustainability reporting masterclass'],
  },
  5: {
    icon: 'fa-venus',
    description: 'Inclusive participation in sustainability leadership, committees, and national green programs.',
    active: ['Women in clean energy leadership cohort'],
    completed: ['Inclusive climate workshop series'],
  },
  6: {
    icon: 'fa-water',
    description: 'Water security, conservation, smart metering, and reuse programs supporting UAE resilience.',
    active: ['Smart irrigation rollout', 'Industrial water reuse monitoring'],
    completed: ['Facility leak detection sweep', 'Water-saving fixtures phase 1'],
  },
  7: {
    icon: 'fa-lightbulb',
    description: 'Clean energy capacity, efficiency standards, and renewable transition programs.',
    active: ['Solar capacity acceleration program', 'Federal building energy optimization'],
    completed: ['LED retrofit across priority facilities'],
  },
  8: {
    icon: 'fa-briefcase',
    description: 'Green jobs, sustainable procurement, and productive public-private transition programs.',
    active: ['Green procurement scorecard'],
    completed: ['Clean-tech supplier registry'],
  },
  9: {
    icon: 'fa-flask',
    description: 'Resilient infrastructure, smart grid adoption, EV charging, and innovation pilots.',
    active: ['EV charging network expansion', 'Smart grid coverage program'],
    completed: ['Infrastructure baseline model'],
  },
  10: {
    icon: 'fa-balance-scale',
    description: 'Equitable access to sustainability services, POD-friendly journeys, and inclusive program design.',
    active: ['POD-accessible services review'],
    completed: ['Inclusive digital services benchmark'],
  },
  11: {
    icon: 'fa-city',
    description: 'Sustainable cities, transport behavior, public infrastructure, and built environment performance.',
    active: ['Green commute nudge campaign', 'Public building retrofit plan'],
    completed: ['Urban mobility behavior index'],
  },
  12: {
    icon: 'fa-recycle',
    description: 'Responsible consumption, waste reduction, circular procurement, and public-sector reporting.',
    active: ['Zero paper reporting workflow'],
    completed: ['Recycling segregation rollout', 'Circular procurement guidelines'],
  },
  13: {
    icon: 'fa-leaf',
    description: 'Climate mitigation, adaptation, national emissions reduction, and behavior-change programs.',
    active: ['Net Zero 2050 behavior roadmap', 'Carbon reduction nudges'],
    completed: ['Climate risk readiness review'],
  },
  14: {
    icon: 'fa-fish',
    description: 'Marine protection campaigns and water-related infrastructure programs reducing coastal impact.',
    active: ['Coastal plastic reduction program'],
    completed: ['Marine litter awareness campaign', 'Harbor waste baseline'],
  },
  15: {
    icon: 'fa-tree',
    description: 'Land ecosystems, biodiversity, greening, and facility-level nature positive actions.',
    active: ['Native planting program'],
    completed: ['Paperless operations campaign', 'Facility landscape water audit'],
  },
  16: {
    icon: 'fa-scale-balanced',
    description: 'Transparent governance, reporting frameworks, policy alignment, and accountable program delivery.',
    active: ['ESG governance evidence room'],
    completed: ['GRI alignment checklist', 'Executive reporting cadence'],
  },
  17: {
    icon: 'fa-handshake',
    description: 'Partnerships with ministries, emirates, industry, NGOs, and academia to scale measurable impact.',
    active: ['Cross-emirate BCI working group'],
    completed: ['National sustainability partner network'],
  },
};

export const ORG_SDG_DETAILS: OrgSdgGoal[] = ORG_ALL_SDG_GOALS.map((goal, index) => {
  const number = index + 1;
  const meta = goalMeta[number];
  return {
    number,
    name: goal.name,
    color: goal.color,
    icon: meta.icon,
    progress: goal.progress,
    description: meta.description,
    activeTasks: meta.active.map(title => ({ title, status: 'active' as const })),
    completedTasks: meta.completed.map(title => ({ title, status: 'completed' as const })),
  };
});
