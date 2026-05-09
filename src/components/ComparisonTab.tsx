import React, { useState } from 'react';

type Tier = 'family' | 'friends' | 'community' | 'global';
type Period = 'week' | 'month' | 'year';

interface Props {
  period: Period;
}

const PEERS = [
  { name: 'You', score: 820, co2: 120, water: 8200, energy: 320, waste: 15, actions: 42, isYou: true, avatar: 'NZ', streak: 12 },
  { name: 'Ahmed Al Suwaidi', score: 650, co2: 90, water: 6100, energy: 280, waste: 12, actions: 35, isYou: false, avatar: 'AS', streak: 15 },
  { name: 'Fatima Al Mansouri', score: 610, co2: 75, water: 4900, energy: 210, waste: 9, actions: 28, isYou: false, avatar: 'FM', streak: 8 },
  { name: 'Abdullah Al Zaabi', score: 520, co2: 60, water: 3600, energy: 160, waste: 7, actions: 18, isYou: false, avatar: 'AZ', streak: 4 },
  { name: 'Alex Chen', score: 410, co2: 45, water: 2800, energy: 110, waste: 5, actions: 12, isYou: false, avatar: 'AC', streak: 2 },
];

const TREND = [
  { month: 'Mar', you: 380, avg: 290 },
  { month: 'Apr', you: 460, avg: 330 },
  { month: 'May', you: 510, avg: 360 },
  { month: 'Jun', you: 580, avg: 390 },
  { month: 'Jul', you: 670, avg: 420 },
  { month: 'Aug', you: 820, avg: 490 },
];

const SDGs = [
  { n: 13, label: 'Climate Action', pct: 68, color: '#3F7E44', icon: 'fa-globe' },
  { n: 12, label: 'Responsible Consumption', pct: 56, color: '#BF8B2E', icon: 'fa-recycle' },
  { n: 6, label: 'Clean Water', pct: 41, color: '#26BDE2', icon: 'fa-tint' },
  { n: 7, label: 'Clean Energy', pct: 38, color: '#FCC30B', icon: 'fa-bolt' },
  { n: 15, label: 'Life on Land', pct: 35, color: '#56C02B', icon: 'fa-leaf' },
];

