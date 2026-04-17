import React from 'react';
import { ScreenName } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { useOrganization } from '../context/OrganizationContext';
import { useLevel } from '../context/LevelContext'; // Phase 7
import { useStreak } from '../context/StreakContext'; // Phase 7
import { ACHIEVEMENTS, RARITY_COLORS } from '../data/achievements'; // Phase 7
import { USER_IMAGE_URL } from '../constants';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  goBack: () => void;
}

const ProfileScreen: React.FC<Props> = ({ onNavigate, goBack }) => {
  const { simplifiedView } = useAccessibility();
  const { isLinked, organization, role, department, linkOrganization, unlinkOrganization, setRole } = useOrganization();
  const { level, xp, nextLevelXp, tier } = useLevel(); // Phase 7
  const { currentStreak, streakHistory } = useStreak(); // Phase 7

  // Org Linking State
  const [showLinkOrgModal, setShowLinkOrgModal] = React.useState(false);
  const [showManagerModal, setShowManagerModal] = React.useState(false);
  const [showAdminModal, setShowAdminModal] = React.useState(false);
  const [orgCode, setOrgCode] = React.useState('');
  const [linkError, setLinkError] = React.useState('');
  const [isLinking, setIsLinking] = React.useState(false);

  const handleLinkOrg = async () => {
    setIsLinking(true);
    setLinkError('');
    const success = await linkOrganization(orgCode);
    setIsLinking(false);
    if (success) {
      setShowLinkOrgModal(false);
      setOrgCode('');
    } else {
      setLinkError('Invalid organization code');
    }
  };

  return (
    <div className="bg-[var(--bg-primary)] min-h-full pb-32 relative">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-br from-[var(--forest-deep)] to-[var(--teal)] text-white overflow-hidden pb-6">
        {/* Cover Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        {/* Back Button (Absolute) */}
        <button onClick={goBack} className="absolute top-12 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white z-20">
          <i className="fas fa-arrow-left"></i>
        </button>

        <div className="pt-24 px-6 text-center relative z-10">
          <div className="relative inline-block mb-3">
            <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl mx-auto">
              <img src={USER_IMAGE_URL} alt="Profile" className="w-full h-full rounded-2xl object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[var(--amber)] to-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-[var(--forest-deep)] shadow-lg animate-[pulse_3s_infinite]">
              Lvl {level}
            </div>
          </div>
          <h1 className="text-2xl font-bold font-jakarta">Sarah Johnson</h1>
          <p className="text-sm opacity-90 flex items-center justify-center gap-2 mt-1">
            <i className="fas fa-crown text-yellow-300"></i> {tier} Tier • {currentStreak} Day Streak 🔥
          </p>

          <div className="grid grid-cols-4 gap-2 mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <div className="text-center">
              <div className="text-lg font-bold">2.8k</div>
              <div className="text-[10px] opacity-80 uppercase">Wda</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-lg font-bold">71</div>
              <div className="text-[10px] opacity-80 uppercase">AED</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-lg font-bold">{currentStreak}</div>
              <div className="text-[10px] opacity-80 uppercase">Streak</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-lg font-bold">68%</div>
              <div className="text-[10px] opacity-80 uppercase">SDG</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6 relative z-10 space-y-6">

        {/* Achievements Section - Connected Date */}
        {!simplifiedView && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--border-light)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[var(--text-primary)]">Achievements</h3>
              <span className="text-xs bg-green-100 text-[var(--forest-deep)] px-2 py-1 rounded-full font-bold">{ACHIEVEMENTS.filter(a => a.unlocked).length}/{ACHIEVEMENTS.length}</span>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {ACHIEVEMENTS.map((ach) => (
                <div key={ach.id} className={`flex flex-col items-center gap-2 min-w-[70px] group relative ${!ach.unlocked ? 'opacity-50' : ''}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-sm border-2 border-white relative transition-transform group-hover:scale-110 ${!ach.unlocked ? 'bg-gray-200 text-gray-400' : 'bg-gradient-to-br from-amber-100 to-orange-100 text-orange-600'}`}>
                    <i className={`fas ${ach.icon}`}></i>
                    {ach.unlocked && <div className="absolute -bottom-1 -right-1 text-[8px] bg-yellow-400 text-yellow-900 px-1 rounded-full border border-white">★</div>}
                  </div>
                  <span className="text-[10px] font-bold text-[var(--text-secondary)] text-center w-full truncate px-1">{ach.title}</span>

                  {/* Tooltip for desktop/hover */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-32 bg-slate-800 text-white text-[9px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <p className="font-bold mb-1">{ach.title}</p>
                    <p className="opacity-80">{ach.description}</p>
                    <p className={`mt-1 font-bold ${ach.unlocked ? 'text-green-400' : 'text-gray-400'}`}>{ach.unlocked ? 'Unlocked!' : 'Locked'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Timeline */}
        {!simplifiedView && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--border-light)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[var(--text-primary)]">Recent Activity</h3>
              <button className="text-xs font-bold text-[var(--forest-light)]">See All</button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-[var(--forest-light)] shrink-0">
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Completed Morning Walk</h4>
                  <p className="text-xs text-[var(--text-muted)]">+100 Wda • 2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                  <i className="fas fa-users"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Joined Community Challenge</h4>
                  <p className="text-xs text-[var(--text-muted)]">+50 Wda • 5 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 shrink-0">
                  <i className="fas fa-recycle"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">SDG Progress Updated</h4>
                  <p className="text-xs text-[var(--text-muted)]">Goal 12: 80% complete • 1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Impact Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--border-light)] text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-green-50 text-[var(--forest-light)] flex items-center justify-center mb-2">
              <i className="fas fa-tree"></i>
            </div>
            <div className="text-xl font-bold text-[var(--text-primary)]">47</div>
            <div className="text-[10px] text-[var(--text-secondary)]">Trees Saved</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--border-light)] text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-2">
              <i className="fas fa-tint"></i>
            </div>
            <div className="text-xl font-bold text-[var(--text-primary)]">1,250L</div>
            <div className="text-[10px] text-[var(--text-secondary)]">Water Saved</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--border-light)] text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-2">
              <i className="fas fa-bolt"></i>
            </div>
            <div className="text-xl font-bold text-[var(--text-primary)]">340</div>
            <div className="text-[10px] text-[var(--text-secondary)]">kWh Energy</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--border-light)] text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-2">
              <i className="fas fa-recycle"></i>
            </div>
            <div className="text-xl font-bold text-[var(--text-primary)]">85kg</div>
            <div className="text-[10px] text-[var(--text-secondary)]">Waste Reduced</div>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--border-light)] overflow-hidden">
          <div className="p-4 border-b border-[var(--border-light)]">
            <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Account</h4>
            <div className="space-y-1">
              <MenuOption icon="fa-wallet" label="My Wallet" color="text-amber-500" bg="bg-amber-50" onClick={() => onNavigate(ScreenName.WALLET)} />
              <MenuOption icon="fa-user-edit" label="Edit Profile" />
              <MenuOption icon="fa-shield-alt" label="Security" />
            </div>
          </div>

          {!simplifiedView && (
            <div className="p-4 border-b border-[var(--border-light)]">
              <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Work & Organization</h4>
              <div className="space-y-1">
                {isLinked && organization ? (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-3 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl border border-white/10">
                        {organization.logo}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{organization.name}</h4>
                        <p className="text-[10px] text-gray-300">{department} • {role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={unlinkOrganization}
                        className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold text-red-300 transition-colors"
                      >
                        Unlink
                      </button>
                      {/* Role Toggle Demo */}
                      <button
                        onClick={() => setRole(role === 'employee' ? 'manager' : role === 'manager' ? 'admin' : 'employee')}
                        className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold text-blue-200 transition-colors uppercase tracking-wider"
                      >
                        Role: {role}
                      </button>
                    </div>

                    {/* Manager Features */}
                    {role !== 'employee' && (
                      <button
                        onClick={() => setShowManagerModal(true)}
                        className="w-full mt-2 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-[10px] font-bold text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-chart-line"></i> Manager Dashboard
                      </button>
                    )}

                    {/* Admin Features */}
                    {role === 'admin' && (
                      <button
                        onClick={() => setShowAdminModal(true)}
                        className="w-full mt-2 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-[10px] font-bold text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-building"></i> Admin Console
                      </button>
                    )}
                  </div>
                ) : (
                  <MenuOption
                    icon="fa-building"
                    label="Link Organization"
                    color="text-blue-500"
                    bg="bg-blue-50"
                    onClick={() => setShowLinkOrgModal(true)}
                  />
                )}
              </div>
            </div>
          )}

          <div className="p-4 border-b border-[var(--border-light)]">
            <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Preferences</h4>
            <div className="space-y-1">
              <MenuOption
                icon="fa-universal-access"
                label="POD Settings"
                color="text-indigo-500"
                bg="bg-indigo-50"
                onClick={() => onNavigate(ScreenName.POD_SETTINGS)}
              />
              <MenuOption icon="fa-bell" label="Notifications" />
              <MenuOption icon="fa-globe" label="Language" />
              <MenuOption icon="fa-palette" label="Theme" />
            </div>
          </div>
          <div className="p-4">
            <button className="w-full py-3 border-2 border-[var(--error)] text-[var(--error)] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
              <i className="fas fa-sign-out-alt"></i> Log Out
            </button>
          </div>
        </div>
      </div>


      {/* Organization Linking Modal */}
      {
        showLinkOrgModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-sm rounded-[32px] p-6 animate-[slideUp_0.3s_ease-out]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Link Organization</h3>
                <button onClick={() => setShowLinkOrgModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase block mb-1">Organization Code</label>
                  <input
                    type="text"
                    value={orgCode}
                    onChange={(e) => setOrgCode(e.target.value.toUpperCase())}
                    placeholder="e.g. GTD001"
                    className="w-full bg-[var(--bg-tertiary)] rounded-xl px-4 py-3 font-mono text-center font-bold tracking-widest outline-none focus:ring-2 focus:ring-[var(--forest-light)]"
                  />
                  {linkError && <p className="text-[10px] font-bold text-red-500 mt-1 text-center">{linkError}</p>}
                </div>

                <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700 leading-relaxed">
                  <span className="font-bold">Tip:</span> Ask your workspace administrator for your unique 6-character organization code.
                </div>

                <button
                  onClick={handleLinkOrg}
                  disabled={!orgCode || isLinking}
                  className="w-full py-4 bg-[var(--forest-deep)] text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:shadow-none"
                >
                  {isLinking ? <i className="fas fa-spinner fa-spin"></i> : 'Verify & Link'}
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Manager Dashboard Modal */}
      {showManagerModal && (
        <div className="absolute inset-x-0 bottom-0 z-50 h-[85vh] bg-white rounded-t-[32px] overflow-hidden flex flex-col shadow-2xl animate-[slideUp_0.4s_ease-out]">
          <div className="bg-blue-600 p-6 text-white flex justify-between items-center shrink-0">
            <div>
              <h3 className="text-xl font-bold font-jakarta">Team Dashboard</h3>
              <p className="text-xs text-blue-200 uppercase tracking-widest">{department}</p>
            </div>
            <button onClick={() => setShowManagerModal(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><i className="fas fa-times"></i></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <div className="text-[10px] font-bold text-blue-400 uppercase">Team Engagement</div>
                <div className="text-2xl font-black text-blue-900">85%</div>
              </div>
              <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                <div className="text-[10px] font-bold text-green-600 uppercase">Carbon Offset</div>
                <div className="text-2xl font-black text-green-900">450kg</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-800 mb-3">Team Challenges</h4>
              <button className="w-full py-3 bg-[var(--forest-light)] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 mb-3">
                <i className="fas fa-plus"></i> Create New Challenge
              </button>
              <div className="bg-white border border-slate-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
                <span className="text-xs font-bold">Paperless Week</span>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-lg">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Dashboard Modal */}
      {showAdminModal && (
        <div className="absolute inset-x-0 bottom-0 z-50 h-[90vh] bg-slate-900 text-white rounded-t-[32px] overflow-hidden flex flex-col shadow-2xl animate-[slideUp_0.4s_ease-out]">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center shrink-0">
            <div>
              <h3 className="text-xl font-bold font-jakarta">Admin Console</h3>
              <p className="text-xs text-slate-400 uppercase tracking-widest">{organization?.name} • Corporate</p>
            </div>
            <button onClick={() => setShowAdminModal(false)} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700"><i className="fas fa-times"></i></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">ESG Reporting Snapshot</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Scope 1 Emissions</span>
                  <span className="text-sm font-bold text-emerald-400">-12%</span>
                </div>
                <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[88%]"></div></div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Scope 2 Emissions</span>
                  <span className="text-sm font-bold text-amber-400">-5%</span>
                </div>
                <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-[95%]"></div></div>
              </div>
              <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                <i className="fas fa-file-pdf"></i> Download CSRD Report
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 p-4 rounded-2xl text-left transition-colors">
                <i className="fas fa-users text-blue-400 text-xl mb-2"></i>
                <div className="text-xs font-bold text-blue-100">Manage People</div>
              </button>
              <button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 p-4 rounded-2xl text-left transition-colors">
                <i className="fas fa-wallet text-purple-400 text-xl mb-2"></i>
                <div className="text-xs font-bold text-purple-100">Budget Allocation</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

const MenuOption: React.FC<{ icon: string, label: string, color?: string, bg?: string, onClick?: () => void }> = ({ icon, label, color = 'text-[var(--forest-light)]', bg = 'bg-green-50', onClick }) => (
  <button onClick={onClick} className="w-full flex items-center gap-3 p-3 hover:bg-[var(--bg-tertiary)] rounded-xl transition-colors text-left group">
    <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center text-lg`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <span className="flex-1 font-semibold text-[var(--text-primary)] text-sm">{label}</span>
    <i className="fas fa-chevron-right text-[var(--text-muted)] text-xs group-hover:translate-x-1 transition-transform"></i>
  </button>
);

export default ProfileScreen;
