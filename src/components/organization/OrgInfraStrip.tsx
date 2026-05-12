import React from 'react';
import { ArrowRight, Fingerprint, Zap, Droplets, Activity, Car, Building2, Fuel } from 'lucide-react';

const INTEGRATIONS = [
  { id: 'uaepass', name: 'UAE Pass', status: 'Verified', icon: Fingerprint, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'dewa', name: 'DEWA', status: 'Connected', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'sewa', name: 'SEWA', status: 'Connected', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'smartmeters', name: 'Smart Meters', status: 'Connected', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'ev', name: 'EV Network', status: 'Connected', icon: Car, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'estidama', name: 'Estidama', status: 'Pending', icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'adnoc', name: 'ADNOC', status: 'Pending', icon: Fuel, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const OrgInfraStrip: React.FC = () => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between px-3.5 pb-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.06em] text-slate-400">Connected Infrastructure</h3>
        <button className="flex items-center gap-1 text-[10px] font-bold text-[var(--forest-medium)] group p-2 -mr-2 active:opacity-70 transition-opacity">
          View all
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar px-3.5 pb-3">
        {INTEGRATIONS.map(item => {
          const Icon = item.icon;
          const isVerified = item.status === 'Verified';
          return (
            <button key={item.id} type="button" className="min-w-[74px] flex-shrink-0 rounded-xl border border-transparent bg-white px-2.5 py-2.5 text-center shadow-[0_1px_3px_rgba(0,0,0,.06)] active:scale-95">
              <div className={`mx-auto w-9 h-9 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                <Icon size={18} strokeWidth={2.5} />
              </div>
              <p className="mt-1.5 truncate text-[9px] font-black text-slate-900">{item.name}</p>
              <p className={`mt-0.5 text-[8px] font-black ${isVerified || item.status === 'Connected' ? 'text-[var(--forest-medium)]' : 'text-amber-600'}`}>{item.status}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrgInfraStrip;
