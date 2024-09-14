import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            fontFamily: {
                default: [
                    '-apple-system',
                    'var(--font-sans)',
                    'system-ui',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                    ...defaultTheme.fontFamily.sans,
                ],
            },
            colors: {
                primary: {
                    DEFAULT: '#1291E0',
                    50: '#F1F9FE',
                    100: '#D7EEFC',
                    200: '#A3D7F8',
                    300: '#6FC1F3',
                    400: '#3BAAEF',
                    500: '#1291E0',
                    600: '#0E72B1',
                    700: '#0A5482',
                    800: '#073552',
                    900: '#031723',
                    950: '#01070C',
                },
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                // Tooltip
                'slide-up-fade': {
                    '0%': { opacity: '0', transform: 'translateY(2px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-right-fade': {
                    '0%': { opacity: '0', transform: 'translateX(-2px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'slide-down-fade': {
                    '0%': { opacity: '0', transform: 'translateY(-2px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-left-fade': {
                    '0%': { opacity: '0', transform: 'translateX(2px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                // Navigation menu
                'enter-from-right': {
                    '0%': { transform: 'translateX(200px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'enter-from-left': {
                    '0%': { transform: 'translateX(-200px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'exit-to-right': {
                    '0%': { transform: 'translateX(0)', opacity: '1' },
                    '100%': { transform: 'translateX(200px)', opacity: '0' },
                },
                'exit-to-left': {
                    '0%': { transform: 'translateX(0)', opacity: '1' },
                    '100%': { transform: 'translateX(-200px)', opacity: '0' },
                },
                'scale-in-content': {
                    '0%': { transform: 'rotateX(-30deg) scale(0.9)', opacity: '0' },
                    '100%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' },
                },
                'scale-out-content': {
                    '0%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' },
                    '100%': { transform: 'rotateX(-10deg) scale(0.95)', opacity: '0' },
                },
                // Custom wiggle animation
                wiggle: {
                    '0%, 100%': {
                        transform: 'translateX(0%)',
                        transformOrigin: '50% 50%',
                    },
                    '15%': { transform: 'translateX(-4px) rotate(-4deg)' },
                    '30%': { transform: 'translateX(6px) rotate(4deg)' },
                    '45%': { transform: 'translateX(-6px) rotate(-2.4deg)' },
                    '60%': { transform: 'translateX(2px) rotate(1.6deg)' },
                    '75%': { transform: 'translateX(-1px) rotate(-0.8deg)' },
                },
                'slide-down-left-fade': {
                    // should fade in from the top right corner
                    '0%': {
                        opacity: '0',
                        transform: 'translate(2px, -2px) rotate(10deg)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate(0, 0) rotate(0deg)',
                    },
                },
                'slide-down-out-fade': {
                    '0%': {
                        opacity: '1',
                        transform: 'translate(0, 0)',
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'translateY(-2px)',
                    },
                },
                'change-object-location': {
                    '0%': {
                        'object-position': 'top',
                    },
                    '50%': {
                        'object-position': 'bottom',
                    },
                    '100%': {
                        'object-position': 'top',
                    },
                },
                'change-object-to-top': {
                    '0%': {},
                    '100%': {
                        'object-position': 'top',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                // Tooltip
                'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-right-fade': 'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                // Navigation menu
                'enter-from-right': 'enter-from-right 0.25s ease',
                'enter-from-left': 'enter-from-left 0.25s ease',
                'exit-to-right': 'exit-to-right 0.25s ease',
                'exit-to-left': 'exit-to-left 0.25s ease',
                'scale-in-content': 'scale-in-content 0.2s ease',
                'scale-out-content': 'scale-out-content 0.2s ease',
                'fade-in': 'fade-in 0.2s ease',
                'fade-out': 'fade-out 0.2s ease',
                // Custom wiggle animation
                wiggle: 'wiggle 0.75s infinite',
                'slide-down-left-fade': 'slide-down-left-fade 0.4s ease',
                'object-location': 'change-object-location 5s ease infinite',
                // hold object to top
                'object-to-top': 'change-object-to-top 0.4s ease',
            },
            screens: {
                xs: '320px',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
