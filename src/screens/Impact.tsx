
import React, { useState, useEffect, useRef } from 'react';
import { ScreenName } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { useOrganization } from '../context/OrganizationContext';
import { ComparisonTab } from '../components/ComparisonTab';

interface Props {
   onNavigate: (screen: ScreenName) => void;
}

type MetricType = 'trees' | 'water' | 'energy' | 'carbon';
type IntegrationType = 'dewa' | 'rta' | 'fitbit';
type ViewMode = 'personal' | 'organization'; // Phase 1A: Dual dashboard mode
type AccessMode = 'standard' | 'high-contrast' | 'simplified'; // Phase 1E: Accessibility

const ImpactScreen: React.FC<Props> = ({ onNavigate }) => {
   const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
   const [animate, setAnimate] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);
   const scrollRef = useRef<HTMLDivElement>(null);

   // Phase 1A Task 1.1: View Mode State for Dual Dashboard
   const [viewMode, setViewMode] = useState<ViewMode>('personal');
   const [personalTab, setPersonalTab] = useState<'overview' | 'comparison'>('overview');
   const [comparisonMetric, setComparisonMetric] = useState<'score' | 'trees' | 'water' | 'energy' | 'carbon'>('score');
   const [comparisonTier, setComparisonTier] = useState<'family' | 'friends' | 'community' | 'global'>('family');

   // Phase 1E Task 5.1: Accessibility State
   // Phase 1E Task 5.1: Accessibility State (Now using global context)
   const { mode, simplifiedView, highContrast } = useAccessibility();
   const isSimplified = simplifiedView; // Map global simplify setting

   // Phase 6D: Organization Context
   const { isLinked, organization, department, team } = useOrganization();

   // Sync view mode with organization link status
   useEffect(() => {
      if (!isLinked && viewMode === 'organization') setViewMode('personal');
   }, [isLinked, viewMode]);

   // Widget Interaction States
   const [activeDayIndex, setActiveDayIndex] = useState(6); // Default to last day (today)

   // Modal States
   const [selectedMetric, setSelectedMetric] = useState<MetricType | null>(null);
   const [selectedIntegration, setSelectedIntegration] = useState<IntegrationType | null>(null);
   const [showForecastDetails, setShowForecastDetails] = useState(false);
   const [showScoreDetails, setShowScoreDetails] = useState(false);

   // Phase 1G Task 7.2: Export Modal State
   const [showExportModal, setShowExportModal] = useState(false);
   const [exportOption, setExportOption] = useState<'pdf' | 'certificate' | 'share' | null>(null);

   useEffect(() => {
      // Ensure top scroll on load
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      // Small delay to trigger entry animations
      setTimeout(() => setAnimate(true), 100);
   }, []);

   const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop;
      setIsScrolled(scrollTop > 20);
   };

   // --- DATA ---

   const impactData = {
      week: {
         trees: 4, water: '210', energy: '45', carbon: '12', change: '+12%',
         graph: [
            { val: 40, label: 'M', score: 680, insight: 'Good start' },
            { val: 60, label: 'T', score: 710, insight: 'Metro ride boost' },
            { val: 45, label: 'W', score: 695, insight: 'Avg consumption' },
            { val: 70, label: 'T', score: 750, insight: 'Zero waste day' },
            { val: 65, label: 'F', score: 740, insight: 'Consistent' },
            { val: 85, label: 'S', score: 810, insight: 'Tree planted' },
            { val: 80, label: 'S', score: 824, insight: 'High efficiency' }
         ]
      },
      month: {
         trees: 18, water: '4.8k', energy: '1.4k', carbon: '350', change: '+24%',
         graph: Array(7).fill(0).map((_, i) => ({ val: 30 + i * 10, label: `W${i + 1}`, score: 700 + i * 20, insight: 'Weekly Avg' }))
      },
      year: {
         trees: 225, water: '58k', energy: '16k', carbon: '4.2k', change: '+156%',
         graph: Array(7).fill(0).map((_, i) => ({ val: 20 + i * 12, label: `M${i + 1}`, score: 600 + i * 50, insight: 'Monthly Avg' }))
      }
   };

   const currentData = impactData[period];

   const metrics = [
      {
         id: 'trees',
         label: 'Trees Saved',
         value: currentData.trees,
         unit: '',
         icon: 'fa-tree',
         color: 'text-emerald-500',
         bg: 'bg-emerald-50',
         gradient: 'from-emerald-500 to-teal-600',
         trend: '+2.5',
         desc: 'Equivalent to planting a small forest based on your paper and plastic reduction.'
      },
      {
         id: 'water',
         label: 'Water Saved',
         value: currentData.water,
         unit: 'L',
         icon: 'fa-tint',
         color: 'text-blue-500',
         bg: 'bg-blue-50',
         gradient: 'from-blue-400 to-cyan-500',
         trend: '+15%',
         desc: 'Saved through shorter showers and eco-friendly laundry choices.'
      },
      {
         id: 'energy',
         label: 'Energy Saved',
         value: currentData.energy,
         unit: 'kWh',
         icon: 'fa-bolt',
         color: 'text-amber-500',
         bg: 'bg-amber-50',
         gradient: 'from-amber-400 to-orange-500',
         trend: '-5%',
         desc: 'Reduced consumption via smart AC usage and efficient appliances.'
      },
      {
         id: 'carbon',
         label: 'Carbon Offset',
         value: currentData.carbon,
         unit: 'kg',
         icon: 'fa-smog',
         color: 'text-purple-500',
         bg: 'bg-purple-50',
         gradient: 'from-purple-500 to-indigo-600',
         trend: '+8%',
         desc: 'Total CO2 avoided by using public transport and walking.'
      }
   ];

   const services = [
      { id: 'dewa', name: 'DEWA', type: 'Utility', status: 'Connected', icon: 'fa-plug', color: 'bg-green-600', brandColor: '#00703C' },
      { id: 'rta', name: 'RTA', type: 'Transport', status: 'Connected', icon: 'fa-subway', color: 'bg-red-600', brandColor: '#D71921' },
      { id: 'fitbit', name: 'Fitbit', type: 'Health', status: 'Connected', icon: 'fa-heartbeat', color: 'bg-teal-500', brandColor: '#00B0B9' },
   ];

   const recentContributions = [
      { id: 1, title: 'Metro Commute', impact: '-4kg CO₂', time: 'Today, 8:30 AM', icon: 'fa-train', color: 'bg-red-100 text-red-600' },
      { id: 2, title: 'Recycled Plastic', impact: '+0.5 Trees', time: 'Yesterday', icon: 'fa-recycle', color: 'bg-blue-100 text-blue-600' },
      { id: 3, title: 'Energy Saving Mode', impact: '-2 kWh', time: '2 Days ago', icon: 'fa-bolt', color: 'bg-amber-100 text-amber-600' },
   ];

   // Phase 1A Task 1.3: Organization Mock Data (NOW USING CONTEXT)
   // const organizationData = { ...replaced by context... }
   const companyImpact = { trees: 1250, water: '340k', energy: '85k', carbon: '22.5k' };
   const departments = [
      { name: 'Engineering', score: 15200, rank: 1 },
      { name: 'Marketing', score: 12800, rank: 2 },
      { name: 'Operations', score: 11500, rank: 3 },
      { name: 'HR', score: 9200, rank: 4 },
      { name: 'Finance', score: 8100, rank: 5 }
   ];


   // Helper to open specific integration
   const openIntegration = (id: string) => {
      setSelectedIntegration(id as IntegrationType);
   };

   return (
      <div className="h-full relative overflow-hidden flex flex-col">
         <div
            className="flex-1 overflow-y-auto no-scrollbar pb-10 relative bg-[var(--bg-primary)]"
            onScroll={handleScroll}
            ref={scrollRef}
         >

            {/* 1. Header & Controls */}
            <div className={`sticky top-0 z-30 px-6 transition-all duration-300 ${isScrolled ? 'pt-12 pb-3 bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/20' : 'pt-8 pb-2 bg-[var(--bg-primary)]'}`}>
               {/* Phase 1E Task 5.1: Accessibility Toggle */}
               {/* Phase 1E Task 5.1: Accessibility Settings Link */}
               <button
                  onClick={() => onNavigate(ScreenName.ACCESSIBILITY_SETTINGS)}
                  className="absolute top-2 right-6 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors z-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  aria-label="Open accessibility settings"
               >
                  <i className="fas fa-universal-access text-[10px]" aria-hidden="true"></i>
               </button>
               <div className="flex justify-between items-end mb-2">
                  <div className="flex flex-col">
                     {!isScrolled && <span className="text-xs font-bold text-[var(--text-secondary)] mb-1 opacity-80 animate-[fadeIn_0.5s]">Welcome back, Dr. Meryem</span>}
                     <h1 className={`font-extrabold text-[var(--text-primary)] font-jakarta tracking-tight transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-3xl'}`}>Your Impact</h1>
                  </div>

                  {/* Segmented Control */}
                  <div className={`flex bg-[var(--bg-tertiary)] p-1 rounded-xl shadow-inner transition-transform ${isScrolled ? 'scale-90 origin-right' : 'scale-100'}`} role="group" aria-label="Time period selector">
                     {['week', 'month', 'year'].map((p) => (
                        <button
                           key={p}
                           onClick={() => setPeriod(p as any)}
                           className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none ${period === p ? 'bg-white text-[var(--forest-deep)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
                           aria-label={`View impact for ${p}`}
                           aria-pressed={period === p}
                        >
                           {p}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Phase 1A Task 1.2: Dual Dashboard Toggle */}
               {isLinked && (
                  <div className="flex bg-white/60 backdrop-blur-sm p-1 rounded-xl shadow-sm border border-[var(--border-light)] mt-3" role="group" aria-label="View mode selector">
                     <button
                        onClick={() => setViewMode('personal')}
                        className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none ${viewMode === 'personal' ? 'bg-emerald-500 text-white shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                        aria-label="View personal impact dashboard"
                        aria-pressed={viewMode === 'personal'}
                     >
                        <i className="fas fa-user mr-1.5" aria-hidden="true"></i>Personal
                     </button>
                     <button
                        onClick={() => setViewMode('organization')}
                        className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${viewMode === 'organization' ? 'bg-blue-500 text-white shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                        aria-label="View organization impact dashboard"
                        aria-pressed={viewMode === 'organization'}
                     >
                        <i className="fas fa-building mr-1.5" aria-hidden="true"></i>Company
                     </button>
                  </div>
               )}
            </div>

            <div className="px-5 pb-5 space-y-5">

               {/* Phase 1D Task 4.4: Conditional Rendering */}
               {viewMode === 'personal' ? (
                  <div className="animate-[fadeIn_0.3s_ease-out]">
                     {/* Sub-tab Switcher */}
                     {/* Sub-tab Switcher - Enhanced for visibility */}
                     <div className="flex bg-slate-100/50 p-1 rounded-2xl mb-6 border border-slate-200/30">
                        <button 
                           onClick={() => setPersonalTab('overview')} 
                           className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${personalTab === 'overview' ? 'bg-white text-emerald-600 shadow-md shadow-emerald-500/5 border border-emerald-50' : 'text-slate-400 hover:text-slate-500'}`}
                        >
                           <i className={`fas fa-layer-group text-sm ${personalTab === 'overview' ? 'text-emerald-500' : 'text-slate-300'}`}></i>
                           Overview
                        </button>
                        <button 
                           onClick={() => setPersonalTab('comparison')} 
                           className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${personalTab === 'comparison' ? 'bg-white text-emerald-600 shadow-md shadow-emerald-500/5 border border-emerald-50' : 'text-slate-400 hover:text-slate-500'}`}
                        >
                           <i className={`fas fa-user-friends text-sm ${personalTab === 'comparison' ? 'text-emerald-500' : 'text-slate-300'}`}></i>
                           Comparison
                        </button>
                     </div>

                     {personalTab === 'overview' ? (
                        <div className="space-y-5 animate-[fadeIn_0.4s_ease-out]">
                           {/* 2. IMPACT FORECAST (Hero Widget - Compacted) */}
                     <div
                        onClick={() => setShowForecastDetails(true)}
                        className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-[28px] p-5 text-white shadow-xl shadow-slate-900/20 overflow-hidden cursor-pointer group transition-all active:scale-[0.98]"
                     >
                        {/* Dynamic Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-colors duration-700"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

                        <div className="relative z-10 flex gap-4">
                           <div className="flex flex-col justify-between">
                              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg mb-2">
                                 <i className="fas fa-bullseye text-emerald-400 text-sm font-bold"></i>
                              </div>
                              <div className="w-1 h-8 bg-white/10 rounded-full mx-auto">
                                 <div className="w-full bg-emerald-400 rounded-full h-[70%] shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                              </div>
                           </div>

                           <div className="flex-1 pt-1">
                              {/* Phase 1B: Enhanced Hero Header */}
                              <div className="flex justify-between items-start mb-2">
                                 <div>
                                    <div className="flex items-center gap-2 mb-1">
                                       <h3 className="text-base font-black uppercase tracking-tighter">Impact Forecast</h3>
                                       {/* Task 2.1: Verified Impact Badge */}
                                       <div className="px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded md:rounded-lg text-[8px] font-black text-blue-300 flex items-center gap-1 uppercase tracking-tighter" aria-label="Verified impact data">
                                          <i className="fas fa-check-circle text-[8px]"></i> Verified
                                       </div>
                                    </div>
                                    {/* Task 2.2: Integration Health Indicators */}
                                    <div className="flex gap-1.5" role="list" aria-label="Connected integrations status">
                                       {services.map(s => (
                                          <div key={s.id} className="flex items-center gap-0.5 opacity-80" role="listitem" aria-label={`${s.name} is connected`}>
                                             <div className={`w-1 h-1 rounded-full ${s.status === 'Connected' ? 'bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]' : 'bg-gray-500'}`} aria-hidden="true"></div>
                                             <span className="text-[8px] font-bold text-gray-400 uppercase">{s.name}</span>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                                 <div className="flex flex-col items-end gap-1">
                                    <div className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-[9px] font-black text-emerald-300 flex items-center gap-1 uppercase tracking-tighter" aria-label="Impact forecast on track">
                                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span> On Track
                                    </div>
                                    {/* Phase 1G: Share Impact */}
                                    <button onClick={() => { setShowExportModal(true); setExportOption('share'); }} className="text-[9px] font-bold text-gray-400 hover:text-emerald-500 flex items-center gap-1 transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded px-1 py-0.5" aria-label="Share your impact on social media">
                                       <i className="fas fa-share-alt"></i> Share
                                    </button>
                                 </div>
                              </div>
                              <p className="text-[11px] text-gray-300 leading-relaxed mb-3 font-medium">
                                 Projected to save <span className="text-emerald-300 font-black">12 trees</span> & offset <span className="text-blue-300 font-black">2.5t CO₂</span> by 2026.
                              </p>
                              {!isSimplified && (
                                 <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>Progress</span>
                                    <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                                       <div className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 w-[72%] rounded-full"></div>
                                    </div>
                                    <span className="text-white">72%</span>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>

                     {/* [BACKUP] Personal Records Widget Removed (Redundant with Home/Target) */}
                     {false && (
                        <div className="grid grid-cols-2 gap-4">
                           {/* Streak High-Fidelity */}
                           <div className="bg-gradient-to-br from-amber-400 to-orange-600 rounded-[32px] p-5 shadow-lg shadow-orange-200 flex flex-col justify-between h-[120px] relative overflow-hidden group">
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                              <div className="absolute top-4 right-4 text-white/30 text-2xl group-hover:scale-110 transition-transform group-hover:text-white/50"><i className="fas fa-fire"></i></div>
                              <div className="relative z-10">
                                 <div className="text-3xl font-black text-white font-jakarta drop-shadow-sm">12</div>
                                 <div className="text-[9px] font-black text-orange-100 uppercase tracking-widest">Day Streak</div>
                              </div>
                              <div className="w-full h-1.5 bg-black/10 rounded-full mt-auto relative z-10 overflow-hidden">
                                 <div className="w-[80%] h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"></div>
                              </div>
                           </div>
                           {/* CO2 Savings High-Fidelity */}
                           <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[32px] p-5 shadow-lg shadow-teal-200 flex flex-col justify-between h-[120px] relative overflow-hidden group">
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaves.png')] opacity-10 mix-blend-overlay"></div>
                              <div className="absolute top-4 right-4 text-white/30 text-2xl group-hover:scale-110 transition-transform group-hover:text-white/50"><i className="fas fa-smog"></i></div>
                              <div className="relative z-10">
                                 <div className="text-3xl font-black text-white font-jakarta drop-shadow-sm">42<span className="text-xs font-bold text-teal-100 ml-1">kg</span></div>
                                 <div className="text-[9px] font-black text-teal-100 uppercase tracking-widest">CO₂ Saved</div>
                              </div>
                              <div className="text-[9px] text-white font-black mt-auto flex items-center justify-center gap-1 bg-white/20 w-full py-1.5 rounded-xl backdrop-blur-sm relative z-10 uppercase tracking-tighter">
                                 Top 15% Locally
                              </div>
                           </div>
                        </div>
                     )}

                     {/* 4. CONNECTED SERVICES (Moved Up) */}
                     <div>
                        <div className="flex justify-between items-center mb-3 px-1">
                           <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-widest">Integrations</h3>
                           <button className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none" aria-label="Add new integration">
                              <i className="fas fa-plus text-[10px]" aria-hidden="true"></i>
                           </button>
                        </div>
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1" role="list" aria-label="Connected services">
                           {/* [BACKUP] ORIGINAL CODE START - Date: 2026-01-22
                        {services.map((s) => (
                           <div
                              key={s.id}
                              onClick={() => openIntegration(s.id)}
                              className="min-w-[140px] bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col gap-3 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all group relative overflow-hidden"
                           >
                              <div className="flex justify-between items-start relative z-10">
                                 <div className={`w-10 h-10 rounded-2xl ${s.color} flex items-center justify-center text-white text-sm shadow-sm group-hover:scale-110 transition-transform`}>
                                    <i className={`fas ${s.icon}`}></i>
                                 </div>
                                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mt-1"></div>
                              </div>
                              <div className="relative z-10">
                                 <div className="font-black text-xs text-slate-800 uppercase tracking-tighter">{s.name}</div>
                                 <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{s.type}</div>
                              </div>
                           </div>
                        ))}
                        [BACKUP] ORIGINAL CODE END */}

                           {/* Phase 1C: Enhanced Integration Cards with Live Data */}
                           {services.map((s) => {
                              // Mock Live Data logic
                              let liveData = { val: 'Connected', desc: 'Syncing...' };
                              if (s.id === 'dewa') liveData = { val: '-15%', desc: 'vs Neighbors' };
                              if (s.id === 'rta') liveData = { val: '12 Trips', desc: '89kg CO₂ Saved' };
                              if (s.id === 'fitbit') liveData = { val: '8,432', desc: 'Steps Today' };

                              return (
                                 <div
                                    key={s.id}
                                    onClick={() => openIntegration(s.id)}
                                    onKeyDown={(e) => {
                                       if (e.key === 'Enter' || e.key === ' ') {
                                          e.preventDefault();
                                          openIntegration(s.id);
                                       }
                                    }}
                                    role="listitem"
                                    tabIndex={0}
                                    aria-label={`${s.name} ${s.type}. Status: ${s.status}. ${liveData.desc}: ${liveData.val}. Last synced 2 minutes ago. Click to view details.`}
                                    className="min-w-[160px] bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-all group relative overflow-hidden h-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                                 >
                                    <div className="flex justify-between items-start relative z-10">
                                       <div className={`w-8 h-8 rounded-xl ${s.color} flex items-center justify-center text-white text-xs shadow-sm group-hover:scale-110 transition-transform`} aria-hidden="true">
                                          <i className={`fas ${s.icon}`}></i>
                                       </div>
                                       {/* Task 3.2: Sync Button */}
                                       <button
                                          className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:rotate-180 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                          onClick={(e) => { e.stopPropagation(); setAnimate(true); /* Trigger Sync Mock */ }}
                                          aria-label={`Sync ${s.name} data`}
                                       >
                                          <i className="fas fa-sync-alt text-[8px]" aria-hidden="true"></i>
                                       </button>
                                    </div>

                                    <div className="relative z-10 mt-2">
                                       {/* Task 3.1: Live Data Preview */}
                                       <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5" aria-hidden="true">{s.name}</div>
                                       <div className="font-black text-sm text-slate-800 leading-tight" aria-label={`${liveData.val}`}>{liveData.val}</div>
                                       <div className="text-[9px] text-emerald-600 font-bold truncate" aria-hidden="true">{liveData.desc}</div>

                                       {/* Task 3.3: Last Synced */}
                                       <div className="mt-2 text-[8px] text-slate-300 font-medium flex items-center gap-1" aria-label="Last synced 2 minutes ago">
                                          <div className="w-1 h-1 rounded-full bg-emerald-400" aria-hidden="true"></div>
                                          Synced 2m ago
                                       </div>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </div>

                     {/* 4. SUSTAINABILITY SCORE (Enhanced Interactivity) */}
                     <div className="bg-white rounded-[28px] p-5 border border-[var(--border-light)] shadow-sm transition-all relative overflow-hidden">
                        {/* Background Deco */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--bg-tertiary)] rounded-bl-full opacity-50 pointer-events-none"></div>

                        <div className="flex justify-between items-center mb-6 relative z-10">
                           <div className="flex items-center gap-4">
                              {/* Circular Progress Ring */}
                              <div className="relative w-16 h-16 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowScoreDetails(true)}>
                                 <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                    {/* Background Circle */}
                                    <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                                    {/* Progress Circle */}
                                    <circle 
                                       cx="50" cy="50" r="42" fill="none" stroke="var(--forest-deep)" strokeWidth="10" 
                                       strokeDasharray="264" 
                                       strokeDashoffset={animate ? 264 - (264 * ((currentData.graph[activeDayIndex]?.score || 824) / 1000)) : 264} 
                                       strokeLinecap="round" className="transition-all duration-1000 ease-out" 
                                    />
                                 </svg>
                                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="text-sm font-black text-[var(--forest-deep)] font-jakarta leading-none">{currentData.graph[activeDayIndex]?.score || 824}</div>
                                 </div>
                              </div>
                              <div>
                                 <h3 className="text-sm font-bold text-[var(--text-primary)]">Impact Score</h3>
                                 <div className="text-[10px] text-emerald-600 font-bold bg-emerald-50 inline-flex items-center gap-1 px-1.5 py-0.5 rounded mt-1">
                                    <i className="fas fa-arrow-up text-[8px]"></i> 15% vs last month
                                 </div>
                              </div>
                           </div>
                           <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none" aria-label="Score Details" onClick={() => setShowScoreDetails(true)}>
                              <i className="fas fa-chevron-right text-[10px]"></i>
                           </button>
                        </div>

                        {/* Interactive Graph */}
                        {!isSimplified && (
                           <div className="flex items-end justify-between h-32 gap-2 relative mb-4" role="list" aria-label="Sustainability score history by day">
                              {/* Average Line */}
                              <div className="absolute top-[40%] left-0 right-0 border-t border-dashed border-gray-200 z-0" aria-hidden="true"></div>

                              {currentData.graph.map((d: any, i: number) => (
                                 <div
                                    key={i}
                                    onClick={() => setActiveDayIndex(i)}
                                    onKeyDown={(e) => {
                                       if (e.key === 'Enter' || e.key === ' ') {
                                          e.preventDefault();
                                          setActiveDayIndex(i);
                                       }
                                    }}
                                    role="listitem"
                                    tabIndex={0}
                                    aria-label={`${d.label}: score ${d.score}, ${d.insight}${i === activeDayIndex ? ', selected' : ''}`}
                                    aria-current={i === activeDayIndex ? 'true' : undefined}
                                    className="flex-1 flex flex-col justify-end group z-10 cursor-pointer h-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset rounded"
                                 >
                                    <div className="relative w-full h-full flex items-end">
                                       <div
                                          className={`w-full rounded-t-lg transition-all duration-500 relative ${i === activeDayIndex ? 'bg-gradient-to-t from-[var(--forest-light)] to-[var(--forest-deep)] opacity-100 shadow-lg shadow-green-100' : 'bg-[var(--bg-tertiary)] hover:bg-green-100'}`}
                                          style={{ height: animate ? `${d.val}%` : '0%' }}
                                          aria-hidden="true"
                                       >
                                          {/* Active Indicator Dot */}
                                          {i === activeDayIndex && (
                                             <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--forest-deep)] rounded-full animate-bounce" aria-hidden="true"></div>
                                          )}
                                       </div>
                                    </div>
                                    <div className={`text-center mt-2 text-[9px] font-bold uppercase transition-colors ${i === activeDayIndex ? 'text-[var(--forest-deep)]' : 'text-[var(--text-muted)]'}`} aria-hidden="true">
                                       {d.label}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        )}

                        {/* Selected Day Insight (Dynamic Panel) */}
                        <div className="bg-[var(--bg-tertiary)]/50 rounded-xl p-3 flex items-center justify-between animate-[fadeIn_0.2s_ease-out]">
                           <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[var(--forest-light)] shadow-sm">
                                 <i className="fas fa-lightbulb"></i>
                              </div>
                              <div>
                                 <div className="text-[9px] font-bold text-[var(--text-muted)] uppercase">Day Insight</div>
                                 <div className="text-xs font-bold text-[var(--text-primary)]">{currentData.graph[activeDayIndex]?.insight}</div>
                              </div>
                           </div>
                           <button className="text-[10px] font-bold text-[var(--forest-light)] flex items-center gap-1">
                              Details <i className="fas fa-chevron-right text-[8px]"></i>
                           </button>
                        </div>
                     </div>

                     {/* 5. METRICS GRID */}
                     <div className="grid grid-cols-2 gap-3" role="list" aria-label="Environmental impact metrics">
                        {metrics.slice(0, isSimplified ? 2 : undefined).map((m) => (
                           <div
                              key={m.id}
                              onClick={() => setSelectedMetric(m.id as MetricType)}
                              onKeyDown={(e) => {
                                 if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedMetric(m.id as MetricType);
                                 }
                              }}
                              role="listitem"
                              tabIndex={0}
                              aria-label={`${m.label}: ${m.value} ${m.unit}, trend ${m.trend}. ${m.desc}`}
                              className="bg-white p-4 rounded-[24px] border border-[var(--border-light)] shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group cursor-pointer hover:border-[var(--forest-light)] hover:shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                           >
                              <div className="flex justify-between items-start z-10">
                                 <div className={`w-10 h-10 rounded-xl ${m.bg} ${m.color} flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                                    <i className={`fas ${m.icon}`}></i>
                                 </div>
                                 <div className="text-[10px] font-bold px-2 py-1 rounded-full bg-gray-50 text-gray-600 group-hover:bg-[var(--forest-light)] group-hover:text-white transition-colors" aria-hidden="true">
                                    {m.trend}
                                 </div>
                              </div>

                              <div className="z-10 mt-auto">
                                 <div className="text-3xl font-extrabold text-[var(--text-primary)] font-jakarta leading-none mb-1 group-hover:text-[var(--forest-deep)] transition-colors">
                                    {m.value} <span className="text-xs text-[var(--text-muted)] font-medium align-top">{m.unit}</span>
                                 </div>
                                 <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide">{m.label}</div>
                              </div>

                              {/* Decorative Background */}
                              <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${m.gradient} opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-500 blur-xl pointer-events-none`} aria-hidden="true"></div>
                           </div>
                        ))}
                     </div>

                     {/* 6. GLOBAL SDG CONTRIBUTIONS */}
                     <div className="mt-5">
                        <div className="flex justify-between items-center mb-3 px-1">
                           <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-widest">Global SDGs</h3>
                           <button className="text-[10px] font-bold text-emerald-500">View All</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           {/* SDG 13: Climate Action */}
                           <div className="bg-[#3F7E44] rounded-2xl p-3 flex flex-col justify-between text-white shadow-sm h-24 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
                              <div className="absolute -right-2 -bottom-2 text-white/20 text-5xl group-hover:scale-110 transition-transform"><i className="fas fa-globe"></i></div>
                              <div className="flex items-start gap-2 relative z-10">
                                 <div className="text-xl font-black font-jakarta">13</div>
                                 <div className="text-[9px] font-bold uppercase leading-tight mt-0.5">Climate<br/>Action</div>
                              </div>
                              <div className="text-[9px] font-medium text-white/80 relative z-10">+2.5t CO₂ Offset</div>
                           </div>
                           
                           {/* SDG 12: Responsible Consumption */}
                           <div className="bg-[#BF8B2E] rounded-2xl p-3 flex flex-col justify-between text-white shadow-sm h-24 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
                              <div className="absolute -right-2 -bottom-2 text-white/20 text-5xl group-hover:scale-110 transition-transform"><i className="fas fa-recycle"></i></div>
                              <div className="flex items-start gap-2 relative z-10">
                                 <div className="text-xl font-black font-jakarta">12</div>
                                 <div className="text-[9px] font-bold uppercase leading-tight mt-0.5">Responsible<br/>Consumption</div>
                              </div>
                              <div className="text-[9px] font-medium text-white/80 relative z-10">15kg Waste Saved</div>
                           </div>
                           
                           {/* SDG 6: Clean Water */}
                           <div className="bg-[#26BDE2] rounded-2xl p-3 flex flex-col justify-between text-white shadow-sm h-24 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
                              <div className="absolute -right-2 -bottom-2 text-white/20 text-5xl group-hover:scale-110 transition-transform"><i className="fas fa-hand-holding-water"></i></div>
                              <div className="flex items-start gap-2 relative z-10">
                                 <div className="text-xl font-black font-jakarta">6</div>
                                 <div className="text-[9px] font-bold uppercase leading-tight mt-0.5">Clean Water<br/>& Sanitation</div>
                              </div>
                              <div className="text-[9px] font-medium text-white/80 relative z-10">240L Water Saved</div>
                           </div>

                           {/* SDG 7: Clean Energy */}
                           <div className="bg-[#FCC30B] rounded-2xl p-3 flex flex-col justify-between text-white shadow-sm h-24 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
                              <div className="absolute -right-2 -bottom-2 text-white/20 text-5xl group-hover:scale-110 transition-transform"><i className="fas fa-sun"></i></div>
                              <div className="flex items-start gap-2 relative z-10">
                                 <div className="text-xl font-black font-jakarta">7</div>
                                 <div className="text-[9px] font-bold uppercase leading-tight mt-0.5 text-black/80">Clean<br/>Energy</div>
                              </div>
                              <div className="text-[9px] font-medium text-black/60 relative z-10">45kWh Saved</div>
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                        <div className="space-y-5 animate-[fadeIn_0.4s_ease-out]">
                           <ComparisonTab period={period} />
                        </div>
                     )}
                  </div>
               ) : (
                  <>
                     {/* Phase 1D Task 4.1: Organization Dashboard Card */}
                     <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-[28px] p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden mb-5 group">
                        {/* Dynamic Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-colors duration-700"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

                        <div className="relative z-10">
                           <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg">
                                    <i className="fas fa-building text-blue-300 text-xl"></i>
                                 </div>
                                 <div>
                                    <h2 className="text-xl font-black font-jakarta leading-none mb-1">{organization?.name}</h2>
                                    <div className="flex items-center gap-1.5">
                                       <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">{department}</span>
                                       <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                                       <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Verified Partner</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                 <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-[10px] font-black text-blue-300 uppercase tracking-widest">
                                    Gold Tier
                                 </div>
                                 {/* Phase 1G: Export Report */}
                                 <button onClick={() => setShowExportModal(true)} className="text-[10px] font-bold text-white/50 hover:text-white flex items-center gap-1 transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none rounded px-2 py-1" aria-label="Export impact report">
                                    <i className="fas fa-download"></i> Export
                                 </button>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                 <div className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-1">Total Trees</div>
                                 <div className="text-2xl font-black font-jakarta">{companyImpact.trees}</div>
                              </div>
                              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                 <div className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-1">CO₂ Offset</div>
                                 <div className="text-2xl font-black font-jakarta">{companyImpact.carbon}</div>
                              </div>
                           </div>

                           <div className="flex items-center gap-3 text-[10px] font-bold text-blue-200/80">
                              <i className="fas fa-users"></i> {departments.length} Active Teams
                           </div>
                        </div>
                     </div>

                     {/* Phase 1D Task 4.2: Team Ranking Widget */}
                     <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm mb-5">
                        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                           <i className="fas fa-trophy text-amber-500"></i> Department Ranking
                        </h3>
                        <div className="space-y-4">
                           {departments.map((dept, i) => (
                              <div key={dept.name} className="relative">
                                 <div className="flex justify-between items-end mb-1 z-10 relative">
                                    <div className="flex items-center gap-3">
                                       <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${i === 0 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>{i + 1}</div>
                                       <span className={`text-xs font-bold ${dept.name === department ? 'text-blue-600' : 'text-slate-700'}`}>
                                          {dept.name} {dept.name === department && '(You)'}
                                       </span>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400">{dept.score.toLocaleString()} pts</span>
                                 </div>
                                 <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div
                                       className={`h-full rounded-full ${dept.name === department ? 'bg-blue-500' : 'bg-slate-300'}`}
                                       style={{ width: `${(dept.score / departments[0].score) * 100}%` }}
                                    ></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Phase 6D Task 4.4: Team Members Activity */}
                     <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm mb-5">
                        <div className="flex justify-between items-center mb-4">
                           <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Team Pulse</h3>
                           <button className="text-[10px] font-bold text-blue-500">View All</button>
                        </div>
                        <div className="space-y-3">
                           {[
                              { user: 'Ahmed', action: 'offset 2kg Carbon', time: '12m ago', avatar: 'AS' },
                              { user: 'Fatima', action: 'planted a Ghaf Tree', time: '1h ago', avatar: 'FM' },
                              { user: 'Meryem', action: 'recycled 5kg E-Waste', time: '3h ago', avatar: 'MH' }
                           ].map((act, i) => (
                              <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                    {act.avatar}
                                 </div>
                                 <div className="flex-1">
                                    <div className="text-xs text-slate-700"><span className="font-bold">{act.user}</span> {act.action}</div>
                                    <div className="text-[9px] text-slate-400">{act.time}</div>
                                 </div>
                                 <button className="text-slate-300 hover:text-red-500 transition-colors"><i className="far fa-heart"></i></button>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Phase 1D Task 4.3: Your Contribution Card */}
                     <div className="flex gap-4 mb-5">
                        <div className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[28px] p-5 text-white shadow-lg shadow-purple-200 relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                           <div className="relative z-10">
                              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                                 <i className="fas fa-chart-pie"></i>
                              </div>
                              <div className="text-3xl font-black font-jakarta mb-1">18%</div>
                              <div className="text-[10px] font-bold text-indigo-100 leading-tight">Your contribution to team impact</div>
                           </div>
                        </div>
                        <div className="flex-1 bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm flex flex-col justify-center items-center text-center">
                           <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl mb-2">
                              <i className="fas fa-medal"></i>
                           </div>
                           <div className="font-black text-slate-800 text-sm">Top 20%</div>
                           <div className="text-[9px] text-slate-400 font-bold uppercase">Of Contributors</div>
                        </div>
                     </div>
                  </>
               )}

               {/* 6. RECENT CONTRIBUTIONS (New Bottom Section) */}
               <div>
                  <div className="flex justify-between items-center mb-3 px-1">
                     <h3 className="font-bold text-[var(--text-primary)] text-sm">Recent Contributions</h3>
                     <button className="text-[10px] font-bold text-[var(--forest-light)]">View History</button>
                  </div>
                  <div className="bg-white rounded-[24px] border border-[var(--border-light)] p-2 shadow-sm">
                     {/* Combined Static + Dynamic History */}
                     {[
                        ...JSON.parse(localStorage.getItem('completed_activities') || '[]').map((t: any) => ({
                           id: t.id,
                           title: t.title,
                           impact: `+${t.reward} Wda`,
                           time: t.completedAt ? new Date(t.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today',
                           icon: t.icon,
                           color: 'bg-emerald-100 text-emerald-600'
                        })),
                        ...recentContributions
                     ].slice(0, 5).map((item: any, i: number, arr: any[]) => (
                        <div key={item.id} className={`flex items-center gap-3 p-3 rounded-2xl hover:bg-[var(--bg-tertiary)] transition-colors ${i !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${item.color}`}>
                              <i className={`fas ${item.icon}`}></i>
                           </div>
                           <div className="flex-1">
                              <div className="font-bold text-xs text-[var(--text-primary)]">{item.title}</div>
                              <div className="text-[10px] text-[var(--text-muted)]">{item.time}</div>
                           </div>
                           <div className="text-right">
                              <div className="font-bold text-xs text-[var(--forest-deep)]">{item.impact}</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

            </div>

         </div> {/* Close Scroll View */}

         {/* --- MODALS --- */}

         {/* 1. FORECAST MODAL */}
         {
            showForecastDetails && (
               <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-md" onClick={() => setShowForecastDetails(false)}>
                  <div className="bg-[var(--bg-primary)] w-full rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh]" onClick={e => e.stopPropagation()}>
                     <div className="bg-[#0F172A] p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]"></div>
                        {/* Fixed Close Button: Larger hit area & z-index */}
                        <button onClick={() => setShowForecastDetails(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-50 cursor-pointer">
                           <i className="fas fa-times"></i>
                        </button>

                        <div className="relative z-10">
                           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-bold mb-4">
                              <i className="fas fa-magic"></i> AI Projection
                           </div>
                           <h2 className="text-2xl font-bold mb-2">Future You</h2>
                           <p className="text-sm text-gray-300">By 2026, your lifestyle changes will have saved:</p>
                        </div>
                     </div>

                     <div className="p-6 space-y-4">
                        <div className="flex gap-4">
                           <div className="flex-1 bg-white p-4 rounded-2xl border border-[var(--border-light)] text-center shadow-sm">
                              <div className="text-3xl font-extrabold text-emerald-500 mb-1">12</div>
                              <div className="text-xs font-bold text-[var(--text-secondary)]">Trees</div>
                           </div>
                           <div className="flex-1 bg-white p-4 rounded-2xl border border-[var(--border-light)] text-center shadow-sm">
                              <div className="text-3xl font-extrabold text-blue-500 mb-1">2.5t</div>
                              <div className="text-xs font-bold text-[var(--text-secondary)]">CO₂</div>
                           </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-[var(--border-light)]">
                           <h3 className="font-bold text-sm mb-4">Projected Milestones</h3>
                           <div className="space-y-6 relative">
                              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                              {[
                                 { date: 'June 2026', title: 'Zero Waste Home', status: 'On Track', color: 'bg-emerald-500' },
                                 { date: 'Dec 2026', title: 'Carbon Neutral Commute', status: 'Projected', color: 'bg-gray-300' }
                              ].map((m, i) => (
                                 <div key={i} className="flex gap-4 relative">
                                    <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm shrink-0 z-10 ${m.color}`}></div>
                                    <div>
                                       <div className="text-xs font-bold text-[var(--text-muted)] uppercase mb-0.5">{m.date}</div>
                                       <div className="font-bold text-sm text-[var(--text-primary)]">{m.title}</div>
                                       <div className="text-[10px] text-emerald-600 font-medium">{m.status}</div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <button className="w-full py-4 bg-[var(--text-primary)] text-white rounded-2xl font-bold shadow-lg">Adjust Goals</button>
                     </div>
                  </div>
               </div>
            )
         }

         {/* 2. METRIC DETAIL MODAL */}
         {
            selectedMetric && (
               <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedMetric(null)}>
                  <div className="bg-[var(--bg-primary)] w-full rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                     <div className={`p-8 relative ${metrics.find(m => m.id === selectedMetric)?.bg}`}>
                        <button onClick={() => setSelectedMetric(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors z-50 cursor-pointer"><i className="fas fa-times"></i></button>
                        <div className="flex flex-col items-center text-center">
                           <div className={`w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl mb-4 ${metrics.find(m => m.id === selectedMetric)?.color}`}>
                              <i className={`fas ${metrics.find(m => m.id === selectedMetric)?.icon}`}></i>
                           </div>
                           <h2 className="text-2xl font-bold text-[var(--text-primary)]">{metrics.find(m => m.id === selectedMetric)?.label}</h2>
                           <div className="text-4xl font-black text-[var(--forest-deep)] mt-2 font-jakarta">{metrics.find(m => m.id === selectedMetric)?.value} <span className="text-lg text-[var(--text-secondary)] font-bold">{metrics.find(m => m.id === selectedMetric)?.unit}</span></div>
                        </div>
                     </div>
                     <div className="p-6 bg-[var(--bg-primary)]">
                        <div className="bg-white p-4 rounded-2xl border border-[var(--border-light)] shadow-sm mb-6">
                           <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-2">Context</h4>
                           <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{metrics.find(m => m.id === selectedMetric)?.desc}</p>
                        </div>
                        <h3 className="font-bold text-sm mb-3">History</h3>
                        <div className="h-32 bg-white rounded-2xl border border-[var(--border-light)] flex items-end justify-between p-4 px-6">
                           {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                              <div key={i} className="w-2 bg-[var(--bg-tertiary)] rounded-t-full relative group">
                                 <div className={`absolute bottom-0 left-0 right-0 rounded-t-full ${metrics.find(m => m.id === selectedMetric)?.color.replace('text', 'bg')}`} style={{ height: `${h}%` }}></div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            )
         }

         {/* 3. INTEGRATION MODALS (DEWA / RTA / FITBIT) */}

         {/* RTA MODAL */}
         {
            selectedIntegration === 'rta' && (
               <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedIntegration(null)}>
                  <div className="bg-[#f0f0f0] w-full rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] h-[85vh]" onClick={e => e.stopPropagation()}>
                     {/* RTA Header */}
                     <div className="bg-[#D71921] text-white p-6 relative">
                        <button onClick={() => setSelectedIntegration(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 z-50 cursor-pointer"><i className="fas fa-times"></i></button>
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#D71921] text-2xl shadow-lg"><i className="fas fa-subway"></i></div>
                           <div>
                              <h2 className="text-xl font-bold">RTA Connect</h2>
                              <div className="flex items-center gap-1.5 text-xs font-medium opacity-90"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> Live Sync</div>
                           </div>
                        </div>
                        {/* Nol Card */}
                        <div className="bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl p-4 text-slate-800 shadow-lg relative overflow-hidden">
                           <div className="absolute right-0 bottom-0 opacity-10 text-6xl transform translate-x-4 translate-y-4"><i className="fas fa-id-card"></i></div>
                           <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Nol Balance</div>
                           <div className="text-3xl font-black font-mono">AED 42.50</div>
                           <div className="mt-2 text-[10px] font-mono opacity-60">**** **** **** 8291</div>
                        </div>
                     </div>

                     <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {/* No Fines Badge */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-lg"><i className="fas fa-shield-alt"></i></div>
                              <div>
                                 <div className="font-bold text-sm text-gray-800">Clean Record</div>
                                 <div className="text-xs text-gray-500">No fines this month</div>
                              </div>
                           </div>
                           <i className="fas fa-check-circle text-green-500 text-xl"></i>
                        </div>

                        {/* Transport Impact */}
                        <div className="grid grid-cols-2 gap-3">
                           <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 text-center">
                              <i className="fas fa-train text-[#D71921] text-2xl mb-2"></i>
                              <div className="text-2xl font-bold text-gray-900">12</div>
                              <div className="text-[10px] text-gray-500 uppercase font-bold">Metro Trips</div>
                           </div>
                           <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 text-center">
                              <i className="fas fa-cloud text-blue-500 text-2xl mb-2"></i>
                              <div className="text-2xl font-bold text-gray-900">89kg</div>
                              <div className="text-[10px] text-gray-500 uppercase font-bold">CO₂ Saved</div>
                           </div>
                        </div>

                        {/* Comparison */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                           <h3 className="font-bold text-sm text-gray-800 mb-3">Impact vs Driving</h3>
                           <div className="space-y-4">
                              <div>
                                 <div className="flex justify-between text-xs mb-1"><span>You (Public Transport)</span><span className="font-bold text-green-600">Low Emission</span></div>
                                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="w-[20%] h-full bg-green-500 rounded-full"></div></div>
                              </div>
                              <div>
                                 <div className="flex justify-between text-xs mb-1"><span>Average Driver</span><span className="font-bold text-red-500">High Emission</span></div>
                                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="w-[85%] h-full bg-red-500 rounded-full"></div></div>
                              </div>
                           </div>
                           <p className="text-xs text-gray-500 mt-4 italic">You saved approx. AED 120 in fuel & parking this month.</p>
                        </div>
                     </div>
                  </div>
               </div>
            )
         }

         {/* DEWA MODAL */}
         {
            selectedIntegration === 'dewa' && (
               <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedIntegration(null)}>
                  <div className="bg-[#F9FAFB] w-full rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] h-[85vh]" onClick={e => e.stopPropagation()}>
                     <div className="bg-[#00703C] text-white p-6 relative">
                        <button onClick={() => setSelectedIntegration(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 z-50 cursor-pointer"><i className="fas fa-times"></i></button>
                        <div className="flex items-center gap-3 mb-2">
                           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#00703C] text-2xl shadow-lg"><i className="fas fa-plug"></i></div>
                           <div>
                              <h2 className="text-xl font-bold">DEWA Smart Living</h2>
                              <div className="flex items-center gap-1.5 text-xs font-medium opacity-90"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> Active</div>
                           </div>
                        </div>
                     </div>

                     <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {/* Consumption Graphs */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                           <div className="flex justify-between items-center mb-4">
                              <h3 className="font-bold text-sm text-gray-800">Electricity (kWh)</h3>
                              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">-15% vs Neighbors</span>
                           </div>
                           <div className="flex items-end justify-between h-32 gap-2">
                              {[40, 35, 50, 45, 30, 25, 35].map((h, i) => (
                                 <div key={i} className="flex-1 bg-gray-100 rounded-t-md relative group">
                                    <div className="absolute bottom-0 left-0 right-0 bg-[#00703C] rounded-t-md transition-all group-hover:opacity-80" style={{ height: `${h}%` }}></div>
                                 </div>
                              ))}
                           </div>
                           <div className="text-center mt-3 text-xs text-gray-500">Your efficiency is <span className="font-bold text-[#00703C]">High</span> this week!</div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                           <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 text-center">
                              <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Est. Bill Saving</div>
                              <div className="text-2xl font-bold text-[#00703C]">AED 45</div>
                              <div className="text-[9px] text-gray-400">This Month</div>
                           </div>
                           <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 text-center">
                              <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Water Saved</div>
                              <div className="text-2xl font-bold text-blue-500">120G</div>
                              <div className="text-[9px] text-gray-400">Gallons</div>
                           </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3 items-start">
                           <i className="fas fa-lightbulb text-amber-500 mt-1"></i>
                           <div>
                              <h4 className="font-bold text-xs text-blue-900">Smart Tip</h4>
                              <p className="text-xs text-blue-700 mt-1">Increasing your AC temperature by 1°C can save up to 6% electricity.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )
         }

         {/* FITBIT MODAL */}
         {
            selectedIntegration === 'fitbit' && (
               <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedIntegration(null)}>
                  <div className="bg-white w-full rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] h-[85vh]" onClick={e => e.stopPropagation()}>
                     <div className="bg-[#00B0B9] text-white p-6 relative">
                        <button onClick={() => setSelectedIntegration(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 z-50 cursor-pointer"><i className="fas fa-times"></i></button>
                        <div className="flex items-center gap-3 mb-2">
                           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#00B0B9] text-2xl shadow-lg"><i className="fas fa-heartbeat"></i></div>
                           <div>
                              <h2 className="text-xl font-bold">Health Sync</h2>
                              <div className="text-xs opacity-90">Last synced: Just now</div>
                           </div>
                        </div>
                     </div>

                     <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        <div className="bg-[var(--bg-primary)] p-6 rounded-[40px] flex items-center justify-center relative overflow-hidden shadow-inner">
                           <div className="text-center relative z-10">
                              <div className="text-5xl font-black text-[#00B0B9] font-jakarta">8,432</div>
                              <div className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">Steps Today</div>
                           </div>
                           {/* Decorative Rings */}
                           <div className="absolute w-48 h-48 border-[6px] border-[#00B0B9]/20 rounded-full"></div>
                           <div className="absolute w-48 h-48 border-[6px] border-[#00B0B9] rounded-full border-l-transparent rotate-45"></div>
                        </div>

                        <div className="bg-[#F0FDF4] p-5 rounded-2xl border border-green-100">
                           <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white"><i className="fas fa-leaf"></i></div>
                              <h3 className="font-bold text-green-800">Green Miles</h3>
                           </div>
                           <p className="text-xs text-green-700 leading-relaxed">
                              Your walking today has replaced an estimated <span className="font-bold">4.2km</span> of driving, saving <span className="font-bold">0.8kg CO₂</span>.
                           </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                           <div className="bg-gray-50 p-3 rounded-xl text-center">
                              <div className="text-xs text-gray-400 font-bold uppercase">Cals</div>
                              <div className="text-lg font-bold text-gray-800">420</div>
                           </div>
                           <div className="bg-gray-50 p-3 rounded-xl text-center">
                              <div className="text-xs text-gray-400 font-bold uppercase">Dist</div>
                              <div className="text-lg font-bold text-gray-800">5.1km</div>
                           </div>
                           <div className="bg-gray-50 p-3 rounded-xl text-center">
                              <div className="text-xs text-gray-400 font-bold uppercase">Mins</div>
                              <div className="text-lg font-bold text-gray-800">58</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )
         }

         {/* Phase 1G Task 7.2: EXPORT MODAL */}
         {showExportModal && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-md" onClick={() => setShowExportModal(false)}>
               <div className="bg-[var(--bg-primary)] w-full rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                  <div className="bg-gradient-to-br from-[#064E3B] to-[#10B981] p-6 text-white relative">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
                     <button onClick={() => setShowExportModal(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors z-50 cursor-pointer focus:ring-2 focus:ring-white focus:outline-none" aria-label="Close export modal">
                        <i className="fas fa-times"></i>
                     </button>
                     <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 border border-white/30 rounded-lg text-white text-xs font-bold mb-4">
                           <i className="fas fa-file-export"></i> Export Options
                        </div>
                        <h2 className="text-2xl font-bold mb-1">Share Your Impact</h2>
                        <p className="text-sm text-gray-200">Download reports or share your sustainability achievements</p>
                     </div>
                  </div>

                  <div className="p-6 space-y-4">
                     {/* Export Options */}
                     <div className="space-y-3">
                        <button
                           onClick={() => { setExportOption('pdf'); }}
                           className="w-full bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-emerald-500 hover:shadow-md transition-all group active:scale-[0.98] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                           aria-label="Download detailed PDF report"
                        >
                           <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 text-xl group-hover:scale-110 transition-transform">
                              <i className="fas fa-file-pdf"></i>
                           </div>
                           <div className="flex-1 text-left">
                              <div className="font-bold text-sm text-slate-800">Detailed Report</div>
                              <div className="text-xs text-slate-500">Full metrics, graphs, and integrations data</div>
                           </div>
                           <i className="fas fa-chevron-right text-slate-400 group-hover:text-emerald-500"></i>
                        </button>

                        <button
                           onClick={() => { setExportOption('certificate'); }}
                           className="w-full bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-emerald-500 hover:shadow-md transition-all group active:scale-[0.98] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                           aria-label="Download sustainability certificate"
                        >
                           <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 text-xl group-hover:scale-110 transition-transform">
                              <i className="fas fa-certificate"></i>
                           </div>
                           <div className="flex-1 text-left">
                              <div className="font-bold text-sm text-slate-800">Sustainability Certificate</div>
                              <div className="text-xs text-slate-500">Official certificate for organizations & personal</div>
                           </div>
                           <i className="fas fa-chevron-right text-slate-400 group-hover:text-emerald-500"></i>
                        </button>

                        <button
                           onClick={() => { setExportOption('share'); }}
                           className="w-full bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-emerald-500 hover:shadow-md transition-all group active:scale-[0.98] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                           aria-label="Share impact on social media"
                        >
                           <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 text-xl group-hover:scale-110 transition-transform">
                              <i className="fas fa-share-alt"></i>
                           </div>
                           <div className="flex-1 text-left">
                              <div className="font-bold text-sm text-slate-800">Social Share</div>
                              <div className="text-xs text-slate-500">Shareable image card for social platforms</div>
                           </div>
                           <i className="fas fa-chevron-right text-slate-400 group-hover:text-emerald-500"></i>
                        </button>
                     </div>

                     {/* Preview Section (shown when option selected) */}
                     {exportOption && (
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 animate-[fadeIn_0.3s_ease-out]">
                           <div className="flex items-center gap-2 mb-3">
                              <i className="fas fa-eye text-slate-500 text-sm"></i>
                              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Preview</span>
                           </div>

                           {exportOption === 'certificate' && (
                              <div className="bg-gradient-to-br from-[#064E3B] to-[#10B981] rounded-xl p-6 text-white text-center relative overflow-hidden">
                                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                                 <i className="fas fa-award text-3xl mb-2 opacity-80"></i>
                                 <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Certificate of Sustainability</div>
                                 <div className="text-lg font-black mb-1">Dr. Meryem Hamidi</div>
                                 <div className="text-sm font-medium opacity-90 mb-3">Has achieved an impact score of 824</div>
                                 <div className="flex justify-center gap-2 text-[8px] opacity-70">
                                    <span><i className="fas fa-tree"></i> 12 Trees</span>
                                    <span>•</span>
                                    <span><i className="fas fa-smog"></i> 2.5t CO₂</span>
                                 </div>
                              </div>
                           )}

                           {exportOption === 'share' && (
                              <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                                 <div className="text-2xl mb-2">🌱🌍💚</div>
                                 <div className="font-bold text-sm text-slate-800 mb-1">My Sustainability Journey</div>
                                 <div className="text-xs text-slate-500 mb-2">Score: 824 • Trees: 12 • CO₂: 2.5t</div>
                                 <div className="text-[10px] text-emerald-600 font-bold">#SustainApp #GreenUAE</div>
                              </div>
                           )}

                           {exportOption === 'pdf' && (
                              <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                                 <div className="flex items-center justify-center gap-3 mb-2">
                                    <i className="fas fa-file-pdf text-red-500 text-2xl"></i>
                                    <div className="text-left">
                                       <div className="font-bold text-sm text-slate-800">Impact_Report_2026.pdf</div>
                                       <div className="text-xs text-slate-500">~2.4 MB • 12 pages</div>
                                    </div>
                                 </div>
                              </div>
                           )}

                           <button
                              onClick={() => { alert('Download initiated!'); setShowExportModal(false); }}
                              className="w-full mt-3 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all active:scale-[0.98] focus:ring-2 focus:ring-emerald-500 focus:outline-none flex items-center justify-center gap-2"
                           >
                              <i className="fas fa-download"></i> Download
                           </button>
                        </div>
                     )}

                     <button
                        onClick={() => setShowExportModal(false)}
                        className="w-full py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus:underline"
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default ImpactScreen;
