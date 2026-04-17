import { Challenge } from '../types';

export const SDG_LIST = [
    { id: 1, name: "No Poverty", color: '#E5243B', icon: 'fa-hand-holding-heart' },
    { id: 2, name: "Zero Hunger", color: '#DDA63A', icon: 'fa-wheat-awn' },
    { id: 3, name: "Good Health", color: '#4C9F38', icon: 'fa-heart-pulse' },
    { id: 4, name: "Quality Education", color: '#C5192D', icon: 'fa-book-open' },
    { id: 5, name: "Gender Equality", color: '#FF3A21', icon: 'fa-venus-mars' },
    { id: 6, name: "Clean Water", color: '#26BDE2', icon: 'fa-faucet-drip' },
    { id: 7, name: "Clean Energy", color: '#FCC30B', icon: 'fa-bolt' },
    { id: 8, name: "Decent Work", color: '#A21942', icon: 'fa-chart-line' },
    { id: 9, name: "Industry & Innovation", color: '#FD6925', icon: 'fa-industry' },
    { id: 10, name: "Reduced Inequalities", color: '#DD1367', icon: 'fa-earth-americas' },
    { id: 11, name: "Sustainable Cities", color: '#FD9D24', icon: 'fa-city' },
    { id: 12, name: "Responsible Consumption", color: '#BF8B2E', icon: 'fa-leaf' },
    { id: 13, name: "Climate Action", color: '#3F7E44', icon: 'fa-cloud-sun' },
    { id: 14, name: "Life Below Water", color: '#0A97D9', icon: 'fa-fish' },
    { id: 15, name: "Life on Land", color: '#56C02B', icon: 'fa-tree' },
    { id: 16, name: "Peace & Justice", color: '#00689D', icon: 'fa-scale-balanced' },
    { id: 17, name: "Partnerships", color: '#19486A', icon: 'fa-handshake' }
];

// Helper to generate IDs
const dim = (id: string) => `sdg_act_${id}`;

