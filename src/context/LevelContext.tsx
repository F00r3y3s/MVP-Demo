import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export interface LevelState {
    level: number;
    xp: number;
    nextLevelXp: number;
    tier: Tier;
    totalWdaEarned: number; // Lifetime Wda for tier calculation
}

export interface LevelContextType extends LevelState {
    addXp: (amount: number) => void;
    // triggerLevelUp is internal usually, but might be needed for demo
}

const defaultState: LevelState = {
    level: 12,
    xp: 450,
    nextLevelXp: 1000,
    tier: 'Gold',
    totalWdaEarned: 2850,
};

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<LevelState>(() => {
        try {
            const saved = localStorage.getItem('sustain_level');
            return saved ? JSON.parse(saved) : defaultState;
        } catch {
            return defaultState;
        }
    });

    useEffect(() => {
        localStorage.setItem('sustain_level', JSON.stringify(state));
    }, [state]);

    const calculateTier = (lifetimeWda: number): Tier => {
        if (lifetimeWda > 50000) return 'Diamond';
        if (lifetimeWda > 15000) return 'Platinum';
        if (lifetimeWda > 5000) return 'Gold';
        if (lifetimeWda > 1000) return 'Silver';
        return 'Bronze';
    };

    const addXp = (amount: number) => {
        setState(prev => {
            let newXp = prev.xp + amount;
            let newLevel = prev.level;
            let newNextXp = prev.nextLevelXp;
            let newTotalWda = prev.totalWdaEarned + amount; // Assuming 1 XP = 1 Wda earned usually

            // Simple level up logic
            if (newXp >= newNextXp) {
                newXp -= newNextXp;
                newLevel += 1;
                newNextXp = Math.floor(newNextXp * 1.2); // 20% harder each level
                // Trigger modal logic here ideally (via effect or callback)
            }

            return {
                level: newLevel,
                xp: newXp,
                nextLevelXp: newNextXp,
                totalWdaEarned: newTotalWda,
                tier: calculateTier(newTotalWda),
            };
        });
    };

    return (
        <LevelContext.Provider value={{ ...state, addXp }}>
            {children}
        </LevelContext.Provider>
    );
};

export const useLevel = () => {
    const context = useContext(LevelContext);
    if (context === undefined) {
        throw new Error('useLevel must be used within a LevelProvider');
    }
    return context;
};
