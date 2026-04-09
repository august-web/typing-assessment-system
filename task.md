
---

# High Priest Academy — Typing Assessment System
**Project Specification Document v1.0**

---

## Project Overview

Build a **production-grade, browser-based Typing Assessment System** for High Priest Academy. The application will be used during live school demonstrations to evaluate student typing proficiency through a formal letter transcription task. The system must assess typing speed (WPM), accuracy, and error rate, and present results in a polished, interactive dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript (strict mode) |
| Build Tool | Vite |
| Styling | CSS Modules or Tailwind CSS |
| State Management | React Context + useReducer |
| Persistence | localStorage API |
| Fonts | Google Fonts (Playfair Display + DM Sans) |
| Icons | Lucide React |

> No external backend. All logic runs client-side.

---

## Functional Requirements

### 1. Student Onboarding
- Input: Student full name (required, validated)
- Gate: Assessment cannot begin without a name entry
- Transition: Smooth animated screen transition into the exam view

### 2. Timer
- Duration: **30 minutes** (1800 seconds), counting down
- Trigger: Starts on first keystroke **or** "Start Test" button click
- Display format: `MM:SS` — prominently visible at all times
- Behavior: Auto-submits and calculates results when timer reaches `00:00`
- Visual cues: Timer turns amber at 5 minutes remaining, red at 1 minute

### 3. Reference Text Display
- Render a full formal appreciation letter (150–250 words — provided below)
- Styled as a physical document card (paper-like, subtle shadow)
- Read-only; scrollable if content overflows
- Characters highlight in real-time as the student types (green = correct, red = incorrect)

### 4. Typing Input Area
- Large, distraction-free textarea
- Matches the style of the reference document
- **Cheating prevention:**
  - Disable `Ctrl+C`, `Ctrl+V`, `Ctrl+X`
  - Disable right-click context menu
  - Disable drag-and-drop text input

### 5. Live Metrics Bar
Displayed continuously while typing:
- **WPM** — updated every second
- **Accuracy %** — updated on every keystroke
- **Progress %** — characters typed vs. total characters
- **Errors** — running count of incorrect characters

### 6. Assessment Completion
Triggered by: timer expiry, or student clicking "Finish Test"

---

## Metric Calculations

```
WPM      = (Total Characters Typed ÷ 5) ÷ Time Elapsed (minutes)
Accuracy = (Correct Characters ÷ Total Characters Typed) × 100
Errors   = Total Characters Typed − Correct Characters
```

---

## Results Dashboard

Displayed with a smooth fade-in animation after test completion. Includes:

| Metric | Display |
|---|---|
| Words Per Minute | Large numeric display |
| Accuracy | Percentage with circular progress ring |
| Total Errors | Count |
| Time Taken | MM:SS format |
| Text Completed | Percentage of letter typed |
| Performance Rating | Badge: Excellent / Good / Fair / Needs Improvement |

### Performance Rating Thresholds

| Rating | WPM | Accuracy |
|---|---|---|
| Excellent | ≥ 50 | ≥ 95% |
| Good | ≥ 35 | ≥ 85% |
| Fair | ≥ 20 | ≥ 70% |
| Needs Improvement | < 20 | < 70% |

---

## Leaderboard

- Persisted via `localStorage`
- Displays top 10 entries
- Sortable by: WPM (default), Accuracy, Name
- Each entry shows: Rank, Name, WPM, Accuracy, Date
- Option to clear leaderboard (with confirmation dialog)

---

## UI / UX Design Specification

### Aesthetic Direction
Academic refinement meets modern dashboard. Think: a prestigious institution that takes its digital presence seriously. Clean, confident, and authoritative — not sterile.

### Color Palette
```
Primary Background:  #F8F7F4   (warm off-white, parchment feel)
Surface:             #FFFFFF
Primary Accent:      #1B3A6B   (deep navy — authority)
Secondary Accent:    #2E7D5E   (forest green — success/correct)
Error:               #C0392B   (deep red — incorrect)
Warning:             #D4A017   (amber — timer warning)
Text Primary:        #1A1A2E
Text Muted:          #6B7280
```

### Typography
```
Display / Headings:  Playfair Display (serif — academic gravitas)
Body / UI:           DM Sans (clean, modern legibility)
Code / Typing Area:  DM Mono (monospace — exam authenticity)
```

### Component Styling
- Rounded corners: `8px` (cards), `4px` (inputs)
- Shadows: Layered, soft (`0 2px 8px rgba(0,0,0,0.08)`)
- Transitions: `200–300ms ease` on all interactive elements
- Dark mode: Full support via CSS custom properties + toggle button

---

## Application Screens / Views

```
1. Welcome Screen     → Student name entry + instructions
2. Exam Screen        → Timer + Reference text + Typing area + Live metrics
3. Results Screen     → Full results dashboard + share/print option
4. Leaderboard Screen → Top performers table
```

Navigation between screens uses animated transitions (slide or fade).

---

## Project File Structure

```
src/
├── components/
│   ├── Header/
│   ├── StudentForm/
│   ├── Timer/
│   ├── ReferenceText/
│   ├── TypingArea/
│   ├── LiveMetrics/
│   ├── ResultsDashboard/
│   ├── Leaderboard/
│   └── DarkModeToggle/
├── hooks/
│   ├── useTimer.ts
│   ├── useTypingEngine.ts
│   └── useLeaderboard.ts
├── types/
│   └── index.ts
├── utils/
│   ├── calculations.ts
│   ├── textComparison.ts
│   └── storage.ts
├── context/
│   └── AppContext.tsx
├── styles/
│   └── global.css
├── App.tsx
└── main.tsx
```

---

## Custom Hooks

| Hook | Responsibility |
|---|---|
| `useTimer` | Countdown logic, auto-submit trigger, warning states |
| `useTypingEngine` | Character comparison, WPM, accuracy, error tracking |
| `useLeaderboard` | Read/write/sort leaderboard from localStorage |

---

## Reference Text

```
High Priest Academy,
Post Office Box KN 2012,
Kaneshie-Accra.
("Date" -- The current date should automatically load)

Dear Pastor Amponsah,
                    I am very happy to write this letter to you. You have been a blessing to me and my family. I want to use this opportunity to thank you and All World Share Organization for your massive support.
                    
                    Thank you Pastor Andrews and your team for sponsoring us with these computers. They are really helping us in learning.
                    
                    May God Almighty bless you and give you long life. Thank you Pastor Amponsah and your team. Thank you High Priest Academy.
                    
                    Your Student,
                    (Student writes his/her name here)```

---

## Quality Standards

- TypeScript strict mode — no `any` types
- All components fully typed with interfaces
- Error boundaries implemented
- Accessible: ARIA labels, keyboard navigable, sufficient color contrast
- No console errors or warnings in production build
- Mobile-responsive down to 768px width
- Lighthouse score target: Performance ≥ 90, Accessibility ≥ 95

---

*This document serves as the complete specification for the High Priest Academy Typing Assessment System. All features listed are required for the initial release.*