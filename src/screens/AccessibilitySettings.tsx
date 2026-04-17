import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

interface Props {
    onBack: () => void;
}

const AccessibilitySettings: React.FC<Props> = ({ onBack }) => {
    const {
        highContrast,
        textScale,
        simplifiedView,
        screenReaderOptimized,
        updateSettings
    } = useAccessibility();

    // Helper handlers
    const toggleHighContrast = (checked: boolean) => updateSettings({ highContrast: checked });
    const toggleLargeText = (checked: boolean) => updateSettings({ textScale: checked ? 1.25 : 1 });
    const toggleSimplified = (checked: boolean) => updateSettings({ simplifiedView: checked });
    const toggleScreenReader = (checked: boolean) => updateSettings({ screenReaderOptimized: checked });

    // Interpret textScale > 1 as "Large Text" enabled for this simple toggle
    const isLargeTextEnabled = textScale > 1;

    return (
        <div className="bg-[var(--bg-primary)] h-full flex flex-col font-jakarta">
            {/* Header */}
            <div className="bg-white p-6 border-b border-[var(--border-light)] flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                <button onClick={onBack} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">Accessibility Settings</h1>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

                {/* Visual Help Section */}
                <section>
                    <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4 px-1">Visual Assistance</h2>
                    <div className="bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden">

                        {/* High Contrast */}
                        <div className="p-5 border-b border-[var(--border-light)] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <i className="fas fa-adjust"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-primary)]">High Contrast</h3>
                                    <p className="text-xs text-[var(--text-secondary)]">Increase color contrast for better visibility</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={highContrast} onChange={(e) => toggleHighContrast(e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        {/* Large Text */}
                        <div className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <i className="fas fa-font"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-primary)]">Large Text</h3>
                                    <p className="text-xs text-[var(--text-secondary)]">Increase text size across the app</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={isLargeTextEnabled} onChange={(e) => toggleLargeText(e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>

                    </div>
                </section>

                {/* Cognitive & Motor Section */}
                <section>
                    <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4 px-1">Cognitive & Motor</h2>
                    <div className="bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden">

                        {/* Simplified View */}
                        <div className="p-5 border-b border-[var(--border-light)] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                    <i className="fas fa-leaf"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-primary)]">Simplified View</h3>
                                    <p className="text-xs text-[var(--text-secondary)]">Reduce clutter and animations</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={simplifiedView} onChange={(e) => toggleSimplified(e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                        </div>

                        {/* Screen Reader Optimized */}
                        <div className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                                    <i className="fas fa-volume-up"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-primary)]">Screen Reader</h3>
                                    <p className="text-xs text-[var(--text-secondary)]">Optimize layout for screen readers</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={screenReaderOptimized} onChange={(e) => toggleScreenReader(e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                            </label>
                        </div>

                    </div>
                </section>

                {/* Info Box */}
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
                    <i className="fas fa-info-circle text-blue-500 mt-1"></i>
                    <div>
                        <h4 className="text-sm font-bold text-blue-800">Need more assistance?</h4>
                        <p className="text-xs text-blue-600 mt-1">Contact our support team for personalized accessibility options.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccessibilitySettings;
