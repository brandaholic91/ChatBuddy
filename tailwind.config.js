module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#f9fafb',
        foreground: '#ffffff',
        accent: '#6366f1',
        subtleText: '#64748b',
        bodyText: '#0f172a',
        divider: '#e2e8f0',
        cardShadow: 'rgba(0,0,0,0.04)',
        primaryFrom: '#a78bfa',
        primaryTo: '#38bdf8',
        highlight: '#38bdf8',
        badgeBg: '#f1f5f9',
        badgeText: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 40px rgba(0,0,0,0.06)',
        pricing: '0 4px 20px rgba(56,189,248,0.4)',
        faq: '0 4px 16px rgba(0,0,0,0.03)',
      },
      borderRadius: {
        card: '1.25rem',
        badge: '0.5rem',
        button: '9999px',
        faq: '1rem',
      },
      spacing: {
        'section-x': '1.5rem',
        'section-y': '4rem',
        'card': '2rem',
        'faq': '1.25rem',
        'pricing': '1.25rem',
      },
      fontSize: {
        heading: 'clamp(1.5rem,3vw,2.5rem)',
        subheading: '1rem',
        highlight: '1.125rem',
        text: '0.95rem',
        label: '0.75rem',
      },
      letterSpacing: {
        label: '0.04em',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
} 