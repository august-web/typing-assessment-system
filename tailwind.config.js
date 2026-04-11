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
          bg: '#f5f7fb',
          surface: '#ffffff',
          accent: '#0f766e',
          'accent-bright': '#14b8a6',
          secondary: '#7c3aed',
          'secondary-bright': '#a78bfa',
          error: '#dc2626',
          'error-light': '#fee2e2',
          warning: '#f59e0b',
          success: '#10b981',
          'success-light': '#d1fae5',
          text: '#0f172a',
          muted: '#64748b',
          light: '#cbd5e1',
          border: '#e2e8f0'
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6d28d9',
          900: '#5b21b6',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.1)',
        'lg-glow': '0 20px 60px rgba(20, 184, 166, 0.15)',
        'sm-glow': '0 5px 15px rgba(20, 184, 166, 0.08)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        card: '16px',
        input: '12px',
        button: '12px',
        lg: '20px'
      },
      animation: {
        'fade-in': 'fadeIn 500ms ease-out',
        'slide-in': 'slideIn 400ms ease-out',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(20, 184, 166, 0.6)' }
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0f766e 0%, #7c3aed 100%)',
        'gradient-accent': 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)',
        'gradient-purple': 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)',
      }
    }
  },
  plugins: []
}
