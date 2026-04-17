
import React, { useState } from 'react';
import { ScreenName, Transaction } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  goBack: () => void;
}

const WalletScreen: React.FC<Props> = ({ goBack }) => {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  // Transfer Flow State
  const [transferStep, setTransferStep] = useState<1 | 2 | 3>(1);
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedUser, setSelectedUser] = useState<{name: string, username: string, avatar: string} | null>(null);

  const transactions: Transaction[] = [
    { id: '1', title: 'Task Completed', date: 'Today, 10:30 AM', amount: 100, type: 'earn', status: 'completed' },
    { id: '2', title: 'Zero Waste Challenge', date: 'Yesterday, 3:45 PM', amount: 250, type: 'bonus', status: 'completed' },
    { id: '3', title: 'Converted to Skywards', date: 'Jan 12, 2026', amount: -500, type: 'convert', status: 'completed' },
    { id: '4', title: 'Withdrawal to Bank', date: 'Jan 10, 2026', amount: -150, type: 'withdraw', status: 'completed' },
  ];

  const handleTransferClose = () => {
    setShowTransfer(false);
    setTransferStep(1);
    setTransferAmount('');
    setSelectedUser(null);
  };

  const handleUserSelect = (user: {name: string, username: string, avatar: string}) => {
    setSelectedUser(user);
    setTransferStep(2);
  };

  return (
    <div className="bg-[var(--bg-primary)] min-h-full pb-32">
      <div className="p-6">
        {/* Main Balance Card */}
        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[32px] p-8 text-white text-center shadow-xl shadow-slate-900/20 mb-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[60px] pointer-events-none"></div>
           <div className="relative z-10">
             <div className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Total Balance</div>
             <div className="text-5xl font-extrabold mb-2 flex items-center justify-center gap-3 font-jakarta">
               <span className="text-[var(--emerald)]"><i className="fas fa-coins"></i></span> 2,850
             </div>
             <div className="text-sm bg-white/10 px-3 py-1 rounded-full inline-block mb-8 backdrop-blur-sm border border-white/5">
                ≈ AED 71.25
             </div>
             
             <div className="flex gap-4">
               <button onClick={() => setShowTransfer(true)} className="flex-1 py-4 bg-[var(--emerald)] text-[var(--forest-deep)] rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2 hover:brightness-110">
                 <i className="fas fa-paper-plane"></i> Send
               </button>
               <button onClick={() => setShowWithdraw(true)} className="flex-1 py-4 bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-white/20">
                 <i className="fas fa-exchange-alt"></i> Convert
               </button>
             </div>
           </div>
        </div>

        {/* Balance Breakdown Grid */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-[var(--border-light)] mb-6">
           <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <i className="fas fa-chart-pie"></i> Balance Breakdown
           </div>
           <div className="grid grid-cols-4 gap-2">
              <div className="text-center">
                 <div className="w-10 h-10 mx-auto bg-gradient-to-br from-[var(--forest-light)] to-[var(--forest-deep)] rounded-xl flex items-center justify-center text-white mb-2 shadow-sm"><i className="fas fa-tasks"></i></div>
                 <div className="font-bold text-sm text-[var(--text-primary)]">1,420</div>
                 <div className="text-[10px] text-[var(--text-muted)]">Tasks</div>
              </div>
              <div className="text-center">
                 <div className="w-10 h-10 mx-auto bg-gradient-to-br from-[var(--amber)] to-[#D97706] rounded-xl flex items-center justify-center text-white mb-2 shadow-sm"><i className="fas fa-trophy"></i></div>
                 <div className="font-bold text-sm text-[var(--text-primary)]">680</div>
                 <div className="text-[10px] text-[var(--text-muted)]">Challenges</div>
              </div>
              <div className="text-center">
                 <div className="w-10 h-10 mx-auto bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-xl flex items-center justify-center text-white mb-2 shadow-sm"><i className="fas fa-qrcode"></i></div>
                 <div className="font-bold text-sm text-[var(--text-primary)]">450</div>
                 <div className="text-[10px] text-[var(--text-muted)]">Scans</div>
              </div>
              <div className="text-center">
                 <div className="w-10 h-10 mx-auto bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] rounded-xl flex items-center justify-center text-white mb-2 shadow-sm"><i className="fas fa-gift"></i></div>
                 <div className="font-bold text-sm text-[var(--text-primary)]">300</div>
                 <div className="text-[10px] text-[var(--text-muted)]">Bonuses</div>
              </div>
           </div>
        </div>

        {/* Loyalty Partners Section */}
        <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
           <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-lg text-[var(--text-primary)]">Loyalty Partners</h3>
             <button className="text-xs font-bold text-[var(--forest-light)] bg-green-50 px-3 py-1 rounded-full">View All</button>
           </div>
           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              <div className="shrink-0 w-36 bg-white rounded-[24px] p-4 border border-[var(--border-light)] shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                 <div className="w-12 h-12 mx-auto mb-3 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-xl"><i className="fas fa-plane"></i></div>
                 <div className="font-bold text-sm mb-1 text-[var(--text-primary)]">Emirates</div>
                 <div className="text-[10px] text-[var(--text-muted)] font-medium">10 Wda = 1 Mile</div>
              </div>
              <div className="shrink-0 w-36 bg-white rounded-[24px] p-4 border border-[var(--border-light)] shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                 <div className="w-12 h-12 mx-auto mb-3 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl"><i className="fas fa-gas-pump"></i></div>
                 <div className="font-bold text-sm mb-1 text-[var(--text-primary)]">ADNOC</div>
                 <div className="text-[10px] text-[var(--text-muted)] font-medium">50 Wda = 5 Pts</div>
              </div>
              <div className="shrink-0 w-36 bg-white rounded-[24px] p-4 border border-[var(--border-light)] shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                 <div className="w-12 h-12 mx-auto mb-3 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-xl"><i className="fas fa-shopping-cart"></i></div>
                 <div className="font-bold text-sm mb-1 text-[var(--text-primary)]">Carrefour</div>
                 <div className="text-[10px] text-[var(--text-muted)] font-medium">100 Wda = 1 Share</div>
              </div>
           </div>
        </div>

        {/* Transactions */}
        <div>
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-lg text-[var(--text-primary)]">History</h3>
             <button className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--forest-light)] hover:text-white transition-colors" onClick={() => setShowQR(true)}>
                <i className="fas fa-qrcode"></i>
             </button>
          </div>
          
          <div className="bg-white rounded-[24px] border border-[var(--border-light)] overflow-hidden shadow-sm">
            {transactions.map((tx, i) => (
              <div key={tx.id} className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${i !== transactions.length - 1 ? 'border-b border-[var(--border-light)]' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg shadow-sm
                    ${tx.type === 'withdraw' ? 'bg-red-500' : 
                      tx.type === 'convert' ? 'bg-blue-500' : 
                      'bg-[var(--forest-light)]'}`}>
                    <i className={`fas ${
                      tx.type === 'withdraw' ? 'fa-arrow-up' : 
                      tx.type === 'convert' ? 'fa-exchange-alt' : 
                      'fa-check'
                    }`}></i>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[var(--text-primary)]">{tx.title}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">{tx.date}</div>
                  </div>
                </div>
                <div className={`font-bold text-sm ${tx.amount > 0 ? 'text-[var(--forest-light)]' : 'text-[var(--text-primary)]'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} Wda
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Convert/Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={() => setShowWithdraw(false)}>
          <div className="bg-[var(--bg-secondary)] w-full rounded-t-[32px] p-6 animate-[slideUp_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Convert Points</h2>
              <button onClick={() => setShowWithdraw(false)} className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center hover:bg-gray-200">
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
               <div className="bg-gradient-to-r from-[#D71921] to-[#B3141B] rounded-2xl p-4 text-white flex items-center justify-between cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl"><i className="fas fa-plane"></i></div>
                     <div>
                        <div className="font-bold">Emirates Skywards</div>
                        <div className="text-xs opacity-80">Rate: 10 Wda = 1 Mile</div>
                     </div>
                  </div>
                  <i className="fas fa-chevron-right opacity-50"></i>
               </div>
               
               <div className="bg-gradient-to-r from-[#007AC3] to-[#005C94] rounded-2xl p-4 text-white flex items-center justify-between cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl"><i className="fas fa-gas-pump"></i></div>
                     <div>
                        <div className="font-bold">ADNOC Rewards</div>
                        <div className="text-xs opacity-80">Rate: 50 Wda = 5 Pts</div>
                     </div>
                  </div>
                  <i className="fas fa-chevron-right opacity-50"></i>
               </div>

               <div className="bg-gradient-to-r from-[#6e2c90] to-[#471c5e] rounded-2xl p-4 text-white flex items-center justify-between cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl"><i className="fas fa-shopping-cart"></i></div>
                     <div>
                        <div className="font-bold">Carrefour Share</div>
                        <div className="text-xs opacity-80">Rate: 100 Wda = 1 Point</div>
                     </div>
                  </div>
                  <i className="fas fa-chevron-right opacity-50"></i>
               </div>
            </div>

            <button className="w-full py-4 bg-[var(--text-primary)] text-white rounded-2xl font-bold shadow-lg">Proceed to Transfer</button>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransfer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={handleTransferClose}>
          <div className="bg-[var(--bg-secondary)] w-full rounded-t-[32px] p-6 animate-[slideUp_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Send Wda</h2>
              <button onClick={handleTransferClose} className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            {transferStep === 1 && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <div className="relative mb-6">
                  <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input type="text" placeholder="Search by name or username..." className="w-full bg-[var(--bg-tertiary)] pl-10 pr-4 py-4 rounded-xl outline-none border border-transparent focus:border-[var(--forest-light)] focus:bg-white transition-colors" />
                </div>
                {/* User List Placeholder */}
                <div className="space-y-2">
                  {[
                    {name: 'Ahmed Al Mansouri', username: '@ahmed_sustain', avatar: 'AM'},
                    {name: 'Fatima Al Zaabi', username: '@fatima_green', avatar: 'FZ'},
                  ].map((user, i) => (
                    <div key={i} onClick={() => handleUserSelect(user)} className="flex items-center gap-3 p-3 bg-[var(--bg-tertiary)] rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--teal)] to-[var(--forest-deep)] flex items-center justify-center text-white font-bold">{user.avatar}</div>
                      <div>
                        <div className="font-bold text-sm">{user.name}</div>
                        <div className="text-xs text-[var(--text-muted)]">{user.username}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Step 2 & 3 simplified for brevity, following same design language */}
            {transferStep > 1 && (
               <div className="text-center py-8">
                  <p>Transfer Flow Steps (2 & 3) would go here...</p>
                  <button onClick={() => setTransferStep(1)} className="mt-4 text-blue-500">Reset</button>
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletScreen;
