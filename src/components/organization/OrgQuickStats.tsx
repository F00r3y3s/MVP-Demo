import React from 'react';
import { Cloud, Droplets, Zap, CheckCircle2, Users, TrendingUp } from 'lucide-react';
import OrgChart from './OrgChart';
import { ORG_KPI_DETAILS, type OrgKpiId } from '../../data/orgCommandCenter';
import { miniChartOptions } from './OrgCommandComponents';

const STATS = [
  { id: 'co2', label: 'CO₂ Reduced', value: '12,450', unit: 't', trend: '+8.4%', icon: Cloud, color: '#059669' },
  { id: 'water', label: 'Water Saved', value: '28.6M', unit: 'L', trend: '+6.1%', icon: Droplets, color: '#0284C7' },
  { id: 'energy', label: 'Energy Offset', value: '96.3', unit: 'GWh', trend: '+4.8%', icon: Zap, color: '#F59E0B' },
  { id: 'actions', label: 'Verified Actions', value: '1.84M', unit: '', trend: '+12.2%', icon: CheckCircle2, color: '#10B981' },
  { id: 'users', label: 'Active Users', value: '2.1M', unit: '', trend: '+7.6%', icon: Users, color: '#7C3AED' },
];

const OrgQuickStats: React.FC<{ onOpenMetric?: (id: OrgKpiId) => void }> = ({ onOpenMetric }) => {
  return (
    <div className="px-3.5 pt-1">
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1">
        {STATS.map(stat => {
          const Icon = stat.icon;
          const detail = ORG_KPI_DETAILS[stat.id as OrgKpiId];
          const sparklineData = {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
              data: detail.chart.slice(-5),
              borderColor: stat.color,
              backgroundColor: `${stat.color}16`,
              fill: true,
            }]
          };

          return (
            <button
              key={stat.id}
              type="button"
              onClick={() => onOpenMetric?.(stat.id as OrgKpiId)}
              className="h-[136px] shrink-0 snap-start overflow-hidden rounded-[18px] bg-white p-3 text-left shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_20px_rgba(15,23,42,0.06)] transition-transform active:scale-95"
              style={{ flexBasis: '132px', minWidth: '132px' }}
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${stat.color}12`, color: stat.color }}>
                  <Icon size={18} strokeWidth={2.6} />
                </div>
                <p className="min-w-0 text-[10px] font-black leading-tight text-slate-900">{stat.label}</p>
              </div>

              <div className="flex min-w-0 items-baseline gap-1">
                <span className="font-jakarta truncate text-[24px] font-black leading-none tracking-[-0.05em] text-slate-950">{stat.value}</span>
                {stat.unit && <span className="shrink-0 text-[13px] font-semibold text-slate-900">{stat.unit}</span>}
              </div>

              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="text-[11px] font-bold text-slate-500">{stat.id === 'users' ? 'This Week' : 'Today'}</p>
                <div className="flex items-center gap-1 text-[var(--forest-light)]">
                  <TrendingUp size={12} strokeWidth={3} />
                  <span className="text-[11px] font-black">{stat.trend.replace('+', '')}</span>
                </div>
              </div>
              <div className="mt-2 h-[32px]">
                <OrgChart kind="line" data={sparklineData} height={32} options={miniChartOptions} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrgQuickStats;