export const ComparisonTab: React.FC<Props> = ({ period }) => {
  const [tier, setTier] = useState<Tier>('family');
  const [selectedMetric, setSelectedMetric] = useState<'co2' | 'water' | 'energy' | 'waste'>('co2');
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [activeWidgetModal, setActiveWidgetModal] = useState<'score' | 'trend' | 'global' | 'actions' | 'sdg' | null>(null);

  const tiers: { id: Tier; label: string; icon: string }[] = [
    { id: 'family', label: 'Family', icon: 'fa-home' },
    { id: 'friends', label: 'Friends', icon: 'fa-user-friends' },
    { id: 'community', label: 'Community', icon: 'fa-city' },
    { id: 'global', label: 'Global (SDGs)', icon: 'fa-globe-americas' },
  ];

  // Randomize data based on tier and period to make it feel natural
  const peers = React.useMemo(() => {
    const periodMult = period === 'week' ? 0.25 : period === 'year' ? 12 : 1;
    const periodVal = period === 'week' ? 1 : period === 'month' ? 2 : 3;
    const tierConfig: Record<Tier, { base: number, variance: number, shuffle: boolean }> = {
      family: { base: 1, variance: 0.1, shuffle: false },
      friends: { base: 1.15, variance: 0.2, shuffle: true },
      community: { base: 0.85, variance: 0.3, shuffle: true },
      global: { base: 0.7, variance: 0.4, shuffle: false }
    };
    
    const config = tierConfig[tier];
    
    let adjustedPeers = PEERS.map((p, i) => {
      // Create true variance across time so "You" can fall behind or lead
      const randomFactor = 1 + (Math.sin(i * 13 + tier.length + periodVal * 7) * config.variance);
      const youVariance = p.isYou ? (1 + Math.sin(periodVal * 5 + tier.length) * 0.4) : 1;
      const mult = periodMult * config.base * randomFactor * youVariance;
      
      return {
        ...p,
        score: Math.max(10, Math.round(p.score * mult)),
        co2: Math.max(1, Math.round(p.co2 * mult * (1 + Math.sin(i * 2 + periodVal) * 0.4))),
        water: Math.max(10, Math.round(p.water * mult * (1 + Math.sin(i * 3 + periodVal) * 0.4))),
        energy: Math.max(5, Math.round(p.energy * mult * (1 + Math.sin(i * 4 + periodVal) * 0.4))),
        waste: Math.max(1, Math.round(p.waste * mult * (1 + Math.sin(i * 5 + periodVal) * 0.4))),
        actions: Math.max(1, Math.round(p.actions * mult * (1 + Math.sin(i * 6 + periodVal) * 0.4))),
      };
    });

    if (config.shuffle) {
      // Stable sort mixing
      adjustedPeers.sort((a, b) => {
        if (a.isYou) return -1;
        if (b.isYou) return 1;
        return (b.score * Math.sin(b.score)) - (a.score * Math.sin(a.score));
      });
    }

    // Always sort by score descending for the leaderboard
    return adjustedPeers.sort((a, b) => b.score - a.score);
  }, [tier, period]);

  const maxScore = Math.max(...peers.map(p => p.score));

  /* ── SVG Line Chart helper ── */
  const W = 260, H = 90;
  const xStep = W / (TREND.length - 1);
  const maxVal = Math.max(...TREND.map(t => t.you));
  const toY = (v: number) => H - (v / maxVal) * (H - 8) - 4;
  const polyYou = TREND.map((t, i) => `${i * xStep},${toY(t.you)}`).join(' ');
  const polyAvg = TREND.map((t, i) => `${i * xStep},${toY(t.avg)}`).join(' ');

  /* ── Donut helper ── */
  const donut = (pct: number, r = 30, stroke = 8) => {
    const c = 2 * Math.PI * r;
    return { c, offset: c - (pct / 100) * c };
  };
  const globalPct = 18;
  const d = donut(globalPct, 34, 9);

  /* ── Actions donut slices ── */
  const actColors = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#6B7280'];
  const actTotals = peers.reduce((s, p) => s + p.actions, 0);
  let cumPct = 0;
  const actSlices = peers.map((p, i) => {
    const pct = p.actions / actTotals;
    const start = cumPct;
    cumPct += pct;
    const r = 28, cx = 36, cy = 36;
    const a1 = start * 2 * Math.PI - Math.PI / 2;
    const a2 = cumPct * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const large = pct > 0.5 ? 1 : 0;
    return { path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`, color: actColors[i], peer: p };
  });

  const youData = peers.find(p => p.isYou) || peers[0];
  const avgData = {
    co2: Math.round(peers.reduce((s, p) => s + p.co2, 0) / peers.length),
    water: Math.round(peers.reduce((s, p) => s + p.water, 0) / peers.length),
    energy: Math.round(peers.reduce((s, p) => s + p.energy, 0) / peers.length),
    waste: Math.round(peers.reduce((s, p) => s + p.waste, 0) / peers.length),
  };

  const CATS = [
    { label: 'CO₂ Saved', youVal: youData.co2, avgVal: avgData.co2, unit: 'kg', color: '#10B981', icon: 'fa-smog', key: 'co2' as const },
    { label: 'Water Saved', youVal: youData.water, avgVal: avgData.water, unit: 'L', color: '#3B82F6', icon: 'fa-tint', key: 'water' as const },
    { label: 'Energy Saved', youVal: youData.energy, avgVal: avgData.energy, unit: 'kWh', color: '#F59E0B', icon: 'fa-bolt', key: 'energy' as const },
    { label: 'Waste Reduced', youVal: youData.waste, avgVal: avgData.waste, unit: 'kg', color: '#8B5CF6', icon: 'fa-trash-alt', key: 'waste' as const },
  ];

  return (
    <div className="space-y-4 animate-[fadeIn_0.4s_ease-out]">

      {/* ── Tier Tabs ── */}
      <div className="flex overflow-x-auto no-scrollbar gap-1 bg-white/80 backdrop-blur rounded-2xl p-1 border border-slate-100 shadow-sm">
        {tiers.map(t => (
          <button
            key={t.id}
            onClick={() => setTier(t.id)}
            className={`flex-1 min-w-[60px] flex flex-col items-center gap-0.5 py-2 rounded-xl text-[9px] font-black uppercase tracking-tight transition-all ${tier === t.id ? 'bg-[var(--forest-deep)] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <i className={`fas ${t.icon} text-[11px]`} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Period Filter (Removed as requested, using parent's period) ── */}

      {/* ── 1. Impact Score Comparison ── */}
      <div onClick={() => setActiveWidgetModal('score')} className="bg-white rounded-[22px] p-4 border border-slate-100 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Impact Score Comparison</div>
            <div className="text-[9px] text-slate-400">Total Impact Score</div>
          </div>
          <i className="fas fa-expand-alt text-slate-300 text-[10px]" />
        </div>
        <div className="space-y-2.5">
          {peers.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0 ${p.isYou ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
                {p.isYou ? <i className="fas fa-user text-[10px]" /> : p.avatar}
              </div>
              <div className="text-[10px] font-bold text-slate-600 w-16 truncate flex-shrink-0">{p.name}</div>
              <div className="flex-1 h-5 bg-slate-50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full flex items-center justify-end pr-1.5 transition-all duration-700 ${p.isYou ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-slate-300'}`}
                  style={{ width: `${(p.score / maxScore) * 100}%` }}
                >
                  <span className={`text-[8px] font-black ${p.isYou ? 'text-white' : 'text-slate-600'}`}>{p.score}</span>
                </div>
              </div>
              {p.isYou && <span className="text-[9px]">🏆</span>}
            </div>
          ))}
        </div>
        <div className="mt-3 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg inline-flex items-center gap-1">
          <i className="fas fa-star text-[8px]"></i> You're in the top 20% of your {tier}! 🎉
        </div>
      </div>

      {/* ── 2. Impact Trend Over Time ── */}
      <div onClick={() => setActiveWidgetModal('trend')} className="bg-white rounded-[22px] p-4 border border-slate-100 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
        <div className="flex justify-between items-start mb-1">
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Impact Trend Over Time</div>
            <div className="text-[9px] text-slate-400 mb-3">Your score vs {tier} average</div>
          </div>
          <i className="fas fa-expand-alt text-slate-300 text-[10px]" />
        </div>
        <svg viewBox={`0 0 ${W} ${H + 16}`} className="w-full" style={{ height: 90 }}>
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((f, i) => (
            <line key={i} x1={0} y1={H * (1 - f)} x2={W} y2={H * (1 - f)} stroke="#f1f5f9" strokeWidth={1} />
          ))}
          {/* Avg line */}
          <polyline points={polyAvg} fill="none" stroke="#93C5FD" strokeWidth={2} strokeDasharray="4 2" />
          {/* You line */}
          <polyline points={polyYou} fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          {/* You dots */}
          {TREND.map((t, i) => (
            <circle key={i} cx={i * xStep} cy={toY(t.you)} r={3.5} fill="#10B981" stroke="white" strokeWidth={1.5} />
          ))}
          {/* Avg dots */}
          {TREND.map((t, i) => (
            <circle key={i} cx={i * xStep} cy={toY(t.avg)} r={2.5} fill="#3B82F6" stroke="white" strokeWidth={1} />
          ))}
          {/* X labels */}
          {TREND.map((t, i) => (
            <text key={i} x={i * xStep} y={H + 13} textAnchor="middle" fontSize={7} fill="#94a3b8" fontWeight="600">{t.month}</text>
          ))}
        </svg>
        <div className="flex gap-4 mt-1">
          <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-600"><div className="w-4 h-0.5 bg-emerald-500 rounded" /> You</div>
          <div className="flex items-center gap-1 text-[9px] font-bold text-blue-400"><div className="w-4 h-0.5 bg-blue-400 rounded border-dashed border-t border-blue-400" /> {tier.charAt(0).toUpperCase() + tier.slice(1)} Avg</div>
        </div>
      </div>

      {/* ── 3. Impact by Category ── */}
      <div className="bg-white rounded-[22px] p-4 border border-slate-100 shadow-sm">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact by Category</div>
        <div className="flex justify-between text-[9px] font-bold text-slate-400 mb-3 px-1">
          <span>Compare across key impact areas</span>
          <div className="flex gap-3">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-emerald-500" /> You</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-slate-300" /> {tier.charAt(0).toUpperCase() + tier.slice(1)} Avg</div>
          </div>
        </div>
        <div className="space-y-3">
          {CATS.map((c, i) => (
            <div 
              key={i} 
              onClick={() => { setSelectedMetric(c.key); setShowMetricModal(true); }}
              className={`p-2 -mx-2 rounded-xl cursor-pointer transition-all hover:bg-slate-50 border border-transparent`}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform`} style={{ background: c.color + '20' }}>
                    <i className={`fas ${c.icon} text-[8px]`} style={{ color: c.color }} />
                  </div>
                  <span className={`text-[10px] font-bold text-slate-600`}>{c.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black" style={{ color: c.color }}>{c.youVal}{c.unit}</span>
                  <span className="text-[9px] text-slate-400 ml-2">{c.avgVal}{c.unit}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (c.youVal / (Math.max(c.youVal, c.avgVal) * 1.2)) * 100)}%`, background: c.color }} />
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-slate-300 transition-all duration-700" style={{ width: `${Math.min(100, (c.avgVal / (Math.max(c.youVal, c.avgVal) * 1.2)) * 100)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. Selected Metric Modal ── */}
      {showMetricModal && (() => {
        const activeCat = CATS.find(c => c.key === selectedMetric)!;
        // Sort peers specifically for this metric so it's accurate and varies
        const sortedPeers = [...peers].sort((a, b) => b[activeCat.key] - a[activeCat.key]).slice(0, 5);
        const vals = sortedPeers.map(p => p[activeCat.key]);
        const maxV = Math.max(...vals, 1);
        
        return (
          <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={() => setShowMetricModal(false)}>
            <div className="w-full max-w-[430px] mx-auto bg-white rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: activeCat.color + '20' }}>
                    <i className={`fas ${activeCat.icon} text-lg`} style={{ color: activeCat.color }} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-sm uppercase tracking-wide">{activeCat.label}</h3>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Comparison ({activeCat.unit})</div>
                  </div>
                </div>
                <button onClick={() => setShowMetricModal(false)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="p-6 pt-8 pb-12 bg-slate-50">
                <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100">
                  <div className="flex items-end gap-2 h-40">
                    {sortedPeers.map((p, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-[10px] font-black" style={{ color: activeCat.color }}>{p[activeCat.key]}</div>
                        <div className="w-full rounded-t-xl transition-all duration-700 relative" style={{ height: `${(p[activeCat.key] / maxV) * 120}px`, background: p.isYou ? activeCat.color : activeCat.color + '40' }}>
                          {p.isYou && <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-[3px] border-current" style={{ borderColor: activeCat.color }} />}
                        </div>
                        <div className={`text-[9px] font-bold text-center leading-tight ${p.isYou ? 'text-[var(--forest-deep)]' : 'text-slate-400'}`}>
                          {p.name.split(' ').map((n, idx) => <div key={idx}>{n}</div>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: activeCat.color + '20', color: activeCat.color }}>
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-800 uppercase tracking-wide mb-1">Insight</div>
                    <div className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {sortedPeers[0].isYou 
                        ? `Amazing work! You're leading your ${tier} in ${activeCat.label.toLowerCase()}. Keep it up!` 
                        : `${sortedPeers[0].name.split(' ')[0]} is currently leading in ${activeCat.label.toLowerCase()}. You're doing great, check out their profile for tips!`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── 5. Bottom Row: Global Ranking + SDG ── */}
      <div className="grid grid-cols-2 gap-3">
        {/* Global Ranking Donut */}
        <div onClick={() => setActiveWidgetModal('global')} className="bg-white rounded-[22px] p-4 border border-slate-100 shadow-sm flex flex-col cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="flex justify-between items-start mb-1">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Ranking</div>
            <i className="fas fa-expand-alt text-slate-300 text-[10px]" />
          </div>
          <div className="text-[9px] text-slate-400 mb-3">See how you rank globally</div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 78 78" className="w-full h-full transform -rotate-90">
                <circle cx="39" cy="39" r="34" fill="none" stroke="#f1f5f9" strokeWidth={9} />
                <circle cx="39" cy="39" r="34" fill="none" stroke="#10B981" strokeWidth={9}
                  strokeDasharray={d.c} strokeDashoffset={d.offset} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xs font-black text-slate-800">Top</div>
                <div className="text-lg font-black text-emerald-600 leading-none">{globalPct}%</div>
              </div>
            </div>
            <div className="text-[8px] text-center text-slate-500 font-bold mt-2">
              of all EcoTrack users globally
            </div>
            <div className="text-[8px] text-emerald-600 font-black mt-1 flex items-center gap-1">
              <i className="fas fa-check-circle"></i> Better than 82% worldwide!
            </div>
          </div>
        </div>

        {/* Actions Donut */}
        <div onClick={() => setActiveWidgetModal('actions')} className="bg-white rounded-[22px] p-4 border border-slate-100 shadow-sm flex flex-col cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="flex justify-between items-start mb-1">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</div>
            <i className="fas fa-expand-alt text-slate-300 text-[10px]" />
          </div>
          <div className="text-[9px] text-slate-400 mb-2">Total completed</div>
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-[64px] h-[64px] flex-shrink-0">
              <svg viewBox="0 0 72 72" className="w-full h-full">
                {actSlices.map((s, i) => <path key={i} d={s.path} fill={s.color} />)}
                <circle cx="36" cy="36" r="16" fill="white" />
                <text x="36" y="33" textAnchor="middle" fontSize="8" fontWeight="900" fill="#111827">Total</text>
                <text x="36" y="44" textAnchor="middle" fontSize="11" fontWeight="900" fill="#10B981">{actTotals}</text>
              </svg>
            </div>
            <div className="flex-1 space-y-1">
              {peers.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: actColors[i] }} />
                    <span className="text-[8px] font-bold text-slate-600 truncate">{p.name}</span>
                  </div>
                  <span className="text-[8px] font-black text-slate-500 shrink-0 ml-1">{p.actions}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. SDG Impact Contribution ── */}
      <div onClick={() => setActiveWidgetModal('sdg')} className="bg-white rounded-[22px] p-4 border border-slate-100 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
        <div className="flex justify-between items-start mb-1">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SDG Impact Contribution</div>
          <i className="fas fa-expand-alt text-slate-300 text-[10px]" />
        </div>
        <div className="text-[9px] text-slate-400 mb-3">Your top contributing SDGs</div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {SDGs.map((s, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1.5 w-14">
              <div className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center shadow-sm" style={{ background: s.color }}>
                <span className="text-white font-black text-sm leading-none">{s.n}</span>
                <i className={`fas ${s.icon} text-white/80 text-[9px] mt-0.5`} />
              </div>
              <div className="text-[9px] font-black" style={{ color: s.color }}>{s.pct}%</div>
              <div className="text-[7px] text-slate-400 text-center leading-tight font-medium">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[9px] text-slate-400 font-medium">
          You're contributing to <span className="font-black text-slate-700">10 of the 17 SDGs</span> 🌍
        </div>
      </div>

    

      {/* ── Active Widget Modal ── */}
      {activeWidgetModal && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={() => setActiveWidgetModal(null)}>
          <div className="w-full max-w-[430px] mx-auto bg-white rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm relative z-10">
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-wide">
                 {activeWidgetModal === 'score' && 'Impact Score Details'}
                 {activeWidgetModal === 'trend' && 'Trend Analysis'}
                 {activeWidgetModal === 'global' && 'Global Ranking Insights'}
                 {activeWidgetModal === 'actions' && 'Actions Breakdown'}
                 {activeWidgetModal === 'sdg' && 'SDG Contributions'}
              </h3>
              <button onClick={() => setActiveWidgetModal(null)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="p-6 pt-6 pb-12 bg-slate-50 overflow-y-auto max-h-[65vh]">
              
              {/* Score Modal */}
              {activeWidgetModal === 'score' && (
                 <>
                   <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 mb-4">
                     <div className="space-y-4">
                       {peers.map((p, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${p.isYou ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
                              {p.isYou ? <i className="fas fa-user" /> : p.avatar}
                            </div>
                            <div className="text-sm font-bold text-slate-700 w-24 truncate flex-shrink-0">{p.name}</div>
                            <div className="flex-1 h-6 bg-slate-50 rounded-full overflow-hidden relative">
                              <div className={`h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700 ${p.isYou ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-slate-300'}`} style={{ width: `${(p.score / maxScore) * 100}%` }}>
                                <span className={`text-xs font-black ${p.isYou ? 'text-white' : 'text-slate-600'}`}>{p.score}</span>
                              </div>
                            </div>
                          </div>
                       ))}
                     </div>
                   </div>
                   <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                     <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-500">
                       <i className="fas fa-lightbulb"></i>
                     </div>
                     <div>
                       <div className="text-[10px] font-black text-slate-800 uppercase tracking-wide mb-1">Performance Insight</div>
                       <div className="text-[11px] text-slate-500 font-medium leading-relaxed">
                          {peers[0].isYou 
                            ? "You are dominating the leaderboard! Your recent actions have solidified your #1 spot." 
                            : `${peers[0].name.split(' ')[0]} is leading right now. You need ${peers[0].score - (peers.find(p=>p.isYou)?.score || 0)} more points to catch up!`}
                       </div>
                     </div>
                   </div>
                 </>
              )}

              {/* Trend Modal */}
              {activeWidgetModal === 'trend' && (
                 <>
                   <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 mb-4">
                     <svg viewBox={`0 0 ${W} ${H + 16}`} className="w-full" style={{ height: 140 }}>
                       {[0.25, 0.5, 0.75].map((f, i) => <line key={i} x1={0} y1={H * (1 - f)} x2={W} y2={H * (1 - f)} stroke="#f1f5f9" strokeWidth={1} />)}
                       <polyline points={polyAvg} fill="none" stroke="#93C5FD" strokeWidth={2} strokeDasharray="4 2" />
                       <polyline points={polyYou} fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                       {TREND.map((t, i) => <circle key={`y-${i}`} cx={i * xStep} cy={toY(t.you)} r={3.5} fill="#10B981" stroke="white" strokeWidth={1.5} />)}
                       {TREND.map((t, i) => <circle key={`a-${i}`} cx={i * xStep} cy={toY(t.avg)} r={2.5} fill="#3B82F6" stroke="white" strokeWidth={1} />)}
                       {TREND.map((t, i) => <text key={`t-${i}`} x={i * xStep} y={H + 13} textAnchor="middle" fontSize={7} fill="#94a3b8" fontWeight="600">{t.month}</text>)}
                     </svg>
                   </div>
                   <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                     <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-blue-50 text-blue-500">
                       <i className="fas fa-chart-line"></i>
                     </div>
                     <div>
                       <div className="text-[10px] font-black text-slate-800 uppercase tracking-wide mb-1">Growth Insight</div>
                       <div className="text-[11px] text-slate-500 font-medium leading-relaxed">
                          Your impact trajectory is {TREND[TREND.length-1].you > TREND[TREND.length-2].you ? 'upward' : 'stabilizing'}. 
                          You are currently {TREND[TREND.length-1].you > TREND[TREND.length-1].avg ? 'above' : 'below'} the community average.
                       </div>
                     </div>
                   </div>
                 </>
              )}

              {/* Global Modal */}
              {activeWidgetModal === 'global' && (
                 <>
                   <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 mb-4 flex flex-col items-center">
                     <div className="relative w-32 h-32 mb-4">
                       <svg viewBox="0 0 78 78" className="w-full h-full transform -rotate-90">
                         <circle cx="39" cy="39" r="34" fill="none" stroke="#f1f5f9" strokeWidth={9} />
                         <circle cx="39" cy="39" r="34" fill="none" stroke="#10B981" strokeWidth={9} strokeDasharray={d.c} strokeDashoffset={d.offset} strokeLinecap="round" />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <div className="text-sm font-black text-slate-800">Top</div>
                         <div className="text-3xl font-black text-emerald-600 leading-none">{globalPct}%</div>
                       </div>
                     </div>
                     <div className="text-center">
                       <h4 className="text-sm font-bold text-slate-800">Worldwide Percentile</h4>
                       <p className="text-xs text-slate-500 mt-1">Based on aggregated eco-scores globally.</p>
                     </div>
                   </div>
                   <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                     <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-purple-50 text-purple-500">
                       <i className="fas fa-globe-americas"></i>
                     </div>
                     <div>
                       <div className="text-[10px] font-black text-slate-800 uppercase tracking-wide mb-1">Global Standing</div>
                       <div className="text-[11px] text-slate-500 font-medium leading-relaxed">
                          You are outperforming 82% of all registered users on the platform. Keep making consistent daily logs to break into the top 10%!
                       </div>
                     </div>
                   </div>
                 </>
              )}

              {/* Actions Modal */}
              {activeWidgetModal === 'actions' && (
                 <>
                   <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 mb-4">
                     {peers.map((p, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ background: actColors[i] }} />
                            <span className="text-sm font-bold text-slate-700 w-32 truncate">{p.name}</span>
                          </div>
                          <span className="text-sm font-black text-slate-600">{p.actions} Actions</span>
                        </div>
                     ))}
                   </div>
                   <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                     <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-amber-50 text-amber-500">
                       <i className="fas fa-check-double"></i>
                     </div>
                     <div>
                       <div className="text-[10px] font-black text-slate-800 uppercase tracking-wide mb-1">Activity Insight</div>
                       <div className="text-[11px] text-slate-500 font-medium leading-relaxed">
                          The group has completed {actTotals} total sustainable actions. 
                          {peers[0].isYou ? " You are setting the pace for activity volume!" : " Log a few more quick actions today to boost your contribution."}
                       </div>
                     </div>
                   </div>
                 </>
              )}

              {/* SDG Modal */}
              {activeWidgetModal === 'sdg' && (
                 <>
                   <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 mb-4 space-y-4">
                     {SDGs.map((s, i) => (
                       <div key={i} className="flex items-center gap-4">
                         <div className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-sm shrink-0" style={{ background: s.color }}>
                           <span className="text-white font-black text-lg leading-none">{s.n}</span>
                           <i className={`fas ${s.icon} text-white/80 text-[10px] mt-1`} />
                         </div>
                         <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-end mb-1.5">
                             <h4 className="text-xs font-bold text-slate-800 truncate">{s.label}</h4>
                             <span className="text-xs font-black" style={{ color: s.color }}>{s.pct}%</span>
                           </div>
                           <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.pct}%`, background: s.color }} />
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                   <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                     <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-500">
                       <i className="fas fa-leaf"></i>
                     </div>
                     <div>
                       <div className="text-[10px] font-black text-slate-800 uppercase tracking-wide mb-1">SDG Alignment</div>
                       <div className="text-[11px] text-slate-500 font-medium leading-relaxed">
                          Your strongest contribution is towards Goal 13 (Climate Action). Expanding your habits could increase your impact on Goal 7 (Clean Energy).
                       </div>
                     </div>
                   </div>
                 </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
