# High Priest Academy — Typing Assessment System

A production-grade, browser-based typing assessment system built with React 18, TypeScript, and Vite.

## Features

✅ **Student Onboarding** — Name entry with validation
✅ **30-Minute Timer** — Countdown with visual warnings
✅ **Real-Time Metrics** — WPM, accuracy, errors, progress
✅ **Live Character Highlighting** — Green for correct, red for incorrect
✅ **Anti-Cheating** — Disabled copy/paste/drag-drop
✅ **Results Dashboard** — Performance ratings with circular progress
✅ **Leaderboard** — Top 10 performers, sortable and persistent
✅ **Dark Mode** — Full theme support with CSS custom properties
✅ **Responsive Design** — Works on mobile and desktop

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript (strict mode)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context + useReducer
- **Icons:** Lucide React
- **Persistence:** localStorage API
- **Fonts:** Google Fonts (Playfair Display, DM Sans, DM Mono)

## Project Structure

```
src/
├── components/           # React components
│   ├── Header/          # App header with dark mode toggle
│   ├── StudentForm/      # Welcome screen with name entry
│   ├── Timer/           # Countdown timer display
│   ├── ReferenceText/   # Letter to type from
│   ├── TypingArea/      # Main textarea with cheating prevention
│   ├── LiveMetrics/     # Real-time WPM, accuracy, progress
│   ├── ResultsDashboard/# Post-exam results display
│   └── Leaderboard/     # Top performers table
├── hooks/               # Custom React hooks
│   ├── useTimer.ts      # Timer logic and formatting
│   ├── useTypingEngine.ts # Typing metrics calculation
│   └── useLeaderboard.ts  # Leaderboard persistence
├── context/             # React context
│   └── AppContext.tsx   # Global app state management
├── types/               # TypeScript interfaces
│   └── index.ts         # Shared type definitions
├── utils/               # Utility functions
│   ├── calculations.ts  # WPM, accuracy, metrics
│   ├── storage.ts       # localStorage helper functions
│   └── textComparison.ts # Character comparison logic
├── styles/              # Global styles
│   └── global.css       # Tailwind + custom CSS
├── App.tsx              # Main app component
├── main.tsx             # React DOM entry point
└── vite.config.ts       # Vite configuration
```

## Installation

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Metrics

### WPM Calculation
```
WPM = (Total Characters Typed ÷ 5) ÷ Time Elapsed (minutes)
```

### Accuracy Calculation
```
Accuracy = (Correct Characters ÷ Total Characters Typed) × 100
```

### Performance Ratings

| Rating | WPM | Accuracy |
|---|---|---|
| Excellent | ≥ 50 | ≥ 95% |
| Good | ≥ 35 | ≥ 85% |
| Fair | ≥ 20 | ≥ 70% |
| Needs Improvement | < 20 | < 70% |

## Assessment Details

**Duration:** 30 minutes (1800 seconds)

**Reference Text:** Formal appreciation letter from High Priest Academy (~350 words)

**Timer Warnings:**
- Amber at 5 minutes remaining
- Red at 1 minute remaining
- Auto-submits at 0:00

**Anti-Cheating Measures:**
- Disabled `Ctrl+C`, `Ctrl+V`, `Ctrl+X`
- Right-click context menu disabled
- Drag-and-drop text input disabled

## Color Palette

```
Primary Background:  #F8F7F4   (warm off-white)
Surface:             #FFFFFF
Primary Accent:      #1B3A6B   (deep navy)
Secondary Accent:    #2E7D5E   (forest green)
Error:               #C0392B   (deep red)
Warning:             #D4A017   (amber)
Text Primary:        #1A1A2E
Text Muted:          #6B7280
```

## Typography

- **Display/Headings:** Playfair Display (serif)
- **Body/UI:** DM Sans (sans-serif)
- **Code/Typing Area:** DM Mono (monospace)

## Development Notes

### TypeScript Strict Mode

All components are fully typed. No `any` types allowed.

### Performance Optimization

- Use React Context sparingly (only for app state)
- Memoize expensive calculations in hooks
- Lazy load components if needed

### Testing

Run the app locally with `npm run dev` to test all features:
1. Enter student name
2. Start typing (timer starts automatically)
3. Complete or wait for auto-submission
4. View results and leaderboard

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 11+)

## License

© High Priest Academy — All rights reserved.
