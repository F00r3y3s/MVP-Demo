import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, Building2, CalendarDays, ChevronDown, Globe2, MapPin, ShieldCheck, X } from 'lucide-react';
import { useOrgRoute } from '../../context/OrgRouteContext';
import { ScreenName } from '../../types';
import uaeOfficialEmblem from '../../assets/uae-official-emblem.svg';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Green morning';
  if (hour < 17) return 'Green afternoon';
  return 'Green evening';
};

const compactVision = (vision: string) => {
  const trimmed = vision.trim();
  if (!trimmed) return 'Sustainable UAE 2030';
  return trimmed.length > 42 ? `${trimmed.slice(0, 39).trim()}...` : trimmed;
};

const EntityLogoMark: React.FC<{ seed: string }> = ({ seed }) => (
  <div className="flex h-full w-full items-center justify-center rounded-full border border-emerald-100 bg-white shadow-sm">
    <img src={uaeOfficialEmblem} alt={`${seed} logo`} className="h-[74%] w-[74%] object-contain" />
  </div>
);

const ORG_ROLE_LABELS = {
  guardian: 'Guardian',
  pioneer: 'Pioneer',
  advocate: 'Advocate',
  visionary: 'Visionary',
} as const;

const OrgHeroHeader: React.FC<{ onNavigate?: (screen: ScreenName) => void }> = ({ onNavigate }) => {
  const { selectedEntity, onboarding } = useOrgRoute();
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [scope, setScope] = useState<'entity' | 'national' | 'global'>('entity');
  const [showVisionDetail, setShowVisionDetail] = useState(false);
  const [filters, setFilters] = useState({
    department: 'All Departments',
    emirate: 'All Emirates',
    sector: 'All Sectors',
    date: '20 May 2025',
  });

  const entityName = selectedEntity?.name && selectedEntity.name !== 'Unknown'
    ? selectedEntity.name
    : 'Ministry of Energy & Infrastructure';
  const roleLabel = selectedEntity?.subRole ? ORG_ROLE_LABELS[selectedEntity.subRole] : 'Guardian';
  const logoSeed = selectedEntity?.logoSeed ?? selectedEntity?.shortName ?? 'MOEI';
  const vision = onboarding.strategicDream || selectedEntity?.mandates?.[0] || 'UAE Energy Strategy 2050';
  const visionProgress = 68;
  const departmentOptions = selectedEntity?.shortName === 'MOEI'
    ? ['All Departments', 'Energy', 'Infrastructure', 'Water', 'Transport']
    : ['All Departments', 'Sustainability', 'Operations', 'Facilities', 'People'];
  const visibleFilters = scope === 'entity'
    ? [
        { id: 'department', icon: Building2, value: filters.department, options: departmentOptions },
        { id: 'date', icon: CalendarDays, value: filters.date, options: ['20 May 2025', 'April 2025', 'Q1 2025', '2024 Full Year'] },
      ]
    : [
        { id: 'emirate', icon: MapPin, value: filters.emirate, options: ['All Emirates', 'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Ras Al Khaimah'] },
        { id: 'sector', value: filters.sector, options: ['All Sectors', 'Energy', 'Water', 'Transport', 'Buildings'] },
        { id: 'date', icon: CalendarDays, value: filters.date, options: ['20 May 2025', 'April 2025', 'Q1 2025', '2024 Full Year'] },
      ];

  return (
    <>
      <section className="px-3.5 pt-3 pb-2">
        <div className="relative overflow-visible rounded-[28px] border border-white/80 bg-white p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="absolute -top-3 right-4 z-20 flex flex-col items-center gap-0.5">
            <div className="flex flex-col items-center gap-0.5 rounded-2xl bg-gradient-to-br from-[var(--forest-light)] to-[var(--forest-medium)] px-3 py-2 text-white shadow-lg">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                <ShieldCheck size={16} strokeWidth={2.8} />
              </div>
              <span className="mt-0.5 text-[8px] font-black uppercase leading-none tracking-widest">{roleLabel}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowVisionDetail(true)}
              className="relative mt-1 min-w-[88px] overflow-hidden rounded-2xl border border-emerald-700/50 bg-emerald-950 p-2.5 text-left shadow-2xl transition-all hover:bg-emerald-950 active:scale-[0.98]"
              aria-label="Open strategic vision details"
            >
              <div className="relative z-10 mb-1 flex items-center justify-between gap-2">
                <span className="flex items-center gap-0.5 text-[7px] font-black uppercase tracking-widest text-amber-300 opacity-90">
                  <span className="text-[6px]">✦</span> Vision
                </span>
                <span className="text-[9px] font-black text-white">{visionProgress}%</span>
              </div>
              <div className="relative z-10 truncate text-[8px] font-black uppercase leading-tight text-white">{compactVision(vision)}</div>
              <div className="relative z-10 mt-1 h-1 overflow-hidden rounded-full bg-emerald-950">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-300" style={{ width: `${visionProgress}%` }} />
              </div>
              <div className="absolute -right-2 -top-2 h-12 w-12 bg-emerald-400/20 blur-xl" />
            </button>
          </div>

          <div className="relative min-h-[106px] pr-[142px]">

            <button
              type="button"
              onClick={() => onNavigate?.(ScreenName.ORG_MORE)}
              className="relative z-10 flex min-w-0 items-start gap-2.5 pt-0 text-left transition-transform active:scale-[0.99]"
              aria-label="Open organization profile"
            >
              <div className="flex w-[82px] shrink-0 flex-col items-center">
                <div className="relative">
                  <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full border-[4px] border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-2 shadow-md">
                    <EntityLogoMark seed={logoSeed} />
                  </div>
                  <div className="absolute bottom-1.5 right-0 h-[18px] w-[18px] rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
                </div>
                <div className="mt-1.5 max-w-[102px] text-center text-[9px] font-extrabold leading-tight text-slate-400">{entityName}</div>
              </div>
              <div className="min-w-0 max-w-[96px] pt-5">
                <div className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600">{getGreeting()}</div>
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="text-[20px] font-black uppercase leading-none text-slate-900">{selectedEntity?.shortName ?? logoSeed}</span>
                  <BadgeCheck size={18} className="shrink-0 text-[var(--forest-light)]" fill="currentColor" color="white" />
                </div>
              </div>
            </button>
          </div>

          <div className="mt-2 flex gap-1 border-t border-slate-100 pt-2.5">
            {[
              { id: 'entity', label: selectedEntity?.shortName ?? logoSeed },
              { id: 'national', label: 'National' },
              { id: 'global', label: 'Global' },
            ].map(tab => {
              const active = scope === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setScope(tab.id as 'entity' | 'national' | 'global')}
                  className={`flex-1 rounded-full py-2 text-center transition-all ${
                    active
                      ? 'bg-[var(--forest-light)] text-white shadow-md'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <Globe2 size={13} strokeWidth={2.6} />
                    <span className="text-[9.5px] font-black uppercase tracking-wide">{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {scope !== 'global' && (
        <div className={`grid gap-1.5 px-3.5 pb-2 ${scope === 'entity' ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {visibleFilters.map(filter => {
            const Icon = filter.icon;
            const isOpen = openFilter === filter.id;
            return (
              <div key={filter.id} className="relative min-w-0">
                <button
                  type="button"
                  onClick={() => setOpenFilter(isOpen ? null : filter.id)}
                  className={`h-9 w-full min-w-0 rounded-[11px] border bg-white px-2 text-[10px] font-bold text-slate-800 shadow-sm flex items-center justify-between gap-1 active:scale-[0.98] transition-transform ${isOpen ? 'border-[var(--forest-medium)]' : 'border-slate-200'}`}
                >
                  {Icon && <Icon size={12} className="shrink-0 text-slate-400" />}
                  <span className="truncate">{filter.value}</span>
                  <ChevronDown size={11} className={`shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+5px)] z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_32px_rgba(0,0,0,.12)]">
                    {filter.options.map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFilters(prev => ({ ...prev, [filter.id]: option }));
                          setOpenFilter(null);
                        }}
                        className={`block w-full px-3 py-2.5 text-left text-[11px] font-semibold ${option === filter.value ? 'bg-emerald-50 text-[var(--forest-medium)]' : 'text-slate-700'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {showVisionDetail && (
          <motion.div
            className="fixed inset-0 z-[140] bg-slate-950/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVisionDetail(false)}
          >
            <motion.div
              className="absolute inset-x-4 top-[88px] bottom-[88px] overflow-y-auto rounded-[32px] bg-white p-5 shadow-2xl"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              onClick={event => event.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">Strategic Vision</div>
                  <h2 className="font-jakarta text-2xl font-black leading-tight text-slate-900">{vision}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVisionDetail(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600"
                  aria-label="Close vision details"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  ['Progress', `${visionProgress}%`],
                  ['Aligned KPIs', '12'],
                  ['On-track programs', '8'],
                  ['2030 readiness', 'High'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-[#F8FAFC] p-3">
                    <div className="text-xl font-black leading-none text-slate-900">{value}</div>
                    <div className="mt-1 text-[9px] font-black uppercase tracking-wide text-slate-400">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Vision Milestones</span>
                  <span className="rounded-full bg-white px-2 py-1 text-[9px] font-black text-emerald-700">Mock live data</span>
                </div>
                <div className="space-y-3">
                  {[
                    ['Baseline complete', 'Entity-wide operational baseline validated across core facilities.', 'Complete'],
                    ['Infrastructure roadmap', 'Priority programs mapped to energy, water, mobility, and building systems.', 'In progress'],
                    ['National alignment', 'Vision tied to UAE Net Zero 2050 and national BCI improvement targets.', 'On track'],
                  ].map(([title, body, status]) => (
                    <div key={title} className="rounded-2xl bg-white p-3 shadow-sm">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-[12px] font-black uppercase tracking-tight text-slate-900">{title}</h3>
                        <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-1 text-[8px] font-black uppercase text-emerald-700">{status}</span>
                      </div>
                      <p className="mt-1 text-[10px] font-medium leading-5 text-slate-500">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrgHeroHeader;
