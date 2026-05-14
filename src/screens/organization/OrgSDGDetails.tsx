import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ORG_SDG_DETAILS, type OrgSdgGoal } from '../../data/orgSdgGoals';

interface Props {
  onBack: () => void;
  initialGoalId?: number;
}

const OrgSDGDetails: React.FC<Props> = ({ onBack, initialGoalId }) => {
  const { simplifiedView } = useAccessibility();
  const [selectedSDG, setSelectedSDG] = useState<OrgSdgGoal | null>(
    initialGoalId ? ORG_SDG_DETAILS.find(goal => goal.number === initialGoalId) || null : null
  );

  return (
    <div className="relative flex h-full flex-col bg-[var(--bg-primary)]">
      <div className="z-10 bg-gradient-to-br from-[var(--forest-deep)] to-[var(--teal)] px-6 pb-8 pt-12 text-white shadow-lg">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 text-sm font-bold opacity-90 transition-opacity hover:opacity-100">
          <i className="fas fa-arrow-left" /> Back to Dashboard
        </button>
        <h1 className="font-jakarta mb-1 text-2xl font-bold">Global Goals</h1>
        <p className="text-sm opacity-85">Organizational progress across the 17 Sustainable Development Goals.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
        <div className="grid grid-cols-3 gap-4 pb-20">
          {ORG_SDG_DETAILS.map(goal => (
            <div
              key={goal.number}
              onClick={() => setSelectedSDG(goal)}
              className="group flex cursor-pointer flex-col items-center gap-2"
            >
              <div
                className="relative flex h-[85px] w-[85px] items-center justify-center overflow-hidden rounded-2xl text-3xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                style={{ backgroundColor: goal.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <div className="absolute left-2 top-1 text-xs font-bold opacity-60">{goal.number}</div>
                <i className={`fas ${goal.icon} relative z-10 drop-shadow-md`} />
                {!simplifiedView && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
                    <div className="h-full bg-white/80" style={{ width: `${goal.progress}%` }} />
                  </div>
                )}
              </div>
              <span className="max-w-[80px] text-center text-[10px] font-bold leading-tight text-[var(--text-secondary)]">{goal.name}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedSDG && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedSDG(null)}>
          <div
            className="flex h-[85vh] w-full max-w-md animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] flex-col overflow-hidden rounded-t-[32px] bg-[var(--bg-primary)]"
            onClick={event => event.stopPropagation()}
          >
            <div className="relative shrink-0 p-8 text-white" style={{ backgroundColor: selectedSDG.color }}>
              <button onClick={() => setSelectedSDG(null)} className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white transition-colors hover:bg-black/30">
                <i className="fas fa-times text-sm" />
              </button>

              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/20 text-3xl backdrop-blur-sm">
                  <i className={`fas ${selectedSDG.icon}`} />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest opacity-80">Goal {selectedSDG.number}</div>
                  <h2 className="text-2xl font-bold leading-tight">{selectedSDG.name}</h2>
                </div>
              </div>
              <p className="text-sm font-medium leading-relaxed opacity-90">{selectedSDG.description}</p>
            </div>

            <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] p-6">
              {!simplifiedView && (
                <div className="mb-6 rounded-[24px] border border-[var(--border-light)] bg-white p-5 shadow-sm">
                  <div className="mb-2 flex items-end justify-between">
                    <div className="text-sm font-bold text-[var(--text-secondary)]">Organization Progress</div>
                    <div className="text-2xl font-extrabold" style={{ color: selectedSDG.color }}>{selectedSDG.progress}%</div>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${selectedSDG.progress}%`, backgroundColor: selectedSDG.color }}
                    />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Active Programs</h3>
                {selectedSDG.activeTasks.length > 0 ? (
                  <div className="space-y-3">
                    {selectedSDG.activeTasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-3 rounded-xl border border-[var(--border-light)] bg-white p-3 shadow-sm">
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        <div className="flex-1 text-sm font-semibold text-[var(--text-primary)]">{task.title}</div>
                        <span className="rounded-md bg-green-50 px-2 py-1 text-[10px] font-bold text-[var(--forest-light)]">IN PROGRESS</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-sm text-gray-400">No active programs.</div>
                )}
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Completed Milestones</h3>
                <div className="space-y-3">
                  {selectedSDG.completedTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-xl border border-transparent bg-gray-50 p-3 opacity-80">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--forest-light)] text-[10px] text-white">
                        <i className="fas fa-check" />
                      </div>
                      <div className="flex-1 text-sm font-medium text-[var(--text-secondary)] line-through">{task.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border-light)] bg-white p-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold text-white shadow-lg transition-transform active:scale-95" style={{ backgroundColor: selectedSDG.color }}>
                View Organization Programs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgSDGDetails;
