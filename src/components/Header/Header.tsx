import React from 'react'
import { Moon, Sun, Zap } from 'lucide-react'

interface HeaderProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="bg-gradient-to-r from-slate-950/80 via-slate-900/70 to-slate-950/80 border border-slate-700/50 rounded-2xl shadow-lg shadow-slate-900/50 p-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-purple-600 flex items-center justify-center shadow-lg shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/40 transition-all">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-display font-bold text-white hover:text-teal-300 transition-colors">
                High Priest Academy
              </h1>
              <p className="text-xs text-slate-400 font-semibold">Typing Assessment</p>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-teal-500/30 transition-all flex items-center justify-center"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDarkMode}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-400 hover:text-yellow-300 transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-teal-400 hover:text-teal-300 transition-colors" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
