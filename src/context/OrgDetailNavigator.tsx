import React, { createContext, useContext, useState, useCallback } from 'react';
import { OrgDetailFrame, ScreenName } from '../types';

interface OrgDetailNavigatorValue {
  activeFrame: OrgDetailFrame | null;
  stack: OrgDetailFrame[];
  openWidgetDetail: (widgetId: string) => void;
  openCustomDetail: (screen: ScreenName, params?: Record<string, string>) => void;
  popDetail: () => void;
  clearStack: () => void;
}

const OrgDetailNavigatorContext = createContext<OrgDetailNavigatorValue | null>(null);

export const OrgDetailNavigatorProvider: React.FC<{
  children: React.ReactNode;
  onNavigate: (screen: ScreenName) => void;
  onBack: () => void;
}> = ({ children, onNavigate, onBack }) => {
  const [stack, setStack] = useState<OrgDetailFrame[]>([]);

  const openWidgetDetail = useCallback((widgetId: string) => {
    const frame: OrgDetailFrame = {
      kind: 'widget',
      screen: ScreenName.ORG_WIDGET_DETAIL,
      params: { widgetId },
    };
    setStack(s => [...s, frame]);
    onNavigate(ScreenName.ORG_WIDGET_DETAIL);
  }, [onNavigate]);

  const openCustomDetail = useCallback((screen: ScreenName, params: Record<string, string> = {}) => {
    const frame: OrgDetailFrame = { kind: 'custom', screen, params };
    setStack(s => [...s, frame]);
    onNavigate(screen);
  }, [onNavigate]);

  const popDetail = useCallback(() => {
    setStack(s => s.slice(0, -1));
    onBack();
  }, [onBack]);

  const clearStack = useCallback(() => {
    setStack([]);
  }, []);

  const activeFrame = stack.length > 0 ? stack[stack.length - 1] : null;

  return (
    <OrgDetailNavigatorContext.Provider value={{ activeFrame, stack, openWidgetDetail, openCustomDetail, popDetail, clearStack }}>
      {children}
    </OrgDetailNavigatorContext.Provider>
  );
};

export function useOrgDetailNavigation(): OrgDetailNavigatorValue {
  const ctx = useContext(OrgDetailNavigatorContext);
  if (!ctx) throw new Error('useOrgDetailNavigation must be inside OrgDetailNavigatorProvider');
  return ctx;
}
