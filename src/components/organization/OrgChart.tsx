import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { ChartKind } from '../../types';

// Selective registration — keeps bundle ~30KB gz, avoids chart.js/auto
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
);

interface OrgChartProps {
  kind: ChartKind;
  data: ChartData<any>;
  height?: number;
  options?: ChartOptions<any>;
}

const FOREST_COLORS = {
  light:  '#4A7C59',
  deep:   '#2C5F2E',
  teal:   '#2C5F68',
  muted:  'rgba(255,255,255,0.12)',
  text:   'rgba(255,255,255,0.55)',
};

const baseOptions: ChartOptions<any> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 600,
  },
  plugins: {
    legend: {
      labels: {
        color: FOREST_COLORS.text,
        font: { family: "'Plus Jakarta Sans', sans-serif", size: 10, weight: '600' },
        boxWidth: 12,
        padding: 12,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(20,30,25,0.92)',
      titleColor: '#fff',
      bodyColor: 'rgba(255,255,255,0.75)',
      borderColor: FOREST_COLORS.light,
      borderWidth: 1,
      padding: 10,
      cornerRadius: 10,
      titleFont: { family: "'Plus Jakarta Sans', sans-serif", weight: '700', size: 12 },
      bodyFont:  { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
    },
  },
  scales: {
    x: {
      grid: { color: FOREST_COLORS.muted },
      ticks: { color: FOREST_COLORS.text, font: { family: "'Plus Jakarta Sans', sans-serif", size: 9 } },
    },
    y: {
      grid: { color: FOREST_COLORS.muted },
      ticks: { color: FOREST_COLORS.text, font: { family: "'Plus Jakarta Sans', sans-serif", size: 9 } },
    },
  },
};

const radialOptions: ChartOptions<'radar'> = {
  ...baseOptions,
  scales: {
    r: {
      grid: { color: FOREST_COLORS.muted },
      angleLines: { color: FOREST_COLORS.muted },
      ticks: { display: false },
      pointLabels: {
        color: FOREST_COLORS.text,
        font: { family: "'Plus Jakarta Sans', sans-serif", size: 9, weight: '600' },
      },
    },
  },
};

const doughnutOptions: ChartOptions<'doughnut'> = {
  ...baseOptions,
  scales: {},
  cutout: '68%',
};

const OrgChart: React.FC<OrgChartProps> = ({ kind, data, height = 220, options }) => {
  const mergedOptions = { ...baseOptions, ...options };

  try {
    switch (kind) {
      case 'line':
        return <div style={{ height }}><Line data={data} options={mergedOptions} /></div>;
      case 'bar':
        return <div style={{ height }}><Bar data={data} options={mergedOptions} /></div>;
      case 'doughnut':
        return <div style={{ height }}><Doughnut data={data} options={{ ...doughnutOptions, ...options }} /></div>;
      case 'radar':
        return <div style={{ height }}><Radar data={data} options={{ ...radialOptions, ...options }} /></div>;
      default:
        throw new Error(`Unsupported chart kind: ${kind}`);
    }
  } catch (err) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-center"
        style={{ height }}
      >
        <span className="text-2xl mb-2">📊</span>
        <p className="text-xs text-[var(--text-muted)] font-semibold">Chart unavailable</p>
      </div>
    );
  }
};

export default OrgChart;
