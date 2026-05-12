import React, { useState } from 'react';
import { ChevronLeft, Bell, Info } from 'lucide-react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import Skeleton from '../../components/organization/Skeleton';
import { ScreenName } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';
import { useDelayedReady } from '../../hooks/useDelayedReady';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
}

interface ToggleRow {
  id: string;
  label: string;
  hint: string;
}

const NOTIFICATION_TOGGLES: ToggleRow[] = [
  { id: 'reporting', label: 'Reporting Reminders', hint: 'Alerts before report deadlines' },
  { id: 'kpi', label: 'KPI Threshold Alerts', hint: 'When a metric crosses a threshold' },
  { id: 'milestones', label: 'Program Milestones', hint: 'Updates on program progress' },
  { id: 'weekly', label: 'Weekly Digest', hint: 'Summary every Monday morning' },
];

const Toggle: React.FC<{ enabled: boolean; onToggle: () => void }> = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-11 h-6 rounded-full transition-all relative ${enabled ? 'bg-[var(--forest-light)]' : 'bg-white/15'}`}
    role="switch"
    aria-checked={enabled}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
);

const OrgSettings: React.FC<Props> = ({ onNavigate, onBack }) => {
  const { selectedEntity, onboarding, primaryKpi } = useOrgRoute();
  const ready = useDelayedReady(300);
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    reporting: true,
    kpi: true,
    milestones: false,
    weekly: true,
  });

  const toggleNotification = (id: string) => {
    setNotifications(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_SETTINGS} onNavigate={onNavigate}>
      <div className="h-full overflow-y-auto no-scrollbar">
        <div className="px-5 py-5 space-y-6 pb-8">
          <h1 className="text-2xl font-black text-[var(--text-primary)] font-jakarta">Settings</h1>

          {!ready ? (
            <div className="space-y-4">
              {[1,2,3].map(i => <Skeleton key={i} height={120} rounded="rounded-2xl" />)}
            </div>
          ) : (
            <>
              {/* Org Profile */}
              <section>
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3">Org Profile</p>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-[var(--forest-deep)] flex items-center justify-center font-black text-base text-white shrink-0">
                      {selectedEntity?.logoSeed ?? '??'}
                    </div>
                    <div>
                      <p className="font-black text-base text-[var(--text-primary)]">{selectedEntity?.name ?? 'Your Organisation'}</p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{selectedEntity?.sector}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-xs font-semibold text-[var(--text-muted)]">Sub-Role</span>
                      <span className="text-xs font-black text-[var(--text-primary)] uppercase">{selectedEntity?.subRole ?? '—'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-xs font-semibold text-[var(--text-muted)]">Primary KPI</span>
                      <span className="text-xs font-black text-[var(--text-primary)]">{primaryKpi || '—'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-xs font-semibold text-[var(--text-muted)]">Emirate</span>
                      <span className="text-xs font-black text-[var(--text-primary)]">{selectedEntity?.emirate ?? '—'}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Reporting Preferences */}
              <section>
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3">Reporting Preferences</p>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">Reporting Cadence</p>
                      <p className="text-[10px] text-[var(--text-muted)]">How often you file sustainability reports</p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-[var(--forest-light)]/15 text-[var(--forest-light)] text-xs font-black">
                      {onboarding.reportingCadence ?? 'Not set'}
                    </span>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">Engagement Style</p>
                      <p className="text-[10px] text-[var(--text-muted)]">Your commitment level to sustainability</p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-[var(--forest-light)]/15 text-[var(--forest-light)] text-xs font-black">
                      {onboarding.engagementStyle ?? 'Not set'}
                    </span>
                  </div>
                </div>
              </section>

              {/* Impact Focus Areas */}
              {onboarding.selectedImpactAreas.length > 0 && (
                <section>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3">Impact Focus Areas</p>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="flex flex-wrap gap-2">
                      {onboarding.selectedImpactAreas.map(area => (
                        <span key={area} className="px-3 py-1.5 rounded-full bg-[var(--forest-light)]/15 text-[var(--forest-light)] text-xs font-black uppercase tracking-wide border border-[var(--forest-light)]/30">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Notifications */}
              <section>
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3">Notifications</p>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-4">
                  {NOTIFICATION_TOGGLES.map(t => (
                    <div key={t.id} className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[var(--text-primary)]">{t.label}</p>
                        <p className="text-[10px] text-[var(--text-muted)]">{t.hint}</p>
                      </div>
                      <Toggle enabled={notifications[t.id]} onToggle={() => toggleNotification(t.id)} />
                    </div>
                  ))}
                </div>
              </section>

              {/* About */}
              <section>
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3">About</p>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">App Version</span>
                    <span className="text-xs font-black text-[var(--text-primary)]">1.0.0-MVP</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">Platform</span>
                    <span className="text-xs font-black text-[var(--text-primary)]">Estidamaty Org Path</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">Data Mode</span>
                    <span className="text-xs font-black text-amber-400">Demo (In-memory)</span>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </OrganizationLayout>
  );
};

export default OrgSettings;
