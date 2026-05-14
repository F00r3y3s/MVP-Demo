import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  Newspaper,
  Radio,
  Repeat2,
  Send,
  Share2,
  TrendingUp,
  Users,
} from 'lucide-react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import OrgChart from '../../components/organization/OrgChart';
import { lightChartOptions, OrgSectionCard } from '../../components/organization/OrgCommandComponents';
import { ScreenName } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
}

type GreenShareTab = 'feed' | 'articles' | 'events';

const shareTrendData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [28, 34, 31, 42, 48, 45, 57],
      borderColor: '#059669',
      backgroundColor: 'rgba(5,150,105,.12)',
      borderWidth: 2.5,
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: '#059669',
      pointBorderColor: '#fff',
      pointBorderWidth: 1.5,
    },
  ],
};

const contentMixData = {
  labels: ['Articles', 'Events', 'Challenges', 'Partner Posts'],
  datasets: [
    {
      data: [34, 24, 26, 16],
      backgroundColor: ['#065F46', '#0284C7', '#F59E0B', '#7C3AED'],
      borderWidth: 0,
    },
  ],
};

const posts = [
  { title: 'Smart Grid Coverage passed 72%', meta: 'Infrastructure team · 18 min ago', stat: '+4.1%', tag: 'Infrastructure' },
  { title: 'Green commute challenge expanded to Sharjah', meta: 'People team · 1 hour ago', stat: '21K joined', tag: 'Community' },
  { title: 'Water saving nudges reached 842M L this month', meta: 'AI Agent · 3 hours ago', stat: '+6.1%', tag: 'Water' },
];

const articles = [
  { title: 'How federal teams can verify Scope 3 behavior data', category: 'Guide', read: '6 min', impact: 'MRV ready' },
  { title: 'Inside the UAE smart building retrofit playbook', category: 'Case study', read: '8 min', impact: '14.1K t CO2e' },
  { title: 'Designing community nudges that keep working after campaigns end', category: 'Research', read: '5 min', impact: '87.6% success' },
];

const events = [
  { title: 'National Green Teams Assembly', date: '22 May', attendees: '1,240', type: 'Hybrid' },
  { title: 'Water Reuse Partner Lab', date: '28 May', attendees: '420', type: 'Workshop' },
  { title: 'EV Corridor Volunteer Weekend', date: '01 Jun', attendees: '3,800', type: 'Field event' },
];

const activityRows = [
  { label: 'Official posts shared', value: '42K', change: '+9.8%' },
  { label: 'Partner organizations active', value: '128', change: '+6' },
  { label: 'Community actions sparked', value: '1.84M', change: '+12.2%' },
];

