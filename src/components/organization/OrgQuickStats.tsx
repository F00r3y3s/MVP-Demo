import React from 'react';
import { Cloud, Droplets, Zap, CheckCircle2, Users, TrendingUp } from 'lucide-react';
import OrgChart from './OrgChart';
import { ORG_KPI_DETAILS, type OrgKpiId } from '../../data/orgCommandCenter';
import { miniChartOptions } from './OrgCommandComponents';

const STATS = [
  { id: 'co2', label: 'CO₂ Reduced', value: '12,450', unit: 't', trend: '+8.4%', icon: Cloud, color: 'text-slate-500', bg: 'bg-slate-100' },
  { id: 'water', label: 'Water Saved', value: '28.6M', unit: 'L', trend: '+6.1%', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'energy', label: 'Energy Offset', value: '96.3', unit: 'GWh', trend: '+4.8%', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'actions', label: 'Verified Actions', value: '1.84M', unit: '', trend: '+12.2%', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'users', label: 'Active Users', value: '2.1M', unit: '', trend: '+7.6%', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
];

const OrgQuickStats: React.FC<{ onOpenMetric?: (id: OrgKpiId) => void }> = ({ onOpenMetric }) => {
  return (
    <div className="px-3.5 pt-2">
      <div className="grid grid-cols-5 gap-1.5">
        {STATS.map(stat => {
          const Icon = stat.icon;
          const detail = ORG_KPI_DETAILS[stat.id as OrgKpiId];
          const sparklineData = {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
              data: detail.chart.slice(-5),
              borderColor: detail.color,
              backgroundColor: `${detail.color}14`,
              fill: false,
            }]
          };

          return (
            <button
              key={stat.id}
              type="button"
              onClick={() => onOpenMetric?.(stat.id as OrgKpiId)}
              className="min-w-0 overflow-hidden rounded-xl bg-white p-2 text-left shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.06)] transition-transform active:scale-95"
            >
              <div className="mb-1.5">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <Icon size={13} strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="inline-flex items-center bg-emerald-50 text-[var(--forest-medium)] rounded-full px-1.5 py-0.5 mb-1">
                <TrendingUp size={8} strokeWidth={3} />
                <span className="text-[7.5px] font-black">{stat.trend.replace('+', '')}</span>
              </div>
              <p className="text-[7.5px] font-black uppercase text-slate-400 leading-tight min-h-[18px]">{stat.label}</p>
              
              <div className="flex items-baseline gap-0.5 my-0.5 min-w-0">
                <span className="font-black text-[13px] text-slate-900 font-jakarta leading-none truncate">{stat.value}</span>
                {stat.unit && <span className="text-[7px] font-bold text-slate-500 shrink-0">{stat.unit}</span>}
              </div>

              <p className="text-[7.5px] text-slate-400 font-semibold">{stat.id === 'users' ? 'This Week' : 'Today'}</p>
              <div className="h-[26px] mt-1">
                <OrgChart kind="line" data={sparklineData} height={26} options={miniChartOptions} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrgQuickStats;
