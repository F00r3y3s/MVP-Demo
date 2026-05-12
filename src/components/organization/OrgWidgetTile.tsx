import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { OrgWidget, ScreenName } from '../../types';
import OrgChart from '../../components/organization/OrgChart';
import { useOrgDetailNavigation } from '../../context/OrgDetailNavigator';

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  'on-track': { bg: 'bg-[var(--forest-light)]/15', text: 'text-[var(--forest-light)]', label: 'On Track' },
  'ahead':    { bg: 'bg-emerald-500/15',            text: 'text-emerald-400',            label: 'Ahead'    },
  'watch':    { bg: 'bg-amber-500/15',              text: 'text-amber-400',              label: 'Watch'    },
  'risk':     { bg: 'bg-rose-500/15',               text: 'text-rose-400',               label: 'Risk'     },
};

interface Props {
  widget: OrgWidget;
}

const OrgWidgetTile: React.FC<Props> = ({ widget }) => {
  const { openWidgetDetail } = useOrgDetailNavigation();
  const status = STATUS_COLORS[widget.status] ?? STATUS_COLORS['on-track'];
  const isPositiveTrend = widget.trend.startsWith('+');
  const isNegativeTrend = widget.trend.startsWith('−') || widget.trend.startsWith('-');

  const TrendIcon = isPositiveTrend ? TrendingUp : isNegativeTrend ? TrendingDown : Minus;
  const trendColor = isNegativeTrend ? 'text-[var(--forest-light)]' : isPositiveTrend ? 'text-rose-400' : 'text-[var(--text-muted)]';

  // Build a mini sparkline dataset
  const miniData = {
    labels: widget.miniChart.series.map((_, i) => `${i}`),
    datasets: [
      {
        data: widget.miniChart.series,
        borderColor: '#4A7C59',
        backgroundColor: 'rgba(74,124,89,0.15)',
        fill: widget.miniChart.kind === 'line',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        borderRadius: widget.miniChart.kind === 'bar' ? 4 : undefined,
      },
    ],
  };

  const miniOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: { point: { radius: 0 } },
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={() => openWidgetDetail(widget.id)}
      className="w-full text-left rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col gap-3 hover:border-[var(--forest-light)]/30 transition-all active:bg-white/8"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">{widget.label}</p>
          <p className="text-xl font-black text-[var(--text-primary)] font-jakarta mt-0.5">{widget.currentValue}</p>
          <p className="text-[10px] text-[var(--text-muted)]">{widget.unit}</p>
        </div>
        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full shrink-0 ${status.bg} ${status.text}`}>
          {status.label}
        </span>
      </div>

      {/* Mini chart */}
      <div style={{ height: 50 }}>
        <OrgChart kind={widget.miniChart.kind} data={miniData as any} height={50} options={miniOptions as any} />
      </div>

      {/* Trend */}
      <div className="flex items-center gap-1.5">
        <TrendIcon size={12} className={trendColor} />
        <span className={`text-xs font-black ${trendColor}`}>{widget.trend}</span>
        <span className="text-[10px] text-[var(--text-muted)] ml-1">· {widget.ownerTeam}</span>
      </div>
    </motion.button>
  );
};

export default OrgWidgetTile;
