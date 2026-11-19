/** @type {import('tailwindcss').Config} */
const paletteScale = (prefix) => Object.fromEntries(
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => [
    shade,
    `rgb(var(--ca-${prefix}-${shade}) / <alpha-value>)`,
  ]),
);

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        indigo: paletteScale('indigo'),
        violet: paletteScale('violet'),
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'count-in': {
          '0%': { opacity: '0', transform: 'translateY(6px) scale(.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'brand-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 var(--ca-brand-ring), 0 8px 22px var(--ca-glow-shadow)' },
          '50%': { boxShadow: '0 0 0 7px transparent, 0 8px 22px var(--ca-glow-shadow)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.4s linear infinite',
        'fade-up': 'fade-up .4s ease both',
        'count-in': 'count-in .35s ease both',
        'brand-pulse': 'brand-pulse 3.5s ease-in-out infinite',
      },
      boxShadow: {
        glow: '0 12px 48px var(--ca-glow-shadow)',
        'glow-sm': '0 6px 24px var(--ca-glow-shadow)',
      },
    },
  },
  plugins: [],
};
