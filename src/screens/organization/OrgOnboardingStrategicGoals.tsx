import React, { useState } from 'react';
import { ChevronLeft, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenName } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';
import bg1 from '../../../whisk-backgrounds/6.jpeg';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
}

// ── Sub-components ────────────────────────────────────────────────────────────

const StepDots: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div className="flex gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className="h-2 rounded-full transition-all duration-500"
        style={{
          width: i === current - 1 ? 40 : 16,
          background: i < current ? 'var(--forest-light)' : 'rgba(0,0,0,0.12)',
          boxShadow: i === current - 1 ? '0 0 10px rgba(16,185,129,0.3)' : 'none',
        }}
      />
    ))}
  </div>
);

const SuggestionChip: React.FC<{ label: string; onAdd: () => void }> = ({ label, onAdd }) => (
  <button
    onClick={onAdd}
    aria-label={`+ ${label}`}
    className="px-3.5 py-2 rounded-full bg-white border border-gray-200 text-[10px] font-black text-slate-600 hover:border-[var(--forest-light)] hover:text-[var(--forest-light)] transition-all shadow-sm active:scale-95"
  >
    +{label}
  </button>
);

const FieldTag: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-black text-emerald-700 max-w-full shadow-sm">
    <span className="truncate">{label}</span>
    <button onClick={onRemove} className="shrink-0 text-emerald-400 hover:text-emerald-600">
      <X size={11} />
    </button>
  </span>
);

const SUGGESTIONS_PER_SELECTION = 3;

const getVisibleSuggestions = (suggestions: string[], selected: string[], startIndex: number) => {
  const available = suggestions.filter(suggestion => !selected.includes(suggestion));
  const visibleCount = Math.min(SUGGESTIONS_PER_SELECTION, available.length);

  return Array.from({ length: visibleCount }, (_, i) => available[(startIndex + i) % available.length]);
};

// ── Main ──────────────────────────────────────────────────────────────────────

