import React, { useState } from 'react';
import { ScreenName, SubRoleType } from './types';
import Layout from './components/Layout';
import { SplashScreen, OnboardingScreen } from './screens/Onboarding';
import SignupScreen from './screens/Signup';
import LoginScreen from './screens/Login';
import RoleSelectionScreen from './screens/RoleSelection';
import GoalInputScreen from './screens/GoalInput';
import HomeScreen from './screens/Home';
import CameraScreen from './screens/Camera';
import ChatScreen from './screens/Chat';
import CommunityScreen from './screens/Community';
import RewardsScreen from './screens/Rewards';
import WalletScreen from './screens/Wallet';
import ImpactScreen from './screens/Impact';
import ProfileScreen from './screens/Profile';
import TargetScreen from './screens/Target';
import FriendsScreen from './screens/Friends';
import SDGDetailsScreen from './screens/SDGDetails';
import MarketplaceScreen from './screens/Marketplace';
import PODSettingsScreen from './screens/PODSettings';
import AccessibilitySettings from './screens/AccessibilitySettings';

// Org-path screens
import OrgEntityPicker from './screens/organization/OrgEntityPicker';
import OrgOnboardingStrategicGoals from './screens/organization/OrgOnboardingStrategicGoals';
import OrgOnboardingImpactAreas from './screens/organization/OrgOnboardingImpactAreas';
import OrgOnboardingPace from './screens/organization/OrgOnboardingPace';
import OrgDashboard from './screens/organization/OrgDashboard';
import OrgWidgetDetail from './screens/organization/OrgWidgetDetail';
import OrgBCIIndex from './screens/organization/OrgBCIIndex';
import OrgAIAgent from './screens/organization/OrgAIAgent';
import OrgAIChat from './screens/organization/OrgAIChat';
import OrgPolicySimulatorScreen from './screens/organization/OrgPolicySimulatorScreen';
import OrgESGReports from './screens/organization/OrgESGReports';
import OrgSDGDetails from './screens/organization/OrgSDGDetails';
import OrgImpact from './screens/organization/OrgImpact';
import OrgPrograms from './screens/organization/OrgPrograms';
import OrgReports from './screens/organization/OrgReports';
import OrgPeople from './screens/organization/OrgPeople';
import OrgRewards from './screens/organization/OrgRewards';
import OrgGreenShare from './screens/organization/OrgGreenShare';
import OrgSettings from './screens/organization/OrgSettings';
import OrgMore from './screens/organization/OrgMore';

// Contexts
import { AccessibilityProvider } from './context/AccessibilityContext';
import { OrganizationProvider } from './context/OrganizationContext';
import { StreakProvider } from './context/StreakContext';
import { LevelProvider } from './context/LevelContext';
import { OrgRouteProvider } from './context/OrgRouteContext';
import { OrgDetailNavigatorProvider } from './context/OrgDetailNavigator';
import { ScrollPositionProvider } from './context/ScrollPositionContext';

const PlaceholderScreen: React.FC<{ name: string; onBack?: () => void }> = ({ name, onBack }) => (
  <div className="p-8 flex flex-col items-center justify-center h-full text-center">
    <div className="w-24 h-24 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center text-4xl text-[var(--text-muted)] mb-6">
      <i className="fas fa-tools"></i>
    </div>
    <h2 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">{name}</h2>
    <button onClick={onBack} className="px-8 py-3 bg-[var(--text-primary)] text-white rounded-xl font-medium shadow-lg hover:opacity-90 transition-opacity">Go Back</button>
  </div>
);

// All org screens that should bypass the main Layout
const ORG_FULL_SCREENS = [
  ScreenName.ORG_ENTITY_PICKER,
  ScreenName.ORG_ONBOARDING_GOALS,
  ScreenName.ORG_ONBOARDING_AREAS,
  ScreenName.ORG_ONBOARDING_PACE,
  ScreenName.ORG_DASHBOARD,
  ScreenName.ORG_BCI_INDEX,
  ScreenName.ORG_AI_AGENT,
  ScreenName.ORG_AI_CHAT,
  ScreenName.ORG_POLICY_SIMULATOR,
  ScreenName.ORG_ESG_REPORTS,
  ScreenName.ORG_SDG_DETAILS,
  ScreenName.ORG_IMPACT,
  ScreenName.ORG_WIDGET_DETAIL,
  ScreenName.ORG_PROGRAMS,
  ScreenName.ORG_REPORTS,
  ScreenName.ORG_PEOPLE,
  ScreenName.ORG_REWARDS,
  ScreenName.ORG_GREEN_SHARE,
  ScreenName.ORG_SETTINGS,
  ScreenName.ORG_MORE,
];

