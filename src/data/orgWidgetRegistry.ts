import { OrgWidget } from '../types';

const forestGreen = '#2C5F2E';
const forestLight = '#4A7C59';
const teal = '#2C5F68';
const amber = '#D97706';
const rose = '#E11D48';

const LABELS_QUARTER = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'];
const LABELS_MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const ORG_WIDGETS: OrgWidget[] = [
  {
    id: 'carbon',
    label: 'Carbon',
    unit: 'ktCO₂e',
    currentValue: '142.3',
    trend: '−8.4%',
    status: 'on-track',
    ownerTeam: 'Climate Office',
    miniChart: { kind: 'line', series: [180, 172, 165, 158, 150, 142] },
    detail: {
      chart: {
        kind: 'line',
        data: {
          labels: LABELS_QUARTER,
          datasets: [
            {
              label: 'Scope 1+2 Emissions (ktCO₂e)',
              data: [180, 172, 165, 158, 150, 142],
              borderColor: forestLight,
              backgroundColor: `${forestLight}22`,
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Target Path',
              data: [180, 169, 158, 148, 138, 128],
              borderColor: amber,
              borderDash: [6, 3],
              backgroundColor: 'transparent',
              tension: 0.4,
            },
          ],
        },
      },
      kpis: [
        { label: 'Scope 1', value: '68.2 ktCO₂e' },
        { label: 'Scope 2', value: '74.1 ktCO₂e' },
        { label: 'vs. Target', value: '−5.6%' },
        { label: 'Offset Credits', value: '12.4 kt' },
      ],
      drillList: {
        title: 'TOP 5 EMITTING DEPARTMENTS',
        rows: [
          { id: 'fac', name: 'Facilities & Operations', value: '41.2 ktCO₂e' },
          { id: 'fleet', name: 'Fleet & Transport', value: '28.7 ktCO₂e' },
          { id: 'data', name: 'Data Centres', value: '22.1 ktCO₂e' },
          { id: 'mfg', name: 'Manufacturing', value: '19.8 ktCO₂e' },
          { id: 'proc', name: 'Procurement', value: '14.4 ktCO₂e' },
        ],
      },
      nextAction: 'Commission Q3 energy audit to unlock next 8% reduction; target Facilities & Operations first.',
    },
  },
  {
    id: 'energy',
    label: 'Energy',
    unit: 'GWh',
    currentValue: '318.7',
    trend: '−12.1%',
    status: 'ahead',
    ownerTeam: 'Energy & Utilities',
    miniChart: { kind: 'bar', series: [360, 348, 338, 330, 325, 318] },
    detail: {
      chart: {
        kind: 'bar',
        data: {
          labels: LABELS_QUARTER,
          datasets: [
            {
              label: 'Total Energy (GWh)',
              data: [360, 348, 338, 330, 325, 318],
              backgroundColor: forestGreen,
              borderRadius: 8,
            },
            {
              label: 'Renewable (GWh)',
              data: [40, 55, 70, 90, 110, 135],
              backgroundColor: `${forestLight}99`,
              borderRadius: 8,
            },
          ],
        },
      },
      kpis: [
        { label: 'Renewable Share', value: '42.4%' },
        { label: 'Intensity', value: '0.81 kWh/m²' },
        { label: 'Peak Demand', value: '1.2 GW' },
        { label: 'Savings (YTD)', value: 'AED 4.2M' },
      ],
      drillList: {
        title: 'TOP CONSUMERS BY BUILDING',
        rows: [
          { id: 'hq', name: 'HQ Tower', value: '82 GWh' },
          { id: 'dc1', name: 'Data Centre 1', value: '61 GWh' },
          { id: 'campus', name: 'Training Campus', value: '48 GWh' },
          { id: 'factory', name: 'Production Facility A', value: '44 GWh' },
          { id: 'retail', name: 'Retail Portfolio', value: '38 GWh' },
        ],
      },
      nextAction: 'Accelerate PPA signing for 2026 to push renewable share past 60% threshold.',
    },
  },
  {
    id: 'water',
    label: 'Water',
    unit: 'ML',
    currentValue: '892',
    trend: '−6.2%',
    status: 'on-track',
    ownerTeam: 'Facilities Management',
    miniChart: { kind: 'bar', series: [950, 940, 928, 918, 905, 892] },
    detail: {
      chart: {
        kind: 'bar',
        data: {
          labels: LABELS_MONTH,
          datasets: [
            {
              label: 'Potable Water (ML)',
              data: [162, 155, 151, 148, 141, 135],
              backgroundColor: teal,
              borderRadius: 6,
            },
            {
              label: 'Recycled Water (ML)',
              data: [8, 10, 12, 14, 16, 18],
              backgroundColor: `${teal}66`,
              borderRadius: 6,
            },
          ],
        },
      },
      kpis: [
        { label: 'Recycled %', value: '11.8%' },
        { label: 'Intensity', value: '1.42 L/m²/day' },
        { label: 'Leak Losses', value: '2.3%' },
        { label: 'Savings (YTD)', value: '58 ML' },
      ],
      nextAction: 'Deploy smart metering across remaining 40% of estate to close leak detection gap.',
    },
  },
  {
    id: 'waste',
    label: 'Waste',
    unit: '% diverted',
    currentValue: '73.4',
    trend: '+9.2pp',
    status: 'on-track',
    ownerTeam: 'Operations & Logistics',
    miniChart: { kind: 'doughnut', series: [73, 12, 15] },
    detail: {
      chart: {
        kind: 'doughnut',
        data: {
          labels: ['Recycled', 'Composted', 'Landfill'],
          datasets: [
            {
              data: [58, 15, 27],
              backgroundColor: [forestLight, teal, '#CBD5E1'],
              borderWidth: 0,
            },
          ],
        },
      },
      kpis: [
        { label: 'Total Waste', value: '4 820 t' },
        { label: 'Recycled', value: '2 797 t' },
        { label: 'Composted', value: '723 t' },
        { label: 'Landfill', value: '1 300 t' },
      ],
      drillList: {
        title: 'WASTE BY CATEGORY',
        rows: [
          { id: 'gen', name: 'General / Dry Recyclables', value: '2 797 t' },
          { id: 'food', name: 'Food & Organic', value: '1 100 t' },
          { id: 'haz', name: 'Hazardous', value: '210 t' },
          { id: 'const', name: 'Construction & Demolition', value: '713 t' },
        ],
      },
      nextAction: 'Launch food-waste composting contract for campus cafeterias — target 200 t/yr diversion.',
    },
  },
  {
    id: 'engagement',
    label: 'Employee Engagement',
    unit: '%',
    currentValue: '67.3',
    trend: '+4.1pp',
    status: 'watch',
    ownerTeam: 'People & Culture',
    miniChart: { kind: 'radar', series: [67, 72, 58, 80, 65] },
    detail: {
      chart: {
        kind: 'radar',
        data: {
          labels: ['Awareness', 'Participation', 'Behaviour Change', 'Leadership Support', 'Innovation'],
          datasets: [
            {
              label: 'Current Score',
              data: [78, 67, 58, 82, 60],
              backgroundColor: `${forestLight}33`,
              borderColor: forestLight,
            },
            {
              label: 'Industry Benchmark',
              data: [72, 65, 70, 78, 68],
              backgroundColor: `${teal}22`,
              borderColor: teal,
              borderDash: [4, 4],
            },
          ],
        },
      },
      kpis: [
        { label: 'Survey Participation', value: '82%' },
        { label: 'Green Champions', value: '144' },
        { label: 'Initiatives Submitted', value: '38' },
        { label: 'Training Completions', value: '1 240' },
      ],
      nextAction: 'Close Behaviour Change gap: launch 30-day Green Habits challenge across all departments.',
    },
  },
  {
    id: 'esg',
    label: 'ESG Score',
    unit: '/100',
    currentValue: '72',
    trend: '+6pts',
    status: 'ahead',
    ownerTeam: 'Sustainability & Reporting',
    miniChart: { kind: 'doughnut', series: [72, 28] },
    detail: {
      chart: {
        kind: 'line',
        data: {
          labels: ['2022', '2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
          datasets: [
            {
              label: 'ESG Score',
              data: [54, 61, 64, 66, 68, 70, 72],
              borderColor: forestLight,
              backgroundColor: `${forestLight}22`,
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Sector Average',
              data: [55, 58, 60, 61, 62, 63, 64],
              borderColor: amber,
              borderDash: [6, 3],
              backgroundColor: 'transparent',
              tension: 0.4,
            },
          ],
        },
      },
      kpis: [
        { label: 'Environment', value: '68/100' },
        { label: 'Social', value: '74/100' },
        { label: 'Governance', value: '77/100' },
        { label: 'vs. Sector Avg', value: '+8pts' },
      ],
      nextAction: 'Publish TCFD-aligned climate disclosure to push E-pillar score past 75 by year-end.',
    },
  },
];