export const SDG_ACTIVITIES: Challenge[] = [
    // --- DAILY ACTIVITIES ---
    // SDG 1: No Poverty
    { id: dim('1_d_1'), title: 'Donate Spare Change', subtitle: 'Round up your coffee purchase today.', fullDescription: 'Use the "Round Up" feature in your Wallet to donate spare fils from today\'s purchases to the Red Crescent.', sdg: 1, type: 'ai', duration: 'daily', progress: 0, reward: 20, status: 'pending', icon: 'fa-coins', accessibilityTags: ['wheelchair', 'motor', 'visual', 'hearing'] },
    // SDG 2: Zero Hunger
    { id: dim('2_d_1'), title: 'Share a Meal', subtitle: 'Donate one meal or leftovers to a worker.', fullDescription: 'Prepare an extra portion of your lunch or dinner and give it to someone in need or a community fridge.', sdg: 2, type: 'ai', duration: 'daily', progress: 0, reward: 50, status: 'pending', icon: 'fa-utensils' },
    // SDG 3: Good Health
    { id: dim('3_d_1'), title: '10k Steps', subtitle: 'Walk 10,000 steps today.', fullDescription: 'Prioritize your health and reduce vehicle use by hitting 10,000 steps. Validated via Health/Fitbit.', sdg: 3, type: 'ai', duration: 'daily', progress: 0, reward: 100, status: 'pending', icon: 'fa-walking' },
    { id: dim('3_d_2'), title: 'Mindful Meditation', subtitle: '15 mins of mental wellness.', fullDescription: 'Take 15 minutes to meditate or practice breathing exercises to reduce stress.', sdg: 3, type: 'ai', duration: 'daily', progress: 0, reward: 30, status: 'pending', icon: 'fa-brain', accessibilityTags: ['wheelchair', 'motor', 'visual', 'hearing'] },
    // SDG 6: Clean Water
    { id: dim('6_d_1'), title: '5-Min Shower', subtitle: 'Save up to 40L of water.', fullDescription: 'Limit your shower to 5 minutes today. Set a timer!', sdg: 6, type: 'ai', duration: 'daily', progress: 0, reward: 40, status: 'pending', icon: 'fa-shower' },
    // SDG 7: Clean Energy
    { id: dim('7_d_1'), title: 'Lights Off', subtitle: 'Turn off lights in empty rooms.', fullDescription: 'Be vigilant today: ensure no lights are left on in rooms not being used.', sdg: 7, type: 'ai', duration: 'daily', progress: 0, reward: 20, status: 'pending', icon: 'fa-lightbulb' },
    { id: dim('7_d_2'), title: 'AC Control', subtitle: 'Set AC to 24°C.', fullDescription: 'Keep your cooling set to 24°C or higher for the entire day to save significant energy.', sdg: 7, type: 'ai', duration: 'daily', progress: 0, reward: 35, status: 'pending', icon: 'fa-temperature-low' },
    // SDG 12: Responsible Consumption
    { id: dim('12_d_1'), title: 'Reusable Cup', subtitle: 'Use your own cup for coffee.', fullDescription: 'Refuse the paper cup. Bring your own flask or mug for your daily brew.', sdg: 12, type: 'ai', duration: 'daily', progress: 0, reward: 25, status: 'pending', icon: 'fa-mug-hot' },
    { id: dim('12_d_2'), title: 'No Single-Use Plastic', subtitle: 'Avoid all plastic cutlery/bags today.', fullDescription: 'Go through the entire day without using a single piece of disposable plastic.', sdg: 12, type: 'ai', duration: 'daily', progress: 0, reward: 60, status: 'pending', icon: 'fa-ban' },
    // SDG 13: Climate Action
    { id: dim('13_d_1'), title: 'Meat-Free Day', subtitle: 'Go vegetarian for one day.', fullDescription: 'Skipping meat for just one day saves huge amounts of water and reduces carbon emissions.', sdg: 13, type: 'ai', duration: 'daily', progress: 0, reward: 100, status: 'pending', icon: 'fa-carrot', accessibilityTags: ['wheelchair', 'motor', 'hearing'] },

    // --- WEEKLY ACTIVITIES ---
    // SDG 11: Sustainable Cities
    { id: dim('11_w_1'), title: 'Public Transport Week', subtitle: 'Use Metro/Bus for 3 commutes.', fullDescription: 'Replace 3 car journeys with public transport this week to reduce city congestion.', sdg: 11, type: 'ai', duration: 'weekly', progress: 0, reward: 300, status: 'pending', icon: 'fa-train' },
    // SDG 12: Responsible Consumption
    { id: dim('12_w_1'), title: 'Zero Food Waste', subtitle: 'Throw away zero food this week.', fullDescription: 'Plan your meals, use leftovers, and compost scraps. Ensure 0kg of food goes to landfill.', sdg: 12, type: 'ai', duration: 'weekly', progress: 0, reward: 400, status: 'pending', icon: 'fa-trash-restore' },
    // SDG 13: Climate Action
    { id: dim('13_w_1'), title: 'Carbon Neutral Commute', subtitle: 'Walk or Cycle for errands.', fullDescription: 'For all trips under 2km, walk or cycle instead of driving this week.', sdg: 13, type: 'ai', duration: 'weekly', progress: 0, reward: 250, status: 'pending', icon: 'fa-bicycle' },
    // SDG 15: Life on Land
    { id: dim('15_w_1'), title: 'Paperless Week', subtitle: 'Print nothing for 7 days.', fullDescription: 'Shift all your documents to digital. Do not use the printer at all this week.', sdg: 15, type: 'ai', duration: 'weekly', progress: 0, reward: 150, status: 'pending', icon: 'fa-file-pdf' },

    // --- MONTHLY ACTIVITIES ---
    // SDG 4: Quality Education
    { id: dim('4_m_1'), title: 'Learn a Skill', subtitle: 'Complete a sustainability course.', fullDescription: 'Watch 2 hours of educational content on the Eco-Insights Hub or attend a workshop.', sdg: 4, type: 'ai', duration: 'monthly', progress: 0, reward: 800, status: 'pending', icon: 'fa-graduation-cap' },
    // SDG 10: Reduced Inequalities
    { id: dim('10_m_1'), title: 'Mentor Someone', subtitle: 'Help a newbie go green.', fullDescription: 'Guide a friend or colleague in their sustainability journey. Help them earn their first 500 Wda.', sdg: 10, type: 'ai', duration: 'monthly', progress: 0, reward: 1000, status: 'pending', icon: 'fa-hands-helping' },
    // SDG 12: Responsible Consumption
    { id: dim('12_m_1'), title: 'No New Clothes', subtitle: 'Buy 0 new garments this month.', fullDescription: 'Challenge yourself to not buy any new fashion items. Repair, swap, or thrift if necessary.', sdg: 12, type: 'ai', duration: 'monthly', progress: 0, reward: 1500, status: 'pending', icon: 'fa-tshirt' },
    // SDG 14: Life Below Water
    { id: dim('14_m_1'), title: 'Beach Cleanup', subtitle: 'Attend one cleanup event.', fullDescription: 'Participate in a community beach cleanup event and remove at least 1 bag of waste.', sdg: 14, type: 'ai', duration: 'monthly', progress: 0, reward: 1200, status: 'pending', icon: 'fa-umbrella-beach' },
    // SDG 7: Clean Energy
    { id: dim('7_m_1'), title: 'Energy Audit', subtitle: 'Reduce utility bill by 10%.', fullDescription: 'Compare this month\'s DEWA bill to last month\'s. Achieve a 10% reduction.', sdg: 7, type: 'ai', duration: 'monthly', progress: 0, reward: 2000, status: 'pending', icon: 'fa-plug' }
];

export const MAX_ACTIVE_TASKS = {
    daily: 6,
    weekly: 3,
    monthly: 4
};
