
import React, { useState, useRef, useEffect } from 'react';
import { ScreenName, RoleType, SubRoleType } from '../types';
import UAEPasSButton from '../components/UAEPasSButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../context/AccessibilityContext';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  role?: RoleType;
  subRole?: SubRoleType;
}

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
  'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada',
  'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
  'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark',
  'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
  'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji',
  'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece',
  'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
  'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
  'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia',
  'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
  'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia',
  'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
  'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
  'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama',
  'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
  'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
  'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo',
  'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
  'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen', 'Zambia', 'Zimbabwe',
];

const EMIRATES = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Fujairah', 'Ras Al Khaimah', 'Umm Al Quwain'];

const calculateAge = (dob: string): number => {
  if (!dob) return -1;
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const CountrySearchInput: React.FC<{
  value: string;
  onChange: (val: string) => void;
}> = ({ value, onChange }) => {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter(c =>
    c.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (country: string) => {
    setQuery(country);
    onChange(country);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <i className="fas fa-globe-americas absolute left-4 top-1/2 -translate-y-1/2 text-[var(--forest-light)] text-sm z-10 pointer-events-none" />
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); onChange(''); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search nationality..."
        className="w-full py-3.5 pl-11 pr-10 bg-[var(--bg-tertiary)] rounded-2xl outline-none text-xs font-bold text-gray-900 border-2 border-transparent focus:border-[var(--forest-light)] focus:bg-white transition-all transition-all"
      />
      {query && (
        <button
          onClick={() => { setQuery(''); onChange(''); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
        >
          <i className="fas fa-times text-xs" />
        </button>
      )}
      {open && filtered.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-56 overflow-y-auto">
          {filtered.map(country => (
            <button
              key={country}
              onMouseDown={() => select(country)}
              className={`w-full text-left px-5 py-3 text-xs font-bold hover:bg-green-50 hover:text-[var(--forest-deep)] transition-colors ${country === value ? 'bg-green-50 text-[var(--forest-deep)]' : 'text-gray-700'}`}
            >
              {country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SignupScreen: React.FC<Props> = ({ onNavigate, role, subRole }) => {
  const [birthday, setBirthday] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Additional Fields
  const [nationality, setNationality] = useState('');
  const [emirate, setEmirate] = useState('');
  const [city, setCity] = useState('');
  const [isPOD, setIsPOD] = useState(false);
  const [isOrgMember, setIsOrgMember] = useState(false);
  const [orgName, setOrgName] = useState('');

  const { mode, setMode, resetSettings } = useAccessibility();

  const age = calculateAge(birthday);
  const isUnder18 = age !== -1 && age < 18;

  const handleNextStep = () => {
    // If under 18, skip role selection and go straight to Vision & Dreams
    if (isUnder18) {
      onNavigate(ScreenName.GOAL_INPUT, { isUnder18: true, subRole: 'builder' });
    } else {
      onNavigate(ScreenName.GOAL_INPUT, { isUnder18: false, role, subRole });
    }
  };

  const getRoleConfig = () => {
    if (isUnder18) return { label: 'Builder', icon: 'fa-hammer' };
    if (!subRole) return { label: 'New Member', icon: 'fa-user-plus' };
    const config: Record<string, { label: string; icon: string }> = {
      mentor: { label: 'Green Mentor', icon: 'fa-chalkboard-teacher' },
      builder: { label: 'Builder', icon: 'fa-hammer' },
      guardian: { label: 'Government', icon: 'fa-landmark' },
      pioneer: { label: 'Company', icon: 'fa-industry' },
      advocate: { label: 'NGO', icon: 'fa-hand-holding-heart' },
      visionary: { label: 'Academia', icon: 'fa-university' },
    };
    return config[subRole] || { label: 'Individual', icon: 'fa-user' };
  };

  const roleConfig = getRoleConfig();

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="pt-16 px-8 text-center shrink-0">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold font-jakarta text-[var(--text-primary)]">
          Join Estidamaty
        </motion.h1>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-tertiary)] rounded-full mt-3 border border-gray-100 shadow-sm">
          <i className={`fas ${roleConfig.icon} text-[var(--forest-deep)] text-[10px]`}></i>
          <span className="text-[10px] font-black text-[var(--forest-deep)] uppercase tracking-wider">{roleConfig.label}</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex-1 flex flex-col px-8 py-6 pb-16 gap-6 overflow-y-auto no-scrollbar">

        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-gray-50 pb-2 mb-2">Personal Information</h3>
          {/* Full Name */}
          <div className="bg-[var(--bg-tertiary)] rounded-2xl px-4 py-2 border-2 border-transparent focus-within:border-[var(--forest-light)] focus-within:bg-white transition-all">
            <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Full Name</label>
            <input type="text" placeholder="John Doe" className="bg-transparent w-full outline-none text-xs text-[var(--text-primary)] font-bold" />
          </div>

          {/* Email */}
          <div className="bg-[var(--bg-tertiary)] rounded-2xl px-4 py-2 border-2 border-transparent focus-within:border-[var(--forest-light)] focus-within:bg-white transition-all">
            <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Email</label>
            <input type="email" placeholder="email@example.com" className="bg-transparent w-full outline-none text-xs text-[var(--text-primary)] font-bold" />
          </div>

          {/* Gender + Birthday row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[var(--bg-tertiary)] rounded-2xl px-4 py-2 border-2 border-transparent focus-within:border-[var(--forest-light)] focus-within:bg-white transition-all">
              <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Gender</label>
              <select className="bg-transparent w-full outline-none text-xs text-[var(--text-primary)] font-bold appearance-none">
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="bg-[var(--bg-tertiary)] rounded-2xl px-4 py-2 border-2 border-transparent focus-within:border-[var(--forest-light)] focus-within:bg-white transition-all">
              <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Birthday</label>
              <input
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
                className="bg-transparent w-full outline-none text-xs text-[var(--text-primary)] font-bold [color-scheme:light]"
              />
            </div>
          </div>

          {/* Guardian Email — animated, only for under-18 */}
          <AnimatePresence>
            {isUnder18 && (
              <motion.div
                key="guardian-email"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-amber-50 rounded-2xl px-4 py-2 border-2 border-amber-200 focus-within:border-amber-400 focus-within:bg-white transition-all">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <i className="fas fa-shield-alt text-amber-500 text-[8px]" />
                    <label className="text-[8px] font-black text-amber-600 uppercase tracking-widest">Guardian Email</label>
                  </div>
                  <input
                    type="email"
                    placeholder="parent@example.com"
                    value={guardianEmail}
                    onChange={e => setGuardianEmail(e.target.value)}
                    className="bg-transparent w-full outline-none text-xs text-[var(--text-primary)] font-bold"
                  />
                </div>
                <p className="text-[9px] text-amber-600 font-medium mt-1 px-1 flex items-center gap-1">
                  <i className="fas fa-info-circle" />
                  Users under 18 are registered as Builders. A guardian's email is required.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-gray-50 pb-2 pt-2 mb-2">Security</h3>

          {/* Password */}
          <div className="bg-[var(--bg-tertiary)] rounded-2xl px-4 py-2 border-2 border-transparent focus-within:border-[var(--forest-light)] focus-within:bg-white transition-all">
            <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Password</label>
            <div className="flex items-center gap-2">
              <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="bg-transparent flex-1 outline-none text-xs text-[var(--text-primary)] font-bold" />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="text-[var(--text-muted)] hover:text-[var(--forest-light)] transition-colors shrink-0">
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-[10px]`} />
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="bg-[var(--bg-tertiary)] rounded-2xl px-4 py-2 border-2 border-transparent focus-within:border-[var(--forest-light)] focus-within:bg-white transition-all">
            <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Confirm Password</label>
            <div className="flex items-center gap-2">
              <input type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" className="bg-transparent flex-1 outline-none text-xs text-[var(--text-primary)] font-bold" />
              <button type="button" onClick={() => setShowConfirmPassword(v => !v)} className="text-[var(--text-muted)] hover:text-[var(--forest-light)] transition-colors shrink-0">
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-[10px]`} />
              </button>
            </div>
          </div>

          <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-gray-50 pb-2 pt-2 mb-2">Localization</h3>

          {/* Nationality */}
          <div>
            <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1.5 ml-1">Nationality</label>
            <CountrySearchInput value={nationality} onChange={setNationality} />
          </div>

          {/* Emirate + City */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[var(--bg-tertiary)] rounded-2xl px-4 py-2 border-2 border-transparent focus-within:border-[var(--forest-light)] focus-within:bg-white transition-all">
              <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Emirate</label>
              <select
                value={emirate}
                onChange={e => setEmirate(e.target.value)}
                className="bg-transparent w-full outline-none text-xs text-[var(--text-primary)] font-bold appearance-none"
              >
                <option value="">Select</option>
                {EMIRATES.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
            <div className="bg-[var(--bg-tertiary)] rounded-2xl px-4 py-2 border-2 border-transparent focus-within:border-[var(--forest-light)] focus-within:bg-white transition-all">
              <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">City / Area</label>
              <input
                type="text"
                placeholder="e.g. Downtown"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="bg-transparent w-full outline-none text-xs text-[var(--text-primary)] font-bold"
              />
            </div>
          </div>

          <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-gray-50 pb-2 pt-2 mb-2">Inclusivity</h3>

          {/* POD Toggle */}
          <div
            onClick={() => {
              if (isPOD) resetSettings();
              setIsPOD(!isPOD);
            }}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${isPOD ? 'border-[var(--forest-light)] bg-green-50/30 shadow-sm' : 'border-transparent bg-[var(--bg-tertiary)]'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${isPOD ? 'bg-[var(--forest-light)] text-white' : 'bg-gray-100 text-gray-400'}`}>
              <i className="fas fa-wheelchair"></i>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-xs text-[var(--text-primary)]">People of Determination</h4>
              <p className="text-[9px] text-[var(--text-secondary)] font-medium">Access-friendly routes</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPOD ? 'bg-[var(--forest-light)] border-[var(--forest-light)] text-white' : 'border-gray-200'}`}>
              {isPOD && <i className="fas fa-check text-[8px]"></i>}
            </div>
          </div>

          {/* POD Selections Expansion */}
          <AnimatePresence>
            {isPOD && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden space-y-3"
              >
                <div className="grid grid-cols-2 gap-2 mt-2 px-1">
                  {[
                    { id: 'visual', label: 'Visual', icon: 'fa-eye', activeColor: 'bg-blue-600 text-white', inactiveColor: 'bg-blue-50 text-blue-600' },
                    { id: 'motor', label: 'Motor', icon: 'fa-hand-paper', activeColor: 'bg-orange-600 text-white', inactiveColor: 'bg-orange-50 text-orange-600' },
                    { id: 'cognitive', label: 'Cognitive', icon: 'fa-brain', activeColor: 'bg-purple-600 text-white', inactiveColor: 'bg-purple-50 text-purple-600' },
                    { id: 'hearing', label: 'Hearing', icon: 'fa-deaf', activeColor: 'bg-amber-600 text-white', inactiveColor: 'bg-amber-50 text-amber-600' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setMode(mode === item.id ? 'standard' : item.id as any)}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all ${mode === item.id ? 'border-[var(--forest-light)] bg-white shadow-sm' : 'border-transparent bg-[var(--bg-tertiary)]'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${mode === item.id ? item.activeColor : item.inactiveColor}`}>
                        <i className={`fas ${item.icon}`}></i>
                      </div>
                      <span className={`text-[10px] font-bold ${mode === item.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>{item.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate(ScreenName.ACCESSIBILITY_SETTINGS)}
                  className="w-full py-1 text-[9px] font-black text-[var(--forest-light)] uppercase tracking-widest hover:text-[var(--forest-deep)] transition-all flex items-center justify-center gap-2"
                >
                  <i className="fas fa-cog" />
                  Advanced Accessibility Settings
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Org Member Toggle */}
          <div className="space-y-3">
            <div
              onClick={() => setIsOrgMember(!isOrgMember)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${isOrgMember ? 'border-[var(--forest-light)] bg-green-50/30 shadow-sm' : 'border-transparent bg-[var(--bg-tertiary)]'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${isOrgMember ? 'bg-[var(--teal)] text-white' : 'bg-gray-100 text-gray-400'}`}>
                <i className="fas fa-building"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-[var(--text-primary)]">Organization Member</h4>
                <p className="text-[9px] text-[var(--text-secondary)] font-medium">Represent your company</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isOrgMember ? 'bg-[var(--forest-light)] border-[var(--forest-light)] text-white' : 'border-gray-200'}`}>
                {isOrgMember && <i className="fas fa-check text-[8px]"></i>}
              </div>
            </div>

            <AnimatePresence>
              {isOrgMember && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-1"
                >
                  <div className="bg-white rounded-2xl px-4 py-2 border-2 border-[var(--forest-light)] transition-all">
                    <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Entity Name</label>
                    <input
                      type="text"
                      placeholder="Search entity..."
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="bg-transparent w-full outline-none text-xs text-[var(--text-primary)] font-bold"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <button onClick={handleNextStep} className="w-full py-4 bg-gradient-to-r from-[var(--forest-light)] to-[var(--forest-deep)] text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-500/10 active:scale-[0.98] transition-all">
            Continue
          </button>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-[9px]"><span className="px-4 bg-white text-[var(--text-muted)] font-black uppercase tracking-[0.2em]">Or join with</span></div>
          </div>

          <div className="flex flex-col gap-2">
            <UAEPasSButton onClick={handleNextStep} />
            <div className="grid grid-cols-2 gap-2">
              <button onClick={handleNextStep} className="py-3 bg-white border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-3 text-xs shadow-sm active:scale-[0.95] transition-all">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" /> Google
              </button>
              <button onClick={handleNextStep} className="py-3 bg-white border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-2 text-xs shadow-sm active:scale-[0.95] transition-all">
                <i className="fab fa-apple text-base"></i> Apple
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-auto py-4">
          <p className="text-xs text-[var(--text-secondary)] font-medium">
            Member already? <button onClick={() => onNavigate(ScreenName.LOGIN)} className="font-extrabold text-[var(--forest-light)] uppercase ml-1">Login</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupScreen;
