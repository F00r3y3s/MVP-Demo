import React, { useState } from 'react';
import { ScreenName } from './types';
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
import { AccessibilityProvider } from './context/AccessibilityContext';
import { OrganizationProvider } from './context/OrganizationContext';
import { StreakProvider } from './context/StreakContext';
import { LevelProvider } from './context/LevelContext';

// Placeholder for screens that are simpler modals in the new architecture but kept as screen enum for compatibility
const PlaceholderScreen: React.FC<{ name: string, onBack?: () => void }> = ({ name, onBack }) => (
  <div className="p-8 flex flex-col items-center justify-center h-full text-center">
    <div className="w-24 h-24 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center text-4xl text-[var(--text-muted)] mb-6">
      <i className="fas fa-tools"></i>
    </div>
    <h2 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">{name}</h2>
    <button onClick={onBack} className="px-8 py-3 bg-[var(--text-primary)] text-white rounded-xl font-medium shadow-lg hover:opacity-90 transition-opacity">Go Back</button>
  </div>
);

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(ScreenName.LOGIN);
  const [history, setHistory] = useState<ScreenName[]>([ScreenName.LOGIN]);
  const [navParams, setNavParams] = useState<any>({});

  const navigate = (screen: ScreenName, params?: any) => {
    setHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
    setNavParams(params || {});
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current
      const prevScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(prevScreen);
    }
  };

  // Render content based on screen
  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenName.SPLASH:
        return <SplashScreen onFinish={() => navigate(ScreenName.ONBOARDING)} />;
      case ScreenName.ONBOARDING:
        return <OnboardingScreen onNavigate={navigate} />;
      case ScreenName.LOGIN:
        return <LoginScreen onNavigate={navigate} onBack={goBack} />;
      case ScreenName.SIGNUP:
        return <SignupScreen onNavigate={navigate} role={navParams.role} subRole={navParams.subRole} />;
      case ScreenName.ROLE_SELECTION:
        return <RoleSelectionScreen onNavigate={navigate} onBack={() => navigate(ScreenName.SIGNUP)} />;
      case ScreenName.GOAL_INPUT:
        return <GoalInputScreen onNavigate={navigate} onBack={goBack} />;
      case ScreenName.HOME:
        return <HomeScreen onNavigate={navigate} />;
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
      case ScreenName.TARGET:
        return <TargetScreen onNavigate={navigate} onBack={goBack} />;
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

  // Screens that do NOT use the main Layout wrapper (Full screen standalone)
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
    ScreenName.ACCESSIBILITY_SETTINGS
  ].includes(currentScreen);

  // =============================================================================
  // [BACKUP] ORIGINAL CODE START - Date: 2026-01-23
  // =============================================================================
  /*
  if (isFullScreen) {
    return renderScreen();
  }

  return (
    <Layout currentScreen={currentScreen} onNavigate={navigate} goBack={goBack}>
      {renderScreen()}
    </Layout>
  );
  */
  // [BACKUP] ORIGINAL CODE END
  // =============================================================================

  // [NEW ENHANCED CODE BELOW]
  const appContent = isFullScreen ? (
    renderScreen()
  ) : (
    <Layout currentScreen={currentScreen} onNavigate={navigate} goBack={goBack}>
      {renderScreen()}
    </Layout>
  );

  return (
    <AccessibilityProvider>
      <OrganizationProvider>
        <LevelProvider>
          <StreakProvider>
            {appContent}
          </StreakProvider>
        </LevelProvider>
      </OrganizationProvider>
    </AccessibilityProvider>
  );
};

export default App;
