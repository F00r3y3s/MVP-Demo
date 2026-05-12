import React from 'react';
import { Map } from 'lucide-react';
import { ORG_EMIRATES } from '../../data/orgCommandCenter';
import { UaeMiniMap } from './OrgCommandComponents';

const OrgEmiratesPerformance: React.FC<{ onOpenMap?: () => void }> = ({ onOpenMap }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.06)]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-[11px] font-bold leading-tight text-slate-900">Emirates Performance (BCI)</h3>
        <button
          type="button"
          onClick={onOpenMap}
          className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-[var(--forest-medium)] active:scale-95"
        >
          <Map size={11} />
          Map
        </button>
      </div>

      <div className="grid flex-1 grid-cols-[minmax(0,1fr)_92px] items-start gap-1">
        <div className="min-w-0 space-y-1">
          {ORG_EMIRATES.map(emirate => (
            <button key={emirate.name} type="button" onClick={onOpenMap} className="flex w-full items-center gap-1.5 py-0.5 text-left active:scale-[0.99]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: emirate.color }} />
              <span className="min-w-0 flex-1 truncate text-[8.5px] font-bold text-slate-700">{emirate.name.split(' ')[0]}</span>
              <span className="w-7 text-right text-[9.5px] font-black" style={{ color: emirate.color }}>{emirate.score}</span>
            </button>
          ))}
        </div>
        <div className="w-[92px] shrink-0">
          <UaeMiniMap compact />
        </div>
      </div>
    </div>
  );
};

export default OrgEmiratesPerformance;
