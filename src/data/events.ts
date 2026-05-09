export interface GameEvent {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    theme: {
        bg: string; // Gradient class
        text: string;
        icon: string;
    };
    isActive: boolean;
}

export const EVENTS: GameEvent[] = [
    {
        id: 'uae_national_day',
        title: 'UAE National Day',
        description: 'Celebrate the spirit of the union! Complete 5 UAE-themed sustainability tasks to earn the exclusive Falcon Badge.',
        startDate: '2026-11-28',
        endDate: '2026-12-05',
        theme: {
            bg: 'bg-gradient-to-r from-red-600 via-green-600 to-black', // Approximation of flag colors in a gradient
            text: 'text-white',
            icon: 'fa-flag',
        },
        isActive: false, // Future event logic would toggle this
    },
    {
        id: 'proud_of_uae',
        title: 'Proud of UAE 🇦🇪',
        description: '"In the UAE, everyone is Emirati through their love for this land and their contributions to it." — HH Sheikh Mohamed bin Zayed',
        startDate: '2026-05-01',
        endDate: '2026-05-31',
        theme: {
            bg: 'bg-black',
            text: 'text-white',
            icon: 'image:leader',
        },
        isActive: true,
    },
    {
        id: 'earth_week',
        title: 'Earth Week Challenge',
        description: 'Global impact! Join millions in planting trees and cleaning oceans.',
        startDate: '2026-04-15',
        endDate: '2026-04-25',
        theme: {
            bg: 'bg-gradient-to-br from-green-400 to-blue-500',
            text: 'text-white',
            icon: 'fa-globe-americas',
        },
        isActive: false,
    }
];
