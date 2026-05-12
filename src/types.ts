export enum ScreenName {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  ROLE_SELECTION = 'ROLE_SELECTION',
  GOAL_INPUT = 'GOAL_INPUT',
  // Org-path screens
  ORG_ENTITY_PICKER = 'ORG_ENTITY_PICKER',
  ORG_ONBOARDING_GOALS = 'ORG_ONBOARDING_GOALS',
  ORG_ONBOARDING_AREAS = 'ORG_ONBOARDING_AREAS',
  ORG_ONBOARDING_PACE = 'ORG_ONBOARDING_PACE',
  ORG_DASHBOARD = 'ORG_DASHBOARD',
  ORG_BCI_INDEX = 'ORG_BCI_INDEX',
  ORG_AI_AGENT = 'ORG_AI_AGENT',
  ORG_POLICY_SIMULATOR = 'ORG_POLICY_SIMULATOR',
  ORG_ESG_REPORTS = 'ORG_ESG_REPORTS',
  ORG_WIDGET_DETAIL = 'ORG_WIDGET_DETAIL',
  ORG_PROGRAMS = 'ORG_PROGRAMS',
  ORG_REPORTS = 'ORG_REPORTS',
  ORG_PEOPLE = 'ORG_PEOPLE',
  ORG_SETTINGS = 'ORG_SETTINGS',
  ORG_MORE = 'ORG_MORE',
  // Individual-path screens
  HOME = 'HOME',
  TARGET = 'TARGET',
  COMMUNITY = 'COMMUNITY',
  IMPACT = 'IMPACT',
  WALLET = 'WALLET',
  REWARDS = 'REWARDS',
  PROFILE = 'PROFILE',
  CAMERA = 'CAMERA',
  CHAT = 'CHAT',
  SDG_DETAILS = 'SDG_DETAILS',
  FRIENDS = 'FRIENDS',
  CREATE_POST = 'CREATE_POST',
  MARKETPLACE = 'MARKETPLACE',
  SHOP = 'SHOP',
  POD_SETTINGS = 'POD_SETTINGS',
  ACCESSIBILITY_SETTINGS = 'ACCESSIBILITY_SETTINGS'
}

export type RoleType = 'individual' | 'organization';
export type SubRoleType = 'mentor' | 'builder' | 'guardian' | 'pioneer' | 'advocate' | 'visionary';

// ---- New Org-Path Types (TICKET-01) ----
export type OrgSubRole = 'guardian' | 'pioneer' | 'advocate' | 'visionary';

export interface OrgEntity {
  id: string;
  shortName: string;
  name: string;
  subRole: OrgSubRole;
  sector: string;
  emirate?: string;
  mandates: string[];
  defaultKpis: string[];
  logoSeed: string;
}

export interface OrgOnboardingState {
  strategicDream: string;
  impactGoals: string[];
  operationalWishes: string[];
  selectedImpactAreas: string[];
  reportingCadence: string | null;
  engagementStyle: string | null;
}

export type ChartKind = 'line' | 'bar' | 'doughnut' | 'radar';

export type OrgWidgetStatus = 'on-track' | 'watch' | 'ahead' | 'risk';

export interface OrgWidget {
  id: string;
  label: string;
  unit: string;
  currentValue: string;
  trend: string;
  status: OrgWidgetStatus;
  ownerTeam: string;
  miniChart: { kind: ChartKind; series: number[] };
  detail: {
    chart: { kind: ChartKind; data: any };
    kpis: Array<{ label: string; value: string }>;
    drillList?: {
      title: string;
      rows: Array<{ id: string; name: string; value: string; drillTo?: string }>;
    };
    nextAction: string;
  };
}

export interface OrgNavItem {
  id: string;
  label: string;
  iconKey: string;
  screen: ScreenName;
}

export type OrgDetailKind = 'widget' | 'custom';

export interface OrgDetailFrame {
  kind: OrgDetailKind;
  screen: ScreenName;
  params: Record<string, string>;
}

// ---- Legacy types kept for backward-compat ----
export type OrganizationCommandCategory = 'Federal' | 'Local Authority' | 'Utility' | 'Private Sector' | 'NGO' | 'Academia';
export type OrganizationCommandPage = 'dashboard' | 'programs' | 'reports' | 'people' | 'settings';

export interface OrganizationCommandEntity {
  id: string;
  name: string;
  shortName: string;
  category: OrganizationCommandCategory;
  emirate: string;
  sector: string;
  mandates: string[];
  defaultKpis: string[];
}

export interface OrganizationCommandState {
  selectedEntity: OrganizationCommandEntity | null;
  reportingPriorities: string[];
  maturityLevel: 'starter' | 'building' | 'advanced';
  primaryKpi: string;
  activePage: OrganizationCommandPage;
}

export interface User {
  name: string;
  role: string;
  level: number;
  balance: number;
}

export interface NavProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  reward: number;
  type: 'daily' | 'weekly' | 'monthly' | 'challenge' | 'ai';
  duration?: 'daily' | 'weekly' | 'monthly';
  icon: string;
  status: 'active' | 'completed' | 'pending';
  fullDescription?: string;
  sdg?: number;
  dateAdded?: string;
  accessibilityTags?: ('wheelchair' | 'visual' | 'motor' | 'cognitive' | 'hearing')[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  cards?: any[];
}

export interface FeedPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    badge: string;
    isVerified?: boolean;
    isFamily?: boolean;
  };
  content: string;
  image?: string;
  time: string;
  likes: number;
  comments: number;
  achievements?: string[];
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'earn' | 'convert' | 'withdraw' | 'transfer' | 'bonus';
  status: 'completed' | 'pending';
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  discount: string;
  image: string;
  logo: string;
  isPremium?: boolean;
}
