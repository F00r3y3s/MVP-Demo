
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenName, Challenge } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { SDG_LIST, SDG_ACTIVITIES, MAX_ACTIVE_TASKS } from '../data/sdgActivities';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onBack: () => void;
}

type ViewMode = 'overview' | 'activities' | 'analytics';

const TargetScreen: React.FC<Props> = ({ onNavigate, onBack }) => {
  // State Management
  const { simplifiedView } = useAccessibility();
  const [viewMode, setViewMode] = useState<ViewMode>('overview');

  useEffect(() => { if (simplifiedView) setViewMode('overview'); }, [simplifiedView]); // Enforce overview

  const [selectedSDG, setSelectedSDG] = useState<number | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Challenge | null>(null);
  const [filterDuration, setFilterDuration] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all');

  // Load active tasks from localStorage (synced with Home screen)
  const [activeTasks, setActiveTasks] = useState<Challenge[]>([]);
  const [completedActivities, setCompletedActivities] = useState<any[]>([]);

  useEffect(() => {
    // Sync with Home screen data
    const completed = JSON.parse(localStorage.getItem('completed_activities') || '[]');
    setCompletedActivities(completed);

    // Mock active tasks (in real app, this would come from global state or localStorage)
    const mockActive: Challenge[] = [
      { id: '1', title: '10k Steps', subtitle: 'Walk 10,000 steps today', icon: 'fa-walking', type: 'daily', duration: 'daily', progress: 65, reward: 100, status: 'active', sdg: 3 },
      { id: '2', title: 'Zero Food Waste', subtitle: 'Throw away zero food this week', icon: 'fa-trash-restore', type: 'weekly', duration: 'weekly', progress: 40, reward: 400, status: 'active', sdg: 12 },
      { id: '3', title: 'No Single-Use Plastic', subtitle: 'Avoid all plastic cutlery/bags today', icon: 'fa-ban', type: 'daily', duration: 'daily', progress: 85, reward: 60, status: 'active', sdg: 12 },
    ];
    setActiveTasks(mockActive);
  }, []);

  // Calculate aggregate stats
  const totalActiveTasks = activeTasks.length;
  const totalCompleted = completedActivities.length;
  const totalWdaEarned = completedActivities.reduce((sum, act) => sum + (act.reward || 0), 0);
  const avgProgress = activeTasks.length > 0
    ? Math.round(activeTasks.reduce((sum, t) => sum + t.progress, 0) / activeTasks.length)
    : 0;

  // SDG Progress (mock data - in real app, calculate from completed activities)
  const sdgProgress = SDG_LIST.map(sdg => {
    const relatedCompleted = completedActivities.filter(act => act.sdg === sdg.id).length;
    const relatedActive = activeTasks.filter(act => act.sdg === sdg.id).length;
    return {
      ...sdg,
      progress: Math.min(100, (relatedCompleted * 20) + (relatedActive * 10)),
      completedCount: relatedCompleted,
      activeCount: relatedActive
    };
  });

  const filteredActivities = filterDuration === 'all'
    ? SDG_ACTIVITIES
    : SDG_ACTIVITIES.filter(a => a.duration === filterDuration);

  const selectedSDGData = selectedSDG ? sdgProgress.find(s => s.id === selectedSDG) : null;

  // PHASE 2: Advanced Smart Recommendations Engine
  const generateSmartRecommendations = (): Challenge[] => {
    const recommendations: Challenge[] = [];

    // 1. Find SDG gaps (SDGs with low progress)
    const sdgGaps = sdgProgress
      .filter(sdg => sdg.progress < 50)
      .sort((a, b) => a.progress - b.progress)
      .slice(0, 3);

    // 2. Get activities for gap SDGs that aren't already active
    const activeIds = activeTasks.map(t => t.id);
    sdgGaps.forEach(sdg => {
      const gapActivities = SDG_ACTIVITIES.filter(
        a => a.sdg === sdg.id && !activeIds.includes(a.id)
      );
      if (gapActivities.length > 0) {
        recommendations.push(gapActivities[0]);
      }
    });

    // 3. Progressive difficulty - if user is doing well, suggest harder tasks
    if (avgProgress > 70) {
      const challengingActivities = SDG_ACTIVITIES.filter(
        a => a.duration === 'monthly' && !activeIds.includes(a.id)
      );
      if (challengingActivities.length > 0 && recommendations.length < 3) {
        recommendations.push(challengingActivities[0]);
      }
    }

    // 4. Quick wins - if user has low progress, suggest easy daily tasks
    if (avgProgress < 40) {
      const quickWins = SDG_ACTIVITIES.filter(
        a => a.duration === 'daily' && a.reward < 50 && !activeIds.includes(a.id)
      );
      if (quickWins.length > 0 && recommendations.length < 3) {
        recommendations.push(quickWins[0]);
      }
    }

    // 5. Fill remaining slots with popular/high-impact activities
    if (recommendations.length < 3) {
      const highImpact = SDG_ACTIVITIES.filter(
        a => a.reward > 200 && !activeIds.includes(a.id) && !recommendations.includes(a)
      );
      recommendations.push(...highImpact.slice(0, 3 - recommendations.length));
    }

    return recommendations.slice(0, 3);
  };

  const smartRecommendations = generateSmartRecommendations();

  // Recommendation reasons based on context
  const getRecommendationReason = (activity: Challenge): string => {
    const sdg = sdgProgress.find(s => s.id === activity.sdg);
    if (sdg && sdg.progress < 50) {
      return `Boost your SDG #${sdg.id} progress (currently ${sdg.progress}%)`;
    }
    if (activity.duration === 'monthly' && avgProgress > 70) {
      return 'You\'re crushing it! Ready for a bigger challenge?';
    }
    if (activity.duration === 'daily' && avgProgress < 40) {
      return 'Quick win to build momentum';
    }
    return `High-impact activity worth ${activity.reward} Wda`;
  };

  // PHASE 3: Advanced Analytics Data Generation
  const generateTrendData = () => {
    // Generate 7 days of historical data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => ({
      day,
      tasks: Math.floor(Math.random() * 5) + 1,
      wda: Math.floor(Math.random() * 200) + 50,
      impact: Math.floor(Math.random() * 40) + 60
    }));
  };

  const trendData = generateTrendData();

  // Calculate predictions
  const currentWeekWda = trendData.reduce((sum, d) => sum + d.wda, 0);
  const avgDailyWda = Math.round(currentWeekWda / 7);
  const projectedMonthlyWda = avgDailyWda * 30;
  const projectedYearlyWda = avgDailyWda * 365;

  // Community comparison (mock data)
  const communityAvgWda = 850;
  const userRank = 15; // Top 15%
  const vsAverage = Math.round(((currentWeekWda - communityAvgWda) / communityAvgWda) * 100);

  // PHASE 3B: Achievements & Social Features
  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first activity', icon: 'fa-seedling', unlocked: true, unlockedDate: '2 days ago', color: 'from-green-400 to-emerald-600', rarity: 'common' },
    { id: 2, name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: 'fa-fire', unlocked: true, unlockedDate: '1 week ago', color: 'from-orange-400 to-red-600', rarity: 'rare' },
    { id: 3, name: 'Carbon Crusher', description: 'Offset 100kg of CO₂', icon: 'fa-cloud', unlocked: true, unlockedDate: '3 days ago', color: 'from-blue-400 to-indigo-600', rarity: 'epic' },
    { id: 4, name: 'Water Wizard', description: 'Save 1000L of water', icon: 'fa-tint', unlocked: false, progress: 65, color: 'from-cyan-400 to-blue-600', rarity: 'rare' },
    { id: 5, name: 'SDG Champion', description: 'Contribute to all 17 SDGs', icon: 'fa-globe', unlocked: false, progress: 35, color: 'from-purple-400 to-pink-600', rarity: 'legendary' },
    { id: 6, name: 'Community Leader', description: 'Help 10 friends get started', icon: 'fa-users', unlocked: false, progress: 40, color: 'from-amber-400 to-orange-600', rarity: 'epic' },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  // Streak data
  const currentStreak = 12;
  const longestStreak = 18;
  const streakHistory = [true, true, false, true, true, true, true]; // Last 7 days

  // Community challenges (from Community screen)
  const communityChallenges = [
    { id: 1, title: 'UAE Green Week', participants: 1247, endsIn: '3 days', reward: 500, icon: 'fa-flag-checkered', color: 'from-emerald-400 to-teal-600' },
    { id: 2, title: 'Zero Waste Challenge', participants: 892, endsIn: '5 days', reward: 750, icon: 'fa-recycle', color: 'from-blue-400 to-cyan-600' },
  ];

  return (
    <div className="bg-[var(--bg-primary)] min-h-full pb-32 font-jakarta">

      {/* HERO SECTION: Visual Progress + Key Stats */}
      <div className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 pt-12 pb-8 px-6 border-b border-gray-100">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-[120px]">
          <i className="fas fa-bullseye"></i>
        </div>

        <div className="relative z-10">
          <h1 className="text-2xl font-black text-slate-800 mb-1 tracking-tight">Mission Hub</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-6">Your Sustainability Command Center</p>

          {/* Compact Target Visual */}
          <div className="flex items-center justify-between gap-6 mb-6">
            {/* Mini Target */}
            <div className="relative w-32 h-32 shrink-0">
              <div className="absolute inset-0 rounded-full border-[8px] border-slate-100 flex items-center justify-center">
                <div className="absolute inset-4 rounded-full border-[8px] border-emerald-100 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 shadow-lg flex items-center justify-center text-white">
                    <i className="fas fa-leaf text-sm"></i>
                  </div>
                </div>
              </div>
              {/* Progress Ring */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" className="text-emerald-200" strokeWidth="4" fill="none" stroke="currentColor" opacity="0.3" />
                <circle
                  cx="64" cy="64" r="56"
                  className="text-emerald-500"
                  strokeWidth="4"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="352"
                  strokeDashoffset={352 - (352 * avgProgress / 100)}
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Key Stats Grid */}
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-white shadow-sm">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Active</div>
                <div className="text-2xl font-black text-emerald-600">{totalActiveTasks}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-white shadow-sm">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Completed</div>
                <div className="text-2xl font-black text-blue-600">{totalCompleted}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-white shadow-sm col-span-2">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Impact</div>
                <div className="text-2xl font-black text-amber-600">{totalWdaEarned} <span className="text-sm text-slate-500">Wda</span></div>
              </div>
            </div>
          </div>

          {/* Quick Nav Tabs */}
          {!simplifiedView && (
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('overview')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${viewMode === 'overview' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white/60 text-slate-600 hover:bg-white'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode('activities')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${viewMode === 'activities' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white/60 text-slate-600 hover:bg-white'}`}
              >
                Explore
              </button>
              <button
                onClick={() => setViewMode('analytics')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${viewMode === 'analytics' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white/60 text-slate-600 hover:bg-white'}`}
              >
                Analytics
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="p-6 space-y-6">

        <AnimatePresence mode="wait">
          {viewMode === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >

              {/* Active Missions Panel */}
              <div>
                <div className="flex justify-between items-center mb-4 px-1">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Active Missions</h3>
                  <span className="text-xs font-bold text-slate-400">{activeTasks.length}/{MAX_ACTIVE_TASKS.daily + MAX_ACTIVE_TASKS.weekly + MAX_ACTIVE_TASKS.monthly}</span>
                </div>

                {activeTasks.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                    <i className="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
                    <p className="text-sm text-gray-500 font-medium">No active missions yet</p>
                    <button
                      onClick={() => setViewMode('activities')}
                      className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors"
                    >
                      Explore Activities
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeTasks.map(task => (
                      <div
                        key={task.id}
                        onClick={() => setSelectedActivity(task)}
                        className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-sm group-hover:scale-110 transition-transform">
                            <i className={`fas ${task.icon}`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-sm text-slate-800">{task.title}</h4>
                              <span className="text-xs font-black text-emerald-600">{task.progress}%</span>
                            </div>
                            <p className="text-xs text-slate-500">{task.subtitle}</p>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SDG Progress Grid */}
              {!simplifiedView && (
                <div>
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">SDG Impact</h3>
                    <button
                      onClick={() => onNavigate(ScreenName.SDG_DETAILS)}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {sdgProgress.slice(0, 6).map(sdg => (
                      <div
                        key={sdg.id}
                        onClick={() => { setSelectedSDG(sdg.id); setViewMode('overview'); }}
                        className="bg-white rounded-2xl p-3 border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs shadow-sm group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: sdg.color }}
                          >
                            <i className={`fas ${sdg.icon}`}></i>
                          </div>
                          <span className="text-xs font-black text-slate-600">#{sdg.id}</span>
                        </div>
                        <div className="text-[10px] font-bold text-slate-700 mb-2 line-clamp-2 leading-tight">{sdg.name}</div>
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${sdg.progress}%`, backgroundColor: sdg.color }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PHASE 3B: Achievements Gallery */}
              {!simplifiedView && (
                <div>
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Achievements</h3>
                    <span className="text-xs font-bold text-slate-400">{unlockedAchievements.length}/{achievements.length} Unlocked</span>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-4">
                    {/* Unlocked Badges */}
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Earned Badges</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {unlockedAchievements.map(achievement => (
                          <div key={achievement.id} className="relative group cursor-pointer">
                            <div className={`aspect-square rounded-2xl bg-gradient-to-br ${achievement.color} p-4 flex flex-col items-center justify-center text-white shadow-lg hover:scale-105 transition-transform`}>
                              <i className={`fas ${achievement.icon} text-3xl mb-2`}></i>
                              <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <i className="fas fa-check text-xs"></i>
                              </div>
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              <div className="bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                                <div className="font-black mb-0.5">{achievement.name}</div>
                                <div className="text-slate-300 text-[10px]">{achievement.unlockedDate}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Locked Badges */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">In Progress</h4>
                      <div className="space-y-3">
                        {lockedAchievements.map(achievement => (
                          <div key={achievement.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 shadow-sm shrink-0 relative">
                              <i className={`fas ${achievement.icon} text-2xl`}></i>
                              <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
                                <i className="fas fa-lock text-gray-500 text-sm"></i>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <h5 className="font-bold text-sm text-slate-700">{achievement.name}</h5>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${achievement.rarity === 'legendary' ? 'bg-purple-100 text-purple-700' :
                                  achievement.rarity === 'epic' ? 'bg-amber-100 text-amber-700' :
                                    achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                                      'bg-gray-100 text-gray-700'
                                  }`}>{achievement.rarity}</span>
                              </div>
                              <p className="text-xs text-slate-500 mb-2">{achievement.description}</p>
                              {achievement.progress !== undefined && (
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all"
                                      style={{ width: `${achievement.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs font-bold text-slate-600">{achievement.progress}%</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PHASE 3B: Streak Tracker */}
              {!simplifiedView && (
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 px-1">Activity Streak</h3>
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-xs text-orange-100 mb-1 uppercase tracking-wider font-bold">Current Streak</div>
                        <div className="text-5xl font-black">{currentStreak}</div>
                        <div className="text-sm text-orange-100 mt-1">days in a row 🔥</div>
                      </div>
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                        <i className="fas fa-fire text-4xl"></i>
                      </div>
                    </div>

                    {/* Weekly Calendar */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
                      <div className="flex justify-between gap-2">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <span className="text-xs font-bold text-orange-100">{day}</span>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${streakHistory[index]
                              ? 'bg-white text-orange-500 shadow-lg'
                              : 'bg-white/10 border border-white/20 text-white/40'
                              }`}>
                              <i className={`fas ${streakHistory[index] ? 'fa-check' : 'fa-times'} text-sm`}></i>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-orange-100">Longest Streak:</span>
                        <span className="font-black ml-2">{longestStreak} days</span>
                      </div>
                      <div className="text-orange-100 italic">
                        <i className="fas fa-trophy mr-1"></i>
                        Keep it up!
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PHASE 3B: Community Challenges */}
              {!simplifiedView && (
                <div>
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Live Challenges</h3>
                    <button
                      onClick={() => onNavigate(ScreenName.COMMUNITY)}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {communityChallenges.map(challenge => (
                      <div
                        key={challenge.id}
                        onClick={() => onNavigate(ScreenName.COMMUNITY)}
                        className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${challenge.color} flex items-center justify-center text-white text-xl shadow-sm group-hover:scale-110 transition-transform`}>
                            <i className={`fas ${challenge.icon}`}></i>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-slate-800 mb-1">{challenge.title}</h4>
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-slate-500">
                                <i className="fas fa-users mr-1"></i>
                                {challenge.participants.toLocaleString()} joined
                              </span>
                              <span className="text-emerald-600 font-bold">
                                <i className="fas fa-clock mr-1"></i>
                                {challenge.endsIn}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-slate-500 mb-1">Reward</div>
                            <div className="text-lg font-black text-amber-600">+{challenge.reward}</div>
                          </div>
                        </div>
                        <button className="w-full py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors">
                          Join Challenge
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}



              {/* PHASE 2: Advanced Smart Recommendations */}
              {!simplifiedView && (
                <div>
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">AI Recommendations</h3>
                    <div className="flex items-center gap-1.5 bg-purple-50 px-2 py-1 rounded-full">
                      <i className="fas fa-sparkles text-purple-500 text-xs"></i>
                      <span className="text-xs font-bold text-purple-700">Powered by AI</span>
                    </div>
                  </div>

                  {smartRecommendations.length === 0 ? (
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                      <i className="fas fa-check-circle text-4xl text-emerald-500 mb-3"></i>
                      <p className="text-sm text-slate-600 font-medium">You\'re doing great! Check back later for new recommendations.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {smartRecommendations.map((rec, index) => {
                        const sdg = SDG_LIST.find(s => s.id === rec.sdg);
                        const reason = getRecommendationReason(rec);

                        return (
                          <div
                            key={rec.id}
                            className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-purple-300 hover:shadow-md transition-all group cursor-pointer"
                            onClick={() => setSelectedActivity(rec)}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-sm shrink-0 group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: sdg?.color || '#8b5cf6' }}
                              >
                                <i className={`fas ${rec.icon}`}></i>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                  <h4 className="font-bold text-sm text-slate-800">{rec.title}</h4>
                                  <span className="text-xs font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">+{rec.reward}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-2">{rec.subtitle}</p>
                                <div className="flex items-center gap-2">
                                  <i className="fas fa-lightbulb text-purple-500 text-xs"></i>
                                  <p className="text-xs text-purple-700 font-medium italic">{reason}</p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400 uppercase">{rec.duration}</span>
                                {sdg && (
                                  <span className="text-xs font-bold text-slate-400">SDG #{sdg.id}</span>
                                )}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedActivity(rec);
                                }}
                                className="px-3 py-1.5 bg-purple-500 text-white rounded-lg text-xs font-bold hover:bg-purple-600 transition-colors"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          )}

          {viewMode === 'activities' && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >

              {/* Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['all', 'daily', 'weekly', 'monthly'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setFilterDuration(filter as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${filterDuration === filter ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white text-slate-600 hover:bg-gray-50'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Activity Explorer */}
              <div className="space-y-3">
                {filteredActivities.map(activity => {
                  const sdg = SDG_LIST.find(s => s.id === activity.sdg);
                  const isActive = activeTasks.some(t => t.id === activity.id);

                  return (
                    <div
                      key={activity.id}
                      onClick={() => setSelectedActivity(activity)}
                      className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-sm shrink-0"
                          style={{ backgroundColor: sdg?.color || '#64748b' }}
                        >
                          <i className={`fas ${activity.icon}`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-bold text-sm text-slate-800">{activity.title}</h4>
                            {isActive && (
                              <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">ACTIVE</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mb-2">{activity.subtitle}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">+{activity.reward} Wda</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{activity.duration}</span>
                            {sdg && (
                              <span className="text-[10px] font-bold text-slate-400">SDG #{sdg.id}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          )}

          {viewMode === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >

              {/* Weekly Trend Chart */}
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 px-1">Weekly Performance</h3>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-end justify-between h-40 gap-2 mb-4">
                    {trendData.map((data, index) => {
                      const maxWda = Math.max(...trendData.map(d => d.wda));
                      const height = (data.wda / maxWda) * 100;

                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div className="relative w-full flex flex-col justify-end" style={{ height: '120px' }}>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ delay: index * 0.1 }}
                              className="w-full bg-gradient-to-t from-emerald-400 to-emerald-600 rounded-t-lg hover:from-emerald-500 hover:to-emerald-700 transition-colors cursor-pointer group relative"
                            >
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                                {data.wda} Wda
                              </div>
                            </motion.div>
                          </div>
                          <span className="text-xs font-bold text-slate-600">{data.day}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1">Total</div>
                      <div className="text-lg font-black text-slate-800">{currentWeekWda}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1">Avg/Day</div>
                      <div className="text-lg font-black text-emerald-600">{avgDailyWda}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1">Best Day</div>
                      <div className="text-lg font-black text-amber-600">{Math.max(...trendData.map(d => d.wda))}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Predictive Modeling */}
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 px-1">Impact Forecast</h3>
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="fas fa-chart-line text-xl"></i>
                    <h4 className="text-sm font-black uppercase tracking-wider">AI Projection</h4>
                  </div>
                  <p className="text-xs text-indigo-100 mb-6">Based on your current pace, here's what you'll achieve:</p>

                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">This Month</span>
                        <i className="fas fa-calendar-alt text-indigo-200"></i>
                      </div>
                      <div className="text-3xl font-black mb-1">{projectedMonthlyWda.toLocaleString()}</div>
                      <div className="text-xs text-indigo-200">Wda Points</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">This Year</span>
                        <i className="fas fa-trophy text-amber-300"></i>
                      </div>
                      <div className="text-3xl font-black mb-1">{projectedYearlyWda.toLocaleString()}</div>
                      <div className="text-xs text-indigo-200">Wda Points · Top 5% Potential</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20 text-xs text-indigo-100 italic">
                    <i className="fas fa-info-circle mr-1"></i>
                    Projections update daily based on your activity patterns
                  </div>
                </div>
              </div>

              {/* Comparative Analytics */}
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 px-1">Community Comparison</h3>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Your Rank</div>
                      <div className="text-3xl font-black text-emerald-600">Top {userRank}%</div>
                    </div>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg">
                      <i className="fas fa-medal text-3xl"></i>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-bold text-slate-700">You</span>
                        <span className="font-black text-emerald-600">{currentWeekWda} Wda</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-bold text-slate-700">Community Average</span>
                        <span className="font-black text-slate-600">{communityAvgWda} Wda</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-300 rounded-full"
                          style={{ width: `${(communityAvgWda / currentWeekWda) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600">vs. Average</span>
                      <div className="flex items-center gap-2">
                        <i className={`fas fa-arrow-${vsAverage > 0 ? 'up' : 'down'} text-${vsAverage > 0 ? 'emerald' : 'red'}-500`}></i>
                        <span className={`text-lg font-black text-${vsAverage > 0 ? 'emerald' : 'red'}-600`}>
                          {Math.abs(vsAverage)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 px-1">Impact by Category</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Carbon', value: 35, icon: 'fa-smog', color: 'from-purple-400 to-purple-600' },
                    { name: 'Water', value: 25, icon: 'fa-tint', color: 'from-blue-400 to-blue-600' },
                    { name: 'Energy', value: 20, icon: 'fa-bolt', color: 'from-amber-400 to-amber-600' },
                    { name: 'Waste', value: 20, icon: 'fa-recycle', color: 'from-emerald-400 to-emerald-600' },
                  ].map((category, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-sm`}>
                          <i className={`fas ${category.icon}`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-slate-500 mb-1">{category.name}</div>
                          <div className="text-xl font-black text-slate-800">{category.value}%</div>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${category.value}%` }}
                          transition={{ delay: index * 0.1 }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Export & Share */}
              <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                <h4 className="text-sm font-black text-slate-800 mb-3 uppercase tracking-wider">Share Your Impact</h4>
                <p className="text-xs text-slate-600 mb-4">Generate a shareable impact report for social media or personal records.</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <i className="fas fa-download"></i> Export PDF
                  </button>
                  <button className="flex-1 py-3 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                    <i className="fas fa-share-alt"></i> Share
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* MODALS */}

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="bg-white w-full max-w-[430px] rounded-t-[32px] p-6 animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-xl font-black text-slate-800 mb-2">{selectedActivity.title}</h2>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedActivity.duration} Mission
                </span>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 mb-6 text-center">
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-3xl shadow-lg"
                style={{ backgroundColor: SDG_LIST.find(s => s.id === selectedActivity.sdg)?.color || '#64748b' }}
              >
                <i className={`fas ${selectedActivity.icon}`}></i>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedActivity.fullDescription || selectedActivity.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Reward</div>
                <div className="text-2xl font-black text-amber-600">+{selectedActivity.reward}</div>
                <div className="text-xs text-slate-400">Wda Points</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">SDG Goal</div>
                <div className="text-2xl font-black text-slate-800">#{selectedActivity.sdg}</div>
                <div className="text-xs text-slate-400">{SDG_LIST.find(s => s.id === selectedActivity.sdg)?.name}</div>
              </div>
            </div>

            {selectedActivity.status === 'active' ? (
              <div className="space-y-3">
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fas fa-check-circle text-emerald-600"></i>
                    <span className="text-sm font-bold text-emerald-800">Mission Active</span>
                  </div>
                  <div className="w-full h-2 bg-white rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${selectedActivity.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-emerald-700 font-bold">{selectedActivity.progress}% Complete</div>
                </div>
                <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200">
                  Mark as Completed
                </button>
              </div>
            ) : (
              <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200">
                Start Mission
              </button>
            )}
          </div>
        </div>
      )}

      {/* SDG Detail Modal */}
      {selectedSDG && selectedSDGData && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
          onClick={() => setSelectedSDG(null)}
        >
          <div
            className="bg-white w-full max-w-[430px] rounded-t-[32px] p-6 animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-lg"
                    style={{ backgroundColor: selectedSDGData.color }}
                  >
                    <i className={`fas ${selectedSDGData.icon}`}></i>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase">SDG #{selectedSDGData.id}</div>
                    <h2 className="text-xl font-black text-slate-800">{selectedSDGData.name}</h2>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSDG(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <div className="text-2xl font-black text-emerald-600">{selectedSDGData.activeCount}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Active</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <div className="text-2xl font-black text-blue-600">{selectedSDGData.completedCount}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Done</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <div className="text-2xl font-black text-slate-800">{selectedSDGData.progress}%</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Progress</div>
              </div>
            </div>

            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3">Related Activities</h3>
            <div className="space-y-2">
              {SDG_ACTIVITIES.filter(a => a.sdg === selectedSDG).slice(0, 5).map(activity => (
                <div
                  key={activity.id}
                  onClick={() => { setSelectedSDG(null); setSelectedActivity(activity); }}
                  className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <i className={`fas ${activity.icon} text-slate-600`}></i>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800">{activity.title}</div>
                      <div className="text-xs text-slate-500">{activity.duration}</div>
                    </div>
                    <span className="text-xs font-bold text-amber-600">+{activity.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TargetScreen;
