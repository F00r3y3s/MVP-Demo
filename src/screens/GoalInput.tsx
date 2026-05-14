
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenName, SubRoleType } from '../types';
import { FocusAreaIcon } from '../components/AnimatedIcons';
import visionDreamsBackground from '../../whisk-backgrounds/6.jpeg';
import impactAreasBackground from '../../whisk-backgrounds/9.jpeg';
import settingPaceBackground from '../../whisk-backgrounds/8.jpeg';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
  initialSubRole?: SubRoleType;
}

const GoalInputScreen: React.FC<Props> = ({ onNavigate, onBack, initialSubRole }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [dream, setDream] = useState('');
  const [goals, setGoals] = useState<string[]>(['']);
  const [wishes, setWishes] = useState<string[]>(['']);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState<string | null>(null);
  const [commitment, setCommitment] = useState<string | null>(null);
  const [weeklyTime, setWeeklyTime] = useState<string | null>(null);

  // Step 3 States
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [aiContext, setAiContext] = useState('');
  const driverOptions = ['Save Money', 'Health', 'Future Generations', 'Ethics', 'Innovation', 'Community'];

  // Step 4 States
  const [nationality, setNationality] = useState('');
  const [emirate, setEmirate] = useState('');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [field, setField] = useState('');
  const [transport, setTransport] = useState('');
  const [housing, setHousing] = useState('');
  const [diet, setDiet] = useState('');
  const [energySource, setEnergySource] = useState('');
  const [shoppingHabit, setShoppingHabit] = useState('');

  const focusAreas = [
    { id: 'waste', label: 'Zero Waste' },
    { id: 'carbon', label: 'Reduce Carbon' },
    { id: 'water', label: 'Save Water' },
    { id: 'energy', label: 'Clean Energy' },
    { id: 'plastic', label: 'Plastic Free' },
    { id: 'nature', label: 'Plant Trees' },
    { id: 'fashion', label: 'Sus. Fashion' },
    { id: 'food', label: 'Eco Foods' },
    { id: 'compost', label: 'Composting' },
    { id: 'travel', label: 'Eco Travel' },
    { id: 'ev', label: 'EV Mobility' },
    { id: 'community', label: 'Local Impact' },
  ];

  const lifestyleOptions = [
    'Beginner', 'Conscious', 'Enthusiast', 'Expert', 'Activist'
  ];

  const commitmentLevels = [
    { id: 'casual', title: 'Casual', desc: 'Learning', icon: 'fa-book-open', color: 'bg-blue-100 text-blue-600' },
    { id: 'active', title: 'Active', desc: 'Habits', icon: 'fa-walking', color: 'bg-green-100 text-green-600' },
    { id: 'dedicated', title: 'Dedicated', desc: 'Lifestyle', icon: 'fa-hand-holding-heart', color: 'bg-amber-100 text-amber-600' },
    { id: 'changemaker', title: 'Leader', desc: 'Leading', icon: 'fa-fire', color: 'bg-red-100 text-red-600' },
  ];

  const timeOptions = [
    { id: 'quick', label: '5-15m', desc: 'Micro' },
    { id: 'steady', label: '30m+', desc: 'Active' },
    { id: 'deep', label: '2h+', desc: 'Deep' },
  ];

  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter(g => g !== id));
    } else {
      setSelectedGoals([...selectedGoals, id]);
    }
  };

  const toggleDriver = (driver: string) => {
    if (selectedDrivers.includes(driver)) {
      setSelectedDrivers(selectedDrivers.filter(d => d !== driver));
    } else {
      setSelectedDrivers([...selectedDrivers, driver]);
    }
  };

  const handleNext = () => {
    if (step === 1 && dream.trim().length > 0) setStep(2);
    else if (step === 2 && selectedGoals.length >= 3) setStep(3);
    else if (step === 3 && commitment && weeklyTime) onNavigate(ScreenName.HOME, { subRole: initialSubRole });
  };

  const handleBackStep = () => {
    if (step === 1) onBack();
    else setStep(prev => (prev - 1) as any);
  };

  const addGoal = () => { if (goals.length < 2) setGoals([...goals, '']); };
  const removeGoal = (index: number) => {
    if (goals.length > 1) {
      const newGoals = [...goals];
      newGoals.splice(index, 1);
      setGoals(newGoals);
    }
  };

  const addWish = () => { if (wishes.length < 3) setWishes([...wishes, '']); };
  const removeWish = (index: number) => {
    if (wishes.length > 1) {
      const newWishes = [...wishes];
      newWishes.splice(index, 1);
      setWishes(newWishes);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)] px-8 pt-12 pb-16 relative overflow-hidden">
      {step === 1 && (
        <>
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${visionDreamsBackground})`,
              backgroundPosition: 'center center',
              backgroundSize: '100% 100%',
            }}
          />
          <div className="absolute inset-0 bg-white/60" />
        </>
      )}
      {step === 2 && (
        <>
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${impactAreasBackground})`,
              backgroundPosition: 'center center',
              backgroundSize: '100% 100%',
            }}
          />
          <div className="absolute inset-0 bg-white/58" />
        </>
      )}
      {step === 3 && (
        <>
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${settingPaceBackground})`,
              backgroundPosition: 'center center',
              backgroundSize: '100% 100%',
            }}
          />
          <div className="absolute inset-0 bg-white/35" />
        </>
      )}

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center mb-6 shrink-0">
        <button onClick={handleBackStep} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors border border-gray-100">
          <i className="fas fa-arrow-left text-sm"></i>
        </button>
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-2 rounded-full transition-all duration-500 ${step === s ? 'bg-[var(--forest-light)] w-10 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-gray-200 w-4'}`}></div>
          ))}
        </div>
        <div className="w-10 text-[10px] font-black text-[var(--forest-light)] text-right uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">Step {step}</div>
      </div>

      <div className="relative z-10 flex-1 mb-24 pr-1 flex flex-col justify-center">
        <div className="max-h-full overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-4 py-4 px-1">
                <div className="text-center mb-2">
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] leading-tight font-jakarta">Vision & Dreams</h2>
                  <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest opacity-60">Design your future</p>
                </div>

                <div className="space-y-4">
                  <InputGroup label="Ultimate Dream (1 Max)" value={dream} onChange={setDream} placeholder="e.g., A house in city center..." height="h-16" />

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-wider opacity-60">Impact Goals (2 Max)</label>
                      {goals.length < 2 && <button onClick={addGoal} className="text-[10px] font-bold text-[var(--forest-light)] hover:scale-105 transition-transform">+ ADD</button>}
                    </div>
                    {goals.map((g, i) => (
                      <div key={i} className="relative group">
                        <textarea value={g} onChange={(e) => {
                          const newGoals = [...goals];
                          newGoals[i] = e.target.value;
                          setGoals(newGoals);
                        }} placeholder={i === 0 ? "e.g., Travel world carbon-free..." : "e.g., Plastic-free city..."} className="w-full h-12 p-3 bg-white rounded-2xl border border-[var(--border-light)] focus:border-[var(--forest-light)] outline-none text-xs text-gray-900 resize-none shadow-sm transition-all shadow-inner pr-10" />
                        {goals.length > 1 && (
                          <button onClick={() => removeGoal(i)} className="absolute right-3 top-3 text-gray-300 hover:text-red-400 p-1">
                            <i className="fas fa-times-circle text-sm"></i>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-wider opacity-60">Daily Wishes (3 Max)</label>
                      {wishes.length < 3 && <button onClick={addWish} className="text-[10px] font-bold text-[var(--forest-light)] hover:scale-105 transition-transform">+ ADD</button>}
                    </div>
                    {wishes.map((w, i) => (
                      <div key={i} className="relative group">
                        <textarea value={w} onChange={(e) => {
                          const newWishes = [...wishes];
                          newWishes[i] = e.target.value;
                          setWishes(newWishes);
                        }} placeholder={["e.g., Zero-waste coffee mugs...", "e.g., Composting scraps...", "e.g., Cycling to work..."][i]} className="w-full h-12 p-3 bg-white rounded-2xl border border-[var(--border-light)] focus:border-[var(--forest-light)] outline-none text-xs text-gray-900 resize-none shadow-sm transition-all pr-10" />
                        {wishes.length > 1 && (
                          <button onClick={() => removeWish(i)} className="absolute right-3 top-3 text-gray-300 hover:text-red-400 p-1">
                            <i className="fas fa-times-circle text-sm"></i>
                          </button>
                        )}
                      </div>
                    ))}

                    <div className="flex flex-wrap gap-1.5 px-1 mt-1">
                      {['Minimalist', 'Composter', 'Vegan', 'Cyclist'].map(w => (
                        <button
                          key={w}
                          onClick={() => {
                            const lastIdx = wishes.length - 1;
                            const newWishes = [...wishes];
                            newWishes[lastIdx] = newWishes[lastIdx] ? `${newWishes[lastIdx]}, ${w}` : w;
                            setWishes(newWishes);
                          }}
                          className="px-2.5 py-1.5 rounded-full bg-white border border-gray-100 text-[9px] font-bold text-gray-400 hover:border-[var(--forest-light)] transition-all shadow-sm"
                        >
                          +{w}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col bg-[#FCFCFC] rounded-3xl p-5 border border-gray-100 shadow-inner">
                <div className="mb-4 flex justify-between items-end px-2">
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] font-jakarta">Impact Areas</h2>
                    <p className="text-[var(--text-secondary)] text-[10px] uppercase tracking-[0.2em] font-black mt-1">Select at least 3 areas</p>
                  </div>
                  <div className={`text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg transition-colors ${selectedGoals.length >= 3 ? 'bg-[var(--forest-deep)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {selectedGoals.length} SELECTED
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pb-4">
                  {focusAreas.map(area => {
                    const isSelected = selectedGoals.includes(area.id);
                    return (
                      <motion.button key={area.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => toggleGoal(area.id)}
                        className={`p-3 rounded-[24px] flex flex-col items-center justify-center gap-2 transition-all aspect-square border-2 ${isSelected
                          ? 'bg-[var(--forest-deep)] border-[var(--emerald)] shadow-[0_15px_30px_rgba(6,78,59,0.3)] z-10'
                          : 'bg-white border-gray-100 shadow-sm'
                          }`}
                      >
                        <div className="h-10 flex items-center justify-center">
                          <FocusAreaIcon id={area.id} isSelected={isSelected} />
                        </div>
                        <span className={`text-[8px] font-black text-center leading-tight uppercase tracking-tighter ${isSelected ? 'text-[var(--emerald)]' : 'text-[var(--text-primary)]'}`}>
                          {area.label}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 py-4">
                <div className="text-center mb-2 px-6">
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] font-jakarta mb-1">Setting the Pace</h2>
                  <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">Personalization Profile</p>
                </div>

                {/* Time Dedication */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mx-1">
                  <h3 className="text-[12px] font-black text-[var(--emerald)] uppercase tracking-wider mb-4 border-l-4 border-[var(--emerald)] pl-3">Time Dedication</h3>
                  <div className="flex flex-wrap gap-3">
                    {timeOptions.map(opt => (
                      <button key={opt.id} onClick={() => setWeeklyTime(opt.id)} className={`flex-1 min-w-[100px] h-14 rounded-2xl border-2 transition-all flex flex-col items-center justify-center ${weeklyTime === opt.id ? 'border-[var(--emerald)] bg-green-50 shadow-md' : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                        <span className="text-base font-black leading-tight">{opt.label}</span>
                        <span className="text-[9px] uppercase font-bold opacity-60">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Engagement Style */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mx-1">
                  <h3 className="text-[12px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4 border-l-4 border-gray-200 pl-3">Engagement Style</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {commitmentLevels.map(level => (
                      <button key={level.id} onClick={() => setCommitment(level.id)} className={`p-4 rounded-[24px] border-2 transition-all text-left flex items-start gap-3 ${commitment === level.id ? 'border-[var(--forest-light)] bg-green-50 shadow-md' : 'border-transparent bg-gray-50'}`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shadow-inner shrink-0 ${level.color}`}><i className={`fas ${level.icon}`}></i></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-[11px] uppercase tracking-tighter truncate">{level.title}</h4>
                          <p className="text-[9px] text-gray-400 font-medium leading-tight mt-0.5">{level.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* TODO (Complete Profile later):
                  - Sustainability Mastery (Beginner → Activist)
                  - Sustainability Drivers (Save Money, Health, Future Generations…)
                  - Custom motivators (AI Insights) text area
              */}
              </motion.div>

            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-8 py-6 z-20">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleNext}
          disabled={
            (step === 1 && (dream.trim().length === 0 || goals.some(g => !g.trim()) || wishes.some(w => !w.trim()))) ||
            (step === 2 && selectedGoals.length < 3) ||
            (step === 3 && (!commitment || !weeklyTime))
          }
          className="w-full py-4 bg-gradient-to-r from-[var(--forest-light)] to-[var(--forest-deep)] text-white rounded-2xl font-bold text-lg shadow-2xl shadow-green-600/30 active:scale-[0.98] transition-all disabled:opacity-30 disabled:shadow-none flex items-center justify-center gap-2"
        >
          {step === 3 ? 'Launch Journey 🚀' : 'Next Step'}
          <i className={`fas ${step === 3 ? 'fa-rocket' : 'fa-arrow-right'} text-sm`} />
        </motion.button>
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, placeholder, height = "h-24" }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-wider ml-1 opacity-60">{label}</label>
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className={`w-full ${height} p-3 bg-white rounded-2xl border border-[var(--border-light)] focus:border-[var(--forest-light)] outline-none text-sm text-gray-900 resize-none shadow-sm transition-all focus:ring-4 focus:ring-green-50 shadow-inner`} />
  </div>
);

export default GoalInputScreen;
