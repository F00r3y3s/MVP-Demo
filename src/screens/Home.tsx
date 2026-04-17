
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenName, Challenge } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { useOrganization } from '../context/OrganizationContext';
import aiRobot from '../assets/ai_robot.png';
import { USER_IMAGE_URL } from '../constants';
import { SDG_ACTIVITIES, MAX_ACTIVE_TASKS } from '../data/sdgActivities';
import { EVENTS } from '../data/events'; // Phase 7

interface Props {
   onNavigate: (screen: ScreenName) => void;
}

type UserStatus = 'online' | 'away' | 'busy';

// --- STATIC DATA (Moved outside to prevent re-renders & fix initialization order) ---
const SDG_DATA = [
   { id: 1, color: '#E5243B', progress: 85, icon: 'fa-hand-holding-heart' },
   { id: 2, color: '#DDA63A', progress: 45, icon: 'fa-wheat-awn' },
   { id: 3, color: '#4C9F38', progress: 92, icon: 'fa-heart-pulse' },
   { id: 4, color: '#C5192D', progress: 30, icon: 'fa-book-open' },
   { id: 5, color: '#FF3A21', progress: 65, icon: 'fa-venus-mars' },
   { id: 6, color: '#26BDE2', progress: 78, icon: 'fa-faucet-drip' },
   { id: 7, color: '#FCC30B', progress: 55, icon: 'fa-bolt' },
   { id: 8, color: '#A21942', progress: 40, icon: 'fa-chart-line' },
   { id: 9, color: '#FD6925', progress: 60, icon: 'fa-industry' },
   { id: 10, color: '#DD1367', progress: 25, icon: 'fa-earth-americas' },
   { id: 11, color: '#FD9D24', progress: 70, icon: 'fa-city' },
   { id: 12, color: '#BF8B2E', progress: 88, icon: 'fa-leaf' },
   { id: 13, color: '#3F7E44', progress: 95, icon: 'fa-cloud-sun' },
   { id: 14, color: '#0A97D9', progress: 50, icon: 'fa-fish' },
   { id: 15, color: '#56C02B', progress: 82, icon: 'fa-tree' },
   { id: 16, color: '#00689D', progress: 35, icon: 'fa-scale-balanced' },
   { id: 17, color: '#19486A', progress: 100, icon: 'fa-handshake' },
   { id: 18, color: '#E5E7EB', progress: 0, icon: 'fa-ellipsis' }
];

const UPCOMING_EVENTS = [
   { id: 1, title: 'Beach Cleanup', date: '25 Jan', time: '8:00 AM', location: 'Kite Beach', attendees: 45, bg: 'bg-gradient-to-br from-blue-500 to-cyan-600', icon: 'fa-water' },
   { id: 2, title: 'Ghaf Tree Planting', date: '02 Feb', time: '9:30 AM', location: 'Mushrif Park', attendees: 120, bg: 'bg-gradient-to-br from-green-600 to-emerald-500', icon: 'fa-tree' },
   { id: 3, title: 'Recycling Workshop', date: '10 Feb', time: '5:00 PM', location: 'Alserkal Avenue', attendees: 30, bg: 'bg-gradient-to-br from-amber-500 to-orange-500', icon: 'fa-recycle' },
];

