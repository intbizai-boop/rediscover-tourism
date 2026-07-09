/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Luxury Sunset Travel palette. Background tuned to flyer (#08101B).
        ink: '#08101B',
        'ink-soft': '#0C1626',
        gold: '#D4AF37',
        'sunset-gold': '#E8B15B',
        'deep-amber': '#A95D27',
        cream: '#F7F4EF',
        glass: 'rgba(255,255,255,0.05)',
        hairline: 'rgba(255,255,255,0.08)',
        // Warm natural light theme
        ivory: '#F9F8F6',
        sand: '#E9E4DB',
        forest: '#3A5F40',
        charcoal: '#333333',
        camel: '#D8D1C5',
        'charcoal-dark': '#1E2221',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1280px',
      },
      letterSpacing: {
        label: '0.28em',
      },
      boxShadow: {
        glass: '0 1px 1px rgba(0,0,0,0.2), 0 8px 24px -8px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'sunset-gradient':
          'linear-gradient(135deg, #A95D27 0%, #E8B15B 45%, #D4AF37 100%)',
      },
    },
  },
  plugins: [],
};
