import React, { useState } from 'react';
import { ScreenName } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onBack: () => void;
}

const FriendsScreen: React.FC<Props> = ({ onBack }) => {
  const [tab, setTab] = useState<'all' | 'family' | 'pending'>('all');

  return (
    <div className="bg-[var(--bg-primary)] min-h-full pb-32">
      <div className="p-5">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Friends & Family</h1>
        
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-[var(--border-light)] mb-6">
          {['all', 'family', 'pending'].map((t) => (
            <button 
              key={t}
              onClick={() => setTab(t as any)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all ${tab === t ? 'bg-[var(--forest-light)] text-white shadow-sm' : 'text-[var(--text-secondary)]'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-3 border border-[var(--border-light)] shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--teal)] to-[var(--forest-deep)] flex items-center justify-center text-white text-lg font-bold">
              AM
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                Ahmed Al Mansouri
                <span className="text-[10px] bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><i className="fas fa-heart"></i> Family</span>
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">Eco Warrior • Online</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-[var(--forest-light)]">15.2k</div>
              <div className="text-[10px] text-[var(--text-muted)]">Wda</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-[var(--border-light)] shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EC4899] to-[#BE185D] flex items-center justify-center text-white text-lg font-bold">
              FZ
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[var(--text-primary)]">Fatima Al Zaabi</h4>
              <p className="text-xs text-[var(--text-secondary)]">Green Champion • 5m ago</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-[var(--forest-light)]">12.8k</div>
              <div className="text-[10px] text-[var(--text-muted)]">Wda</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-[var(--border-light)] shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-white text-lg font-bold">
              KS
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[var(--text-primary)]">Khalid Al Sharqi</h4>
              <p className="text-xs text-[var(--text-secondary)]">Sustainability Hero • 1h ago</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-[var(--forest-light)]">10.4k</div>
              <div className="text-[10px] text-[var(--text-muted)]">Wda</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsScreen;
