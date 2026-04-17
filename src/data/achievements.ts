export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
    category: 'Beginner' | 'Social' | 'Impact' | 'Hidden';
    unlocked: boolean;
    progress: number;
    maxProgress: number;
    dateUnlocked?: string;
    xpReward: number;
}

export const ACHIEVEMENTS: Achievement[] = [
    // Beginner
    { id: 'first_step', title: 'First Step', description: 'Complete your first sustainability task', icon: 'fa-shoe-prints', rarity: 'Common', category: 'Beginner', unlocked: true, progress: 1, maxProgress: 1, dateUnlocked: '2026-01-20', xpReward: 50 },
    { id: 'profile_ready', title: 'Identity Verified', description: 'Complete your profile setup', icon: 'fa-id-card', rarity: 'Common', category: 'Beginner', unlocked: true, progress: 1, maxProgress: 1, dateUnlocked: '2026-01-20', xpReward: 50 },

    // Impact
    { id: 'tree_hugger', title: 'Tree Hugger', description: 'Save equivalent of 10 trees', icon: 'fa-tree', rarity: 'Uncommon', category: 'Impact', unlocked: false, progress: 4, maxProgress: 10, xpReward: 200 },
    { id: 'carbon_crusher', title: 'Carbon Crusher', description: 'Offset 100kg of CO2', icon: 'fa-smog', rarity: 'Rare', category: 'Impact', unlocked: false, progress: 42, maxProgress: 100, xpReward: 500 },
    { id: 'zero_hero', title: 'Zero Hero', description: 'Log 7 zero-waste days', icon: 'fa-recycle', rarity: 'Epic', category: 'Impact', unlocked: false, progress: 3, maxProgress: 7, xpReward: 1000 },

    // Social
    { id: 'social_butterfly', title: 'Social Butterfly', description: 'Connect with 5 friends', icon: 'fa-users', rarity: 'Common', category: 'Social', unlocked: false, progress: 2, maxProgress: 5, xpReward: 100 },
    { id: 'influencer', title: 'Influencer', description: 'Get 50 likes on a post', icon: 'fa-heart', rarity: 'Rare', category: 'Social', unlocked: false, progress: 12, maxProgress: 50, xpReward: 300 },

    // Hidden / Legendary
    { id: 'night_owl', title: 'Night Owl', description: 'Complete a task between 1AM and 4AM', icon: 'fa-moon', rarity: 'Rare', category: 'Hidden', unlocked: false, progress: 0, maxProgress: 1, xpReward: 250 },
    { id: 'early_bird', title: 'Early Bird', description: 'Complete a task before 6AM', icon: 'fa-sun', rarity: 'Rare', category: 'Hidden', unlocked: false, progress: 0, maxProgress: 1, xpReward: 250 },
    { id: 'legend_born', title: 'A Legend is Born', description: 'Reach Level 50', icon: 'fa-crown', rarity: 'Legendary', category: 'Hidden', unlocked: false, progress: 12, maxProgress: 50, xpReward: 5000 },
];

export const RARITY_COLORS = {
    Common: 'bg-slate-200 text-slate-600',
    Uncommon: 'bg-green-100 text-green-700',
    Rare: 'bg-blue-100 text-blue-700',
    Epic: 'bg-purple-100 text-purple-700',
    Legendary: 'bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 border border-yellow-300 shadow-[0_0_15px_rgba(251,191,36,0.4)]',
};
