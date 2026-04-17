import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface StreakState {
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string | null;
    freezeCount: number;
    streakHistory: boolean[]; // Last 7 days
}

export interface StreakContextType extends StreakState {
    incrementStreak: () => void;
    useFreeze: () => boolean;
    checkStreak: () => void; // Call on app load
}

const defaultState: StreakState = {
    currentStreak: 12, // Starting high for demo
    longestStreak: 15,
    lastActivityDate: new Date().toDateString(),
    freezeCount: 1,
    streakHistory: [true, true, true, true, true, true, false],
};

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export const StreakProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<StreakState>(() => {
        try {
            const saved = localStorage.getItem('sustain_streak');
            return saved ? JSON.parse(saved) : defaultState;
        } catch {
            return defaultState;
        }
    });

    useEffect(() => {
        localStorage.setItem('sustain_streak', JSON.stringify(state));
    }, [state]);

    const checkStreak = () => {
        const today = new Date().toDateString();
        if (state.lastActivityDate === today) return;

        const last = new Date(state.lastActivityDate || '');
        const diff = Math.floor((new Date().getTime() - last.getTime()) / (1000 * 3600 * 24));

        if (diff > 1) {
            // Missed a day
            if (state.freezeCount > 0) {
                // Auto-use freeze or prompt? For MVP simplified, prompt logic elsewhere, here we break unless handled
                // Let's break streak for now unless logic freezes it externally
                setState(prev => ({ ...prev, currentStreak: 0 }));
            } else {
                setState(prev => ({ ...prev, currentStreak: 0 }));
            }
        }
    };

    const incrementStreak = () => {
        const today = new Date().toDateString();
        if (state.lastActivityDate === today) return; // Already done today

        setState(prev => ({
            ...prev,
            currentStreak: prev.currentStreak + 1,
            longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
            lastActivityDate: today,
            streakHistory: [...prev.streakHistory.slice(1), true]
        }));
    };

    const useFreeze = (): boolean => {
        if (state.freezeCount > 0) {
            setState(prev => ({ ...prev, freezeCount: prev.freezeCount - 1 }));
            return true; // Successfully froze
        }
        return false;
    };

    return (
        <StreakContext.Provider value={{ ...state, incrementStreak, useFreeze, checkStreak }}>
            {children}
        </StreakContext.Provider>
    );
};

export const useStreak = () => {
    const context = useContext(StreakContext);
    if (context === undefined) {
        throw new Error('useStreak must be used within a StreakProvider');
    }
    return context;
};
