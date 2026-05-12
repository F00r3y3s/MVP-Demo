import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { ScreenName } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';
import bg3 from '../../../flow-backgrounds/Soft_ocean_gradient_background_inspired_by_uae_pea_delpmaspu.png';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
}

const StepIndicator: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div className="flex gap-1.5">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className="h-1 rounded-full transition-all duration-300"
        style={{
          width: i === current - 1 ? 32 : 16,
          background: i < current ? 'var(--forest-light)' : 'rgba(255,255,255,0.2)',
        }}
      />
    ))}
  </div>
);

const CADENCE_OPTIONS = ['Monthly', 'Quarterly', 'Bi-Annual', 'Annual'];
const STYLE_OPTIONS = ['Fully Committed', 'Active Reporter', 'Foundational Tracker'];

const OptionCard: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
  hint?: string;
}> = ({ label, selected, onClick, hint }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
      selected
        ? 'bg-[var(--forest-light)]/20 border-[var(--forest-light)]/60 shadow-sm'
        : 'bg-white/5 border-white/15 hover:border-white/30'
    }`}
  >
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
      selected ? 'border-[var(--forest-light)] bg-[var(--forest-light)]' : 'border-white/30'
    }`}>
      {selected && <CheckCircle2 size={12} className="text-white" />}
    </div>
    <div className="flex-1">
      <span className={`font-bold text-sm ${selected ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{label}</span>
      {hint && <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{hint}</p>}
    </div>
  </button>
);

const STYLE_HINTS: Record<string, string> = {
  'Fully Committed': 'Embed sustainability in every decision and report comprehensively',
  'Active Reporter': 'Track key KPIs and file reports on schedule',
  'Foundational Tracker': 'Start with essential metrics and build over time',
};

const OrgOnboardingPace: React.FC<Props> = ({ onNavigate, onBack }) => {
  const { setOnboarding, setPrimaryKpi, selectedEntity } = useOrgRoute();
  const [cadence, setCadence] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);

  const canLaunch = !!cadence && !!style;

  const handleLaunch = () => {
    setOnboarding({ reportingCadence: cadence, engagementStyle: style });
    // Set primaryKpi from entity's first defaultKpi
    if (selectedEntity?.defaultKpis?.[0]) {
      setPrimaryKpi(selectedEntity.defaultKpis[0]);
    }
    onNavigate(ScreenName.ORG_DASHBOARD);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{ backgroundImage: `url(${bg3})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-[var(--bg-primary)]/70 to-[var(--bg-primary)]/90 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-12 pb-4 flex items-center justify-between">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition" aria-label="Back">
            <ChevronLeft size={18} />
          </button>
          <StepIndicator current={3} total={3} />
          <div className="w-9" />
        </div>

        <div className="px-5 mb-5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--forest-light)] mb-1">Step 3 of 3</p>
          <h1 className="text-2xl font-black text-[var(--text-primary)] font-jakarta leading-tight">Reporting & Commitment</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Set your cadence and engagement style</p>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4 space-y-6">
          {/* Cadence */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-3 block">Reporting Cadence</label>
            <div className="space-y-2">
              {CADENCE_OPTIONS.map(opt => (
                <OptionCard
                  key={opt}
                  label={opt}
                  selected={cadence === opt}
                  onClick={() => setCadence(opt)}
                />
              ))}
            </div>
          </div>

          {/* Engagement Style */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-3 block">Engagement Style</label>
            <div className="space-y-2">
              {STYLE_OPTIONS.map(opt => (
                <OptionCard
                  key={opt}
                  label={opt}
                  selected={style === opt}
                  onClick={() => setStyle(opt)}
                  hint={STYLE_HINTS[opt]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Launch */}
        <div className="p-5">
          <button
            onClick={handleLaunch}
            disabled={!canLaunch}
            className="w-full h-14 rounded-2xl bg-[var(--forest-deep)] text-white font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition disabled:opacity-40"
          >
            🚀 Launch Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrgOnboardingPace;
