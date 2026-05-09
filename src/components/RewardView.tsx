
import React, { useState } from 'react';
import { USER_NAME } from '../constants';

interface Award {
    id: number;
    title: string;
    desc: string;
    icon: string;
    color: string;
    progress: number;
    target: string;
    isLocked?: boolean;
}

interface LeaderboardUser {
    rank: number;
    name: string;
    badge: string;
    points: string;
    avatar: string;
    color: string;
    isUser: boolean;
}

const RewardView: React.FC = () => {
    const [tab, setTab] = useState<'awards' | 'leaderboard'>('awards');

    const leaderboard: LeaderboardUser[] = [
        { rank: 1, name: 'Ahmed Al Mansouri', badge: 'Eco Warrior', points: '15,200', avatar: 'AM', color: 'bg-amber-500', isUser: false },
        { rank: 2, name: 'Fatima Al Zaabi', badge: 'Green Champion', points: '12,850', avatar: 'FZ', color: 'bg-slate-400', isUser: false },
        { rank: 3, name: 'Khalid Al Sharqi', badge: 'Sustainability Hero', points: '10,400', avatar: 'KS', color: 'bg-orange-700', isUser: false },
        { rank: 4, name: 'Mariam Al Falasi', badge: 'Member', points: '8,900', avatar: 'MF', color: 'bg-teal-600', isUser: false },
        { rank: 12, name: USER_NAME, badge: 'Mentor', points: '2,850', avatar: 'NZ', color: 'bg-green-600', isUser: true },
    ];

    const awards: Award[] = [
        { id: 1, title: 'Zero Waste Champion', desc: 'Complete 30 days of zero-waste living', icon: 'fa-trophy', color: 'from-amber-400 to-orange-500', progress: 80, target: '24/30 days' },
        { id: 2, title: 'Tree Planter', desc: 'Plant 50 trees in your community', icon: 'fa-medal', color: 'from-slate-300 to-slate-400', progress: 60, target: '30/50 trees' },
        { id: 3, title: 'Energy Saver', desc: 'Save 1000kWh of energy', icon: 'fa-award', color: 'from-orange-700 to-amber-800', progress: 45, target: '450/1000 kWh' },
        { id: 4, title: 'Community Leader', desc: 'Start a sustainability initiative', icon: 'fa-lock', color: 'from-gray-200 to-gray-300', progress: 0, target: 'Locked', isLocked: true },
    ];

    return (
        <div className="flex flex-col h-full bg-white rounded-[32px] overflow-hidden">
            {/* Tab Switcher */}
            <div className="px-6 pt-6 pb-4 bg-white sticky top-0 z-20">
                <div className="bg-gray-100 p-1 rounded-2xl flex relative h-12">
                    <div
                        className={`absolute top-1 bottom-1 w-[48%] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out`}
                        style={{ left: tab === 'awards' ? '1%' : '51%' }}
                    ></div>
                    <button
                        onClick={() => setTab('awards')}
                        className={`flex-1 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest relative z-10 transition-colors ${tab === 'awards' ? 'text-emerald-600' : 'text-gray-400'}`}
                    >
                        <i className="fas fa-medal"></i> Awards
                    </button>
                    <button
                        onClick={() => setTab('leaderboard')}
                        className={`flex-1 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest relative z-10 transition-colors ${tab === 'leaderboard' ? 'text-emerald-600' : 'text-gray-400'}`}
                    >
                        <i className="fas fa-trophy"></i> Rank
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-10">
                {tab === 'awards' ? (
                    <div className="animate-[fadeIn_0.3s_ease-out] space-y-8">
                        {/* Spotlight */}
                        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden group mt-2">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl -rotate-12 group-hover:rotate-0 transition-transform duration-1000"><i className="fas fa-certificate"></i></div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 border border-white/20 rounded-lg text-[9px] font-black uppercase tracking-widest mb-4">
                                    Recently Unlocked
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/30 rotate-3">
                                        <i className="fas fa-seedling text-green-300"></i>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black uppercase tracking-tighter leading-tight">Green Pioneer</h2>
                                        <p className="text-[10px] text-indigo-100 font-medium mb-3">Earned for completing your first 10 eco-actions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        <div>
                            <div className="flex justify-between items-center mb-6 px-1">
                                <h3 className="font-black text-slate-800 text-base uppercase tracking-tighter">Your Collection</h3>
                                <span className="px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest">Lvl 12</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {awards.map(award => (
                                    <div key={award.id} className={`bg-gray-50/50 p-4 rounded-[28px] border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group transition-all active:scale-95 ${award.isLocked ? 'opacity-50 grayscale' : ''}`}>
                                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${award.color} flex items-center justify-center text-white text-xl mb-3 shadow-lg relative group-hover:scale-110 transition-transform`}>
                                            <i className={`fas ${award.icon} relative z-10`}></i>
                                            {!award.isLocked && <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>}
                                        </div>
                                        <h3 className="font-black text-[10px] text-slate-800 mb-1 uppercase tracking-tighter">{award.title}</h3>
                                        <div className="w-full mt-2">
                                            <div className="flex justify-between text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                                <span>{award.target}</span>
                                                <span>{award.progress}%</span>
                                            </div>
                                            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                                <div className={`h-full bg-gradient-to-r ${award.color}`} style={{ width: `${award.progress}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-[fadeIn_0.3s_ease-out] space-y-6 pt-2">
                        <div className="bg-[#0F172A] rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 text-7xl"><i className="fas fa-trophy"></i></div>
                            <div className="flex justify-center items-end gap-3 mb-2 relative z-10">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-800 flex items-center justify-center text-xs font-bold mb-2">FZ</div>
                                    <div className="h-12 w-12 bg-slate-700/50 rounded-t-lg flex items-center justify-center text-slate-300 font-bold">2</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-full border-2 border-amber-300 bg-amber-900/50 flex items-center justify-center font-bold mb-2 shadow-lg relative">AM<div className="absolute -top-3 text-amber-400 text-xl"><i className="fas fa-crown"></i></div></div>
                                    <div className="h-18 w-14 bg-amber-700/30 rounded-t-lg flex items-center justify-center text-amber-400 font-bold text-2xl">1</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full border-2 border-orange-700 bg-orange-900 flex items-center justify-center text-xs font-bold mb-2">KS</div>
                                    <div className="h-10 w-12 bg-orange-800/30 rounded-t-lg flex items-center justify-center text-orange-600 font-bold">3</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {leaderboard.map((user) => (
                                <div key={user.rank} className={`flex items-center gap-4 p-4 rounded-2xl border shadow-sm transition-transform ${user.isUser ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'}`}>
                                    <div className={`w-6 h-6 flex items-center justify-center font-black text-[10px] ${user.rank <= 3 ? 'text-slate-800' : 'text-gray-400'}`}>{user.rank}</div>
                                    <div className={`w-10 h-10 rounded-xl ${user.color} flex items-center justify-center text-white text-xs font-black`}>{user.avatar}</div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-xs text-slate-800 flex items-center gap-2">{user.name}{user.isUser && <span className="bg-emerald-500 text-white text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-tighter">You</span>}</h4>
                                        <div className="text-[9px] text-gray-400 uppercase tracking-widest border-t border-gray-50 mt-1 pt-1">{user.badge}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-xs text-emerald-600 tabular-nums">{user.points}</div>
                                        <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Wda</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RewardView;
