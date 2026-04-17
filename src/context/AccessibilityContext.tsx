import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TextScale = 1 | 1.25 | 1.5 | 2;
export type AccessibilityMode = 'standard' | 'visual' | 'motor' | 'cognitive' | 'hearing';

export interface AccessibilityState {
  mode: AccessibilityMode;
  highContrast: boolean;
  reducedMotion: boolean;
  textScale: TextScale;
  screenReaderOptimized: boolean; // For "visual"
  simplifiedView: boolean; // For "cognitive"
  largeTouchTargets: boolean; // For "motor"
  captionsEnabled: boolean; // For "hearing"
}

interface AccessibilityContextType extends AccessibilityState {
  updateSettings: (settings: Partial<AccessibilityState>) => void;
  resetSettings: () => void;
  setMode: (mode: AccessibilityMode) => void;
}

const defaultState: AccessibilityState = {
  mode: 'standard',
  highContrast: false,
  reducedMotion: false,
  textScale: 1,
  screenReaderOptimized: false,
  simplifiedView: false,
  largeTouchTargets: false,
  captionsEnabled: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to load from localStorage
  const [state, setState] = useState<AccessibilityState>(() => {
    try {
      const saved = localStorage.getItem('sustain_accessibility_settings');
      return saved ? JSON.parse(saved) : defaultState;
    } catch {
      return defaultState;
    }
  });

  // Persist to localStorage and apply global classes
  useEffect(() => {
    localStorage.setItem('sustain_accessibility_settings', JSON.stringify(state));
    
    // Apply classes to document element for global styling
    if (state.highContrast) {
      document.documentElement.classList.add('hc-mode');
    } else {
      document.documentElement.classList.remove('hc-mode');
    }

    if (state.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    
    // Apply text scale CSS variable
    document.documentElement.style.setProperty('--text-scale', state.textScale.toString());
    
    // Useful for debugging
    // console.log('Accessibility State Updated:', state);

  }, [state]);

  const updateSettings = (settings: Partial<AccessibilityState>) => {
    setState(prev => ({ ...prev, ...settings }));
  };

  const setMode = (mode: AccessibilityMode) => {
    // When setting a mode, we can auto-configure some defaults
    // This allows one-tap configuration for specific needs
    let newSettings: Partial<AccessibilityState> = { mode };
    
    switch (mode) {
      case 'visual':
        // Visual impairment defaults
        newSettings = { 
          ...newSettings, 
          screenReaderOptimized: true, 
          textScale: 1.25,
          highContrast: false // Let user opt-in to high contrast separately
        };
        break;
      case 'motor':
        // Motor impairment defaults
        newSettings = { 
          ...newSettings, 
          largeTouchTargets: true, 
          reducedMotion: true 
        };
        break;
      case 'cognitive':
        // Cognitive impairment defaults
        newSettings = { 
          ...newSettings, 
          simplifiedView: true, 
          reducedMotion: true 
        };
        break;
      case 'hearing':
        // Hearing impairment defaults
        newSettings = { 
          ...newSettings, 
          captionsEnabled: true 
        };
        break;
      case 'standard':
        newSettings = defaultState;
        break;
    }
    
    updateSettings(newSettings);
  };

  const resetSettings = () => setState(defaultState);

  return (
    <AccessibilityContext.Provider value={{ ...state, updateSettings, resetSettings, setMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
