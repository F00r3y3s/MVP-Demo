import React, { useState } from 'react';
import { ChevronLeft, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenName } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';
import bg1 from '../../../flow-backgrounds/Minimal_lineart_skyline_inspired_by_sheikh_zayed_g_delpmaspu.png';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
}

const StepIndicator: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div className="flex gap-1.5">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1 rounded-full transition-all duration-300 ${
          i < current ? 'bg-[var(--forest-light)]' : i === current - 1 ? 'bg-[var(--forest-light)] w-8' : 'bg-white/20 w-4'
        }`}
        style={{ width: i === current - 1 ? 32 : 16 }}
      />
    ))}
  </div>
);

const TagChip: React.FC<{ label: string; onAdd: () => void }> = ({ label, onAdd }) => (
  <button
    onClick={onAdd}
    className="px-3 py-1.5 rounded-full bg-[var(--forest-light)]/15 border border-[var(--forest-light)]/30 text-[10px] font-semibold text-[var(--forest-light)] active:scale-95 transition"
  >
    + {label}
  </button>
);

const FieldTag: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--forest-light)]/20 text-[10px] font-semibold text-[var(--forest-light)] max-w-full">
    <span className="truncate">{label}</span>
    <button onClick={onRemove} className="shrink-0"><X size={10} /></button>
  </span>
);

const OrgOnboardingStrategicGoals: React.FC<Props> = ({ onNavigate, onBack }) => {
  const { selectedEntity, setOnboarding, onboarding } = useOrgRoute();

  const [dream, setDream] = useState(onboarding.strategicDream || '');
  const [goals, setGoals] = useState<string[]>(onboarding.impactGoals || []);
  const [wishes, setWishes] = useState<string[]>(onboarding.operationalWishes || []);
  const [goalInput, setGoalInput] = useState('');
  const [wishInput, setWishInput] = useState('');

  const mandateSuggestions = selectedEntity?.mandates ?? [
    'Achieve Net Zero by 2050', 'Advance circular economy', 'Embed ESG in operations',
    'Empower community sustainability', 'Enhance biodiversity stewardship',
  ];

  const addGoal = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || goals.length >= 2) return;
    setGoals(g => [...g, trimmed]);
    setGoalInput('');
  };

  const addWish = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || wishes.length >= 3) return;
    setWishes(w => [...w, trimmed]);
    setWishInput('');
  };

  const addDreamSuggestion = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setDream(current => {
      const existing = current.trim();
      if (!existing) return trimmed;
      if (existing.includes(trimmed)) return current;
      return `${existing}; ${trimmed}`;
    });
  };

  const handleNext = () => {
    setOnboarding({ strategicDream: dream, impactGoals: goals, operationalWishes: wishes });
    onNavigate(ScreenName.ORG_ONBOARDING_AREAS);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
        style={{ backgroundImage: `url(${bg1})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-[var(--bg-primary)]/70 to-[var(--bg-primary)] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-12 pb-4 flex items-center justify-between">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition" aria-label="Back">
            <ChevronLeft size={18} />
          </button>
          <StepIndicator current={1} total={3} />
          <div className="w-9" />
        </div>

        <div className="px-5 mb-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--forest-light)] mb-1">Step 1 of 3</p>
          <h1 className="text-2xl font-black text-[var(--text-primary)] font-jakarta leading-tight">Strategic Impact Goals</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1 uppercase tracking-widest font-semibold">DESIGN YOUR ENTITY'S FUTURE</p>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4 space-y-5">
          {/* Strategic Dream */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-2 block">Strategic Dream <span className="text-rose-400">*</span></label>
            <textarea
              value={dream}
              onChange={e => setDream(e.target.value)}
              placeholder="In 10 years, our entity will have…"
              rows={3}
              className="w-full bg-white/8 border border-white/15 rounded-2xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none outline-none focus:border-[var(--forest-light)]/60 transition"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {mandateSuggestions.slice(0, 3).map(m => (
                <TagChip key={m} label={m} onAdd={() => addDreamSuggestion(m)} />
              ))}
            </div>
          </div>

          {/* Long-horizon Goals */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-2 block">Long-Horizon Impact Goals ({goals.length}/2)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              <AnimatePresence>
                {goals.map((g, i) => (
                  <motion.div key={g + i} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <FieldTag label={g} onRemove={() => setGoals(prev => prev.filter((_, j) => j !== i))} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {goals.length < 2 && (
              <div className="flex gap-2">
                <input
                  value={goalInput}
                  onChange={e => setGoalInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addGoal(goalInput)}
                  placeholder="Add a goal…"
                  className="flex-1 bg-white/8 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--forest-light)]/60 transition"
                />
                <button onClick={() => addGoal(goalInput)} className="w-10 h-10 rounded-xl bg-[var(--forest-light)]/20 flex items-center justify-center text-[var(--forest-light)] active:scale-95 transition">
                  <Plus size={16} />
                </button>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {mandateSuggestions.slice(3).map(m => (
                <TagChip key={m} label={m} onAdd={() => addGoal(m)} />
              ))}
            </div>
          </div>

          {/* Operational Wishes */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-2 block">Operational Wishes ({wishes.length}/3)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              <AnimatePresence>
                {wishes.map((w, i) => (
                  <motion.div key={w + i} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <FieldTag label={w} onRemove={() => setWishes(prev => prev.filter((_, j) => j !== i))} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {wishes.length < 3 && (
              <div className="flex gap-2">
                <input
                  value={wishInput}
                  onChange={e => setWishInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addWish(wishInput)}
                  placeholder="Add an operational wish…"
                  className="flex-1 bg-white/8 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--forest-light)]/60 transition"
                />
                <button onClick={() => addWish(wishInput)} className="w-10 h-10 rounded-xl bg-[var(--forest-light)]/20 flex items-center justify-center text-[var(--forest-light)] active:scale-95 transition">
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Next */}
        <div className="p-5">
          <button
            onClick={handleNext}
            disabled={!dream.trim()}
            className="w-full h-14 rounded-2xl bg-[var(--forest-deep)] text-white font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrgOnboardingStrategicGoals;
