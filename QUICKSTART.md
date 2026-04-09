# 🚀 Quick Start Guide

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- npm 10+ (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation & Running

### Step 1: Navigate to the project
```powershell
cd c:\Users\Augustine\high-priest
```

### Step 2: Install dependencies
```powershell
npm install
```

This will install:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- And other dev dependencies

**Estimated time:** 2-3 minutes

### Step 3: Start development server
```powershell
npm run dev
```

This will:
- Start the dev server on `http://localhost:3000`
- Automatically open your browser
- Enable hot module reloading (HMR)

Your browser should now show the **Welcome Screen**.

## Testing the Application

### 1. Welcome Screen
- Enter your full name
- Click "Start Assessment"

### 2. Exam Screen
- You'll see:
  - Timer on the left (30 min countdown)
  - Reference letter in the middle
  - Typing area on the right
  - Live metrics (WPM, Accuracy, Progress)

### 3. Start Typing
- Click in the textarea and begin typing
- Timer starts automatically on first keystroke
- Characters highlight in real-time:
  - 🟢 Green = Correct
  - 🔴 Red = Incorrect
  - ⚪ Gray = Not yet typed

### 4. Complete Test
- Click "Finish Test" button, OR
- Wait for timer to reach 00:00 (auto-submit)

### 5. Results Screen
- See your metrics:
  - WPM (Words Per Minute)
  - Accuracy percentage (with circular progress ring)
  - Total errors
  - Text completion percentage
  - Performance rating (Excellent/Good/Fair/Needs Improvement)
- Options to:
  - 📊 View Leaderboard
  - 🔄 Take Test Again
  - 📤 Share results
  - 🖨️ Print results

### 6. Leaderboard
- Top 10 performers displayed
- Sort by WPM (default), Accuracy, or Name
- Results persist in browser's localStorage
- Option to clear all entries

## Testing Tips

### Test Accuracy Scoring
- Copy the reference text exactly to see 100% accuracy
- Type something completely different to see low accuracy

### Test Timer Warnings
- The timer will:
  - Stay blue for the first 25 minutes
  - Turn amber 🟡 when 5 minutes remain
  - Turn red 🔴 when 1 minute remains

### Test Anti-Cheating Features
Try these keyboard shortcuts (they should NOT work):
- `Ctrl+C` — Copy (disabled)
- `Ctrl+V` — Paste (disabled)
- `Ctrl+X` — Cut (disabled)
- Right-click → Should show no context menu
- Drag & drop text → Should not work

### Test Dark Mode
- Click the moon/sun icon in the top-right corner
- Theme preference is saved to localStorage

### Test Leaderboard Persistence
- Complete multiple tests with different names
- Close and reopen the browser
- Leaderboard entries should still be there

## Build for Production

To create an optimized production build:

```powershell
npm run build
```

This will:
- Generate minified JavaScript/CSS
- Create a `dist/` folder
- Optimize bundle size

Then preview:
```powershell
npm run preview
```

## Troubleshooting

### Issue: "npm command not found"
**Solution:** Install Node.js from https://nodejs.org

### Issue: Port 3000 already in use
**Solution:** Edit `vite.config.ts` and change port to 3001 (or kill the process using port 3000)

### Issue: "Module not found" errors
**Solution:** Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

### Issue: Dark mode not persisting
**Solution:** Check browser's localStorage is enabled (Settings → Privacy → Cookies/Site Data)

### Issue: Styles not loading correctly
**Solution:** Clear browser cache (Ctrl+Shift+Delete) and reload

## Project Commands

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint (requires eslint to be installed)
npm run lint
```

## File Locations

| What | Where |
|------|-------|
| Main app | `src/App.tsx` |
| Components | `src/components/` |
| Hooks | `src/hooks/` |
| Utilities | `src/utils/` |
| Styles | `src/styles/global.css` |
| Types | `src/types/index.ts` |
| Config | `tailwind.config.js`, `vite.config.ts` |

## Important Notes

⚠️ **Timer:** 30 minutes = 1800 seconds

⚠️ **Reference Text:** Located in `src/utils/calculations.ts` — Can be customized there

⚠️ **localStorage:** Leaderboard data is stored per browser/device (not synced)

⚠️ **Performance Ratings:**
- **Excellent:** WPM ≥ 50 AND Accuracy ≥ 95%
- **Good:** WPM ≥ 35 AND Accuracy ≥ 85%
- **Fair:** WPM ≥ 20 AND Accuracy ≥ 70%
- **Needs Improvement:** Otherwise

## Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Test all features
4. ✅ Build for production with `npm run build`
5. ✅ Deploy `dist/` folder to your web server

## Support

- **Documentation:** See `README.md`
- **Build Info:** See `BUILD_COMPLETE.md`
- **Original Spec:** See `task.md`

---

**Ready to type?** Let's go! 🚀

