import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility, AccessibilityMode } from '../context/AccessibilityContext';

interface Props {
    onBack: () => void;
}

const AccessibilityToggle: React.FC<{
    label: string;
    description: string;
    value: boolean;
    onChange: (value: boolean) => void;
    icon: string;
}> = ({ label, description, value, onChange, icon }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-3">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${value ? 'bg-[var(--forest-light)] text-white' : 'bg-gray-100 text-gray-400'}`}>
                <i className={icon}></i>
            </div>
            <div>
                <h3 className="font-bold text-[var(--text-primary)] text-sm">{label}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{description}</p>
            </div>
        </div>
        <div
            onClick={() => onChange(!value)}
            className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${value ? 'bg-[var(--forest-light)]' : 'bg-gray-200'}`}
        >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-sm ${value ? 'left-6' : 'left-1'}`}></div>
        </div>
    </div>
);

const PODSettingsScreen: React.FC<Props> = ({ onBack }) => {
    const {
        mode, setMode,
        highContrast, updateSettings,
        reducedMotion, textScale,
        simplifiedView, screenReaderOptimized,
        largeTouchTargets, captionsEnabled
    } = useAccessibility();

    const [activeTab, setActiveTab] = useState<'visual' | 'motor' | 'cognitive' | 'hearing'>('visual');

    const modes: { id: AccessibilityMode, icon: string, label: string }[] = [
        { id: 'visual', icon: 'fas fa-eye', label: 'Visual' },
        { id: 'motor', icon: 'fas fa-hand-pointer', label: 'Motor' },
        { id: 'cognitive', icon: 'fas fa-brain', label: 'Cognitive' },
        { id: 'hearing', icon: 'fas fa-ear-listen', label: 'Hearing' },
    ];

    return (
        <div className="h-full flex flex-col bg-[var(--bg-primary)]">
            {/* Header */}
            <div className="px-6 py-6 flex items-center gap-4 bg-white shadow-sm z-10">
                <button onClick={onBack} aria-label="Go back" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[var(--text-primary)] hover:bg-gray-100">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">Accessibility Settings</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">

                {/* Helper Card */}
                <div className="bg-gradient-to-br from-[var(--forest-light)] to-[var(--forest-deep)] p-6 rounded-2xl text-white mb-8 shadow-lg">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                            <i className="fas fa-universal-access"></i>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg mb-1">Tailor Your Experience</h2>
                            <p className="text-sm opacity-90 leading-relaxed">Select a preset based on your needs, or customize individual settings below.</p>
                        </div>
                    </div>
                </div>

                {/* Quick Presets */}
                <h3 className="font-bold text-[var(--text-primary)] mb-4 px-1" role="heading" aria-level={3}>Quick Presets</h3>
                <div className="grid grid-cols-2 gap-3 mb-8" role="group" aria-label="Accessibility Presets">
                    {modes.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setMode(m.id)}
                            aria-pressed={mode === m.id}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${mode === m.id ? 'border-[var(--forest-light)] bg-[rgba(16,185,129,0.05)]' : 'border-gray-100 bg-white'}`}
                        >
                            <i className={`${m.icon} text-2xl ${mode === m.id ? 'text-[var(--forest-light)]' : 'text-gray-400'}`}></i>
                            <span className={`font-bold text-sm ${mode === m.id ? 'text-[var(--text-primary)]' : 'text-gray-500'}`}>{m.label}</span>
                        </button>
                    ))}
                </div>

                {/* Detailed Settings Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6" role="tablist">
                    {modes.map((m) => (
                        <button
                            key={m.id}
                            role="tab"
                            aria-selected={activeTab === m.id}
                            onClick={() => setActiveTab(m.id as any)}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === m.id ? 'bg-white shadow-sm text-[var(--forest-light)]' : 'text-gray-500'}`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-1">
                    {activeTab === 'visual' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="tabpanel">
                            <AccessibilityToggle
                                label="High Contrast"
                                description="Increase contrast for better visibility"
                                value={highContrast}
                                onChange={(v) => updateSettings({ highContrast: v })}
                                icon="fas fa-adjust"
                            />
                            <AccessibilityToggle
                                label="Screen Reader Support"
                                description="Optimize layout for screen readers"
                                value={screenReaderOptimized}
                                onChange={(v) => updateSettings({ screenReaderOptimized: v })}
                                icon="fas fa-volume-up"
                            />
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><i className="fas fa-text-height"></i></div>
                                    <h3 className="font-bold text-sm">Text Size</h3>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
                                    {[1, 1.25, 1.5, 2].map((scale) => (
                                        <button
                                            key={scale}
                                            onClick={() => updateSettings({ textScale: scale as any })}
                                            aria-label={`Set text scale to ${scale}x`}
                                            className={`w-10 h-10 rounded-md font-bold flex items-center justify-center transition-all ${textScale === scale ? 'bg-white shadow-sm ring-2 ring-[var(--forest-light)]' : ''}`}
                                            style={{ fontSize: `${14 * scale}px` }}
                                        >
                                            A
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'motor' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="tabpanel">
                            <AccessibilityToggle
                                label="Large Touch Targets"
                                description="Easier to tap buttons and links"
                                value={largeTouchTargets}
                                onChange={(v) => updateSettings({ largeTouchTargets: v })}
                                icon="fas fa-fingerprint"
                            />
                            <AccessibilityToggle
                                label="Reduced Motion"
                                description="Minimize animations and transitions"
                                value={reducedMotion}
                                onChange={(v) => updateSettings({ reducedMotion: v })}
                                icon="fas fa-stop-circle"
                            />
                        </motion.div>
                    )}

                    {activeTab === 'cognitive' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="tabpanel">
                            <AccessibilityToggle
                                label="Simplified View"
                                description="Hide non-essential elements"
                                value={simplifiedView}
                                onChange={(v) => updateSettings({ simplifiedView: v })}
                                icon="fas fa-compress-arrows-alt"
                            />
                            <AccessibilityToggle
                                label="Reduced Motion"
                                description="Minimize animations and distractions"
                                value={reducedMotion}
                                onChange={(v) => updateSettings({ reducedMotion: v })}
                                icon="fas fa-stop-circle"
                            />
                        </motion.div>
                    )}

                    {activeTab === 'hearing' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="tabpanel">
                            <AccessibilityToggle
                                label="Captions"
                                description="Show subtitles for media/audio"
                                value={captionsEnabled}
                                onChange={(v) => updateSettings({ captionsEnabled: v })}
                                icon="fas fa-closed-captioning"
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PODSettingsScreen;
