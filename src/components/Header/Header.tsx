import React from 'react'
import { Moon, Sun } from 'lucide-react'

interface HeaderProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="backdrop-blur-2xl bg-slate-950/60 dark:bg-slate-900/70 border border-white/10 rounded-[28px] shadow-soft p-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary-accent to-primary-secondary flex items-center justify-center shadow-md">
              <span className="text-white font-display font-bold text-lg">HP</span>
            </div>
            <h1 className="text-lg font-display font-semibold text-primary-accent dark:text-white hidden sm:block">
              High Priest Academy
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 rounded-full bg-white/10 dark:bg-white/10 hover:bg-white/15 dark:hover:bg-white/15 transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDarkMode}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-primary-accent" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
