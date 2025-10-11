module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                'float': 'float 6s infinite ease-in-out',
                'wave': 'wave 1.5s infinite ease-in-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-20px) scale(1.1)' },
                },
                wave: {
                    '0%, 100%': { transform: 'scaleY(0.5)', opacity: '0.5' },
                    '50%': { transform: 'scaleY(1.5)', opacity: '1' },
                }
            },
            animationDelay: {
                '1000': '1s',
                '2000': '2s',
                '3000': '3s',
                '4000': '4s',
            }
        },
    },
    plugins: [],
}