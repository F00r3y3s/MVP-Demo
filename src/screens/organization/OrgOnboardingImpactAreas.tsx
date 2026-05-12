import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenName } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';
import OrgImpactAreaIcon, { OrgImpactAreaKey } from '../../components/OrgImpactAreaIcon';
import bg2 from '../../../flow-backgrounds/Minimal_abstract_falconinspired_design_symbolizing_delpmaspu.png';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
}

const StepIndicator: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div className="flex gap-1.5">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className="h-1 rounded-full transition-all duration-300 bg-white/20"
        style={{
          width: i === current - 1 ? 32 : 16,
          background: i < current ? 'var(--forest-light)' : 'rgba(255,255,255,0.2)',
        }}
      />
    ))}
  </div>
);

const IMPACT_AREAS: { key: OrgImpactAreaKey; label: string }[] = [
  { key: 'climate',       label: 'Climate Action'       },
  { key: 'energy',        label: 'Clean Energy'         },
  { key: 'water',         label: 'Water Stewardship'    },
  { key: 'waste',         label: 'Circular Economy'     },
  { key: 'governance',    label: 'Governance & Compliance' },
  { key: 'social',        label: 'Social Impact'        },
  { key: 'supply-chain',  label: 'Supply Chain'         },
  { key: 'biodiversity',  label: 'Biodiversity'         },
];

const OrgOnboardingImpactAreas: React.FC<Props> = ({ onNavigate, onBack }) => {
  const { setOnboarding, onboarding } = useOrgRoute();
  const [selected, setSelected] = useState<string[]>(onboarding.selectedImpactAreas || []);

  const toggle = (key: string) => {
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleNext = () => {
    setOnboarding({ selectedImpactAreas: selected });
    onNavigate(ScreenName.ORG_ONBOARDING_PACE);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-12 pointer-events-none"
        style={{ backgroundImage: `url(${bg2})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/85 via-[var(--bg-primary)]/75 to-[var(--bg-primary)] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-12 pb-4 flex items-center justify-between">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition" aria-label="Back">
            <ChevronLeft size={18} />
          </button>
          <StepIndicator current={2} total={3} />
          <div className="w-9" />
        </div>

        <div className="px-5 mb-5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--forest-light)] mb-1">Step 2 of 3</p>
          <h1 className="text-2xl font-black text-[var(--text-primary)] font-jakarta leading-tight">Impact Focus Areas</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Select at least 3 areas your entity will champion</p>

          {/* Counter */}
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--forest-light)]/15 border border-[var(--forest-light)]/30">
            <span className="text-[var(--forest-light)] font-black text-sm">{selected.length}</span>
            <span className="text-[var(--text-muted)] text-xs">selected</span>
            {selected.length >= 3 && <span className="text-[10px] text-[var(--forest-light)]">✓</span>}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4">
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence mode="sync">
              {IMPACT_AREAS.map((area, i) => {
                const isSelected = selected.includes(area.key);
                return (
                  <motion.button
                    key={area.key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    onClick={() => toggle(area.key)}
                    className={`relative flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-[var(--forest-light)] border-[var(--forest-light)] shadow-lg shadow-[var(--forest-light)]/20'
                        : 'bg-white/5 border-white/15 hover:border-white/30'
                    }`}
                  >
                    <OrgImpactAreaIcon iconKey={area.key} selected={isSelected} size={32} />
                    <span className={`text-xs font-bold text-center leading-tight ${isSelected ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
                      {area.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/30 flex items-center justify-center"
                      >
                        <span className="text-white text-[8px]">✓</span>
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Next */}
        <div className="p-5">
          <button
            onClick={handleNext}
            disabled={selected.length < 3}
            className="w-full h-14 rounded-2xl bg-[var(--forest-deep)] text-white font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition disabled:opacity-40"
          >
            {selected.length < 3 ? `Select ${3 - selected.length} more` : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrgOnboardingImpactAreas;
