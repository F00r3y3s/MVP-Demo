import React, { useMemo, useState } from 'react';
import { ArrowRight, Cloud, Droplets, Gauge, LineChart, Play, Share, ShieldCheck, SlidersHorizontal, Users, Zap } from 'lucide-react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import OrgChart from '../../components/organization/OrgChart';
import { ScreenName } from '../../types';
import { POLICY_DATA, type PolicyKey } from '../../data/orgCommandCenter';
import { lightChartOptions, OrgScreenShell, OrgSectionCard } from '../../components/organization/OrgCommandComponents';
import { useOrgRoute } from '../../context/OrgRouteContext';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

const sliderMult = (value: number) => 0.4 + (value / 10) * 1.6;
const intensityLabel = (value: number) => `${value <= 3 ? 'Low' : value <= 7 ? 'Medium' : 'High'} (${value})`;

const POLICY_THEMES = {
  water: { color: '#0284C7', bg: 'from-[#075985] via-[#0369A1] to-[#0F766E]', Icon: Droplets },
  energy: { color: '#D97706', bg: 'from-[#7C2D12] via-[#B45309] to-[#065F46]', Icon: Zap },
  transport: { color: '#059669', bg: 'from-[#064E3B] via-[#047857] to-[#0F766E]', Icon: Users },
  waste: { color: '#7C3AED', bg: 'from-[#312E81] via-[#6D28D9] to-[#065F46]', Icon: ShieldCheck },
  solar: { color: '#F59E0B', bg: 'from-[#78350F] via-[#D97706] to-[#0F766E]', Icon: Zap },
  carbon: { color: '#16A34A', bg: 'from-[#14532D] via-[#15803D] to-[#0F766E]', Icon: Cloud },
};

