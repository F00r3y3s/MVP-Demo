import React, { useMemo, useState } from 'react';
import { Play, Share, Zap, Droplets, Cloud, Users } from 'lucide-react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import { ScreenName } from '../../types';
import { POLICY_DATA, type PolicyKey } from '../../data/orgCommandCenter';
import { OrgScreenShell, OrgSectionCard } from '../../components/organization/OrgCommandComponents';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

const sliderMult = (value: number) => 0.4 + (value / 10) * 1.6;
const intensityLabel = (value: number) => `${value <= 3 ? 'Low' : value <= 7 ? 'Medium' : 'High'} (${value})`;

const OrgPolicySimulatorScreen: React.FC<Props> = ({ onNavigate }) => {
  const [policy, setPolicy] = useState<PolicyKey>('water');
  const [intensity, setIntensity] = useState(5);
  const [history, setHistory] = useState<Array<{ label: string; time: string; intensity: string }>>([]);

  const results = useMemo(() => {
    const item = POLICY_DATA[policy];
    const mult = sliderMult(intensity);
    const fmtWater = (value: number) => {
      const scaled = value * mult;
      return scaled >= 1000 ? `${(scaled / 1000).toFixed(1)}B L` : `${scaled.toFixed(1)}M L`;
    };
    const fmtEnergy = (value: number) => {
      const scaled = value * mult;
      return scaled >= 1000 ? `${(scaled / 1000).toFixed(1)}M kWh` : `${Math.round(scaled)}K kWh`;
    };
    const fmtCarbon = (value: number) => {
      const scaled = value * mult;
      return scaled >= 1000 ? `${(scaled / 1000).toFixed(1)}K t` : `${scaled.toFixed(1)}K t`;
    };
    const fmtUsers = (value: number) => {
      const scaled = value * mult;
      return scaled >= 100 ? `${Math.round(scaled)}K` : `${Math.round(scaled * 10) / 10}K`;
    };

    return [
      { label: 'Water Saved', value: fmtWater(item.water), icon: Droplets, bg: '#ECFDF5', color: '#065F46' },
      { label: 'Energy Saved', value: fmtEnergy(item.energy), icon: Zap, bg: '#FFFBEB', color: '#D97706' },
      { label: 'CO2 Avoided', value: fmtCarbon(item.carbon), icon: Cloud, bg: '#F0FDF4', color: '#16A34A' },
      { label: 'Engaged', value: fmtUsers(item.users), icon: Users, bg: '#F5F3FF', color: '#7C3AED' },
    ];
  }, [intensity, policy]);

  const runSimulation = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setHistory(items => [{ label: POLICY_DATA[policy].label, time, intensity: intensityLabel(intensity) }, ...items].slice(0, 5));
  };

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_POLICY_SIMULATOR} onNavigate={onNavigate}>
      <OrgScreenShell>
        <div className="rounded-2xl bg-gradient-to-br from-[#92400e] to-[#b45309] p-4 text-white shadow-[0_8px_24px_rgba(146,64,14,.3)]">
          <div className="text-[10px] font-black uppercase tracking-[0.05em] text-white/75">Policy Impact Simulator</div>
          <h1 className="mt-1 text-[17px] font-black">Project the 30-day impact</h1>
          <p className="mt-0.5 text-[11px] font-medium text-white/75">of any policy intervention across UAE</p>
        </div>

        <OrgSectionCard className="mt-2 p-3.5">
          <label className="mb-2 block text-[11px] font-black text-slate-600">Policy Challenge</label>
          <select
            value={policy}
            onChange={event => setPolicy(event.target.value as PolicyKey)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-[#EEF2EF] px-3 text-xs font-bold text-slate-800 outline-none"
          >
            {Object.entries(POLICY_DATA).map(([key, item]) => (
              <option key={key} value={key}>{item.label}</option>
            ))}
          </select>

          <div className="mt-3">
            <div className="mb-1.5 flex justify-between text-[10px] font-bold text-slate-500">
              <span>Intervention Intensity</span>
              <span className="text-[var(--forest-medium)]">{intensityLabel(intensity)}</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={intensity}
              onChange={event => setIntensity(Number(event.target.value))}
              className="w-full accent-[var(--forest-medium)]"
            />
          </div>

          <div className="mt-3 text-[10px] font-black uppercase tracking-[0.04em] text-slate-400">Projected 30-Day Impact</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {results.map(result => {
              const Icon = result.icon;
              return (
                <div key={result.label} className="rounded-2xl p-3 text-center" style={{ backgroundColor: result.bg }}>
                  <Icon size={16} className="mx-auto mb-1" style={{ color: result.color }} />
                  <div className="text-lg font-black leading-none tracking-[-0.03em]" style={{ color: result.color }}>{result.value}</div>
                  <div className="mt-1 text-[9px] font-bold text-slate-500">{result.label}</div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={runSimulation}
            className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#D97706] to-[#B45309] text-sm font-black text-white shadow-lg active:scale-[0.98]"
          >
            <Play size={15} fill="currentColor" />
            Run Full Simulation
          </button>
        </OrgSectionCard>

        <OrgSectionCard className="mt-2 p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-900">Simulation History</h3>
            <button type="button" className="flex items-center gap-1 text-[10px] font-black text-[var(--forest-medium)]">
              Export
              <Share size={11} />
            </button>
          </div>
          {history.length === 0 ? (
            <div className="py-5 text-center text-[11px] font-semibold text-slate-400">Run a simulation to see history</div>
          ) : (
            <div className="space-y-2">
              {history.map(item => (
                <div key={`${item.label}-${item.time}`} className="rounded-xl bg-[#EEF2EF] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-[11px] font-black text-slate-900">{item.label}</div>
                    <div className="text-[9px] font-semibold text-slate-400">{item.time}</div>
                  </div>
                  <div className="mt-1 text-[10px] font-semibold text-slate-500">{item.intensity} intensity · 30-day projection complete</div>
                </div>
              ))}
            </div>
          )}
        </OrgSectionCard>
      </OrgScreenShell>
    </OrganizationLayout>
  );
};

export default OrgPolicySimulatorScreen;