const OrgOnboardingStrategicGoals: React.FC<Props> = ({ onNavigate, onBack }) => {
  const { selectedEntity, setOnboarding, onboarding } = useOrgRoute();

  const [dream, setDream] = useState(onboarding.strategicDream || '');
  const [goals, setGoals] = useState<string[]>(onboarding.impactGoals || []);
  const [wishes, setWishes] = useState<string[]>(onboarding.operationalWishes || []);
  const [goalInput, setGoalInput] = useState('');
  const [wishInput, setWishInput] = useState('');
  const [goalSuggestionStart, setGoalSuggestionStart] = useState(0);
  const [wishSuggestionStart, setWishSuggestionStart] = useState(0);

  // Rich suggestion sets
  const dreamSuggestions = selectedEntity?.mandates ?? [
    'UAE Energy Strategy 2050',
    'Water security',
    'Achieve Net Zero by 2050',
    'Clean energy capacity',
    'Circular economy leadership',
    'Carbon-neutral supply chain',
  ];

  const goalSuggestions = [
    'Infrastructure resilience',
    'Renewable energy transition',
    'Employee green upskilling',
    'ESG-aligned investments',
    'Zero-waste operations',
  ];

  const wishSuggestions = [
    'Paperless procurement',
    'EV fleet rollout',
    'Green office certification',
    'Supplier ESG scoring',
    'Monthly carbon reporting',
    'Sustainability town halls',
  ];

  const addGoal = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || goals.length >= 2) return;
    if (goals.includes(trimmed)) return;
    setGoals(g => [...g, trimmed]);
    setGoalSuggestionStart(start => start + SUGGESTIONS_PER_SELECTION);
    setGoalInput('');
  };

  const addWish = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || wishes.length >= 3) return;
    if (wishes.includes(trimmed)) return;
    setWishes(w => [...w, trimmed]);
    setWishSuggestionStart(start => start + SUGGESTIONS_PER_SELECTION);
    setWishInput('');
  };

  const addDreamSuggestion = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setDream(trimmed);
  };

  const visibleDreamSuggestions = dream.trim()
    ? []
    : getVisibleSuggestions(dreamSuggestions, [], 0);
  const visibleGoalSuggestions = goals.length < 2
    ? getVisibleSuggestions(goalSuggestions, goals, goalSuggestionStart)
    : [];
  const visibleWishSuggestions = wishes.length < 3
    ? getVisibleSuggestions(wishSuggestions, wishes, wishSuggestionStart)
    : [];

  const handleNext = () => {
    setOnboarding({ strategicDream: dream, impactGoals: goals, operationalWishes: wishes });
    onNavigate(ScreenName.ORG_ONBOARDING_AREAS);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-white">
      {/* Background — same technique as individual path */}
      <div
        className="absolute inset-0 bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${bg1})`, backgroundPosition: 'center', backgroundSize: '100% 100%' }}
      />
      <div className="absolute inset-0 bg-white/62 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">

        {/* Header bar */}
        <div className="px-6 pt-12 pb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition"
            aria-label="Back"
          >
            <ChevronLeft size={18} />
          </button>
          <StepDots current={1} total={3} />
          <div className="text-[10px] font-black text-[var(--forest-light)] uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
            Step 1
          </div>
        </div>

        {/* Title */}
        <div className="px-6 mb-4">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] font-jakarta leading-tight">
            Strategic Vision
          </h1>
          <p className="text-[10.5px] font-black text-slate-600 uppercase tracking-widest mt-1">
            Design your entity's future
          </p>
        </div>

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-4 space-y-5">

          {/* ── Strategic Vision ── */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider ml-1">
              Strategic Vision <span className="text-rose-400">*</span>
            </label>
            <textarea
              value={dream}
              onChange={e => setDream(e.target.value)}
              placeholder="In 10 years, our entity will have…"
              rows={3}
              className="w-full min-h-[104px] p-3.5 bg-white rounded-2xl border border-gray-200 focus:border-[var(--forest-light)] outline-none text-base text-gray-900 placeholder:text-slate-400 resize-none shadow-sm transition-all focus:ring-4 focus:ring-green-50 shadow-inner"
            />
            {visibleDreamSuggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 px-1 mt-1">
                {visibleDreamSuggestions.map(s => (
                  <SuggestionChip key={s} label={s} onAdd={() => addDreamSuggestion(s)} />
                ))}
              </div>
            )}
          </div>

          {/* ── Long-Horizon Impact Goals ── */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                Long-Horizon Impact Goals ({goals.length}/2)
              </label>
              {goals.length < 2 && (
                <button
                  onClick={() => addGoal(goalInput)}
                  className="text-[11px] font-black text-[var(--forest-light)] hover:scale-105 transition-transform"
                >
                  + ADD
                </button>
              )}
            </div>

            {/* Added tags */}
            <AnimatePresence>
              {goals.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {goals.map((g, i) => (
                    <motion.div key={g + i} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <FieldTag label={g} onRemove={() => setGoals(prev => prev.filter((_, j) => j !== i))} />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {goals.length < 2 && (
              <div className="relative group">
                <textarea
                  value={goalInput}
                  onChange={e => setGoalInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addGoal(goalInput))}
                  placeholder={
                    goals.length === 0
                      ? 'e.g., Achieve Net Zero in all facilities by 2040…'
                      : 'e.g., Full renewable energy procurement by 2035…'
                  }
                  rows={2}
                  className="w-full min-h-[84px] p-3.5 bg-white rounded-2xl border border-gray-200 focus:border-[var(--forest-light)] outline-none text-[15px] text-gray-900 placeholder:text-slate-400 resize-none shadow-sm transition-all focus:ring-4 focus:ring-green-50 shadow-inner pr-10"
                />
                <button
                  onClick={() => addGoal(goalInput)}
                  className="absolute right-3 top-3 w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-[var(--forest-light)] active:scale-95 transition"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}

            {visibleGoalSuggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 px-1 mt-1">
                {visibleGoalSuggestions.map(s => (
                  <SuggestionChip key={s} label={s} onAdd={() => addGoal(s)} />
                ))}
              </div>
            )}
          </div>

          {/* ── Operational Goals ── */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                Operational Goals ({wishes.length}/3)
              </label>
              {wishes.length < 3 && (
                <button
                  onClick={() => addWish(wishInput)}
                  className="text-[11px] font-black text-[var(--forest-light)] hover:scale-105 transition-transform"
                >
                  + ADD
                </button>
              )}
            </div>

            <AnimatePresence>
              {wishes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {wishes.map((w, i) => (
                    <motion.div key={w + i} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <FieldTag label={w} onRemove={() => setWishes(prev => prev.filter((_, j) => j !== i))} />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {wishes.length < 3 && (
              <div className="relative group">
                <textarea
                  value={wishInput}
                  onChange={e => setWishInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addWish(wishInput))}
                  placeholder={
                    [
                      'e.g., Paperless procurement across all departments…',
                      'e.g., EV company fleet by end of year…',
                      'e.g., Monthly green performance dashboard…',
                    ][wishes.length] ?? 'Add an operational vision…'
                  }
                  rows={2}
                  className="w-full min-h-[84px] p-3.5 bg-white rounded-2xl border border-gray-200 focus:border-[var(--forest-light)] outline-none text-[15px] text-gray-900 placeholder:text-slate-400 resize-none shadow-sm transition-all focus:ring-4 focus:ring-green-50 shadow-inner pr-10"
                />
                <button
                  onClick={() => addWish(wishInput)}
                  className="absolute right-3 top-3 w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-[var(--forest-light)] active:scale-95 transition"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}

            {visibleWishSuggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 px-1 mt-1">
                {visibleWishSuggestions.map(s => (
                  <SuggestionChip key={s} label={s} onAdd={() => addWish(s)} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-10 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={!dream.trim()}
            className="w-full py-4 bg-gradient-to-r from-[var(--forest-light)] to-[var(--forest-deep)] text-white rounded-2xl font-bold text-base shadow-2xl shadow-green-600/30 active:scale-[0.98] transition-all disabled:opacity-30 disabled:shadow-none flex items-center justify-center gap-2"
          >
            Next Step <span className="text-sm">→</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OrgOnboardingStrategicGoals;
