import React, { useState } from 'react';
import OrganizationLayout from '../../components/organization/OrganizationLayout';
import Skeleton from '../../components/organization/Skeleton';
import { ScreenName } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';
import { useScrollPreservation } from '../../context/ScrollPositionContext';
import { useDelayedReady } from '../../hooks/useDelayedReady';

// New Components
import OrgHeroHeader from '../../components/organization/OrgHeroHeader';
import OrgBCICard from '../../components/organization/OrgBCICard';
import OrgQuickStats from '../../components/organization/OrgQuickStats';
import OrgImpactGoals from '../../components/organization/OrgImpactGoals';
import OrgEmiratesPerformance from '../../components/organization/OrgEmiratesPerformance';
import OrgInfrastructureProgress from '../../components/organization/OrgInfrastructureProgress';
import OrgAIActivity from '../../components/organization/OrgAIActivity';
import OrgPolicySimulator from '../../components/organization/OrgPolicySimulator';
import OrgESGOverview from '../../components/organization/OrgESGOverview';
import OrgInfraStrip from '../../components/organization/OrgInfraStrip';
import { OrgMetricSheet } from '../../components/organization/OrgCommandComponents';
import type { OrgKpiId } from '../../data/orgCommandCenter';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
}

const OrgDashboard: React.FC<Props> = ({ onNavigate }) => {
  const { selectedEntity } = useOrgRoute();
  const ready = useDelayedReady(300);
  const scrollRef = useScrollPreservation(ScreenName.ORG_DASHBOARD);
  const [activeSheet, setActiveSheet] = useState<OrgKpiId | 'bci-info' | 'emirates' | null>(null);

  return (
    <OrganizationLayout activeScreen={ScreenName.ORG_DASHBOARD} onNavigate={onNavigate}>
      <div ref={scrollRef} className="h-full overflow-y-auto no-scrollbar bg-[#EEF2EF]">
        
        {/* Phase 1: Header + Filter Row */}
        <OrgHeroHeader onNavigate={onNavigate} />

        {!ready ? (
          <div className="px-3.5 space-y-2 pb-3">
            <Skeleton height={120} rounded="rounded-2xl" />
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} height={108} rounded="rounded-xl" />
              ))}
            </div>
          </div>
        ) : (
          <div className="pb-3 space-y-2">
            
            {/* Phase 2: SDG, BCI & Quick Stats */}
            <OrgImpactGoals onNavigate={onNavigate} />
            <OrgBCICard onInfo={() => setActiveSheet('bci-info')} onOpen={() => onNavigate(ScreenName.ORG_BCI_INDEX)} />
            <OrgQuickStats onOpenMetric={setActiveSheet} />

            {/* Phase 3: Operational Widgets */}
            <div className="grid auto-rows-[minmax(178px,auto)] grid-cols-2 gap-2 px-3.5">
              <OrgInfrastructureProgress />
              <OrgEmiratesPerformance onOpenMap={() => setActiveSheet('emirates')} />
              <OrgESGOverview onNavigate={onNavigate} />
              <OrgPolicySimulator onNavigate={onNavigate} />
              <OrgAIActivity onNavigate={onNavigate} />
            </div>

            {/* Phase 5: Connected Infrastructure */}
            <OrgInfraStrip />
            
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => onNavigate(ScreenName.ORG_AI_CHAT)}
        className="group absolute bottom-36 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0F172A] text-white shadow-[0_10px_30px_rgba(15,23,42,0.4)] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Open organization AI chat"
      >
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <i className="fas fa-comment-dots text-xl transition-transform group-hover:rotate-12" />
        <div className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full border-2 border-[#0F172A] bg-red-500" />
      </button>
      <OrgMetricSheet activeId={activeSheet} onClose={() => setActiveSheet(null)} />
    </OrganizationLayout>
  );
};

export default OrgDashboard;
