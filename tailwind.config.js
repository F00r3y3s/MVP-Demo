/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                forest: {
                    deep: '#064E3B',
                    medium: '#065F46',
                    light: '#10B981',
                },
                emerald: {
                    DEFAULT: '#34D399',
                    400: '#34D399',
                    500: '#10B981',
                    600: '#059669',
                },
                amber: {
                    DEFAULT: '#F59E0B',
                    light: '#FCD34D',
                },
                terracotta: {
                    DEFAULT: '#C17F59',
                    dark: '#A66B47',
                },
                teal: {
                    DEFAULT: '#2C5F68',
                    light: '#4A8A94',
                    400: '#2DD4BF',
                    600: '#0D9488',
                },
                sdg: {
                    1: '#E5243B', 2: '#DDA63A', 3: '#4C9F38', 4: '#C5192D',
                    5: '#FF3A21', 6: '#26BDE2', 7: '#FCC30B', 8: '#A21942',
                    9: '#FD6925', 10: '#DD1367', 11: '#FD9D24', 12: '#BF8B2E',
                    13: '#3F7E44', 14: '#0A97D9', 15: '#56C02B', 16: '#00689D', 17: '#19486A',
                },
                bg: {
                    primary: '#F9FAFB',
                    secondary: '#FFFFFF',
                    tertiary: '#F3F4F6',
                },
                text: {
                    primary: '#111827',
                    secondary: '#4B5563',
                    muted: '#9CA3AF',
                },
                border: {
                    light: '#E5E7EB',
                },
                success: '#10B981',
                error: '#EF4444',
                info: '#3B82F6',
            },
            fontFamily: {
                jakarta: ['Plus Jakarta Sans', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                lora: ['Lora', 'serif'],
            },
            animation: {
                'float': 'float 4s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
