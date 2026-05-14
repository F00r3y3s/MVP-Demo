import React from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../../types';
import { ORG_SDG_DETAILS } from '../../data/orgSdgGoals';

const achievedGoals = ORG_SDG_DETAILS.filter(goal => goal.progress >= 75).length;

const OrgImpactGoals: React.FC<{ onNavigate?: (screen: ScreenName, params?: any) => void }> = ({ onNavigate }) => {
  return (
    <div
      onClick={() => onNavigate?.(ScreenName.ORG_SDG_DETAILS)}
      className="mx-3.5 rounded-[24px] border border-white bg-white/80 p-4 shadow-sm backdrop-blur-md cursor-pointer transition-all active:scale-[0.98]"
      role="button"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onNavigate?.(ScreenName.ORG_SDG_DETAILS);
        }
      }}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <h3 className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-800">
            <i className="fas fa-chart-column text-emerald-500" />
            Global Impact Goals
          </h3>
          <p className="mt-0.5 text-[8px] font-bold uppercase tracking-tighter text-slate-400">
            {achievedGoals}/17 Org Goals On Track
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 shadow-inner">
          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">Active</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-3 gap-y-2 px-0.5">
        {ORG_SDG_DETAILS.map(goal => (
          <div key={goal.number} className="relative flex h-1.5 w-full overflow-hidden rounded-full bg-gray-100/50">
            <div className="absolute inset-0 opacity-20" style={{ backgroundColor: goal.color }} />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${goal.progress}%` }}
              className="relative h-full rounded-full"
              style={{ backgroundColor: goal.color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgImpactGoals;
