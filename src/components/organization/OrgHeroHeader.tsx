import React, { useState } from 'react';
import { BadgeCheck, CalendarDays, ChevronDown, MapPin } from 'lucide-react';
import { useOrgRoute } from '../../context/OrgRouteContext';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const OrgHeroHeader: React.FC = () => {
  const { selectedEntity } = useOrgRoute();
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    emirate: 'All Emirates',
    sector: 'All Sectors',
    date: '20 May 2025',
  });
  const entityName = selectedEntity?.name && selectedEntity.name !== 'Unknown' ? selectedEntity.name : 'Ministry of Energy & Infrastructure';
  const logoSeed = selectedEntity?.logoSeed ?? selectedEntity?.shortName ?? 'MOEI';
  const sector = selectedEntity?.sector?.replace('Federal · ', '') ?? 'Energy & Infrastructure';

  return (
    <>
      <div className="bg-white px-3.5 py-3 border-b border-slate-200">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-slate-400 font-semibold mb-0.5">{getGreeting()},</p>
            <div className="flex items-start gap-1.5">
              <h2 className="font-black text-[17px] text-slate-900 leading-tight font-jakarta">{entityName}</h2>
              <BadgeCheck size={16} className="text-[var(--forest-light)] shrink-0 mt-0.5" fill="currentColor" color="white" />
            </div>
            <p className="text-[10px] text-slate-600 mt-1 font-medium leading-snug">Real-time behavioral intelligence for a sustainable UAE</p>
          </div>

          <div className="flex items-center gap-1.5 rounded-[10px] border border-emerald-200 bg-emerald-50 px-2 py-1.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-white border border-emerald-100 shadow-sm flex flex-col items-center justify-center overflow-hidden">
              <span className="text-[9px] leading-none">🇦🇪</span>
              <span className="mt-0.5 text-[9px] font-black text-[var(--forest-medium)] leading-none">{logoSeed}</span>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-black text-[var(--forest-medium)] uppercase leading-tight">United Arab Emirates</p>
              <p className="text-[8px] font-bold text-slate-500 leading-tight max-w-[74px]">{sector}</p>
              <p className="text-[8px] font-black text-slate-900 uppercase mt-0.5">Guardian</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 px-3.5 py-2 bg-white border-b border-slate-200">
        {[
          { id: 'emirate', icon: MapPin, value: filters.emirate, options: ['All Emirates', 'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Ras Al Khaimah'] },
          { id: 'sector', value: filters.sector, options: ['All Sectors', 'Energy', 'Water', 'Transport', 'Buildings'] },
          { id: 'date', icon: CalendarDays, value: filters.date, options: ['20 May 2025', 'April 2025', 'Q1 2025', '2024 Full Year'] },
        ].map(filter => {
          const Icon = filter.icon;
          const isOpen = openFilter === filter.id;
          return (
            <div key={filter.id} className="relative min-w-0">
              <button
                type="button"
                onClick={() => setOpenFilter(isOpen ? null : filter.id)}
                className={`min-w-0 h-9 w-full rounded-[9px] bg-[#EEF2EF] border px-2 text-[10px] font-bold text-slate-800 flex items-center justify-between gap-1 active:scale-[0.98] transition-transform ${isOpen ? 'border-[var(--forest-medium)]' : 'border-slate-200'}`}
              >
                {Icon && <Icon size={12} className="text-slate-400 shrink-0" />}
                <span className="truncate">{filter.value}</span>
                <ChevronDown size={11} className={`text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
    </>
  );
};

export default OrgHeroHeader;
