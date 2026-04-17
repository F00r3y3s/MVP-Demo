export enum ScreenName {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  ROLE_SELECTION = 'ROLE_SELECTION',
  GOAL_INPUT = 'GOAL_INPUT',
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
