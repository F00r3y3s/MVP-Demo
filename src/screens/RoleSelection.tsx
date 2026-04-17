
import React, { useState } from 'react';
import { ScreenName, RoleType, SubRoleType } from '../types';
import joinMovementBackground from '../../whisk-backgrounds/1.jpeg';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
}

const RoleSelectionScreen: React.FC<Props> = ({ onNavigate, onBack }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [selectedSubRole, setSelectedSubRole] = useState<SubRoleType | null>(null);

  const handleMainRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
    // If Individual, automatically assign 'mentor' and skip to Vision & Dreams
    if (role === 'individual') {
      onNavigate(ScreenName.GOAL_INPUT, { role: 'individual', subRole: 'mentor' });
    } else {
      // For Organization, move to Step 2 to pick specific org type
      setStep(2);
    }
  };

  const handleSubRoleSelect = (subRole: SubRoleType) => {
    setSelectedSubRole(subRole);
    // After picking org type, move to Vision & Dreams
    onNavigate(ScreenName.GOAL_INPUT, { role: 'organization', subRole });
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedSubRole(null);
      setSelectedRole(null);
    } else {
      onBack();
    }
  };

  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)] px-6 pt-6 pb-12 relative overflow-hidden">
      {step === 1 && (
        <>
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${joinMovementBackground})`,
              backgroundPosition: 'center center',
              backgroundSize: '100% 100%',
            }}
          />
        </>
      )}

      <div className="relative z-10 flex h-full flex-col">
        {/* Header - Compact */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleBack} className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--border-light)] transition-colors">
            <i className="fas fa-arrow-left text-xs"></i>
          </button>
          <div className="flex gap-1">
            <div className={`h-1 rounded-full transition-all ${step === 1 ? 'w-8 bg-[var(--forest-light)]' : 'w-4 bg-gray-200'}`}></div>
            <div className={`h-1 rounded-full transition-all ${step === 2 ? 'w-8 bg-[var(--forest-light)]' : 'w-4 bg-gray-200'}`}></div>
          </div>
          <div className="w-8"></div>
        </div>

        <div className="flex-1 flex flex-col justify-center pb-24">
          <div className="mb-6 text-center animate-[slideUp_0.3s_ease-out]">
            <h1 className="text-xl font-bold text-[var(--text-primary)] font-jakarta mb-1">
              {step === 1 ? 'Join the Movement' : 'Choose Your Path'}
            </h1>
            <p className="text-[var(--text-secondary)] text-[11px] font-medium leading-tight px-4">
              {step === 1 ? 'Select your primary profile style' : 'Help us customize your goal tracking'}
            </p>
          </div>

          <div className="space-y-3 max-h-[56vh] overflow-y-auto no-scrollbar">
            {step === 1 ? (
              <>
                <RoleCard
                  label="Individual"
                  icon="fa-user"
                  desc="Personal impact tracking"
                  selected={selectedRole === 'individual'}
                  onClick={() => handleMainRoleSelect('individual')}
                  gradient="from-[var(--forest-light)] to-[var(--forest-medium)]"
                />
                <RoleCard
                  label="Organization"
                  icon="fa-building"
                  desc="Corporate sustainability leadership"
                  selected={selectedRole === 'organization'}
                  onClick={() => handleMainRoleSelect('organization')}
                  gradient="from-[var(--teal)] to-[var(--forest-deep)]"
                />
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <SubRoleCard id="guardian" icon="fa-landmark" label="Government" subLabel="Guardian" color="from-[#3B82F6] to-[#1D4ED8]" selected={selectedSubRole === 'guardian'} onSelect={() => handleSubRoleSelect('guardian')} />
                <SubRoleCard id="pioneer" icon="fa-industry" label="Companies" subLabel="Business & industry" color="from-[#C17F59] to-[#A66B47]" selected={selectedSubRole === 'pioneer'} onSelect={() => handleSubRoleSelect('pioneer')} />
                <SubRoleCard id="advocate" icon="fa-hand-holding-heart" label="NGOs" subLabel="Action & Advocacy" color="from-[#EC4899] to-[#BE185D]" selected={selectedSubRole === 'advocate'} onSelect={() => handleSubRoleSelect('advocate')} />
                <SubRoleCard id="visionary" icon="fa-university" label="Academia" subLabel="Research & Education" color="from-[#2C5F68] to-[var(--forest-deep)]" selected={selectedSubRole === 'visionary'} onSelect={() => handleSubRoleSelect('visionary')} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 p-6 pt-10 pointer-events-none ${step === 1 ? '' : 'bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)] to-transparent'}`}>
        {/* Button removed as selection now triggers navigation directly for faster flow */}
      </div>
    </div>
  );
};

const RoleCard = ({ label, icon, desc, selected, onClick, gradient }: any) => (
  <div
    onClick={onClick}
    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 backdrop-blur-sm ${selected ? 'border-[var(--forest-light)] bg-green-50/68 shadow-md' : 'border-white/50 bg-white/82 shadow-sm'}`}
  >
    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl shadow-sm`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-sm text-[var(--text-primary)]">{label}</h3>
      <p className="text-[10px] text-[var(--text-secondary)]">{desc}</p>
    </div>
    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${selected ? 'bg-[var(--forest-light)] border-[var(--forest-light)] text-white' : 'border-gray-200'}`}>
      {selected && <i className="fas fa-check text-[8px]"></i>}
    </div>
  </div>
);

const SubRoleCard = ({ icon, label, subLabel, color, selected, onSelect }: any) => (
  <div
    onClick={onSelect}
    className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${selected ? 'border-[var(--forest-light)] bg-green-50/30 shadow-md ring-2 ring-green-100' : 'border-transparent bg-white shadow-sm hover:border-gray-50'}`}
  >
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-2xl mb-2 shadow-sm`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <span className="font-bold text-[var(--text-primary)] text-xs">{label}</span>
    <span className="text-[9px] text-[var(--text-muted)] mt-0.5 text-center font-bold uppercase tracking-tight opacity-70">{subLabel}</span>
  </div>
);

export default RoleSelectionScreen;
