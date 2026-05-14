import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Banknote,
  CheckCircle2,
  ChevronRight,
  Coins,
  Gift,
  Medal,
  ShieldCheck,
  Sparkles,
  Trophy,
  TrendingUp,
  WalletCards,
} from 'lucide-react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import OrgChart from '../../components/organization/OrgChart';
import { lightChartOptions, OrgSectionCard } from '../../components/organization/OrgCommandComponents';
import { ScreenName } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
}

type RewardTab = 'wallet' | 'grants' | 'recognition';

const rewardTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [1.4, 1.8, 2.1, 2.4, 2.8, 3.1],
      borderColor: '#F59E0B',
      backgroundColor: 'rgba(245,158,11,.16)',
      borderWidth: 2.5,
      fill: true,
      tension: 0.42,
      pointRadius: 3,
      pointBackgroundColor: '#F59E0B',
      pointBorderColor: '#fff',
      pointBorderWidth: 1.5,
    },
  ],
};

const rewardMixData = {
  labels: ['Grants', 'Recognition', 'WDA Pool', 'Partner Benefits'],
  datasets: [
    {
      data: [42, 18, 28, 12],
      backgroundColor: ['#065F46', '#F59E0B', '#7C3AED', '#0284C7'],
      borderWidth: 0,
    },
  ],
};

const rewards = [
  { title: 'Federal Green Performance Grant', value: 'AED 2.4M', status: 'Eligible', icon: Trophy, progress: 86, color: '#065F46' },
  { title: 'Clean Energy Recognition', value: 'Q2 shortlist', status: 'Pending review', icon: Award, progress: 72, color: '#F59E0B' },
  { title: 'Behavior Change Incentive Pool', value: '412K WDA', status: 'Ready to allocate', icon: WalletCards, progress: 91, color: '#7C3AED' },
];

const grants = [
  { title: 'Smart Building Retrofit Match', amount: 'AED 900K', stage: 'Evidence approved', due: '20 May' },
  { title: 'Water Efficiency Innovation Fund', amount: 'AED 640K', stage: 'Finance review', due: '29 May' },
  { title: 'EV Corridor Community Credit', amount: 'AED 310K', stage: 'Partner signatures', due: '03 Jun' },
];

const recognition = [
  { title: 'National Net Zero Contributor', rank: '#2', score: '94.1' },
  { title: 'Verified Action Champion', rank: '#1', score: '98.6' },
  { title: 'Water Security Partner', rank: '#4', score: '88.2' },
];

const readinessRows = [
  { label: 'Verified data coverage', value: '91%', color: '#065F46' },
  { label: 'Audit queue cleared', value: '74%', color: '#0284C7' },
  { label: 'Finance approval', value: '63%', color: '#F59E0B' },
];

