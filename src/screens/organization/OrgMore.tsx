import React from 'react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import { ScreenName } from '../../types';
import { MoreRow, OrgScreenShell } from '../../components/organization/OrgCommandComponents';
import { useOrgRoute } from '../../context/OrgRouteContext';
import uaeOfficialEmblem from '../../assets/uae-official-emblem.svg';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

const roleLabels = {
  guardian: 'Guardian',
  pioneer: 'Pioneer',
  advocate: 'Advocate',
  visionary: 'Visionary',
} as const;

const OrgMore: React.FC<Props> = ({ onNavigate }) => {
  const { selectedEntity } = useOrgRoute();
  const shortName = selectedEntity?.shortName ?? 'MOEI';
  const entityName = selectedEntity?.name ?? 'Ministry of Energy & Infrastructure';
  const roleLabel = selectedEntity?.subRole ? roleLabels[selectedEntity.subRole] : 'Guardian';
  const sector = selectedEntity?.sector ?? 'Federal · Energy & Infrastructure';
  const rows: React.ComponentProps<typeof MoreRow>[] = [
    { icon: 'Building2', title: 'Organization Profile', subtitle: entityName },
    { icon: 'Link2', title: 'Data Integrations', subtitle: '5 connected · 1 pending' },
    { icon: 'AlertTriangle', title: 'Alerts & Notifications', subtitle: '3 active triggers' },
    { icon: 'FileBarChart', title: 'Export Reports', subtitle: 'PDF · Excel · CSV · GRI XML' },
    { icon: 'Settings', title: 'API & Developer Access', subtitle: 'REST API · Webhooks · SDK' },
    { icon: 'ShieldCheck', title: 'Reporting Frameworks', subtitle: 'TCFD · GRI · SBTi · CDP · ISO 14001' },
    { icon: 'Accessibility', title: 'POD Settings', subtitle: 'Visual · Motor · Cognitive · Hearing', onClick: () => onNavigate(ScreenName.POD_SETTINGS) },
    { icon: 'HelpCircle', title: 'Help & Support', subtitle: 'Docs · Contact · Live chat' },
  ];

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_MORE} onNavigate={onNavigate}>
      <OrgScreenShell>
        <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[var(--forest-medium)] to-teal-600 p-4 text-white shadow-[0_8px_24px_rgba(6,95,70,.3)]">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/25 p-2">
            <img src={uaeOfficialEmblem} alt={`${shortName} logo`} className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-black">{shortName}</h1>
            <p className="mt-1 truncate text-[11px] font-semibold text-white/85">{roleLabel} · {sector}</p>
            <p className="mt-0.5 truncate text-[10px] font-medium text-white/70">{entityName}</p>
          </div>
        </div>

        <div className="mt-2 space-y-2">
          {rows.map(row => (
            <MoreRow key={row.title} icon={row.icon} title={row.title} subtitle={row.subtitle} onClick={row.onClick} />
          ))}
        </div>

        <div className="py-4 text-center text-[10px] font-semibold leading-relaxed text-slate-400">
          Estidamaty v3.1.0 · Build 2025.05.20<br />
          Powered by UAE MoEI Digital Office
        </div>
      </OrgScreenShell>
    </OrganizationLayout>
  );
};

export default OrgMore;