const AppInner: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(ScreenName.SPLASH);
  const [history, setHistory] = useState<ScreenName[]>([ScreenName.SPLASH]);
  const [navParams, setNavParams] = useState<any>({});
  const [individualSubRole, setIndividualSubRole] = useState<SubRoleType | undefined>();

  const navigate = (screen: ScreenName, params?: any) => {
    if (params?.subRole) setIndividualSubRole(params.subRole);
    setHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
    setNavParams(params || {});
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(prevScreen);
    }
  };

  const switchDemoPath = () => {
    const isOrgPath = ORG_FULL_SCREENS.includes(currentScreen);
    navigate(isOrgPath ? ScreenName.HOME : ScreenName.ORG_DASHBOARD);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      // ── Core flow ────────────────────────────────────────────────────────────
      case ScreenName.SPLASH:
        return <SplashScreen onFinish={() => navigate(ScreenName.ONBOARDING)} />;
      case ScreenName.ONBOARDING:
        return <OnboardingScreen onNavigate={navigate} />;
      case ScreenName.LOGIN:
        return <LoginScreen onNavigate={navigate} onBack={goBack} />;
      case ScreenName.SIGNUP:
        return <SignupScreen onNavigate={navigate} role={navParams.role} subRole={navParams.subRole} />;
      case ScreenName.ROLE_SELECTION:
        return <RoleSelectionScreen onNavigate={navigate} onBack={() => navigate(ScreenName.LOGIN)} />;
      case ScreenName.GOAL_INPUT:
        return <GoalInputScreen onNavigate={navigate} onBack={goBack} initialSubRole={navParams.subRole} />;

      // ── Org path ─────────────────────────────────────────────────────────────
      case ScreenName.ORG_ENTITY_PICKER:
        return <OrgEntityPicker onNavigate={navigate} onBack={goBack} subRole={navParams.subRole} />;
      case ScreenName.ORG_ONBOARDING_GOALS:
        return <OrgOnboardingStrategicGoals onNavigate={navigate} onBack={goBack} />;
      case ScreenName.ORG_ONBOARDING_AREAS:
        return <OrgOnboardingImpactAreas onNavigate={navigate} onBack={goBack} />;
      case ScreenName.ORG_ONBOARDING_PACE:
        return <OrgOnboardingPace onNavigate={navigate} onBack={goBack} />;
      case ScreenName.ORG_DASHBOARD:
        return <OrgDashboard onNavigate={navigate} />;
      case ScreenName.ORG_BCI_INDEX:
        return <OrgBCIIndex onNavigate={navigate} />;
      case ScreenName.ORG_AI_AGENT:
        return <OrgAIAgent onNavigate={navigate} />;
      case ScreenName.ORG_AI_CHAT:
        return <OrgAIChat onNavigate={navigate} onBack={goBack} />;
      case ScreenName.ORG_POLICY_SIMULATOR:
        return <OrgPolicySimulatorScreen onNavigate={navigate} />;
      case ScreenName.ORG_ESG_REPORTS:
        return <OrgESGReports onNavigate={navigate} initialTab={navParams.tab} />;
      case ScreenName.ORG_SDG_DETAILS:
        return <OrgSDGDetails onBack={goBack} initialGoalId={navParams.goalId} />;
      case ScreenName.ORG_IMPACT:
        return <OrgImpact onNavigate={navigate} />;
      case ScreenName.ORG_WIDGET_DETAIL:
        return <OrgWidgetDetail onNavigate={navigate} onBack={goBack} />;
      case ScreenName.ORG_PROGRAMS:
        return <OrgPrograms onNavigate={navigate} onBack={goBack} />;
      case ScreenName.ORG_REPORTS:
        return <OrgReports onNavigate={navigate} onBack={goBack} />;
      case ScreenName.ORG_PEOPLE:
        return <OrgPeople onNavigate={navigate} onBack={goBack} />;
      case ScreenName.ORG_REWARDS:
        return <OrgRewards onNavigate={navigate} />;
      case ScreenName.ORG_GREEN_SHARE:
        return <OrgGreenShare onNavigate={navigate} />;
      case ScreenName.ORG_SETTINGS:
        return <OrgSettings onNavigate={navigate} onBack={goBack} />;
      case ScreenName.ORG_MORE:
        return <OrgMore onNavigate={navigate} />;

      // ── Individual path ───────────────────────────────────────────────────────
      case ScreenName.HOME:
        return <HomeScreen onNavigate={navigate} subRole={navParams.subRole ?? individualSubRole} />;
      case ScreenName.COMMUNITY:
        return <CommunityScreen onNavigate={navigate} initialTab={navParams.tab} />;
      case ScreenName.IMPACT:
        return <ImpactScreen onNavigate={navigate} />;
      case ScreenName.REWARDS:
        return <RewardsScreen onNavigate={navigate} goBack={goBack} />;
      case ScreenName.WALLET:
        return <WalletScreen onNavigate={navigate} goBack={goBack} />;
      case ScreenName.TARGET:
        return <TargetScreen onNavigate={navigate} onBack={goBack} />;
      case ScreenName.MARKETPLACE:
        return <MarketplaceScreen onNavigate={navigate} />;
      case ScreenName.SHOP:
        return <MarketplaceScreen onNavigate={navigate} />;
      case ScreenName.CAMERA:
        return <CameraScreen onNavigate={navigate} goBack={goBack} />;
      case ScreenName.CHAT:
        return <ChatScreen onNavigate={navigate} goBack={goBack} />;
      case ScreenName.PROFILE:
        return <ProfileScreen onNavigate={navigate} goBack={goBack} />;
      case ScreenName.FRIENDS:
        return <FriendsScreen onNavigate={navigate} onBack={goBack} />;
      case ScreenName.SDG_DETAILS:
        return <SDGDetailsScreen onBack={goBack} initialGoalId={navParams.goalId} />;
      case ScreenName.CREATE_POST:
        return <PlaceholderScreen name="Create Post" onBack={goBack} />;
      case ScreenName.POD_SETTINGS:
        return <PODSettingsScreen onBack={goBack} />;
      case ScreenName.ACCESSIBILITY_SETTINGS:
        return <AccessibilitySettings onBack={goBack} />;

      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  const isFullScreen = [
    ScreenName.SPLASH,
    ScreenName.ONBOARDING,
    ScreenName.LOGIN,
    ScreenName.SIGNUP,
    ScreenName.ROLE_SELECTION,
    ScreenName.GOAL_INPUT,
    ScreenName.CAMERA,
    ScreenName.CHAT,
    ScreenName.SDG_DETAILS,
    ScreenName.POD_SETTINGS,
    ScreenName.ACCESSIBILITY_SETTINGS,
    ...ORG_FULL_SCREENS,
  ].includes(currentScreen);

  const appContent = isFullScreen ? (
    renderScreen()
  ) : (
    <Layout currentScreen={currentScreen} onNavigate={navigate} goBack={goBack} onSwitchPath={switchDemoPath}>
      {renderScreen()}
    </Layout>
  );

  return (
    <OrgDetailNavigatorProvider onNavigate={navigate} onBack={goBack}>
      {appContent}
    </OrgDetailNavigatorProvider>
  );
};

const App: React.FC = () => (
  <AccessibilityProvider>
    <OrganizationProvider>
      <LevelProvider>
        <StreakProvider>
          <OrgRouteProvider>
            <ScrollPositionProvider>
              <AppInner />
            </ScrollPositionProvider>
          </OrgRouteProvider>
        </StreakProvider>
      </LevelProvider>
    </OrganizationProvider>
  </AccessibilityProvider>
);

export default App;
