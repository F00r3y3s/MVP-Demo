import React from 'react';
import OrgTopBar from './OrgTopBar';
import OrgBottomNav from './OrgBottomNav';
import { ScreenName } from '../../types';

interface Props {
  children: React.ReactNode;
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName, params?: any) => void;
  onSwitchPath?: () => void;
  noNav?: boolean;
}

const OrganizationLayout: React.FC<Props> = ({ children, activeScreen, onNavigate, onSwitchPath, noNav = false }) => {
  const switchPath = onSwitchPath ?? (() => onNavigate(ScreenName.HOME));

  return (
    <div className="relative h-full flex flex-col bg-[#EEF2EF] overflow-hidden">
      <OrgTopBar onNavigate={onNavigate} onSwitchPath={switchPath} />
      <div className="flex-1 overflow-hidden min-h-0">
        {children}
      </div>
      {!noNav && (
        <OrgBottomNav activeScreen={activeScreen} onNavigate={onNavigate} />
      )}
    </div>
  );
};

export default OrganizationLayout;
