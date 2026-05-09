import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export type OrganizationRole = 'employee' | 'manager' | 'admin';

export interface Organization {
    id: string;
    name: string;
    shortName?: string;
    logo: string;     // Emoji fallback
    logoUrl?: string; // Real image URL (optional)
    color: string;
}

export interface Team {
    id: string;
    name: string; // e.g., Engineering
    score: number;
    rank: number;
    membersCount: number;
}

export interface OrganizationState {
    isLinked: boolean;
    organization: Organization | null;
    role: OrganizationRole;
    department: string; // e.g., 'Engineering'
    team: Team | null;
}

export interface OrganizationContextType extends OrganizationState {
    linkOrganization: (code: string) => Promise<boolean>;
    unlinkOrganization: () => void;
    setRole: (role: OrganizationRole) => void; // For testing/demo
}

const defaultState: OrganizationState = {
    isLinked: true,
    organization: {
        id: 'org_moccae',
        name: 'Ministry of Climate Change & Environment',
        shortName: 'MOCCAE',
        logo: '🇦🇪',
        color: 'from-[#006233] to-[#00843D]'
    },
    role: 'admin',
    department: 'Environment & Climate',
    team: { id: 'team_env', name: 'Environment & Climate', score: 24800, rank: 1, membersCount: 48 },
};

// Mock Data
export const MOCK_ORGANIZATIONS: Record<string, Organization> = {
    'GTD001': { id: 'org_1', name: 'Green Tech Dubai', logo: '🏢', color: 'from-blue-500 to-indigo-600' },
    'ESU002': { id: 'org_2', name: 'EcoSolutions UAE', logo: '🌿', color: 'from-emerald-500 to-teal-600' },
    'ADN003': { id: 'org_3', name: 'ADNOC Distribution', logo: '⛽', color: 'from-blue-600 to-cyan-700' },
    'MCC001': {
        id: 'org_moccae',
        name: 'Ministry of Climate Change & Environment',
        shortName: 'MOCCAE',
        logo: '🇦🇪',
        color: 'from-[#006233] to-[#00843D]'
    },
};

export const MOCK_TEAMS: Record<string, Team> = {
    'Engineering': { id: 'team_eng', name: 'Engineering', score: 15200, rank: 1, membersCount: 12 },
    'Marketing': { id: 'team_mkt', name: 'Marketing', score: 12800, rank: 2, membersCount: 8 },
    'HR': { id: 'team_hr', name: 'Human Resources', score: 9200, rank: 4, membersCount: 5 },
};

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<OrganizationState>(() => {
        try {
            const saved = localStorage.getItem('estidamaty_org_state_v2');
            return saved ? JSON.parse(saved) : defaultState;
        } catch {
            return defaultState;
        }
    });

    useEffect(() => {
        localStorage.setItem('estidamaty_org_state_v2', JSON.stringify(state));
    }, [state]);

    const linkOrganization = async (code: string): Promise<boolean> => {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const org = MOCK_ORGANIZATIONS[code];
        if (org) {
            // Auto-assign random department for demo
            const depts = Object.keys(MOCK_TEAMS);
            const randomDept = depts[Math.floor(Math.random() * depts.length)];

            setState({
                isLinked: true,
                organization: org,
                role: 'employee',
                department: randomDept,
                team: MOCK_TEAMS[randomDept]
            });
            return true;
        }
        return false;
    };

    const unlinkOrganization = () => {
        setState(defaultState);
    };

    const setRole = (role: OrganizationRole) => {
        setState(prev => ({ ...prev, role }));
    };

    return (
        <OrganizationContext.Provider value={{ ...state, linkOrganization, unlinkOrganization, setRole }}>
            {children}
        </OrganizationContext.Provider>
    );
};

export const useOrganization = () => {
    const context = useContext(OrganizationContext);
    if (context === undefined) {
        throw new Error('useOrganization must be used within an OrganizationProvider');
    }
    return context;
};
