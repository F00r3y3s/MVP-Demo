
import React, { useState } from 'react';
import { ScreenName } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';

interface Props {
  onBack: () => void;
  initialGoalId?: number;
}

interface SDGTask {
  title: string;
  status: 'active' | 'completed' | 'pending';
}

interface SDGData {
  number: number;
  name: string;
  color: string;
  icon: string;
  progress: number;
  description: string;
  activeTasks: SDGTask[];
  completedTasks: SDGTask[];
}

const SDGDetailsScreen: React.FC<Props> = ({ onBack, initialGoalId }) => {
  const { simplifiedView } = useAccessibility();
  // Complete official SDG Data with relevant tasks
  const sdgs: SDGData[] = [
    {
      number: 1, name: 'No Poverty', color: 'var(--sdg-1)', icon: 'fa-hands-helping', progress: 75, description: 'End poverty in all its forms everywhere.',
      activeTasks: [{ title: 'Donate clothes to charity', status: 'active' }, { title: 'Support local businesses', status: 'pending' }],
      completedTasks: [{ title: 'Volunteer at shelter', status: 'completed' }]
    },
    {
      number: 2, name: 'Zero Hunger', color: 'var(--sdg-2)', icon: 'fa-utensils', progress: 60, description: 'End hunger, achieve food security and improved nutrition.',
      activeTasks: [{ title: 'Donate non-perishable food', status: 'active' }],
      completedTasks: [{ title: 'Reduce food waste week', status: 'completed' }, { title: 'Cook plant-based meal', status: 'completed' }]
    },
    {
      number: 3, name: 'Good Health', color: 'var(--sdg-3)', icon: 'fa-heartbeat', progress: 85, description: 'Ensure healthy lives and promote well-being for all.',
      activeTasks: [{ title: 'Morning Jog 5km', status: 'active' }],
      completedTasks: [{ title: 'Drink 2L water daily', status: 'completed' }, { title: 'Digital detox day', status: 'completed' }]
    },
    {
      number: 4, name: 'Quality Education', color: 'var(--sdg-4)', icon: 'fa-graduation-cap', progress: 45, description: 'Ensure inclusive and equitable quality education.',
      activeTasks: [{ title: 'Read a book on sustainability', status: 'active' }, { title: 'Teach a skill to a friend', status: 'pending' }],
      completedTasks: [{ title: 'Complete Recycling Quiz', status: 'completed' }]
    },
    {
      number: 5, name: 'Gender Equality', color: 'var(--sdg-5)', icon: 'fa-venus', progress: 55, description: 'Achieve gender equality and empower all women and girls.',
      activeTasks: [{ title: 'Mentorship session', status: 'active' }],
      completedTasks: [{ title: 'Attend inclusion workshop', status: 'completed' }]
    },
    {
      number: 6, name: 'Clean Water', color: 'var(--sdg-6)', icon: 'fa-water', progress: 70, description: 'Ensure availability and sustainable management of water.',
      activeTasks: [{ title: 'Fix leaky faucet', status: 'pending' }],
      completedTasks: [{ title: 'Shorter showers (5m)', status: 'completed' }, { title: 'Use reusable bottle', status: 'completed' }]
    },
    {
      number: 7, name: 'Clean Energy', color: 'var(--sdg-7)', icon: 'fa-lightbulb', progress: 40, description: 'Ensure access to affordable, reliable, sustainable energy.',
      activeTasks: [{ title: 'Switch to LED bulbs', status: 'active' }, { title: 'Unplug unused electronics', status: 'active' }],
      completedTasks: [{ title: 'AC at 24°C', status: 'completed' }]
    },
    {
      number: 8, name: 'Decent Work', color: 'var(--sdg-8)', icon: 'fa-briefcase', progress: 50, description: 'Promote sustained, inclusive and sustainable economic growth.',
      activeTasks: [{ title: 'Support fair trade products', status: 'active' }],
      completedTasks: [{ title: 'Career mentoring', status: 'completed' }]
    },
    {
      number: 9, name: 'Innovation', color: 'var(--sdg-9)', icon: 'fa-flask', progress: 35, description: 'Build resilient infrastructure, promote inclusive industrialization.',
      activeTasks: [{ title: 'Recycle e-waste', status: 'active' }],
      completedTasks: [{ title: 'Use public transport app', status: 'completed' }]
    },
    {
      number: 10, name: 'Reduced Inequality', color: 'var(--sdg-10)', icon: 'fa-balance-scale', progress: 45, description: 'Reduce inequality within and among countries.',
      activeTasks: [{ title: 'Donate to community fund', status: 'pending' }],
      completedTasks: [{ title: 'Learn about fair labor', status: 'completed' }]
    },
    {
      number: 11, name: 'Sustainable Cities', color: 'var(--sdg-11)', icon: 'fa-city', progress: 60, description: 'Make cities and human settlements inclusive, safe, resilient.',
      activeTasks: [{ title: 'Use Public Transport', status: 'active' }, { title: 'Carpooling', status: 'active' }],
      completedTasks: [{ title: 'Visit local park', status: 'completed' }]
    },
    {
      number: 12, name: 'Responsible Consumption', color: 'var(--sdg-12)', icon: 'fa-recycle', progress: 80, description: 'Ensure sustainable consumption and production patterns.',
      activeTasks: [{ title: 'Zero waste grocery run', status: 'active' }],
      completedTasks: [{ title: 'Recycle plastic', status: 'completed' }, { title: 'Compost food waste', status: 'completed' }, { title: 'Buy second-hand', status: 'completed' }]
    },
    {
      number: 13, name: 'Climate Action', color: 'var(--sdg-13)', icon: 'fa-leaf', progress: 65, description: 'Take urgent action to combat climate change and its impacts.',
      activeTasks: [{ title: 'Meat-free Monday', status: 'active' }, { title: 'Calculate carbon footprint', status: 'pending' }],
      completedTasks: [{ title: 'Plant a tree', status: 'completed' }]
    },
    {
      number: 14, name: 'Life Below Water', color: 'var(--sdg-14)', icon: 'fa-fish', progress: 55, description: 'Conserve and sustainably use the oceans, seas and marine resources.',
      activeTasks: [{ title: 'Beach cleanup', status: 'active' }],
      completedTasks: [{ title: 'Avoid single-use plastic', status: 'completed' }, { title: 'Sustainable seafood choice', status: 'completed' }]
    },
    {
      number: 15, name: 'Life on Land', color: 'var(--sdg-15)', icon: 'fa-tree', progress: 70, description: 'Protect, restore and promote sustainable use of terrestrial ecosystems.',
      activeTasks: [{ title: 'Start a home garden', status: 'active' }],
      completedTasks: [{ title: 'Clean local park', status: 'completed' }, { title: 'Go paperless', status: 'completed' }]
    },
    {
      number: 16, name: 'Peace & Justice', color: 'var(--sdg-16)', icon: 'fa-scale-balanced', progress: 40, description: 'Promote peaceful and inclusive societies for sustainable development.',
      activeTasks: [{ title: 'Community voting', status: 'active' }],
      completedTasks: [{ title: 'Sign sustainability petition', status: 'completed' }]
    },
    {
      number: 17, name: 'Partnerships', color: 'var(--sdg-17)', icon: 'fa-handshake', progress: 50, description: 'Strengthen the means of implementation and revitalize the global partnership.',
      activeTasks: [{ title: 'Share app with 3 friends', status: 'active' }],
      completedTasks: [{ title: 'Join community group', status: 'completed' }]
    }
  ];

  const [selectedSDG, setSelectedSDG] = useState<SDGData | null>(
    initialGoalId ? sdgs.find(s => s.number === initialGoalId) || null : null
  );

  return (
    <div className="bg-[var(--bg-primary)] h-full flex flex-col relative">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--forest-deep)] to-[var(--teal)] text-white pt-12 pb-8 px-6 shadow-lg z-10">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 text-sm font-bold opacity-90 hover:opacity-100 transition-opacity">
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>
        <h1 className="text-2xl font-bold mb-1 font-jakarta">Global Goals</h1>
        <p className="text-sm opacity-85">Your contribution to the 17 Sustainable Development Goals.</p>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6">
        <div className="grid grid-cols-3 gap-4 pb-20">
          {sdgs.map(sdg => (
            <div
              key={sdg.number}
              onClick={() => setSelectedSDG(sdg)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div
                className="w-[85px] h-[85px] rounded-2xl flex items-center justify-center text-white text-3xl shadow-sm relative overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                style={{ backgroundColor: sdg.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="absolute top-1 left-2 text-xs font-bold opacity-60">{sdg.number}</div>
                <i className={`fas ${sdg.icon} relative z-10 drop-shadow-md`}></i>
                {/* Mini Progress Bar inside icon */}
                {!simplifiedView && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
                    <div className="h-full bg-white/80" style={{ width: `${sdg.progress}%` }}></div>
                  </div>
                )}
              </div>
              <span className="text-[10px] font-bold text-center text-[var(--text-secondary)] leading-tight max-w-[80px]">{sdg.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSDG && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedSDG(null)}>
          <div
            className="bg-[var(--bg-primary)] w-full max-w-md h-[85vh] rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-8 text-white shrink-0" style={{ backgroundColor: selectedSDG.color }}>
              <button onClick={() => setSelectedSDG(null)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/30 transition-colors">
                <i className="fas fa-times text-sm"></i>
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl backdrop-blur-sm border border-white/20">
                  <i className={`fas ${selectedSDG.icon}`}></i>
                </div>
                <div>
                  <div className="text-sm font-bold opacity-80 uppercase tracking-widest">Goal {selectedSDG.number}</div>
                  <h2 className="text-2xl font-bold leading-tight">{selectedSDG.name}</h2>
                </div>
              </div>
              <p className="text-sm opacity-90 leading-relaxed font-medium">{selectedSDG.description}</p>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-[var(--bg-primary)]">

              {/* Progress Section */}
              {!simplifiedView && (
                <div className="bg-white rounded-[24px] p-5 shadow-sm border border-[var(--border-light)] mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <div className="text-sm font-bold text-[var(--text-secondary)]">Your Contribution</div>
                    <div className="text-2xl font-extrabold" style={{ color: selectedSDG.color }}>{selectedSDG.progress}%</div>
                  </div>
                  <div className="h-3 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${selectedSDG.progress}%`, backgroundColor: selectedSDG.color }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Active Tasks */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">Active Tasks</h3>
                {selectedSDG.activeTasks.length > 0 ? (
                  <div className="space-y-3">
                    {selectedSDG.activeTasks.map((task, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[var(--border-light)] shadow-sm">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                        <div className="flex-1 text-sm font-semibold text-[var(--text-primary)]">{task.title}</div>
                        <span className="text-[10px] font-bold text-[var(--forest-light)] bg-green-50 px-2 py-1 rounded-md">IN PROGRESS</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-400 text-sm">No active tasks. Start one!</div>
                )}
              </div>

              {/* Completed Tasks */}
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">Completed</h3>
                <div className="space-y-3">
                  {selectedSDG.completedTasks.map((task, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-transparent opacity-80">
                      <div className="w-5 h-5 rounded-full bg-[var(--forest-light)] flex items-center justify-center text-white text-[10px]">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="flex-1 text-sm font-medium text-[var(--text-secondary)] line-through">{task.title}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Action */}
            <div className="p-4 bg-white border-t border-[var(--border-light)]">
              <button className="w-full py-4 text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2" style={{ backgroundColor: selectedSDG.color }}>
                View More Challenges
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SDGDetailsScreen;
