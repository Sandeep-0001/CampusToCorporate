/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e27',
        panel: '#1a1f3a',
        panelAlt: '#151932',
        border: '#2d3561',
        accent: '#00d4ff',
        accentAlt: '#ff00ff',
        primary: '#6366f1',
        secondary: '#ec4899',
        success: '#10b981',
        warning: '#f59e0b',
        text: '#e2e8f0',
        textMuted: '#94a3b8',
      },
    },
  },
  plugins: [],
};
