import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScreenName } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';
import { FocusAreaIcon } from '../../components/AnimatedIcons';
import bg2 from '../../../whisk-backgrounds/9.jpeg';

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

const OrganizationFocusIcon: React.FC<{ areaKey: string; icon: string; isSelected: boolean }> = ({ areaKey, icon, isSelected }) => {
  const inactiveColor = '#94A3B8';
  const activeColor = '#FFFFFF';
  const successColor = '#34D399';

  if (areaKey === 'smart-buildings') {
    return (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M5 20V8L12 4L19 8V20"
          stroke={isSelected ? activeColor : inactiveColor}
          strokeWidth="2"
          strokeLinejoin="round"
          animate={{ y: isSelected ? [0, -1, 0] : 0 }}
          transition={{ repeat: isSelected ? Infinity : 0, duration: 2 }}
        />
        <motion.path
          d="M9 20V12H15V20"
          stroke={isSelected ? successColor : inactiveColor}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {[8, 12, 16].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy="9"
            r="1"
            fill={isSelected ? successColor : inactiveColor}
            animate={{ opacity: isSelected ? [0.35, 1, 0.35] : 1 }}
            transition={{ repeat: isSelected ? Infinity : 0, duration: 1.4, delay: i * 0.2 }}
          />
        ))}
      </svg>
    );
  }

  if (areaKey === 'air-quality') {
    return (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M4 9H15C17 9 18 8 18 6.5C18 5.1 17 4 15.5 4C14.4 4 13.6 4.6 13.2 5.4"
          stroke={isSelected ? activeColor : inactiveColor}
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ x: isSelected ? [0, 1.5, 0] : [0, 0.75, 0] }}
          transition={{ repeat: Infinity, duration: isSelected ? 2 : 3 }}
        />
        <motion.path
          d="M4 14H18.5C20 14 21 15 21 16.3C21 17.7 20 18.7 18.5 18.7C17.5 18.7 16.7 18.2 16.2 17.4"
          stroke={isSelected ? successColor : inactiveColor}
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ x: isSelected ? [0, -1.5, 0] : [0, -0.75, 0] }}
          transition={{ repeat: Infinity, duration: isSelected ? 2.2 : 3.2 }}
        />
        {isSelected && (
          <motion.path
            d="M9 12L11 14L15 10"
            stroke={successColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
        )}
      </svg>
    );
  }

  return <FocusAreaIcon id={icon} isSelected={isSelected} />;
};

const IMPACT_AREAS: { key: string; label: string; icon: string }[] = [
  { key: 'electricity-optimization', label: 'Electricity Optimization', icon: 'energy' },
  { key: 'water-efficiency', label: 'Water Efficiency', icon: 'water' },
  { key: 'waste-diversion', label: 'Waste Diversion', icon: 'waste' },
  { key: 'mobility-ev', label: 'Mobility & EV', icon: 'ev' },
  { key: 'smart-buildings', label: 'Smart Buildings', icon: 'governance' },
  { key: 'circular-economy', label: 'Circular Economy', icon: 'compost' },
  { key: 'carbon-reduction', label: 'Carbon Reduction', icon: 'carbon' },
  { key: 'community-resilience', label: 'Community Resilience', icon: 'community' },
  { key: 'green-infrastructure', label: 'Green Infrastructure', icon: 'nature' },
  { key: 'air-quality', label: 'Air Quality', icon: 'plastic' },
  { key: 'individual-behavioral-index', label: 'Individual Behavioral Index', icon: 'lifestyle' },
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

  const needed = Math.max(0, 3 - selected.length);

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${bg2})`, backgroundPosition: 'center', backgroundSize: '100% 100%' }}
      />
      <div className="absolute inset-0 bg-white/58 pointer-events-none" />

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
          <StepDots current={2} total={3} />
          <div className="text-[10px] font-black text-[var(--forest-light)] uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
            Step 2
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-2 pb-3 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FCFCFC] rounded-[32px] px-4 py-5 border border-gray-100 shadow-inner"
          >
            <div className="mb-5 flex justify-between items-end px-1 gap-3">
              <div className="min-w-0">
                <h1 className="text-[25px] font-bold text-[var(--text-primary)] font-jakarta leading-tight">
                  Impact Focus Area
                </h1>
                <p className="text-[10.5px] font-black text-slate-600 uppercase tracking-[0.18em] mt-1 leading-snug">
                  Choose at least 3 areas your entity wants to focus
                </p>
              </div>
              <div
                className={`shrink-0 whitespace-nowrap text-[10.5px] font-black px-3 py-1.5 rounded-full shadow-lg transition-colors ${
                  selected.length >= 3
                    ? 'bg-[var(--forest-deep)] text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {selected.length} SELECTED
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {IMPACT_AREAS.map((area, i) => {
                const isSelected = selected.includes(area.key);
                return (
                  <motion.button
                    key={area.key}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.035 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggle(area.key)}
                    className={`relative aspect-[1/1.06] p-2.5 rounded-[24px] flex flex-col items-center justify-center gap-2.5 transition-all border-2 outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                      isSelected
                        ? 'bg-[var(--forest-deep)] border-[var(--emerald)] shadow-[0_15px_30px_rgba(6,78,59,0.3)] z-10'
                        : 'bg-white border-gray-100 shadow-sm'
                    }`}
                  >
                    <div className="h-12 flex items-center justify-center [&_svg]:h-11 [&_svg]:w-11">
                      <OrganizationFocusIcon areaKey={area.key} icon={area.icon} isSelected={isSelected} />
                    </div>
                    <span
                      className={`text-[8.8px] font-black text-center leading-[1.05] uppercase tracking-normal ${
                        isSelected ? 'text-[var(--emerald)]' : 'text-slate-950'
                      }`}
                    >
                      {area.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-10 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={selected.length < 3}
            className="w-full py-4 bg-gradient-to-r from-[var(--forest-light)] to-[var(--forest-deep)] text-white rounded-2xl font-bold text-base shadow-2xl shadow-green-600/30 active:scale-[0.98] transition-all disabled:opacity-55 disabled:shadow-none flex items-center justify-center gap-2"
          >
            {selected.length < 3 ? `Select ${needed} more` : 'Next Step →'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OrgOnboardingImpactAreas;
