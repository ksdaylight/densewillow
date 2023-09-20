// eslint-disable-next-line @typescript-eslint/unbound-method
const { join } = require('path');

const { fontFamily } = require('tailwindcss/defaultTheme');
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');

module.exports = {
    darkMode: 'class',
    content: [
        join(__dirname, '{app,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {
            colors: {
                'primary-dark': '#1f1f1f',
                dark_bg: '#151516',
                primary: '#658DF2',
                gray: '#B6B7BA',
                secondary_gray: '#808185',
                highlight: {
                    dark: '#FFFFFF',
                    light: '#1f1f1f',
                },
                secondary: {
                    dark: '#1E1E20',
                    light: '#e6e6e6',
                },
                action: '#3B82F6',
            },
            fontFamily: {
                playfairDisplay: ['var(--font-playfair-display)', ...fontFamily.serif],
                ubuntu: ['var(--font-ubuntu)', ...fontFamily.sans],
            },
        },
        backgroundImage: {
            'png-pattern': "url('/empty-bg.jpg')",
        },
    },
    // eslint-disable-next-line global-require
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/container-queries')],
};