const OrgRewards: React.FC<Props> = ({ onNavigate }) => {
  const { selectedEntity } = useOrgRoute();
  const shortName = selectedEntity?.shortName ?? 'MOEI';
  const [activeTab, setActiveTab] = useState<RewardTab>('wallet');

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_REWARDS} onNavigate={onNavigate}>
      <div className="h-full overflow-y-auto no-scrollbar bg-[#EEF2EF]">
        <div className="space-y-3 px-3.5 py-3 pb-28">
          <header className="overflow-hidden rounded-[30px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.07),0_12px_28px_rgba(15,23,42,0.06)]">
            <div className="bg-gradient-to-br from-[#1F2937] via-[#064E3B] to-[#047857] p-4 text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/62">Reward Center</p>
                  <h1 className="mt-1 font-jakarta text-[26px] font-black leading-none">{shortName} Incentives</h1>
                  <p className="mt-2 max-w-[250px] text-[11px] font-semibold leading-5 text-white/76">
                    Grants, WDA pools, recognition pathways, and partner benefits tied to verified organization impact.
                  </p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/16">
                  <Gift size={24} strokeWidth={2.6} />
                </div>
              </div>

              <div className="mt-5 rounded-[24px] bg-white/12 p-4">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-wider text-white/60">Available incentives</p>
                    <div className="mt-1 font-jakarta text-[46px] font-black leading-none tracking-[-0.08em]">3.1M</div>
                    <p className="mt-1 text-[11px] font-semibold text-white/70">WDA-equivalent organization rewards</p>
                  </div>
                  <div className="rounded-2xl bg-white px-3 py-2 text-right text-[#065F46]">
                    <p className="text-[9px] font-black uppercase">Ready</p>
                    <p className="text-[20px] font-black leading-none">AED 2.4M</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-3 gap-2">
            <RewardStat icon={Banknote} label="Eligible grants" value="4" color="#065F46" />
            <RewardStat icon={Medal} label="Recognition" value="91%" color="#F59E0B" />
            <RewardStat icon={Coins} label="WDA pool" value="412K" color="#7C3AED" />
          </section>

          <section className="grid grid-cols-2 gap-2">
            <OrgSectionCard className="p-3.5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-black text-slate-900">Reward Growth</h2>
                  <p className="text-[9px] font-semibold text-slate-400">Incentive pool, AED M</p>
                </div>
                <TrendingUp size={17} className="text-amber-500" />
              </div>
              <OrgChart
                kind="line"
                data={rewardTrendData}
                height={146}
                options={{
                  ...lightChartOptions,
                  scales: {
                    x: { ticks: { color: '#94A3B8', font: { size: 8 } }, grid: { display: false }, border: { display: false } },
                    y: { display: false, min: 1, max: 3.4 },
                  },
                }}
              />
            </OrgSectionCard>

            <OrgSectionCard className="p-3.5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-black text-slate-900">Reward Mix</h2>
                  <p className="text-[9px] font-semibold text-slate-400">Current incentive sources</p>
                </div>
                <Sparkles size={17} className="text-slate-400" />
              </div>
              <OrgChart kind="doughnut" data={rewardMixData} height={146} options={{ ...lightChartOptions, scales: {}, cutout: '68%' }} />
            </OrgSectionCard>
          </section>

          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'wallet', label: 'Wallet', Icon: WalletCards },
              { id: 'grants', label: 'Grants', Icon: Banknote },
              { id: 'recognition', label: 'Awards', Icon: Trophy },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as RewardTab)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase transition ${
                  activeTab === tab.id
                    ? 'bg-[var(--forest-light)] text-white shadow-[0_6px_14px_rgba(16,185,129,.25)]'
                    : 'border border-slate-200 bg-white text-slate-500'
                }`}
              >
                <tab.Icon size={14} strokeWidth={2.6} />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'wallet' && (
            <section className="space-y-2">
              {rewards.map(item => {
                const Icon = item.icon;
                return (
                  <button key={item.title} type="button" className="w-full rounded-[22px] bg-white p-4 text-left shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)] active:scale-[0.99]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `${item.color}14`, color: item.color }}>
                        <Icon size={21} strokeWidth={2.6} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-black text-slate-900">{item.title}</h3>
                        <p className="mt-0.5 text-[10px] font-semibold text-slate-400">{item.status}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-black" style={{ color: item.color }}>{item.value}</div>
                        <ChevronRight size={14} className="ml-auto mt-1 text-slate-300" />
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full" style={{ width: `${item.progress}%`, backgroundColor: item.color }} />
                    </div>
                  </button>
                );
              })}
            </section>
          )}

          {activeTab === 'grants' && (
            <section className="space-y-2">
              {grants.map(grant => (
                <article key={grant.title} className="rounded-[22px] bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-black leading-snug text-slate-900">{grant.title}</h3>
                      <p className="mt-1 text-[10px] font-semibold text-slate-400">{grant.stage} · due {grant.due}</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black text-[var(--forest-medium)]">{grant.amount}</span>
                  </div>
                </article>
              ))}
            </section>
          )}

          {activeTab === 'recognition' && (
            <section className="space-y-2">
              {recognition.map(item => (
                <article key={item.title} className="rounded-[22px] bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                      <Award size={21} strokeWidth={2.6} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-black text-slate-900">{item.title}</h3>
                      <p className="mt-0.5 text-[10px] font-semibold text-slate-400">Recognition score {item.score}</p>
                    </div>
                    <div className="text-[22px] font-black text-amber-600">{item.rank}</div>
                  </div>
                </article>
              ))}
            </section>
          )}

          <OrgSectionCard className="p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-black text-slate-900">Release Readiness</h2>
                <p className="text-[9px] font-semibold text-slate-400">What must be verified before rewards unlock</p>
              </div>
              <ShieldCheck size={18} className="text-[var(--forest-medium)]" />
            </div>
            <div className="space-y-2.5">
              {readinessRows.map(row => (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600">{row.label}</span>
                    <span className="text-[10px] font-black" style={{ color: row.color }}>{row.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full" style={{ width: row.value, backgroundColor: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onNavigate(ScreenName.ORG_IMPACT)}
              className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 text-[10px] font-black text-[var(--forest-medium)] active:scale-[0.98]"
            >
              Review verified impact
              <ArrowRight size={12} strokeWidth={2.8} />
            </button>
          </OrgSectionCard>
        </div>
      </div>
    </OrganizationLayout>
  );
};

const RewardStat: React.FC<{ icon: React.FC<{ size?: number; strokeWidth?: number }>; label: string; value: string; color: string }> = ({ icon: Icon, label, value, color }) => (
  <OrgSectionCard className="p-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}14`, color }}>
      <Icon size={17} strokeWidth={2.6} />
    </div>
    <div className="mt-2 text-[22px] font-black leading-none text-slate-950">{value}</div>
    <div className="mt-1 text-[8px] font-black uppercase leading-tight text-slate-400">{label}</div>
  </OrgSectionCard>
);

export default OrgRewards;
