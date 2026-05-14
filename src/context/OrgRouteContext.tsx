import React, { createContext, useContext, useState, useCallback } from 'react';
import { OrgEntity, OrgOnboardingState, OrgSubRole } from '../types';

interface OrgRouteState {
  selectedSubRole: OrgSubRole | null;
  selectedEntity: OrgEntity | null;
  onboarding: OrgOnboardingState;
  primaryKpi: string;
}

const EMPTY_ONBOARDING: OrgOnboardingState = {
  strategicDream: '',
  impactGoals: [],
  operationalWishes: [],
  selectedImpactAreas: [],
  reportingCadence: null,
  engagementStyle: null,
  activitiesEvents: [],
};

interface OrgRouteContextValue extends OrgRouteState {
  setSubRole: (subRole: OrgSubRole) => void;
  setEntity: (entity: OrgEntity) => void;
  clearEntity: () => void;
  setOnboarding: (patch: Partial<OrgOnboardingState>) => void;
  setPrimaryKpi: (kpi: string) => void;
  resetAll: () => void;
}

const OrgRouteContext = createContext<OrgRouteContextValue | null>(null);

export const OrgRouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OrgRouteState>({
    selectedSubRole: null,
    selectedEntity: null,
    onboarding: EMPTY_ONBOARDING,
    primaryKpi: '',
  });

  const setSubRole = useCallback((subRole: OrgSubRole) => {
    setState(s => ({ ...s, selectedSubRole: subRole }));
  }, []);

  const setEntity = useCallback((entity: OrgEntity) => {
    setState(s => ({ ...s, selectedEntity: entity }));
  }, []);

  const clearEntity = useCallback(() => {
    setState(s => ({ ...s, selectedEntity: null }));
  }, []);

  const setOnboarding = useCallback((patch: Partial<OrgOnboardingState>) => {
    setState(s => ({ ...s, onboarding: { ...s.onboarding, ...patch } }));
  }, []);

  const setPrimaryKpi = useCallback((kpi: string) => {
    setState(s => ({ ...s, primaryKpi: kpi }));
  }, []);

  const resetAll = useCallback(() => {
    setState({ selectedSubRole: null, selectedEntity: null, onboarding: EMPTY_ONBOARDING, primaryKpi: '' });
  }, []);

  return (
    <OrgRouteContext.Provider value={{ ...state, setSubRole, setEntity, clearEntity, setOnboarding, setPrimaryKpi, resetAll }}>
      {children}
    </OrgRouteContext.Provider>
  );
};

export function useOrgRoute(): OrgRouteContextValue {
  const ctx = useContext(OrgRouteContext);
  if (!ctx) throw new Error('useOrgRoute must be used inside OrgRouteProvider');
  return ctx;
}
