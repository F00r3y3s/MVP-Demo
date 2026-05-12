import React from 'react';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { ScreenName } from '../../types';
import OrgChart from '../../components/organization/OrgChart';
import Skeleton from '../../components/organization/Skeleton';
import { ORG_WIDGETS } from '../../data/orgWidgetRegistry';
import { useOrgDetailNavigation } from '../../context/OrgDetailNavigator';
import { useDelayedReady } from '../../hooks/useDelayedReady';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  'on-track': { bg: 'bg-[var(--forest-light)]/15', text: 'text-[var(--forest-light)]', label: 'On Track' },
  ahead:      { bg: 'bg-emerald-500/15',            text: 'text-emerald-400',            label: 'Ahead'    },
  watch:      { bg: 'bg-amber-500/15',              text: 'text-amber-400',              label: 'Watch'    },
  risk:       { bg: 'bg-rose-500/15',               text: 'text-rose-400',               label: 'Risk'     },
};

const OrgWidgetDetail: React.FC<Props> = ({ onBack }) => {
  const { activeFrame, popDetail } = useOrgDetailNavigation();
  const ready = useDelayedReady(300);

  const widgetId = activeFrame?.params?.widgetId;
  const widget = ORG_WIDGETS.find(w => w.id === widgetId);

  const handleBack = () => {
    popDetail();
  };

  if (!widget) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 bg-[var(--bg-primary)]">
        <span className="text-3xl">🔍</span>
        <p className="text-sm font-bold text-[var(--text-muted)]">Widget not found</p>
        <button onClick={handleBack} className="px-6 py-3 rounded-xl bg-[var(--forest-light)]/20 text-[var(--forest-light)] font-bold text-sm active:scale-95 transition">
          Go Back
        </button>
      </div>
    );
  }

  const status = STATUS_STYLES[widget.status] ?? STATUS_STYLES['on-track'];

  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4 border-b border-white/8">
        <button
          onClick={handleBack}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition"
          aria-label="Back"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="font-black text-lg text-[var(--text-primary)] font-jakarta">{widget.label}</h1>
          <p className="text-[10px] text-[var(--text-muted)]">{widget.unit} · {widget.ownerTeam}</p>
        </div>
        <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-full ${status.bg} ${status.text}`}>
          {status.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-5 space-y-5 pb-8">
        {!ready ? (
          <>
            <Skeleton height={220} rounded="rounded-2xl" />
            <div className="grid grid-cols-2 gap-3">
              {[1,2,3,4].map(i => <Skeleton key={i} height={70} rounded="rounded-xl" />)}
            </div>
          </>
        ) : (
          <>
            {/* Primary Chart */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-4">{widget.label} Trend</p>
              <OrgChart kind={widget.detail.chart.kind} data={widget.detail.chart.data} height={220} />
            </div>

            {/* KPI Tile Grid */}
            <div className="grid grid-cols-2 gap-3">
              {widget.detail.kpis.map(kpi => (
                <div key={kpi.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-[9px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-1">{kpi.label}</p>
                  <p className="font-black text-sm text-[var(--text-primary)]">{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Drill List */}
            {widget.detail.drillList && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  {widget.detail.drillList.title}
                </p>
                <div className="space-y-2">
                  {widget.detail.drillList.rows.map(row => (
                    <div key={row.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-sm font-semibold text-[var(--text-secondary)]">{row.name}</span>
                      <span className="font-black text-sm text-[var(--text-primary)]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Action */}
            <div className="rounded-2xl bg-[var(--forest-deep)] p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Next Action</p>
              <p className="text-sm text-white/90 leading-relaxed font-medium">{widget.detail.nextAction}</p>
              <button className="mt-3 flex items-center gap-2 text-[var(--forest-light)] text-xs font-black uppercase tracking-wider active:scale-95 transition">
                <span>Take Action</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrgWidgetDetail;
