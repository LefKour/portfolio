module.exports = {
    theme: {
        extend: {
            fontFamily: {
                'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
            },
            animation: {
                'gradient': 'gradient 8s ease infinite',
                'pulse-gradient': 'pulseGradient 3s ease-in-out infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': {
                        'background-position': '0% 50%',
                    },
                    '50%': {
                        'background-position': '100% 50%',
                    },
                },
                pulseGradient: {
                    '0%, 100%': {
                        'background-position': '0% 50%',
                        'opacity': '0.5',
                        'transform': 'scale(1)',
                    },
                    '50%': {
                        'background-position': '100% 50%',
                        'opacity': '1',
                        'transform': 'scale(1.05)',
                    },
                },
            },
        },
    },
}