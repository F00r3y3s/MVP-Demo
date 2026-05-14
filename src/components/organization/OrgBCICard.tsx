import React from 'react';
import { ArrowRight, Info, TrendingUp } from 'lucide-react';
import OrgChart from './OrgChart';

const bciChartData = {
  labels: ['16 May', '', '17 May', '18 May', '19 May', '', '20 May'],
  datasets: [
    {
      label: 'BCI Index',
      data: [71.2, 72.5, 72.1, 73.2, 72.7, 74.1, 74.8],
      borderColor: '#10B981', // var(--forest-light)
      backgroundColor: 'rgba(16, 185, 129, 0.13)',
      borderWidth: 2.5,
      pointRadius: 4,
      pointBackgroundColor: '#10B981',
      pointBorderColor: '#fff',
      pointBorderWidth: 1.5,
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
      border: { color: '#E5E7EB' },
      ticks: { color: '#64748B', font: { size: 9, weight: 700 }, maxRotation: 0, autoSkip: false },
    },
    y: {
      display: false,
      min: 70.8,
      max: 75.2,
    },
  },
};

const OrgBCICard: React.FC<{ onInfo?: () => void; onOpen?: () => void }> = ({ onInfo, onOpen }) => {
  return (
    <div
      role={onOpen ? 'button' : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen}
      onKeyDown={event => {
        if (!onOpen) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
      className="group mx-3.5 mt-2 overflow-hidden rounded-[24px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.07),0_10px_28px_rgba(15,23,42,0.06)] transition-transform active:scale-[0.99]"
      aria-label={onOpen ? 'Open BCI index page' : undefined}
    >
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="truncate text-[12px] font-black uppercase tracking-tight text-slate-900">UAE Behavioral Change Index (BCI)</span>
            <button
              type="button"
              onClick={event => {
                event.stopPropagation();
                onInfo?.();
              }}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-50 active:scale-95"
              aria-label="About the BCI"
            >
              <Info size={13} className="text-slate-400" />
            </button>
          </div>
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              onOpen?.();
            }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[var(--forest-medium)] transition-transform group-hover:translate-x-0.5"
            aria-label="Open BCI index page"
          >
            <ArrowRight size={13} strokeWidth={2.8} />
          </button>
        </div>

        <div className="grid min-h-[148px] grid-cols-[0.45fr_0.55fr] items-center gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="font-jakarta text-[44px] font-black leading-none tracking-[-0.08em] text-[#12A05C]">74.8</div>
              <div className="h-11 w-px bg-slate-100" />
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[#12A05C]">
                  <TrendingUp size={18} strokeWidth={3} />
                  <span className="text-[17px] font-black leading-none">+3.2%</span>
                </div>
                <span className="text-[13px] font-semibold text-slate-500">vs yesterday</span>
              </div>
            </div>

            <p className="mt-4 text-[13px] font-semibold leading-6 text-slate-500">Progress toward national sustainability goals</p>
          </div>

          <div className="min-w-0 pt-2">
            <OrgChart kind="line" data={bciChartData} height={126} options={lightOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgBCICard;
