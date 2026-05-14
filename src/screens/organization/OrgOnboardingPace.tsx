import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScreenName } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';
import bg3 from '../../../whisk-backgrounds/8.jpeg';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
}

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

const CADENCE_OPTIONS: { id: string; label: string; desc: string; icon: string }[] = [
  { id: 'Weekly', label: 'Weekly', desc: 'Fast pulse checks', icon: '📆' },
  { id: 'Monthly', label: 'Monthly', desc: 'Operational KPI review', icon: '📅' },
  { id: 'Quarterly', label: 'Quarterly', desc: 'Standard ESG cycle', icon: '📊' },
  { id: 'Annual', label: 'Annual', desc: 'Full impact report', icon: '📋' },
];

const SCALE_OPTIONS: { id: string; label: string; desc: string; icon: string; color: string }[] = [
  {
    id: 'Department',
    label: 'Department',
    desc: 'Start with focused teams and operational owners',
    icon: '🏢',
    color: 'bg-blue-50 border-blue-100',
  },
  {
    id: 'Entity-wide',
    label: 'Entity-wide',
    desc: 'Coordinate across all departments and facilities',
    icon: '🏛️',
    color: 'bg-emerald-50 border-emerald-100',
  },
  {
    id: 'Cross-government',
    label: 'Cross-government',
    desc: 'Connect programs with partner entities and national priorities',
    icon: '🤝',
    color: 'bg-amber-50 border-amber-100',
  },
];

const ACTIVITY_OPTIONS: { id: string; label: string; desc: string; icon: string }[] = [
  {
    id: 'Internal Challenges',
    label: 'Internal Challenges',
    desc: 'Team-based sustainability competitions',
    icon: '🏆',
  },
  {
    id: 'National Events',
    label: 'National Events',
    desc: 'UAE-wide campaigns and observances',
    icon: '🇦🇪',
  },
  {
    id: 'Community Programs',
    label: 'Community Programs',
    desc: 'Public workshops and local initiatives',
    icon: '🌿',
  },
  {
    id: 'Green Ambassadors',
    label: 'Green Ambassadors',
    desc: 'Employee ambassador network',
    icon: '⭐',
  },
  {
    id: 'Volunteer Drives',
    label: 'Volunteer Drives',
    desc: 'Cleanups, planting, and service days',
    icon: '🙌',
  },
  {
    id: 'Innovation Labs',
    label: 'Innovation Labs',
    desc: 'Pilots, hackathons, and idea sprints',
    icon: '💡',
  },
];

const OrgOnboardingPace: React.FC<Props> = ({ onNavigate, onBack }) => {
  const { setOnboarding, setPrimaryKpi, selectedEntity, onboarding } = useOrgRoute();
  const [cadence, setCadence] = useState<string | null>(null);
  const [scale, setScale] = useState<string | null>(null);
  const [activities, setActivities] = useState<string[]>(onboarding.activitiesEvents || []);

  const canLaunch = !!cadence && !!scale && activities.length > 0;

  const toggleActivity = (activity: string) => {
    setActivities(prev =>
      prev.includes(activity) ? prev.filter(item => item !== activity) : [...prev, activity]
    );
  };

  const handleLaunch = () => {
    setOnboarding({ reportingCadence: cadence, engagementStyle: scale, activitiesEvents: activities });
    if (selectedEntity?.defaultKpis?.[0]) {
      setPrimaryKpi(selectedEntity.defaultKpis[0]);
    }
    onNavigate(ScreenName.ORG_DASHBOARD);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${bg3})`, backgroundPosition: 'center', backgroundSize: '100% 100%' }}
      />
      <div className="absolute inset-0 bg-white/35 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">

        {/* Header */}
        <div className="px-6 pt-12 pb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition"
            aria-label="Back"
          >
            <ChevronLeft size={18} />
          </button>
          <StepDots current={3} total={3} />
          <div className="text-[10px] font-black text-[var(--forest-light)] uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
            Step 3
          </div>
        </div>

        {/* Title */}
        <div className="px-6 mb-5">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] font-jakarta leading-tight">
            Reporting & Commitment
          </h1>
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-60 mt-1">
            Set cadence, scale, and activation
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-4 space-y-4">

          {/* Reporting Cadence */}
          <div className="bg-white rounded-[28px] p-4 shadow-sm border border-gray-100">
            <h3 className="text-[11px] font-black text-[var(--forest-light)] uppercase tracking-wider mb-3 border-l-4 border-[var(--forest-light)] pl-3">
              Reporting Cadence
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {CADENCE_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setCadence(opt.id)}
                  className={`min-h-[86px] flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-2xl border-2 transition-all ${
                    cadence === opt.id
                      ? 'border-[var(--forest-light)] bg-green-50 shadow-md shadow-green-100'
                      : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{opt.icon}</span>
                  <span className="font-black text-[11px] uppercase tracking-tighter leading-tight">
                    {opt.label}
                  </span>
                  <span className="text-[9px] font-medium text-gray-400 text-center leading-tight">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Engagement Scale */}
          <div className="bg-white rounded-[28px] p-4 shadow-sm border border-gray-100">
            <h3 className="text-[11px] font-black text-[var(--forest-light)] uppercase tracking-wider mb-3 border-l-4 border-[var(--forest-light)] pl-3">
              Engagement Scale
            </h3>
            <div className="space-y-2.5">
              {SCALE_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setScale(opt.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-2xl border-2 transition-all text-left ${
                    scale === opt.id
                      ? `border-[var(--forest-light)] bg-green-50 shadow-md shadow-green-100`
                      : `border-transparent ${opt.color}`
                  }`}
                >
                  <span className="text-xl shrink-0 mt-0.5">{opt.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-[12px] uppercase tracking-tighter text-[var(--text-primary)]">
                      {opt.label}
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium leading-snug mt-0.5">
                      {opt.desc}
                    </p>
                  </div>
                  {scale === opt.id && (
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[var(--forest-light)] flex items-center justify-center mt-0.5">
                      <span className="text-white text-[9px]">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Activities & Events */}
          <div className="bg-white rounded-[28px] p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h3 className="text-[11px] font-black text-[var(--forest-light)] uppercase tracking-wider border-l-4 border-[var(--forest-light)] pl-3">
                Activities & Events
              </h3>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-wide">
                {activities.length} selected
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {ACTIVITY_OPTIONS.map(opt => {
                const isSelected = activities.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleActivity(opt.id)}
                    className={`min-h-[92px] flex flex-col items-start gap-1.5 p-3 rounded-2xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-[var(--forest-light)] bg-green-50 shadow-md shadow-green-100'
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full gap-2">
                      <span className="text-lg">{opt.icon}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[var(--forest-light)] text-white text-[8px] flex items-center justify-center">✓</span>
                      )}
                    </div>
                    <span className="font-black text-[10.5px] uppercase tracking-tighter leading-tight text-[var(--text-primary)]">
                      {opt.label}
                    </span>
                    <span className="text-[9px] font-medium text-gray-500 leading-snug">
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Launch CTA */}
        <div className="px-6 pb-10 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLaunch}
            disabled={!canLaunch}
            className="w-full py-4 bg-gradient-to-r from-[var(--forest-light)] to-[var(--forest-deep)] text-white rounded-2xl font-bold text-base shadow-2xl shadow-green-600/30 active:scale-[0.98] transition-all disabled:opacity-30 disabled:shadow-none flex items-center justify-center gap-2"
          >
            🚀 Launch Dashboard
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OrgOnboardingPace;
