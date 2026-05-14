import React, { useState } from 'react';
import { ArrowRight, Map } from 'lucide-react';
import { ORG_EMIRATES } from '../../data/orgCommandCenter';
import { UaeMiniMap } from './OrgCommandComponents';

const OrgEmiratesPerformance: React.FC<{ onOpenMap?: () => void }> = ({ onOpenMap }) => {
  const topEmirates = ORG_EMIRATES.slice(0, 3);
  const [activeEmirate, setActiveEmirate] = useState(topEmirates[0]?.name ?? ORG_EMIRATES[0]?.name);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.06)]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-[11px] font-bold leading-tight text-slate-900">Emirate Performance (BCI)</h3>
        <button
          type="button"
          onClick={onOpenMap}
          className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-[var(--forest-medium)] active:scale-95"
        >
          <Map size={11} />
          Map
        </button>
      </div>

      <div className="mb-2 rounded-2xl bg-[#F8FAFC] px-1 py-1">
        <UaeMiniMap compact highlightedName={activeEmirate} onSelect={setActiveEmirate} />
      </div>

      <div className="space-y-1">
        {topEmirates.map(emirate => (
          <button
            key={emirate.name}
            type="button"
            onClick={() => setActiveEmirate(emirate.name)}
            className={`flex w-full items-center gap-1.5 rounded-xl px-2 py-1 text-left active:scale-[0.99] transition-all ${
              activeEmirate === emirate.name ? 'bg-emerald-50' : 'bg-transparent'
            }`}
          >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: emirate.color }} />
              <span className="min-w-0 flex-1 truncate text-[9px] font-bold text-slate-700">{emirate.name}</span>
              <span className="w-8 text-right text-[10px] font-black" style={{ color: emirate.color }}>{emirate.score}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={onOpenMap}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-[10px] font-black text-[var(--forest-medium)] active:scale-[0.99]"
        >
          View All Emirates
          <ArrowRight size={13} strokeWidth={2.6} />
        </button>
      </div>
    </div>
  );
};

export default OrgEmiratesPerformance;
