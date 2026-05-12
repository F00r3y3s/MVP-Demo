import React from 'react';
import { Info, TrendingUp } from 'lucide-react';
import OrgChart from './OrgChart';

const bciChartData = {
  labels: ['16 May', '17 May', '18 May', '19 May', '20 May'],
  datasets: [
    {
      label: 'BCI Index',
      data: [71.2, 72.5, 72.8, 73.5, 74.8],
      borderColor: '#10B981', // var(--forest-light)
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#10B981',
      fill: true,
      tension: 0.4,
    },
  ],
};

const lightOptions = {
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.95)',
      titleColor: '#0F172A',
      bodyColor: '#475569',
      borderColor: '#E2E8F0',
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#94A3B8' },
    },
    y: {
      grid: { color: '#F1F5F9' },
      ticks: { color: '#94A3B8' },
      min: 70,
      max: 76,
    },
  },
};

const OrgBCICard: React.FC<{ onInfo?: () => void }> = ({ onInfo }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.06)] mx-3.5 mt-2 overflow-hidden">
      <div className="p-3.5 flex gap-2 items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap mb-1">
            <span className="text-[8.5px] font-black uppercase text-slate-400">🇦🇪 UAE Behavioral Change Index (BCI)</span>
            <button
              type="button"
              onClick={onInfo}
              className="w-4 h-4 rounded-full bg-[#EEF2EF] flex items-center justify-center active:scale-95"
              aria-label="About the BCI"
            >
              <Info size={10} className="text-slate-400" />
            </button>
          </div>

          <div className="font-black text-[48px] text-[var(--forest-medium)] font-jakarta leading-none">74.8</div>

          <div className="flex items-center gap-1.5 mt-1 mb-1">
            <div className="inline-flex items-center gap-1 text-[var(--forest-medium)] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp size={12} strokeWidth={3} />
              <span className="text-[10px] font-black">+3.2%</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400">vs yesterday</span>
          </div>

          <p className="text-[10px] font-semibold text-slate-400 leading-snug">Progress toward national 2030 sustainability goals</p>
        </div>

        <div className="w-[118px] shrink-0 flex flex-col items-end">
          <div className="w-full rounded-[9px] bg-[#EEF2EF] text-center py-1.5 mb-1">
            <div className="text-base font-black text-slate-900 leading-none">85.0</div>
            <div className="text-[8px] font-bold text-slate-400">2030 Target</div>
          </div>
          <div className="text-right mb-1">
            <div className="text-[9px] text-slate-400 font-semibold">On Track</div>
            <div className="text-[10px] text-[var(--forest-medium)] font-black">✓ 4.2 yrs left</div>
          </div>
          <div className="w-full">
            <OrgChart kind="line" data={bciChartData} height={68} options={lightOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgBCICard;
