export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#F3F5F7',
          surface: '#FFFFFF',
          accent: '#16324A',
          secondary: '#2E7D5E',
          error: '#C0392B',
          warning: '#D4A017',
          text: '#0F1724',
          muted: '#6B7280'
        },
        brand: {
          50: '#f5faf9',
          100: '#e6f2ee',
          500: '#1B3A6B',
          600: '#16324A'
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace']
      },
      boxShadow: {
        soft: '0 6px 30px rgba(11,20,32,0.28)'
      },
      borderRadius: {
        card: '8px',
        input: '6px'
      },
      animation: {
        'fade-in': 'fadeIn 350ms ease-in-out',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' }
        }
      }
    }
  },
  plugins: []
}