const OrgPolicySimulatorScreen: React.FC<Props> = ({ onNavigate }) => {
  const { selectedEntity } = useOrgRoute();
  const shortName = selectedEntity?.shortName ?? 'MOEI';
  const [policy, setPolicy] = useState<PolicyKey>('water');
  const [intensity, setIntensity] = useState(5);
  const [history, setHistory] = useState<Array<{ label: string; time: string; intensity: string }>>([]);
  const activePolicy = POLICY_DATA[policy];
  const theme = POLICY_THEMES[policy];
  const ThemeIcon = theme.Icon;

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

  const projectionData = useMemo(() => {
    const mult = sliderMult(intensity);
    const base = [18, 26, 38, 51, 64, 76];
    return {
      labels: ['D1', 'D6', 'D12', 'D18', 'D24', 'D30'],
      datasets: [
        {
          data: base.map(value => Math.round(value * mult)),
          borderColor: theme.color,
          backgroundColor: `${theme.color}18`,
          borderWidth: 2.5,
          fill: true,
          tension: 0.42,
          pointRadius: 3,
          pointBackgroundColor: theme.color,
          pointBorderColor: '#fff',
          pointBorderWidth: 1.5,
        },
      ],
    };
  }, [intensity, theme.color]);

  const confidence = Math.min(96, Math.round(64 + intensity * 3.2));

  const runSimulation = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setHistory(items => [{ label: POLICY_DATA[policy].label, time, intensity: intensityLabel(intensity) }, ...items].slice(0, 5));
  };

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_POLICY_SIMULATOR} onNavigate={onNavigate}>
      <OrgScreenShell>
        <section className={`relative overflow-hidden rounded-[30px] bg-gradient-to-br ${theme.bg} p-4 text-white shadow-[0_14px_34px_rgba(15,23,42,.18)]`}>
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/14 blur-3xl" />
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/16">
                <ThemeIcon size={24} strokeWidth={2.7} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/60">Policy Impact Simulator</p>
                <h1 className="mt-1 text-[20px] font-black leading-none">Model the next 30 days</h1>
                <p className="mt-1 line-clamp-2 text-[10px] font-semibold leading-4 text-white/70">{shortName} intervention forecast with live behavior assumptions.</p>
              </div>
            </div>
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/14 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-white/72">
              <Gauge size={11} strokeWidth={3} />
              Live
            </span>
          </div>

          <div className="relative mt-4 grid grid-cols-[1fr_128px] gap-3">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/50">Active policy</p>
              <p className="mt-1 text-[17px] font-black leading-5">{activePolicy.label}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/14 px-2.5 py-1 text-[9px] font-black text-white/80">
                {intensityLabel(intensity)} intensity
              </div>
            </div>
            <div className="rounded-[22px] bg-white/12 p-2">
              <OrgChart
                kind="line"
                data={projectionData}
                height={118}
                options={{
                  ...lightChartOptions,
                  plugins: { legend: { display: false }, tooltip: lightChartOptions.plugins.tooltip },
                  scales: { x: { display: false }, y: { display: false } },
                }}
              />
            </div>
          </div>
        </section>

        <OrgSectionCard className="mt-2 p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-black text-slate-900">Policy Setup</h2>
              <p className="text-[9px] font-semibold text-slate-400">Tune the scenario before running the model</p>
            </div>
            <SlidersHorizontal size={18} className="text-slate-400" strokeWidth={2.6} />
          </div>

          <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-400">Policy Challenge</label>
          <select
            value={policy}
            onChange={event => setPolicy(event.target.value as PolicyKey)}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs font-bold text-slate-800 outline-none"
          >
            {Object.entries(POLICY_DATA).map(([key, item]) => (
              <option key={key} value={key}>{item.label}</option>
            ))}
          </select>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: 'Careful', value: 3 },
              { label: 'Balanced', value: 6 },
              { label: 'Aggressive', value: 9 },
            ].map(scenario => (
              <button
                key={scenario.label}
                type="button"
                onClick={() => setIntensity(scenario.value)}
                className={`rounded-2xl px-2 py-2 text-[9px] font-black uppercase tracking-tight transition-transform active:scale-95 ${
                  Math.abs(intensity - scenario.value) <= 1
                    ? 'text-white shadow-lg'
                    : 'bg-[#F8FAFC] text-slate-500'
                }`}
                style={Math.abs(intensity - scenario.value) <= 1 ? { backgroundColor: theme.color } : undefined}
              >
                {scenario.label}
              </button>
            ))}
          </div>

          <div className="mt-3">
            <div className="mb-1.5 flex justify-between text-[10px] font-bold text-slate-500">
              <span>Intervention Intensity</span>
              <span style={{ color: theme.color }}>{intensityLabel(intensity)}</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={intensity}
              onChange={event => setIntensity(Number(event.target.value))}
              className="w-full"
              style={{ accentColor: theme.color }}
            />
          </div>
        </OrgSectionCard>

        <OrgSectionCard className="mt-2 p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-slate-900">Projected Impact</h3>
              <p className="text-[9px] font-semibold text-slate-400">30-day outcome range at current intensity</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-black text-[var(--forest-medium)]">{confidence}% confidence</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {results.map(result => {
              const Icon = result.icon;
              return (
                <div key={result.label} className="rounded-2xl p-3" style={{ backgroundColor: result.bg }}>
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white/70">
                    <Icon size={16} style={{ color: result.color }} strokeWidth={2.7} />
                  </div>
                  <div className="text-lg font-black leading-none tracking-[-0.03em]" style={{ color: result.color }}>{result.value}</div>
                  <div className="mt-1 text-[9px] font-bold text-slate-500">{result.label}</div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={runSimulation}
            className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black text-white shadow-lg active:scale-[0.98]"
            style={{ backgroundColor: theme.color }}
          >
            <Play size={15} fill="currentColor" />
            Run Full Simulation
            <ArrowRight size={15} strokeWidth={2.8} />
          </button>
        </OrgSectionCard>

        <OrgSectionCard className="mt-2 p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-slate-900">Adoption Curve</h3>
              <p className="text-[9px] font-semibold text-slate-400">Projected lift across the intervention window</p>
            </div>
            <LineChart size={18} className="text-slate-400" strokeWidth={2.6} />
          </div>
          <OrgChart
            kind="line"
            data={projectionData}
            height={150}
            options={{
              ...lightChartOptions,
              scales: {
                x: { ticks: { color: '#94A3B8', font: { size: 8 } }, grid: { display: false }, border: { display: false } },
                y: { display: false },
              },
            }}
          />
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
