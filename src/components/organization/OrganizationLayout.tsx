import React from 'react';
import OrgTopBar from './OrgTopBar';
import OrgBottomNav from './OrgBottomNav';
import { ScreenName } from '../../types';

interface Props {
  children: React.ReactNode;
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  noNav?: boolean;
}

const OrganizationLayout: React.FC<Props> = ({ children, activeScreen, onNavigate, noNav = false }) => {
  return (
    <div className="h-full flex flex-col bg-[#EEF2EF] overflow-hidden">
      <OrgTopBar />
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
