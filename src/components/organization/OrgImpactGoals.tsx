import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ScreenName } from '../../types';
import { ORG_SDG_GOALS } from '../../data/orgCommandCenter';

const OrgImpactGoals: React.FC<{ onNavigate?: (screen: ScreenName) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.06)] h-full flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="text-[11px] font-bold text-slate-900">Global Impact Goals</h3>
          <p className="text-[9px] text-slate-400 font-semibold mt-0.5">3/17 Achieved</p>
        </div>
        <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">Active</span>
      </div>

      <div className="space-y-2 flex-1">
        {ORG_SDG_GOALS.map(sdg => (
          <div key={sdg.id}>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-[15px] h-[15px] rounded-[4px] flex items-center justify-center text-[7px] font-black text-white shrink-0" style={{ backgroundColor: sdg.color }}>
              {sdg.id}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 text-[9px] font-bold">
                  <span className="text-slate-600 truncate">{sdg.name}</span>
                  <span className="text-slate-700 shrink-0">{sdg.progress}%</span>
                </div>
              </div>
            </div>
            <div className="h-1 rounded-full bg-[#EEF2EF] overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ width: `${sdg.progress}%`, backgroundColor: sdg.color }} 
              />
              </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onNavigate?.(ScreenName.ORG_ESG_REPORTS)}
        className="flex items-center gap-1.5 mt-3 text-[10px] font-bold text-[var(--forest-medium)] group w-full justify-center h-8 border-t border-slate-100 pt-2 active:scale-[0.98] transition-all"
      >
        View all SDG progress
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};

export default OrgImpactGoals;
