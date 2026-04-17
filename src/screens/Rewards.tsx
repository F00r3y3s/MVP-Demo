import React, { useState } from 'react';
import { ScreenName, Transaction } from '../types';
import RewardView from '../components/RewardView';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  goBack: () => void;
}

type TabMode = 'wallet' | 'marketplace' | 'rewards';

const RewardsScreen: React.FC<Props> = ({ onNavigate, goBack }) => {
  const [tabMode, setTabMode] = useState<TabMode>('wallet');
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [showVoiceGuide, setShowVoiceGuide] = useState(false);

  const wdaBalance = 2850;
  const transactions: Transaction[] = [
    { id: '1', title: 'Task Completed', date: 'Today, 10:30 AM', amount: 100, type: 'earn', status: 'completed' },
    { id: '2', title: 'Zero Waste Challenge', date: 'Yesterday, 3:45 PM', amount: 250, type: 'bonus', status: 'completed' },
    { id: '3', title: 'Converted to Skywards', date: 'Jan 12, 2026', amount: -500, type: 'convert', status: 'completed' },
    { id: '4', title: 'Withdrawal to Bank', date: 'Jan 10, 2026', amount: -150, type: 'withdraw', status: 'completed' },
  ];

  const partners = [
    { id: 'emirates', name: 'Emirates Skywards', logo: '🛫', rate: '10 Wda = 1 Mile', isBest: true, color: 'from-red-500 to-red-700' },
    { id: 'adnoc', name: 'ADNOC Rewards', logo: '⛽', rate: '50 Wda = 5 Pts', isBest: false, color: 'from-blue-500 to-blue-700' },
    { id: 'carrefour', name: 'Carrefour Share', logo: '🛒', rate: '100 Wda = 1 Point', isBest: false, color: 'from-green-500 to-green-700' },
    { id: 'etihad', name: 'Etihad Guest', logo: '✈', rate: '20 Wda = 1 Mile', isBest: false, color: 'from-purple-500 to-purple-700' },
  ];

  const offers = [
    { id: 1, partner: 'Starbucks', title: '50% Off Any Drink', description: 'Valid at all UAE locations', wdaCost: 150, originalPrice: 'AED 25', discount: '50%', logo: '☕', category: 'cafe' },
    { id: 2, partner: 'Carrefour', title: 'Free Reusable Bag', description: 'With any purchase over AED 50', wdaCost: 200, originalPrice: 'Free', discount: 'Free', logo: '🛒', category: 'retail' },
    { id: 3, partner: 'Spinneys', title: '2x Loyalty Points', description: 'On fresh produce purchases', wdaCost: 300, originalPrice: 'Bonus Points', discount: '2x', logo: '🍎', category: 'grocery' },
    { id: 4, partner: 'IKEA', title: 'AED 50 Voucher', description: 'On sustainable furniture', wdaCost: 500, originalPrice: 'AED 50', discount: 'Fixed', logo: '🛋', category: 'home' },
  ];

  const products = [
    { id: 1, name: 'Bamboo Toothbrush Set', price: 150, image: '🪥', ecoRating: 'A+' },
    { id: 2, name: 'Solar Power Bank', price: 800, image: '🔋', ecoRating: 'A' },
    { id: 3, name: 'Reusable Straw Kit', price: 100, image: '🥤', ecoRating: 'A+' },
    { id: 4, name: 'Compost Bin (Home)', price: 350, image: '🗑', ecoRating: 'A' },
  ];

  const events = [
    { id: 1, name: 'Beach Cleanup Jumeirah', date: 'Jan 25, 2026', wdaCost: 200, participants: 45, image: '🏖' },
    { id: 2, name: 'Tree Planting Workshop', date: 'Feb 2, 2026', wdaCost: 100, participants: 120, image: '🌳' },
    { id: 3, name: 'Zero Waste Cooking Class', date: 'Feb 8, 2026', wdaCost: 150, participants: 30, image: '👨‍🍳' },
  ];

  const handleConvert = () => {
    setShowConvertModal(true);
  };

  const handlePartnerConvert = (partner: typeof partners[0]) => {
    setShowConvertModal(true);
  };

  const handleRedeemOffer = (offer: typeof offers[0]) => {
    setSelectedOffer(offer);
    setShowOfferModal(true);
  };

  return (
    <div className="bg-[var(--bg-primary)] h-full relative flex flex-col">
      <div className="sticky top-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border-light)]/50 pt-12 pb-2 px-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-all border border-slate-100 shadow-sm">
            <i className="fas fa-chevron-left text-xs"></i>
          </button>
          <h1 className="font-black text-[var(--text-primary)] font-jakarta tracking-tight">Rewards</h1>
          <button
            onClick={() => setShowVoiceGuide(true)}
            className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-all border border-emerald-200 shadow-sm"
            aria-label="Voice assistant for rewards"
          >
            <i className="fas fa-microphone text-xs"></i>
          </button>
        </div>

        <div className="bg-[var(--bg-tertiary)] p-1 rounded-xl flex relative">
          <div
            className={`absolute top-1 bottom-1 w-[32%] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out`}
            style={{ left: tabMode === 'wallet' ? '1%' : tabMode === 'marketplace' ? '34%' : '67%' }}
          ></div>
          <button
            onClick={() => setTabMode('wallet')}
            className={`flex-1 min-w-[32%] py-2 rounded-lg text-[10px] font-bold uppercase relative z-10 transition-colors ${tabMode === 'wallet' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
            aria-label="View wallet"
            aria-pressed={tabMode === 'wallet'}
          >
            <i className="fas fa-wallet mr-1.5"></i> Wallet
          </button>
          <button
            onClick={() => setTabMode('marketplace')}
            className={`flex-1 min-w-[32%] py-2 rounded-lg text-[10px] font-bold uppercase relative z-10 transition-colors ${tabMode === 'marketplace' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
            aria-label="View marketplace"
            aria-pressed={tabMode === 'marketplace'}
          >
            <i className="fas fa-store mr-1.5"></i> Shop
          </button>
          <button
            onClick={() => setTabMode('rewards')}
            className={`flex-1 min-w-[32%] py-2 rounded-lg text-[10px] font-bold uppercase relative z-10 transition-colors ${tabMode === 'rewards' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
            aria-label="View rewards and achievements"
            aria-pressed={tabMode === 'rewards'}
          >
            <i className="fas fa-gift mr-1.5"></i> Rewards
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {tabMode === 'wallet' && (
          <div className="p-6 space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[32px] p-8 text-white text-center shadow-xl shadow-emerald-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px]"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <i className="fas fa-coins text-emerald-300 text-2xl animate-pulse-slow"></i>
                  <div className="text-sm text-white/70 font-bold uppercase tracking-widest">Total Balance</div>
                </div>
                <div className="text-6xl font-extrabold text-white font-jakarta mb-2">{wdaBalance.toLocaleString()}</div>
                <div className="text-lg font-bold text-emerald-200 mb-6">WDA</div>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold">45 Wda pending</span>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleConvert}
                    className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all active:scale-95 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    aria-label="Convert Wda to loyalty points"
                  >
                    <i className="fas fa-exchange-alt mr-2"></i> Convert
                  </button>
                  <button
                    className="px-6 py-3 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-xl font-bold hover:bg-emerald-500/30 transition-all active:scale-95 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    aria-label="View full transaction history"
                  >
                    <i className="fas fa-history mr-2"></i> History
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[28px] p-5 border border-[var(--border-light)] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[var(--text-primary)]">Recent Activity</h3>
                <button className="text-xs font-bold text-[var(--forest-light)] hover:text-[var(--forest-deep)]">View All</button>
              </div>
              <div className="space-y-3">
                {transactions.slice(0, 3).map(tx => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm shadow-sm ${
                        tx.type === 'earn' ? 'bg-emerald-500' :
                        tx.type === 'convert' ? 'bg-blue-500' :
                        tx.type === 'withdraw' ? 'bg-red-500' : 'bg-amber-500'
                      }`}>
                        <i className={`fas ${
                          tx.type === 'earn' ? 'fa-check' :
                          tx.type === 'convert' ? 'fa-exchange-alt' :
                          tx.type === 'withdraw' ? 'fa-arrow-up' : 'fa-star'
                        }`}></i>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[var(--text-primary)]">{tx.title}</div>
                        <div className="text-[10px] text-[var(--text-muted)]">{tx.date}</div>
                      </div>
                    </div>
                    <div className={`font-bold text-sm ${tx.amount > 0 ? 'text-emerald-600' : 'text-[var(--text-primary)]'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount} Wda
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tabMode === 'marketplace' && (
          <div className="p-6 space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div>
              <h3 className="font-black text-[var(--text-primary)] mb-4">Partner Offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offers.map(offer => (
                  <div
                    key={offer.id}
                    onClick={() => handleRedeemOffer(offer)}
                    className="bg-white rounded-[28px] p-5 border border-[var(--border-light)] shadow-sm hover:shadow-md hover:border-[var(--forest-light)] transition-all cursor-pointer group relative overflow-hidden"
                    role="button"
                    aria-label={`Redeem ${offer.title} for ${offer.wdaCost} Wda`}
                  >
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full shadow-sm z-10">
                      <i className="fas fa-coins text-[10px]"></i>
                      <span className="font-bold text-xs">{offer.wdaCost} Wda</span>
                    </div>

                    <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center text-3xl ${offer.category === 'cafe' ? 'bg-amber-100' : offer.category === 'retail' ? 'bg-green-100' : offer.category === 'grocery' ? 'bg-red-100' : 'bg-blue-100'}`}>
                      {offer.logo}
                    </div>
                    <h4 className="font-bold text-[var(--text-primary)] text-base mb-2 pr-20">{offer.title}</h4>
                    <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">{offer.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)] line-through">{offer.originalPrice}</span>
                        <span className="text-sm font-bold text-emerald-600">{offer.discount}</span>
                      </div>
                      <i className="fas fa-chevron-right text-gray-400 group-hover:text-emerald-600 transition-colors"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-[var(--text-primary)]">Sustainable Products</h3>
                <button className="text-xs font-bold text-[var(--forest-light)]">View All</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-[28px] p-4 border border-[var(--border-light)] shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="text-4xl mb-3">{product.image}</div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2 line-clamp-1">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px] font-bold">{product.ecoRating}</div>
                        <span className="font-bold text-[var(--text-primary)]">{product.price} Wda</span>
                      </div>
                      <i className="fas fa-shopping-cart text-gray-400 group-hover:text-emerald-600 transition-colors"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-[var(--text-primary)]">Eco Events</h3>
                <button className="text-xs font-bold text-[var(--forest-light)]">View All</button>
              </div>
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className="bg-white rounded-[28px] p-5 border border-[var(--border-light)] shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{event.image}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[var(--text-primary)] mb-2">{event.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-3">
                          <span>📅 {event.date}</span>
                          <span>👥 {event.participants} going</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-600">{event.wdaCost} Wda</span>
                          <i className="fas fa-chevron-right text-gray-400 group-hover:text-emerald-600 transition-colors"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tabMode === 'rewards' && (
          <div className="p-6">
            <RewardView />
          </div>
        )}
      </div>

      {/* Conversion Modal */}
      {showConvertModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={() => setShowConvertModal(false)}>
          <div className="bg-[var(--bg-primary)] w-full max-w-[500px] h-[85vh] rounded-t-[32px] shadow-2xl animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[var(--border-light)] bg-white rounded-t-[32px]">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold font-jakarta">Convert Wda</h2>
                <button onClick={() => setShowConvertModal(false)} className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[32px] p-6 text-white mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm font-bold text-emerald-100 uppercase tracking-widest">Current Balance</div>
                    <div className="text-3xl font-extrabold text-white">{wdaBalance.toLocaleString()} Wda</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <i className="fas fa-coins text-2xl"></i>
                  </div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-sm text-emerald-100 mb-2">You will receive</div>
                  <div className="text-4xl font-extrabold text-white">AED {(wdaBalance / 100).toFixed(2)}</div>
                  <div className="text-sm text-emerald-100 mt-2">Rate: 100 Wda = AED 1</div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-[var(--text-primary)] mb-3">Amount to convert</label>
                <input
                  type="number"
                  placeholder="Enter Wda amount"
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <h3 className="font-black text-[var(--text-primary)] mb-4">Select Partner</h3>
                <div className="space-y-3">
                  {partners.map(partner => (
                    <div
                      key={partner.id}
                      className="bg-white p-4 rounded-2xl border border-[var(--border-light)] shadow-sm hover:shadow-md hover:border-[var(--forest-light)] transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white text-xl shadow-sm`}>
                          {partner.logo}
                        </div>
                        <div>
                          <div className="font-bold text-[var(--text-primary)]">{partner.name}</div>
                          <div className="text-[10px] text-[var(--text-muted)]">{partner.rate}</div>
                        </div>
                      </div>
                      {partner.isBest && (
                        <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                          <i className="fas fa-star text-[10px]"></i>
                          <span className="text-[10px] font-bold">BEST</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-[var(--border-light)]">
              <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg hover:bg-emerald-600 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                Confirm Conversion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offer Detail Modal */}
      {showOfferModal && selectedOffer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={() => setShowOfferModal(false)}>
          <div className="bg-[var(--bg-primary)] w-full max-w-[500px] h-[85vh] rounded-t-[32px] shadow-2xl animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[var(--border-light)] bg-white rounded-t-[32px]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{selectedOffer.logo}</div>
                  <div>
                    <h2 className="text-xl font-bold font-jakarta">{selectedOffer.partner}</h2>
                    <div className="text-xs text-[var(--text-muted)]">Offer</div>
                  </div>
                </div>
                <button onClick={() => setShowOfferModal(false)} className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="bg-gradient-to-br from-[var(--forest-light)] to-[var(--forest-deep)] rounded-[32px] p-8 text-white text-center mb-6">
                <div className="text-4xl mb-4">{selectedOffer.logo}</div>
                <h2 className="text-2xl font-black mb-2">{selectedOffer.title}</h2>
                <p className="text-lg text-emerald-100 mb-6">{selectedOffer.description}</p>
                <div className="flex items-center justify-center gap-4 text-3xl">
                  <span className="text-emerald-200 line-through">{selectedOffer.originalPrice}</span>
                  <span className="text-6xl font-bold">{selectedOffer.discount}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-[var(--border-light)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[var(--text-muted)]">Wda Cost</span>
                    <span className="font-bold text-lg text-[var(--text-primary)]">{selectedOffer.wdaCost} Wda</span>
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)]">Redeem at any {selectedOffer.partner} location in UAE</div>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-info-circle text-amber-600 text-lg"></i>
                    <div>
                      <div className="font-bold text-sm text-amber-900 mb-1">Terms & Conditions</div>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        Valid for 30 days from redemption. Cannot be combined with other offers. Limited to one redemption per customer per day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-[var(--border-light)]">
              <button className="w-full py-4 bg-[var(--text-primary)] text-white rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                Redeem Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice-Guided Conversion Modal */}
      {showVoiceGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center" onClick={() => setShowVoiceGuide(false)}>
          <div className="bg-[var(--bg-primary)] max-w-[400px] rounded-[32px] p-6 shadow-2xl animate-[fadeIn_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-jakarta text-[var(--text-primary)]">Voice Assistant</h2>
              <button onClick={() => setShowVoiceGuide(false)} className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-6 text-white mb-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-microphone text-3xl"></i>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">Tap to hear your options</p>
                <p className="text-emerald-100 text-sm mt-2">Current conversion rates:</p>
                <ul className="text-left text-sm mt-4 space-y-2">
                  <li>• Emirates Skywards: 10 Wda = 1 Mile</li>
                  <li>• ADNOC: 50 Wda = 5 Pts</li>
                  <li>• Carrefour: 100 Wda = 1 Point</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsScreen;
