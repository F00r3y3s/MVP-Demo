import React, { useMemo, useState } from 'react';
import { ChevronLeft, Search, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenName, OrgSubRole } from '../../types';
import { findOrgEntities, ORG_ENTITIES } from '../../data/organizationCommand';
import { useOrgRoute } from '../../context/OrgRouteContext';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
  subRole?: OrgSubRole;
}

const subRoleLabels: Record<OrgSubRole, { heading: string; color: string }> = {
  guardian: { heading: 'GOVERNMENT', color: '#3B82F6' },
  pioneer:  { heading: 'COMPANIES',  color: '#C17F59' },
  advocate: { heading: 'NGOS',       color: '#EC4899' },
  visionary: { heading: 'ACADEMIA',  color: '#2C5F68' },
};

const OrgEntityPicker: React.FC<Props> = ({ onNavigate, onBack, subRole = 'guardian' }) => {
  const { setEntity, setSubRole } = useOrgRoute();
  const allEntities = ORG_ENTITIES[subRole] ?? [];
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(allEntities[0]?.id ?? '');

  const filtered = useMemo(() => findOrgEntities(subRole, query), [subRole, query]);
  const meta = subRoleLabels[subRole];

  const handleContinue = () => {
    const entity = allEntities.find(e => e.id === selectedId) ?? allEntities[0];
    setSubRole(subRole);
    setEntity(entity);
    onNavigate(ScreenName.ORG_ONBOARDING_GOALS);
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition"
            aria-label="Back"
          >
            <ChevronLeft size={18} />
          </button>
          <span
            className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full"
            style={{ background: `${meta.color}22`, color: meta.color }}
          >
            {meta.heading}
          </span>
          <div className="w-9" />
        </div>
        <h1 className="text-2xl font-black text-[var(--text-primary)] font-jakarta leading-tight">Select Your Entity</h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">Choose the organisation you represent</p>

        {/* Search */}
        <div className="mt-4 h-11 bg-white/8 border border-white/15 rounded-2xl flex items-center gap-3 px-4 focus-within:border-[var(--forest-light)]/60 transition">
          <Search size={15} className="text-[var(--text-muted)] shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name or sector…"
            className="flex-1 bg-transparent outline-none text-sm font-medium text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
        </div>
      </div>

      {/* Entity list */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-2.5">
        <AnimatePresence mode="popLayout">
          {filtered.map((entity, i) => {
            const selected = entity.id === selectedId;
            return (
              <motion.button
                key={entity.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, delay: i * 0.03 }}
                onClick={() => setSelectedId(entity.id)}
                className={`w-full text-left rounded-2xl p-4 border transition-all ${
                  selected
                    ? 'bg-[var(--forest-light)]/15 border-[var(--forest-light)]/60 shadow-sm'
                    : 'bg-white/5 border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Logo tile */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-xs shrink-0"
                    style={{
                      background: selected ? 'var(--forest-light)' : 'var(--bg-tertiary)',
                      color: selected ? '#fff' : 'var(--text-secondary)',
                    }}
                  >
                    {entity.logoSeed}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-bold text-sm text-[var(--text-primary)] leading-tight">{entity.name}</h2>
                      {selected && <CheckCircle2 size={16} className="text-[var(--forest-light)] shrink-0 mt-0.5" />}
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)] font-semibold mt-0.5 uppercase tracking-wide">{entity.sector}</p>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-1 leading-relaxed line-clamp-1">
                      {entity.mandates.slice(0, 3).join(' · ')}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-3xl mb-3">🔍</div>
            <p className="font-bold text-sm text-[var(--text-primary)]">No entity found</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Continue CTA */}
      <div className="p-5 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)] to-transparent">
        <button
          onClick={handleContinue}
          disabled={!selectedId}
          className="w-full h-14 rounded-2xl bg-[var(--forest-deep)] text-white font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition disabled:opacity-40"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default OrgEntityPicker;