const OFFERS = [
   { id: 1, partner: 'Starbucks', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg', discount: 'Free Coffee', desc: 'Reusable cup', color: '#00704A' },
   { id: 2, partner: 'Carrefour', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrefour_logo.svg', discount: '15% OFF', desc: 'Organic', color: '#194396' },
   { id: 3, partner: 'Spinneys', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Spinneys_logo.svg/1200px-Spinneys_logo.svg.png', discount: 'Double Pts', desc: 'Recycling', color: '#689F38' }
];

const UAE_NEWS = [
   { id: 1, title: 'UAE bans single-use plastic bags starting 2026', source: 'Khaleej Times', time: '2h ago', image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=600&h=400' },
   { id: 2, title: 'Dubai launches largest solar park phase in Al Qudra', source: 'Gulf News', time: '5h ago', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600&h=400' },
   { id: 3, title: 'Masdar City expands EV charging network across UAE', source: 'The National', time: '8h ago', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600&h=400' },
   { id: 4, title: 'Abu Dhabi installs innovative reef restoration blocks', source: 'WAM', time: '12h ago', image: 'https://images.unsplash.com/photo-1546027658-7aa750153465?auto=format&fit=crop&q=80&w=600&h=400' },
   { id: 5, title: 'Sustainable farming initiative takes root in Al Ain', source: 'Emirates 24/7', time: '1d ago', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600&h=400' }
];

const GLOBAL_NEWS = [
   { id: 6, title: 'Global carbon emissions set to peak in 2025', source: 'Reuters', time: '1d ago', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600&h=400' },
   { id: 7, title: 'New ocean cleaning tech deployed in North Pacific', source: 'BBC Earth', time: '2d ago', image: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&q=80&w=600&h=400' },
   { id: 8, title: 'Green hydrogen production costs fall by 30% globally', source: 'Forbes', time: '3d ago', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=400' },
   { id: 9, title: 'Major breakthrough in vertical farming efficiency', source: 'Wired', time: '4d ago', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=600&h=400' },
   { id: 10, title: 'Scientists discover bacteria that can eat heavy metals', source: 'Nature', time: '5d ago', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600&h=400' }
];

const RESOURCES = [
   { id: 1, title: 'Recycling Guide 101', type: 'Guide', icon: 'fa-book-open', color: 'bg-blue-100 text-blue-600' },
   { id: 2, title: 'Composting at Home', type: 'Video', icon: 'fa-play-circle', color: 'bg-green-100 text-green-600' },
   { id: 3, title: 'Sustainable Fashion', type: 'Article', icon: 'fa-tshirt', color: 'bg-purple-100 text-purple-600' },
];

const HomeScreen: React.FC<Props> = ({ onNavigate }) => {
   const { simplifiedView } = useAccessibility();
   const { isLinked, organization, department, team } = useOrganization();
   const [isOrgView, setIsOrgView] = useState(false);

   // Reset view if unlinked
   useEffect(() => {
      if (!isLinked) setIsOrgView(false);
   }, [isLinked]);

   // --- STATE MANAGEMENT ---

   // Tasks Data
   const [tasks, setTasks] = useState<Challenge[]>([
      { id: '1', title: 'Morning Walk', subtitle: '5km eco-commute', icon: 'fa-walking', type: 'daily', progress: 60, reward: 50, status: 'active' },
      { id: '2', title: 'Zero Waste', subtitle: 'No single-use plastic', icon: 'fa-recycle', type: 'challenge', progress: 35, reward: 200, status: 'active' },
      { id: '3', title: 'Plant-Based', subtitle: 'Meat-free lunch', icon: 'fa-carrot', type: 'ai', progress: 0, reward: 40, status: 'active' },
      { id: '4', title: 'Save Water', subtitle: 'Shorter shower', icon: 'fa-faucet', type: 'daily', progress: 10, reward: 20, status: 'active' }
   ]);

   const userRole = 'Mentor';

   // Role Configuration for Dynamic Badge & Styling
   const roleConfig = {
      'Mentor': { icon: 'fa-graduation-cap', color: 'from-emerald-500 to-emerald-700', border: 'border-emerald-400/30' },
      'Builder': { icon: 'fa-tools', color: 'from-indigo-500 to-indigo-700', border: 'border-indigo-400/30' },
      'Organizer': { icon: 'fa-city', color: 'from-blue-500 to-blue-700', border: 'border-blue-400/30' },
   };
   const currentRole = roleConfig[userRole as keyof typeof roleConfig] || roleConfig['Mentor'];

   // AI Suggestions History State
   const [aiCategory, setAiCategory] = useState<'daily' | 'weekly' | 'monthly'>('daily');
   const [aiView, setAiView] = useState<'suggestion' | 'reminder'>('suggestion');
   const [aiHistory, setAiHistory] = useState<Challenge[]>([
      { id: 'ai_init_d', title: 'Try to Walk for 10 000 Today?', subtitle: 'You will improve your health, impact people around you and maybe win a free ticket for F1!', icon: 'fa-walking', type: 'ai', duration: 'daily', progress: 0, reward: 50, status: 'pending' },
      { id: 'ai_init_w', title: 'Zero Waste Week', subtitle: 'Reduce your plastic waste entirely for 7 days to earn big rewards.', icon: 'fa-recycle', type: 'ai', duration: 'weekly', progress: 0, reward: 500, status: 'pending' },
      { id: 'ai_init_m', title: 'Community Mentor', subtitle: 'Onboard 5 new members this month to lead the SDG movement.', icon: 'fa-users', type: 'ai', duration: 'monthly', progress: 0, reward: 2500, status: 'pending' },
   ]);
   const [aiIndex, setAiIndex] = useState(0);

   // UI State
   const [isTasksExpanded, setIsTasksExpanded] = useState(false);
   const [showLimitAlert, setShowLimitAlert] = useState(false);
   const [limitMessage, setLimitMessage] = useState({ title: '', body: '' });

   // Limits for alert display (also used in handler)
   const limits = MAX_ACTIVE_TASKS;

   // Alert Modal (Inserted into render)
   const [showGoalModal, setShowGoalModal] = useState(false);
   const [isAiExpanded, setIsAiExpanded] = useState(false);
   const [heroWidgetIndex, setHeroWidgetIndex] = useState(0);

   // Widget Modal States
   const [showConvertModal, setShowConvertModal] = useState(false); // Used for quick convert action
   const [showEventsModal, setShowEventsModal] = useState(false);
   const [showRewardsModal, setShowRewardsModal] = useState(false);
   const [showNewsModal, setShowNewsModal] = useState(false);
   const [showResourcesModal, setShowResourcesModal] = useState(false);
   const [showTasksModal, setShowTasksModal] = useState(false);
   const [showAiDetailsModal, setShowAiDetailsModal] = useState(false);

   const [activeTaskDetails, setActiveTaskDetails] = useState<Challenge | null>(null);

   // Filter & Derived News States
   const [newsFilter, setNewsFilter] = useState<'UAE' | 'Global'>('UAE');
   const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
   const activeNews = newsFilter === 'UAE' ? UAE_NEWS : GLOBAL_NEWS;

   useEffect(() => {
      if (activeNews.length === 0) return;
      const interval = setInterval(() => {
         setCurrentNewsIndex((prev) => (prev + 1) % activeNews.length);
      }, 4000);
      return () => clearInterval(interval);
   }, [activeNews.length]);

   // Auto-toggle AI view
   useEffect(() => {
      const interval = setInterval(() => {
         setAiView(prev => prev === 'suggestion' ? 'reminder' : 'suggestion');
      }, 8000);
      return () => clearInterval(interval);
   }, []);

   // Status State
   const [greeting, setGreeting] = useState('Green Morning');
   const [userStatus, setUserStatus] = useState<UserStatus>('online');
   const [showStatusMenu, setShowStatusMenu] = useState(false);

   // Event Card Stack State
   const [currentEventIndex, setCurrentEventIndex] = useState(0);

   const activeTasks = tasks.filter(t => t.status === 'active');
   const visibleTasks = isTasksExpanded ? activeTasks : activeTasks.slice(0, 3);
   const currentAiSuggestion = aiHistory[aiIndex];

   // --- EFFECT: TIME BASED GREETING ---
   useEffect(() => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Green Morning');
      else if (hour < 18) setGreeting('Green Afternoon');
      else setGreeting('Green Evening');
   }, []);

   // --- HANDLERS ---
   const handleAcceptSuggestion = () => {
      const duration = currentAiSuggestion.duration || 'daily';
      const count = activeTasks.filter(t => t.duration === duration).length;

      const limit = MAX_ACTIVE_TASKS[duration as keyof typeof MAX_ACTIVE_TASKS];
      if (count >= limit) {
         setLimitMessage({
            title: `You're on fire! 🔥`,
            body: `Whoa, slow down eco-warrior! You've already got ${limit} ${duration} missions active. We love the enthusiasm, but let's crush one of those first before adding more. Quality over quantity! You got this! ✨`
         });
         setShowLimitAlert(true);
         return;
      }

      setTasks(prev => [{ ...currentAiSuggestion, status: 'active', dateAdded: new Date().toLocaleDateString() }, ...prev]);
      generateNewAiSuggestion();
   };

   const { mode } = useAccessibility();

   const generateNewAiSuggestion = () => {
      let pool = SDG_ACTIVITIES.filter(a => a.duration === aiCategory);

      // Filter based on accessibility mode capability
      if (mode === 'motor') {
         // Prioritize activities tagged with 'motor' or 'wheelchair'
         // For now, if tags exist, strict filter. If no tags, include (fallback).
         const strictPool = pool.filter(a => a.accessibilityTags && (a.accessibilityTags.includes('motor') || a.accessibilityTags.includes('wheelchair')));
         if (strictPool.length > 0) pool = strictPool;
      } else if (mode === 'visual') {
         const strictPool = pool.filter(a => a.accessibilityTags && a.accessibilityTags.includes('visual'));
         if (strictPool.length > 0) pool = strictPool;
      } else if (mode === 'hearing') {
         const strictPool = pool.filter(a => a.accessibilityTags && a.accessibilityTags.includes('hearing'));
         if (strictPool.length > 0) pool = strictPool;
      }

      if (pool.length === 0) return;

      const random = pool[Math.floor(Math.random() * pool.length)];
      // Ensure unique ID for this instance
      const newChallenge = { ...random, id: `${random.id}_${Date.now()}` };

      const newHistory = [...aiHistory.slice(0, aiIndex + 1), newChallenge];
      setAiHistory(newHistory);
      setAiIndex(newHistory.length - 1);
   };

   const handleCompleteTask = (task: Challenge) => {
      // Mark as completed in local state
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'completed' } : t));

      // Persist to localStorage for Impact Screen
      const completed = JSON.parse(localStorage.getItem('completed_activities') || '[]');
      completed.unshift({
         ...task,
         completedAt: new Date().toLocaleString()
      });
      localStorage.setItem('completed_activities', JSON.stringify(completed));

      setShowTasksModal(false);
      setActiveTaskDetails(null);

      // Optional: Show celebration or update points locally (mock)
   };

   const handleAiPrev = () => { if (aiIndex > 0) setAiIndex(aiIndex - 1); };
   const handleAiNext = () => {
      if (aiIndex < aiHistory.length - 1) setAiIndex(aiIndex + 1);
      else generateNewAiSuggestion();
   };

   const nextEvent = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentEventIndex((prev) => (prev + 1) % UPCOMING_EVENTS.length);
   };

   const getStatusColor = (status: UserStatus) => {
      switch (status) {
         case 'online': return 'bg-green-500';
         case 'away': return 'bg-amber-500';
         case 'busy': return 'bg-red-500';
         default: return 'bg-gray-400';
      }
   };

   const currentEvent = UPCOMING_EVENTS[currentEventIndex];

   // Phase 7: Active Game Event
   const activeGameEvent = EVENTS.find(e => e.isActive);

   return (
      <div className="px-5 space-y-5 pb-20 pt-16 sm:pt-6 bg-[var(--bg-primary)] h-auto" onClick={() => setShowStatusMenu(false)}>

         {/* 1. UNIFIED USER CARD (Original Design) */}
         <div className="relative w-full">
            {/* Card Background */}
            <div className="bg-white rounded-[28px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-white/80 relative overflow-visible">

               {/* Role Badge - Overlapping top-right corner */}
               <div className={`absolute -top-3 right-4 z-20 flex flex-col items-center gap-0.5`}>
                  <div className={`px-3 py-2 rounded-2xl bg-gradient-to-br ${currentRole.color} text-white shadow-lg flex flex-col items-center gap-0.5`}>
                     <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                        <i className={`fas ${currentRole.icon} text-sm`}></i>
                     </div>
                     <span className="text-[8px] font-black uppercase tracking-widest leading-none mt-0.5">{userRole}</span>
                  </div>
                  {/* Mission widget below role badge */}
                  <div
                     onClick={() => setShowGoalModal(true)}
                     className="w-full mt-1 bg-indigo-900 rounded-2xl p-2.5 shadow-2xl border border-indigo-700/50 cursor-pointer transition-all hover:bg-indigo-950 flex flex-col gap-1 relative overflow-hidden min-w-[88px]"
                  >
                     <div className="relative z-10 flex justify-between items-center">
                        <span className="text-[7px] font-black text-amber-300 uppercase tracking-widest opacity-90 flex items-center gap-0.5">
                           <i className="fas fa-star text-[5px] animate-pulse"></i> Dream
                        </span>
                        <span className="text-[9px] font-black text-white">65%</span>
                     </div>
                     <div className="relative z-10 text-[8px] font-black text-white leading-tight truncate">ZERO-WASTE 2026</div>
                     <div className="relative z-10 w-full h-1 bg-indigo-950 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-500 to-amber-400 rounded-full" style={{ width: '65%' }}></div>
                     </div>
                     <div className="absolute -top-2 -right-2 w-12 h-12 bg-pink-500/20 blur-xl"></div>
                  </div>
                  {/* Active badge */}
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded-full border border-slate-200 mt-1">
                     <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                     <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Active</span>
                  </div>
               </div>

               {/* Top section: Profile info */}
               <div className="flex items-center gap-3 pr-24 mb-4">
                  <div className="relative cursor-pointer shrink-0" onClick={() => onNavigate(ScreenName.PROFILE)}>
                     <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-md bg-slate-100" style={{ borderWidth: 3 }}>
                        <img src={USER_IMAGE_URL} alt="Profile" className="w-full h-full object-cover" />
                     </div>
                     <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-green-500 shadow-sm"></div>
                  </div>
                  <div className="min-w-0">
                     <div className="text-[9px] font-black text-emerald-600 tracking-widest uppercase leading-none mb-0.5">{greeting}</div>
                     <h2 className="text-slate-800 font-bold font-jakarta text-lg leading-tight">Sarah Johnson</h2>
                     <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] font-black bg-blue-600 text-white px-2 py-px rounded shadow-sm">LVL 12</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide">Pro Impact</span>
                     </div>
                  </div>
               </div>

               {/* Divider */}
               <div className="h-px bg-slate-100 mb-3"></div>

               {/* Bottom section: Balance */}
               <div
                  onClick={() => onNavigate(ScreenName.WALLET)}
                  className="cursor-pointer active:scale-[0.98] transition-transform"
               >
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Balance</div>
                  <div className="flex items-baseline gap-1.5">
                     <span className="text-2xl font-black text-slate-800 font-jakarta leading-none">2,850</span>
                     <span className="text-[9px] font-bold text-slate-400 uppercase">WDA</span>
                     <span className="text-[9px] font-bold text-emerald-600 ml-1">≈ AED 71.25</span>
                     <span className="text-[8px] font-bold text-slate-400">· Top 5%</span>
                  </div>
               </div>

               {/* Org Toggle (if linked) */}
               {isLinked && !simplifiedView && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex gap-1">
                     <button
                        onClick={() => setIsOrgView(false)}
                        className={`flex-1 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${!isOrgView ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-100 text-slate-400 hover:text-slate-600'}`}
                     >
                        Personal
                     </button>
                     <button
                        onClick={() => setIsOrgView(true)}
                        className={`flex-1 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${isOrgView ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-400 hover:text-slate-600'}`}
                     >
                        {organization?.logo} Org
                     </button>
                  </div>
               )}
            </div>
         </div>



         {/* --- ORGANIZATION DASHBOARD VIEW --- */}
         {isOrgView && isLinked && organization ? (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
               {/* Org Impact Hero */}
               <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
                  <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl border border-white/10 shadow-lg">
                           {organization.logo}
                        </div>
                        <div>
                           <h2 className="text-xl font-black font-jakarta leading-none mb-1">{organization.name}</h2>
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">{department} Department</span>
                              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] font-black rounded-full uppercase border border-emerald-500/30">Verified Partner</span>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-2xl p-4 border border-white/5 backdrop-blur-sm">
                           <div className="flex items-center gap-2 mb-2">
                              <i className="fas fa-tree text-emerald-400"></i>
                              <span className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">Total Trees</span>
                           </div>
                           <div className="text-2xl font-black">1,250</div>
                           <div className="text-[9px] text-blue-200 mt-1">Goal: 5,000 by 2026</div>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-4 border border-white/5 backdrop-blur-sm">
                           <div className="flex items-center gap-2 mb-2">
                              <i className="fas fa-bolt text-amber-400"></i>
                              <span className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">Energy Saved</span>
                           </div>
                           <div className="text-2xl font-black">85k <span className="text-sm font-bold text-blue-300">kWh</span></div>
                           <div className="text-[9px] text-blue-200 mt-1">-12% vs Last Year</div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Team Activity Widget */}
               <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2">
                        <i className="fas fa-users text-blue-600"></i> Team Activity
                     </h3>
                     <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{team?.name || 'My Team'}</span>
                  </div>
                  <div className="space-y-4">
                     {[
                        { user: 'Ahmed', action: 'completed Office Recycling', time: '10m ago', icon: 'fa-recycle', color: 'bg-green-100 text-green-600' },
                        { user: 'Sarah', action: 'logged Carpool Commute', time: '1h ago', icon: 'fa-car-side', color: 'bg-blue-100 text-blue-600' },
                        { user: 'Mike', action: 'turned off Meeting Room AC', time: '2h ago', icon: 'fa-wind', color: 'bg-purple-100 text-purple-600' }
                     ].map((act, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className={`w-10 h-10 rounded-xl ${act.color} flex items-center justify-center text-sm`}>
                              <i className={`fas ${act.icon}`}></i>
                           </div>
                           <div className="flex-1">
                              <div className="text-xs font-bold text-slate-800"><span className="text-blue-600">{act.user}</span> {act.action}</div>
                              <div className="text-[9px] font-medium text-slate-400">{act.time}</div>
                           </div>
                           <button className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors">
                              <i className="far fa-heart"></i>
                           </button>
                        </div>
                     ))}
                  </div>
                  <button onClick={() => onNavigate(ScreenName.COMMUNITY)} className="w-full mt-4 py-3 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors">
                     View All Team Updates
                  </button>
               </div>
            </div>
         ) : null}

         {/* 1. COMPACT SDG PROGRESS (VERTICAL BARS RESTORED) */}
         <div
            onClick={() => onNavigate(ScreenName.SDG_DETAILS)}
            className="bg-white/80 border border-white shadow-sm rounded-[24px] p-4 backdrop-blur-md cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
         >
            <div className="flex justify-between items-center mb-3 px-1">
               <div>
                  <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                     <i className="fas fa-chart-column text-emerald-500"></i> Global Impact Goals
                  </h3>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">3/17 Goals Achieved</p>
               </div>
               <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shadow-inner">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
               </div>
            </div>

            {/* Horizontal Pills Grid (3 Columns) - Compact */}
            <div className="grid grid-cols-3 gap-x-3 gap-y-2 px-0.5">
               {SDG_DATA.map((sdg) => (
                  <div key={sdg.id} className="relative w-full h-1.5 rounded-full overflow-hidden flex bg-gray-100/50">
                     {/* Light background with specific color opacity */}
                     <div
                        className="absolute inset-0 opacity-20"
                        style={{ backgroundColor: sdg.color }}
                     ></div>

                     {/* Progress Fill */}
                     <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sdg.progress}%` }}
                        className="relative h-full rounded-full"
                        style={{ backgroundColor: sdg.color }}
                     />
                  </div>
               ))}
            </div>
         </div>

         {/* 2. TODAY'S FOCUS (Minimized - Click reveals all) */}
         <div
            onClick={() => setShowTasksModal(true)}
            className="bg-white rounded-[28px] px-5 py-4 shadow-sm border border-white group cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
         >
            <div className="flex items-center justify-between mb-3">
               <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  Currently Active <span className="text-emerald-500">•</span>
               </h3>
               <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-tighter">({activeTasks.length}) View All</span>
            </div>

            <div className="flex items-center gap-3 p-2 bg-slate-50/50 rounded-2xl border border-slate-100">
               <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-sm shadow-sm">
                  <i className={`fas ${activeTasks[0]?.icon || 'fa-thumbtack'}`}></i>
               </div>
               <div className="flex-1">
                  <h4 className="font-bold text-xs text-slate-800">{activeTasks[0]?.title || 'Sustainability Routine'}</h4>
                  <div className="flex items-center gap-2 mt-1">
                     <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${activeTasks[0]?.progress || 0}%` }}></div>
                     </div>
                     <span className="text-[9px] font-bold text-slate-500">{activeTasks[0]?.progress || 0}%</span>
                  </div>
               </div>
               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-500">
                  <i className="fas fa-chevron-right text-[10px]"></i>
               </div>
            </div>
         </div>

         {/* AI Widget & SDG Strip (Unchanged) */}
         {/* 3. AI INTELLIGENCE CAPSULE (SLIM & DYNAMIC) */}
         <div className="relative mb-6">
            <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] mb-3 px-1">AI Suggestions</h3>
            <div
               onClick={() => setIsAiExpanded(true)}
               className="bg-[#F1F5F9] rounded-[24px] p-3 flex items-center gap-4 cursor-pointer hover:bg-slate-200 transition-all group border border-slate-200/50 relative overflow-hidden active:scale-[0.98]"
            >
               <div className="w-14 h-14 shrink-0 relative">
                  <img src={aiRobot} alt="AI" className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform" />
                  <div className="absolute top-0 right-0 w-3 shadow-sm h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
               </div>

               <div className="flex-1 min-w-0 pr-4">
                  <AnimatePresence mode="wait">
                     {aiView === 'suggestion' ? (
                        <motion.div
                           key="sugg"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                        >
                           <h5 className="text-[13px] font-black text-slate-800 leading-tight truncate">{currentAiSuggestion.title}</h5>
                           <p className="text-[10px] text-slate-500 font-medium truncate opacity-80 mt-0.5">{currentAiSuggestion.subtitle}</p>
                        </motion.div>
                     ) : (
                        <motion.div
                           key="rem"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                        >
                           <h5 className="text-[13px] font-black text-indigo-600 leading-tight uppercase tracking-tight">Daily Reminder</h5>
                           <p className="text-[10px] text-slate-500 font-medium truncate opacity-80 mt-0.5">Don't forget to log your evening commute!</p>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>

               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors shadow-sm">
                  <i className="fas fa-expand-alt text-[10px]"></i>
               </div>
            </div>
         </div>

         {/* 3b. SEASONAL / LIMITED-TIME EVENT BANNER (below AI Suggestions) */}
         {activeGameEvent && !simplifiedView && (
            <div
               className={`rounded-[28px] overflow-hidden relative shadow-lg group cursor-pointer ${activeGameEvent.theme.bg} ${activeGameEvent.theme.text}`}
               onClick={() => alert('Event Details Modal would open here')}
            >
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
               <div className="p-5 flex justify-between items-center relative z-10">
                  <div className="flex-1 pr-4">
                     <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[8px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/20">Limited Time</span>
                        <span className="text-[9px] font-bold opacity-80 flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full"><i className="fas fa-clock"></i> 12 Days Left</span>
                     </div>
                     <h3 className="text-xl font-black font-jakarta uppercase leading-tight tracking-wide mb-1">{activeGameEvent.title}</h3>
                     <p className="text-[10px] opacity-90 leading-tight max-w-[90%]">{activeGameEvent.description}</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl backdrop-blur-sm border border-white/20 shadow-inner group-hover:scale-110 transition-transform">
                     <i className={`fas ${activeGameEvent.theme.icon}`}></i>
                  </div>
               </div>
            </div>
         )}

         {/* --- NEW WIDGETS SECTION --- */}

         {/* 4. SPLIT ROW: EVENTS & REWARDS (Trimmed & Enhanced) */}
         {!simplifiedView && (
            <div className="grid grid-cols-2 gap-4">
               {/* Trimmed Events Widget */}
               <div
                  onClick={() => setShowEventsModal(true)}
                  className={`h-36 rounded-[28px] p-4 text-white shadow-lg relative overflow-hidden group cursor-pointer active:scale-95 transition-all ${currentEvent.bg}`}
               >
                  <div className="relative z-10 flex flex-col h-full justify-between">
                     <div>
                        <span className="text-[7px] font-black uppercase tracking-widest opacity-80 mb-1 block">Quick Event</span>
                        <h4 className="font-black text-sm leading-tight line-clamp-2">{currentEvent.title}</h4>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-[10px]">
                           <i className={`fas ${currentEvent.icon}`}></i>
                        </div>
                        <span className="text-[9px] font-bold opacity-90">{currentEvent.date}</span>
                     </div>
                  </div>
                  <div className="absolute -right-2 -bottom-2 text-6xl opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-500">
                     <i className={`fas ${currentEvent.icon}`}></i>
                  </div>
               </div>

               {/* Trimmed Rewards Widget */}
               <div
                  onClick={() => setShowRewardsModal(true)}
                  className="h-36 bg-white rounded-[28px] p-4 border border-slate-100 shadow-sm relative overflow-hidden group cursor-pointer active:scale-95 transition-all"
               >
                  <div className="relative z-10 flex flex-col h-full justify-between">
                     <div className="flex justify-between items-start">
                        <h4 className="font-black text-xs text-slate-800 uppercase tracking-tighter">Eco Shop</h4>
                        <i className="fas fa-gift text-amber-500 text-[10px]"></i>
                     </div>
                     <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-green-700 text-sm">
                           <i className="fas fa-coffee"></i>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[9px] font-black text-slate-800">Free Coffee</span>
                           <span className="text-[7px] font-bold text-slate-400">Limited Offer</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 5. AUTO-SCROLL NEWS & ANALYTICS INSIGHTS */}
         {!simplifiedView && (
            <div className="bg-white rounded-[32px] p-5 shadow-sm border border-slate-100 relative overflow-hidden">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-slate-800 text-xs flex items-center gap-2 px-1 uppercase tracking-widest">
                     <i className="far fa-newspaper text-emerald-500"></i> Pulse Feed
                  </h3>
                  <div className="flex p-0.5 bg-slate-50 rounded-lg">
                     <button onClick={() => setNewsFilter('UAE')} className={`px-3 py-1 rounded-md text-[8px] font-black transition-all ${newsFilter === 'UAE' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}>UAE</button>
                     <button onClick={() => setNewsFilter('Global')} className={`px-3 py-1 rounded-md text-[8px] font-black transition-all ${newsFilter === 'Global' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}>GLOBAL</button>
                  </div>
               </div>

               <div
                  onClick={() => setShowNewsModal(true)}
                  className="relative h-24 bg-slate-50 rounded-2xl border border-slate-100 flex overflow-hidden cursor-pointer group hover:bg-white transition-colors"
               >
                  <div className="flex-1 p-3.5 flex flex-col justify-center gap-1 animate-[fadeIn_0.3s]">
                     <div className="flex items-center gap-2">
                        <span className="text-[7px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase tracking-tighter">{activeNews[currentNewsIndex].source}</span>
                        <span className="text-[7px] font-bold text-slate-400">• {activeNews[currentNewsIndex].time}</span>
                     </div>
                     <h4 className="text-[11px] font-black text-slate-800 leading-tight line-clamp-2 transition-transform group-hover:translate-x-1">
                        {activeNews[currentNewsIndex].title}
                     </h4>
                  </div>
                  <div className="w-24 h-full bg-slate-200 relative shrink-0">
                     <img src={activeNews[currentNewsIndex].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="News" />
                  </div>
               </div>
            </div>
         )}

         {/* 6. ECO-INSIGHTS HUB (Knowledge Base Overhaul) */}
         {!simplifiedView && (
            <div
               onClick={() => setShowResourcesModal(true)}
               className="bg-slate-900 rounded-[32px] p-5 shadow-2xl relative overflow-hidden group cursor-pointer active:scale-95 transition-all"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px]"></div>
               <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-emerald-400 text-lg border border-white/10 transition-transform group-hover:rotate-12">
                        <i className="fas fa-lightbulb"></i>
                     </div>
                     <div>
                        <h4 className="font-black text-white text-xs uppercase tracking-widest">Eco-Insights Hub</h4>
                        <p className="text-[9px] font-bold text-emerald-300 opacity-80 uppercase mt-0.5 tracking-tighter">Guides • Videos • Expert Tips</p>
                     </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:text-emerald-400 transition-colors">
                     <i className="fas fa-arrow-right text-[10px]"></i>
                  </div>
               </div>
            </div>
         )}



         {/* Floating Chat Button - Moved higher to avoid Home Navbar */}
         <button onClick={() => onNavigate(ScreenName.CHAT)} className="fixed bottom-36 right-6 lg:right-[calc(50%-225px+24px)] w-14 h-14 bg-[#0F172A] text-white rounded-full shadow-[0_10px_30px_rgba(15,23,42,0.4)] flex items-center justify-center z-40 hover:scale-110 active:scale-95 transition-all duration-300 group">
            <div className="absolute inset-0 rounded-full border border-white/10"></div>
            <i className="fas fa-comment-dots text-xl group-hover:rotate-12 transition-transform"></i>
            <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0F172A]"></div>
         </button>

         {/* --- MODALS --- */}

         {/* 1. COMMUNITY EVENTS MODAL */}
         {showEventsModal && (
            <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowEventsModal(false)}>
               <div className="bg-[var(--bg-primary)] w-full max-w-[430px] mx-auto h-[85vh] rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-[var(--border-light)] bg-white rounded-t-[32px] flex justify-between items-center">
                     <h2 className="text-xl font-bold font-jakarta">Community Events</h2>
                     <button onClick={() => setShowEventsModal(false)} className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center"><i className="fas fa-times text-sm"></i></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 pb-20 space-y-4">
                     <h3 className="font-bold text-[var(--text-primary)]">Upcoming This Month</h3>
                     {UPCOMING_EVENTS.map((evt) => (
                        <div key={evt.id} className="bg-white p-4 rounded-2xl border border-[var(--border-light)] flex gap-4 shadow-sm hover:shadow-md transition-shadow">
                           <div className={`w-16 flex flex-col items-center justify-center rounded-xl text-white ${evt.bg}`}>
                              <div className="text-xs font-bold uppercase">{evt.date.split(' ')[1]}</div>
                              <div className="text-xl font-bold">{evt.date.split(' ')[0]}</div>
                           </div>
                           <div className="flex-1 py-1">
                              <h4 className="font-bold text-[var(--text-primary)]">{evt.title}</h4>
                              <div className="text-xs text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                                 <i className="fas fa-clock text-[10px]"></i> {evt.time}
                                 <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                 <i className="fas fa-map-marker-alt text-[10px]"></i> {evt.location}
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                 <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>)}
                                    <div className="w-6 h-6 rounded-full bg-[var(--bg-tertiary)] border-2 border-white flex items-center justify-center text-[8px] font-bold">+{evt.attendees}</div>
                                 </div>
                                 <button className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs font-bold rounded-full hover:bg-[var(--forest-light)] hover:text-white transition-colors">RSVP</button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}

         {/* 1. TASKS POP-UP (Revealed on click) */}
         {showTasksModal && (
            <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={() => { setShowTasksModal(false); setActiveTaskDetails(null); }}>
               <div className="w-full max-w-[430px] mx-auto h-[75vh] bg-white rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden" onClick={e => e.stopPropagation()}>

                  {/* Task Detail View (Nested) */}
                  {activeTaskDetails ? (
                     <div className="flex-1 flex flex-col h-full bg-slate-50">
                        <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center shadow-sm relative z-10">
                           <button onClick={() => setActiveTaskDetails(null)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800"><i className="fas fa-arrow-left"></i></button>
                           <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Mission Details</h3>
                           <div className="w-8"></div>
                        </div>
                        <div className="p-6 flex-1 overflow-y-auto">
                           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center mb-6">
                              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-3xl mb-4 shadow-lg shadow-emerald-200">
                                 <i className={`fas ${activeTaskDetails.icon}`}></i>
                              </div>
                              <h2 className="text-xl font-black text-slate-800 mb-2 leading-tight">{activeTaskDetails.title}</h2>
                              <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">{activeTaskDetails.duration || 'Daily'} Challenge</span>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed">{activeTaskDetails.fullDescription || activeTaskDetails.subtitle}</p>
                           </div>

                           <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                                 <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Reward</div>
                                 <div className="text-xl font-black text-amber-500 flex items-center justify-center gap-1"><i className="fas fa-coins text-sm"></i> {activeTaskDetails.reward}</div>
                              </div>
                              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                                 <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Started</div>
                                 <div className="text-sm font-black text-slate-700">{activeTaskDetails.dateAdded || 'Today'}</div>
                              </div>
                           </div>
                        </div>
                        <div className="p-6 bg-white border-t border-gray-100">
                           <button onClick={() => handleCompleteTask(activeTaskDetails)} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2">
                              <i className="fas fa-check-circle"></i> Mark as Completed
                           </button>
                        </div>
                     </div>
                  ) : (
                     <>
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center shrink-0">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                 <i className="fas fa-tasks"></i>
                              </div>
                              <div>
                                 <h2 className="text-xl font-bold text-slate-800">Active Missions</h2>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{activeTasks.length} in progress</p>
                              </div>
                           </div>
                           <button onClick={() => setShowTasksModal(false)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group hover:text-emerald-500 transition-colors">
                              <i className="fas fa-times"></i>
                           </button>
                        </div>

                        {/* Main List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-slate-50/30 modal-cushion">

                           {/* Tabs for Daily/Weekly/Monthly (Visual organization) */}
                           {['daily', 'weekly', 'monthly'].map(dur => {
                              const tasksInDur = activeTasks.filter(t => (t.duration || 'daily') === dur);
                              if (tasksInDur.length === 0) return null;
                              return (
                                 <div key={dur} className="mb-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">{dur} Missions</h4>
                                    <div className="space-y-3">
                                       {tasksInDur.map((task) => (
                                          <div key={task.id} onClick={() => setActiveTaskDetails(task)} className="p-4 bg-white rounded-2xl border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
                                             <div className="flex items-center gap-4 mb-3 relative z-10">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg shadow-sm ${task.progress === 100 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors'}`}>
                                                   <i className={`fas ${task.icon}`}></i>
                                                </div>
                                                <div className="flex-1">
                                                   <div className="flex justify-between">
                                                      <h4 className="font-bold text-sm text-slate-800 mb-0.5">{task.title}</h4>
                                                      <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md self-start">+{task.reward}</span>
                                                   </div>
                                                   <span className="text-[10px] font-medium text-slate-400 line-clamp-1">{task.subtitle}</span>
                                                </div>
                                             </div>
                                             <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden relative z-10">
                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${task.progress}%` }}></div>
                                             </div>
                                             <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-400 relative z-10">
                                                <span>Progress</span>
                                                <span className="text-emerald-600">{task.progress}%</span>
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </>
                  )}
               </div>
            </div>
         )}

         {/* 2. REWARDS SHOP MODAL (Contained) */}
         {showRewardsModal && (
            <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowRewardsModal(false)}>
               <div className="w-full max-w-[430px] mx-auto h-[85vh] bg-[var(--bg-primary)] rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-[var(--border-light)] bg-white flex justify-between items-center shrink-0">
                     <h2 className="text-xl font-bold font-jakarta">Rewards Shop</h2>
                     <button onClick={() => setShowRewardsModal(false)} className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center"><i className="fas fa-times text-sm"></i></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 pb-20 no-scrollbar">
                     <div className="mb-6 p-6 bg-emerald-900 rounded-[32px] text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px]"></div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">Available Points</div>
                        <div className="text-4xl font-black font-jakarta flex items-baseline gap-2">
                           2,850 <span className="text-sm font-bold text-emerald-500 opacity-80 uppercase">WDA</span>
                        </div>
                        <div className="mt-6 flex gap-2">
                           <button className="flex-1 py-3 bg-white/10 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/10">Refill</button>
                           <button className="flex-1 py-3 bg-emerald-500 text-emerald-950 rounded-xl text-[9px] font-black uppercase tracking-widest">History</button>
                        </div>
                     </div>
                     <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-widest mb-4 px-1">Exclusive Offers</h3>
                     <div className="grid grid-cols-2 gap-4">
                        {OFFERS.map((offer) => (
                           <div key={offer.id} className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm text-center relative group hover:shadow-md transition-all">
                              <div className="absolute top-3 right-3 text-[8px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">{offer.discount}</div>
                              <div className="w-12 h-12 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-inner" style={{ color: offer.color }}>
                                 <i className={`fas ${offer.id === 1 ? 'fa-coffee' : offer.id === 2 ? 'fa-shopping-cart' : 'fa-leaf'}`}></i>
                              </div>
                              <h4 className="font-bold text-xs text-slate-800 mb-1">{offer.partner}</h4>
                              <p className="text-[9px] text-slate-400 mb-4 line-clamp-2 leading-relaxed">{offer.desc}</p>
                              <button className="w-full py-2.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-[14px] hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-900/10">Redeem</button>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 3. NEWS FEED MODAL (Contained) */}
         {showNewsModal && (
            <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowNewsModal(false)}>
               <div className="w-full max-w-[430px] mx-auto h-[90vh] bg-white rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-gray-100 bg-white flex flex-col gap-4 shrink-0">
                     <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Pulse Feed</h2>
                        <button onClick={() => setShowNewsModal(false)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><i className="fas fa-times text-sm"></i></button>
                     </div>
                     <div className="flex p-0.5 bg-slate-100 rounded-xl">
                        <button onClick={() => setNewsFilter('UAE')} className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all ${newsFilter === 'UAE' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}>UAE</button>
                        <button onClick={() => setNewsFilter('Global')} className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all ${newsFilter === 'Global' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}>Global</button>
                     </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 pb-20 space-y-6 no-scrollbar">
                     {activeNews.map((item) => (
                        <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 group cursor-pointer hover:border-emerald-200 transition-all">
                           <div className="h-44 bg-slate-100 relative">
                              <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="News" />
                              <div className="absolute top-4 left-4 flex gap-2">
                                 <span className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-[8px] font-black text-slate-800 uppercase shadow-sm">{item.source}</span>
                              </div>
                           </div>
                           <div className="p-5">
                              <span className="text-[9px] font-bold text-slate-400 mb-2 block uppercase tracking-widest">{item.time}</span>
                              <h3 className="font-black text-slate-800 text-base mb-2 leading-tight group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                              <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed font-medium">Insights into the latest sustainability trends shaping our future...</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}

         {/* 4. RESOURCES MODAL (Contained) */}
         {showResourcesModal && (
            <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowResourcesModal(false)}>
               <div className="w-full max-w-[430px] mx-auto h-[85vh] bg-white rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center shrink-0">
                     <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Eco-Insights</h2>
                     <button onClick={() => setShowResourcesModal(false)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><i className="fas fa-times text-sm"></i></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 pb-20 no-scrollbar">
                     <div className="grid grid-cols-2 gap-4">
                        {RESOURCES.map((res) => (
                           <div key={res.id} className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm text-center hover:border-emerald-200 transition-all cursor-pointer group">
                              <div className={`w-14 h-14 mx-auto ${res.color} rounded-2xl flex items-center justify-center text-xl mb-4 shadow-inner group-hover:scale-110 transition-transform`}>
                                 <i className={`fas ${res.icon}`}></i>
                              </div>
                              <span className="text-[8px] uppercase font-black text-slate-300 mb-2 block tracking-widest">{res.type}</span>
                              <h4 className="font-black text-xs text-slate-800 mb-4 leading-tight">{res.title}</h4>
                              <div className="flex items-center justify-center gap-1.5 text-[9px] font-black text-emerald-500 uppercase">
                                 Explore <i className="fas fa-arrow-right text-[7px]"></i>
                              </div>
                           </div>
                        ))}
                        <div className="bg-slate-50 p-5 rounded-[28px] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-60">
                           <i className="fas fa-search text-slate-300 text-xl mb-2"></i>
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">More Soon</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 5. GOAL MODAL (Contained & Refined) */}
         {showGoalModal && (
            <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowGoalModal(false)}>
               <div className="w-full max-w-[430px] mx-auto bg-white rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh] pointer-events-auto" onClick={e => e.stopPropagation()}>
                  <div className="bg-indigo-900 p-8 text-white relative">
                     <button onClick={() => setShowGoalModal(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"><i className="fas fa-times text-sm"></i></button>
                     <span className="text-[8px] font-black uppercase tracking-[0.3em] text-amber-300 mb-3 block flex items-center gap-2"><i className="fas fa-star animate-pulse"></i> Dream Dashboard</span>
                     <h2 className="text-3xl font-black mb-1 font-jakarta tracking-tight">Zero-waste 2026</h2>
                     <p className="text-xs text-indigo-200 font-medium tracking-tight">Mission: Elimination of personal carbon waste</p>

                     <div className="mt-8">
                        <div className="flex justify-between items-baseline mb-3">
                           <span className="text-[10px] font-black text-white/60 uppercase">Progress</span>
                           <span className="text-2xl font-black text-white">65%</span>
                        </div>
                        <div className="h-2 bg-black/20 rounded-full overflow-hidden shadow-inner">
                           <div className="h-full bg-gradient-to-r from-pink-500 to-amber-400 w-[65%] shadow-[0_0_15px_rgba(251,191,36,0.5)]"></div>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 overflow-y-auto no-scrollbar pb-24">
                     <div className="flex gap-4 mb-8">
                        {['Edit', 'Log'].map((act, i) => (
                           <button key={i} className="flex-1 py-4 bg-slate-50 rounded-2xl flex flex-col items-center gap-2 hover:bg-indigo-50 hover:text-indigo-700 transition-all border border-slate-100 group">
                              <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                                 <i className={`fas ${act === 'Edit' ? 'fa-pen' : 'fa-history'}`}></i>
                              </div>
                              <span className="text-[8px] font-black uppercase tracking-widest">{act}</span>
                           </button>
                        ))}
                     </div>

                     {/* Breakdown Section */}
                     <div className="mb-8">
                        <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-[0.2em] mb-4">Dream Breakdown</h3>
                        <div className="space-y-3">
                           <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0"><i className="fas fa-check text-[10px]"></i></div>
                              <div className="flex-1">
                                 <div className="text-[10px] font-bold text-slate-800">Inventory Setup</div>
                                 <div className="text-[8px] text-slate-400 font-bold uppercase">Completed</div>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-emerald-100 shadow-sm">
                              <div className="w-8 h-8 rounded-full bg-white text-emerald-500 border-2 border-emerald-100 flex items-center justify-center shrink-0"><i className="fas fa-spinner fa-spin text-[10px]"></i></div>
                              <div className="flex-1">
                                 <div className="text-[10px] font-bold text-slate-800">Plastic Reduction</div>
                                 <div className="text-[8px] text-emerald-500 font-bold uppercase">In Progress</div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Goals Section */}
                     <div className="mb-8">
                        <div className="flex justify-between items-end mb-4">
                           <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-[0.2em]">Goals (1/2)</h3>
                           <button className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center hover:bg-indigo-100"><i className="fas fa-plus text-[10px]"></i></button>
                        </div>
                        <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-[32px] -mr-4 -mt-4 transition-all group-hover:bg-indigo-50"></div>
                           <div className="relative z-10">
                              <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-3"><i className="fas fa-bullseye text-xs"></i></div>
                              <h4 className="font-black text-slate-800 text-xs mb-1">Reduce Energy 10%</h4>
                              <p className="text-[10px] text-slate-400 font-medium">Monthly electric bill target</p>
                           </div>
                        </div>
                     </div>

                     {/* Wishes Section */}
                     <div>
                        <div className="flex justify-between items-end mb-4">
                           <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-[0.2em]">Wishes (2/4)</h3>
                           <button className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center hover:bg-indigo-100"><i className="fas fa-plus text-[10px]"></i></button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm hover:border-pink-200 transition-colors group cursor-pointer">
                              <div className="w-8 h-8 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center mb-3"><i className="fas fa-bicycle text-xs"></i></div>
                              <h4 className="font-bold text-[10px] text-slate-800 mb-0.5">Electric Bike</h4>
                              <div className="h-1 bg-slate-100 rounded-full overflow-hidden w-full mt-2"><div className="h-full bg-pink-400 w-1/3"></div></div>
                           </div>
                           <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm hover:border-pink-200 transition-colors group cursor-pointer">
                              <div className="w-8 h-8 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center mb-3"><i className="fas fa-solar-panel text-xs"></i></div>
                              <h4 className="font-bold text-[10px] text-slate-800 mb-0.5">Solar Roof</h4>
                              <div className="h-1 bg-slate-100 rounded-full overflow-hidden w-full mt-2"><div className="h-full bg-indigo-400 w-[10%]"></div></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 6. CONVERT MODAL (Contained) */}
         {showConvertModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-end justify-center" onClick={() => setShowConvertModal(false)}>
               <div className="w-full max-w-[430px] mx-auto bg-white rounded-t-[32px] p-8 animate-[slideUp_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-8">
                     <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Exchange Point</h2>
                     <button onClick={() => setShowConvertModal(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><i className="fas fa-times"></i></button>
                  </div>
                  <div className="space-y-4 mb-8">
                     <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-5 text-white flex items-center justify-between cursor-pointer hover:shadow-xl transition-all"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner"><i className="fas fa-plane"></i></div><div><div className="font-black text-xs uppercase tracking-widest mb-0.5">Skywards Miles</div><div className="text-[10px] opacity-70 font-bold">Rate: 10 Wda = 1 Mile</div></div></div><i className="fas fa-chevron-right opacity-30"></i></div>
                     <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-5 text-white flex items-center justify-between cursor-pointer hover:shadow-xl transition-all"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner"><i className="fas fa-gas-pump"></i></div><div><div className="font-black text-xs uppercase tracking-widest mb-0.5">ADNOC Rewards</div><div className="text-[10px] opacity-70 font-bold">Rate: 50 Wda = 5 Pts</div></div></div><i className="fas fa-chevron-right opacity-30"></i></div>
                  </div>
                  <button className="w-full h-14 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/40">Initiate Transfer</button>
               </div>
            </div>
         )}

         {/* 8. AI INTELLIGENCE HUB (EXPANDED MODAL) */}
         <AnimatePresence>
            {isAiExpanded && (
               <div
                  className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-sm"
                  onClick={() => setIsAiExpanded(false)}
               >
                  <motion.div
                     initial={{ y: '100%' }}
                     animate={{ y: 0 }}
                     exit={{ y: '100%' }}
                     transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                     className="bg-white w-full max-w-[430px] mx-auto rounded-t-[40px] shadow-2xl overflow-hidden active:scale-100"
                     onClick={e => e.stopPropagation()}
                  >
                     <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                           <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-2 shadow-sm">
                                 <img src={aiRobot} alt="AI" className="w-full h-full object-contain" />
                              </div>
                              <div>
                                 <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Ai suggested tasks</h2>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Hub • v2.0</p>
                              </div>
                           </div>
                           <button
                              onClick={() => setIsAiExpanded(false)}
                              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                           >
                              <i className="fas fa-times"></i>
                           </button>
                        </div>

                        {/* Category Toggles */}
                        <div className="bg-slate-50 p-1.5 rounded-[20px] border border-slate-100 flex mb-8">
                           {(['daily', 'weekly', 'monthly'] as const).map((cat) => (
                              <button
                                 key={cat}
                                 onClick={() => { setAiCategory(cat); setAiIndex(0); }}
                                 className={`flex-1 py-3.5 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all ${aiCategory === cat ? 'bg-white shadow-md text-slate-900 ring-1 ring-slate-100' : 'text-slate-400'}`}
                              >
                                 {cat}
                              </button>
                           ))}
                        </div>

                        {/* Current Suggestion Detail Card */}
                        <div
                           onClick={() => setShowAiDetailsModal(true)}
                           className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-inner mb-8 relative group cursor-pointer hover:border-emerald-200 transition-colors"
                        >
                           <div className="absolute top-4 right-4 text-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity">
                              <i className="fas fa-expand-alt text-lg"></i>
                           </div>
                           <h3 className="text-sm font-black text-slate-800 mb-2 leading-tight pr-8">{currentAiSuggestion.title}</h3>
                           <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-6 opacity-90 line-clamp-2">{currentAiSuggestion.subtitle}</p>

                           <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                              <div className="flex items-center gap-2">
                                 <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+{currentAiSuggestion.reward} WDA</span>
                                 <span className="text-[9px] font-bold text-slate-400">• Est. Time: {aiCategory === 'daily' ? '15m' : aiCategory === 'weekly' ? '2h' : '5h+'}</span>
                              </div>
                           </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                           <button
                              onClick={handleAcceptSuggestion}
                              className="flex-[2] h-16 bg-slate-900 text-white rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                           >
                              Accept Task <i className="fas fa-arrow-right text-[10px]"></i>
                           </button>
                           <button
                              onClick={generateNewAiSuggestion}
                              className="flex-1 h-16 bg-indigo-50 text-indigo-500 hover:text-indigo-600 border border-indigo-100 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1"
                           >
                              Next
                           </button>
                        </div>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

         {/* 9. AI DETAILS MODAL (FULL DESCRIPTION) */}
         <AnimatePresence>
            {showAiDetailsModal && (
               <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowAiDetailsModal(false)}>
                  <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl relative"
                     onClick={e => e.stopPropagation()}
                  >
                     <div className="absolute top-4 right-4">
                        <button onClick={() => setShowAiDetailsModal(false)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><i className="fas fa-times"></i></button>
                     </div>
                     <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 text-2xl mb-4 shadow-sm">
                        <i className={`fas ${currentAiSuggestion.icon}`}></i>
                     </div>
                     <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight">{currentAiSuggestion.title}</h3>
                     <div className="flex gap-2 mb-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded uppercase tracking-widest">{aiCategory.charAt(0).toUpperCase() + aiCategory.slice(1)}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[9px] font-bold rounded uppercase tracking-widest">+{currentAiSuggestion.reward} WDA</span>
                     </div>
                     <div className="h-px bg-slate-100 w-full mb-4"></div>
                     <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                        {currentAiSuggestion.subtitle}
                        <br /><br />
                        Based on your current activity patterns, this challenge helps you balance your carbon offset goals while earning extra rewards. Complete this to unlock higher tier badges.
                     </p>
                     <button
                        onClick={() => { setShowAiDetailsModal(false); if (!activeTasks.find(t => t.id === currentAiSuggestion.id)) handleAcceptSuggestion(); }}
                        className="w-full h-14 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                     >
                        Accept Challenge
                     </button>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default HomeScreen;