const OrgGreenShare: React.FC<Props> = ({ onNavigate }) => {
  const { selectedEntity } = useOrgRoute();
  const shortName = selectedEntity?.shortName ?? 'MOEI';
  const [activeTab, setActiveTab] = useState<GreenShareTab>('feed');

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_GREEN_SHARE} onNavigate={onNavigate}>
      <div className="h-full overflow-y-auto no-scrollbar bg-[#EEF2EF]">
        <div className="space-y-3 px-3.5 py-3 pb-28">
          <header className="rounded-[28px] bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#0E7490] p-4 text-white shadow-[0_14px_34px_rgba(6,78,59,.22)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/65">Green Share</p>
                <h1 className="mt-1 font-jakarta text-[26px] font-black leading-none">{shortName} Network</h1>
                <p className="mt-2 max-w-[250px] text-[11px] font-semibold leading-5 text-white/78">
                  Publish verified impact stories, coordinate community events, and turn organization wins into shared action.
                </p>
              </div>
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/16">
                <Radio size={23} strokeWidth={2.6} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-300" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <HeroStat icon={Users} label="Partners" value="128" />
              <HeroStat icon={Repeat2} label="Shares" value="42K" />
              <HeroStat icon={MessageCircle} label="Mentions" value="1.8K" />
            </div>
          </header>

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--forest-light)] py-3 text-sm font-black uppercase tracking-wide text-white shadow-[0_10px_22px_rgba(16,185,129,.24)] active:scale-[0.98]">
            <Send size={16} />
            Share organization update
          </button>

          <section className="grid grid-cols-2 gap-2">
            <OrgSectionCard className="p-3.5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-black text-slate-900">Engagement Pulse</h2>
                  <p className="text-[9px] font-semibold text-slate-400">7-day verified reach</p>
                </div>
                <TrendingUp size={17} className="text-[var(--forest-medium)]" />
              </div>
              <OrgChart
                kind="line"
                data={shareTrendData}
                height={146}
                options={{
                  ...lightChartOptions,
                  scales: {
                    x: { ticks: { color: '#94A3B8', font: { size: 8 } }, grid: { display: false }, border: { display: false } },
                    y: { display: false, min: 20, max: 62 },
                  },
                }}
              />
            </OrgSectionCard>

            <OrgSectionCard className="p-3.5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-black text-slate-900">Content Mix</h2>
                  <p className="text-[9px] font-semibold text-slate-400">What the network shares</p>
                </div>
                <Share2 size={17} className="text-slate-400" />
              </div>
              <OrgChart kind="doughnut" data={contentMixData} height={146} options={{ ...lightChartOptions, scales: {}, cutout: '68%' }} />
            </OrgSectionCard>
          </section>

          <section className="grid grid-cols-3 gap-2">
            {activityRows.map(row => (
              <OrgSectionCard key={row.label} className="p-2.5">
                <div className="text-[17px] font-black leading-none text-slate-950">{row.value}</div>
                <div className="mt-1 min-h-[24px] text-[8px] font-black uppercase leading-tight text-slate-400">{row.label}</div>
                <div className="mt-1 flex items-center gap-1 text-[9px] font-black text-[var(--forest-medium)]">
                  <TrendingUp size={10} strokeWidth={3} />
                  {row.change}
                </div>
              </OrgSectionCard>
            ))}
          </section>

          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'feed', label: 'Feed', Icon: Radio },
              { id: 'articles', label: 'Articles', Icon: Newspaper },
              { id: 'events', label: 'Events', Icon: CalendarDays },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as GreenShareTab)}
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

          {activeTab === 'feed' && (
            <section className="space-y-2">
              {posts.map(post => (
                <OrgFeedCard key={post.title} {...post} />
              ))}
            </section>
          )}

          {activeTab === 'articles' && (
            <section className="space-y-2">
              {articles.map(article => (
                <article key={article.title} className="rounded-[22px] bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--forest-medium)]">
                      <BookOpen size={20} strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[8px] font-black uppercase text-slate-500">{article.category}</span>
                        <span className="text-[9px] font-bold text-slate-400">{article.read}</span>
                      </div>
                      <h3 className="mt-2 text-sm font-black leading-snug text-slate-900">{article.title}</h3>
                      <p className="mt-1 text-[10px] font-semibold text-[var(--forest-medium)]">{article.impact}</p>
                    </div>
                    <ArrowRight size={16} className="mt-1 text-slate-300" />
                  </div>
                </article>
              ))}
            </section>
          )}

          {activeTab === 'events' && (
            <section className="space-y-2">
              {events.map(event => (
                <article key={event.title} className="rounded-[22px] bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] text-center">
                        <span className="text-[13px] font-black leading-none text-slate-900">{event.date.split(' ')[0]}</span>
                        <span className="text-[8px] font-black uppercase text-slate-400">{event.date.split(' ')[1]}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-black leading-snug text-slate-900">{event.title}</h3>
                        <p className="mt-1 text-[10px] font-semibold text-slate-400">{event.type} · {event.attendees} attendees</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black text-[var(--forest-medium)]">Open</span>
                  </div>
                </article>
              ))}
            </section>
          )}

          <OrgSectionCard className="p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-black text-slate-900">Connected Actions</h2>
                <p className="text-[9px] font-semibold text-slate-400">What Green Share is driving next</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate(ScreenName.ORG_PROGRAMS)}
                className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black text-[var(--forest-medium)]"
              >
                Targets
                <ArrowRight size={11} strokeWidth={2.8} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Publish Q2 impact article', 'Recruit EV corridor hosts', 'Invite water reuse partners', 'Launch verified story pack'].map((item, index) => (
                <div key={item} className="rounded-2xl bg-[#F8FAFC] p-3">
                  <CheckCircle2 size={15} className={index < 2 ? 'text-[var(--forest-medium)]' : 'text-slate-300'} />
                  <p className="mt-2 text-[10px] font-black leading-snug text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </OrgSectionCard>
        </div>
      </div>
    </OrganizationLayout>
  );
};

const HeroStat: React.FC<{ icon: React.FC<{ size?: number; strokeWidth?: number; className?: string }>; label: string; value: string }> = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl bg-white/14 p-3">
    <Icon size={16} strokeWidth={2.6} className="text-white/80" />
    <div className="mt-2 text-[25px] font-black leading-none">{value}</div>
    <div className="mt-1 text-[8px] font-black uppercase tracking-wide text-white/62">{label}</div>
  </div>
);

const OrgFeedCard: React.FC<{ title: string; meta: string; stat: string; tag: string }> = ({ title, meta, stat, tag }) => (
  <article className="rounded-[22px] bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_8px_18px_rgba(15,23,42,0.05)]">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-black uppercase text-[var(--forest-medium)]">{tag}</span>
          <span className="text-[9px] font-semibold text-slate-400">{meta}</span>
        </div>
        <h3 className="text-sm font-black leading-snug text-slate-900">{title}</h3>
      </div>
      <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black text-[var(--forest-medium)]">{stat}</span>
    </div>
    <div className="mt-3 flex gap-2 text-[10px] font-black uppercase tracking-wide text-slate-400">
      <span>BCI</span>
      <span>Net Zero 2050</span>
      <span>Verified</span>
    </div>
  </article>
);

export default OrgGreenShare;
