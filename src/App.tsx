import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { StudentForm } from './components/StudentForm'
import { Timer } from './components/Timer'
import { ReferenceText } from './components/ReferenceText'
import { TypingArea } from './components/TypingArea'
import { LiveMetrics } from './components/LiveMetrics'
import { ResultsDashboard } from './components/ResultsDashboard'
import { Leaderboard } from './components/Leaderboard'
import { Splash } from './components/Splash'
import { useTimer } from './hooks/useTimer'
import { useTypingEngine } from './hooks/useTypingEngine'
import { useLeaderboard } from './hooks/useLeaderboard'
import { useAppContext } from './context/AppContext'
import { getPerformanceRating } from './utils/calculations'
import { saveToLeaderboard } from './utils/storage'
import './styles/global.css'
import { AssessmentResult } from './types'

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    // Show splash the first time or if user hasn't dismissed it in this session
    const seen = sessionStorage.getItem('hpa_splash_seen')
    return seen !== '1'
  })
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode !== null) return JSON.parse(savedMode)
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const { state, dispatch } = useAppContext()
  const { leaderboard, sortBy, addEntry, sortLeaderboard, clearLeaderboard } = useLeaderboard()

  const handleCompleteTest = () => {
    const metrics = typingEngine.getMetrics()
    const timeTaken = Math.floor((1800 - timer.timeRemaining) / 60)

    const result: AssessmentResult = {
      id: crypto.randomUUID(),
      studentName: state.studentName,
      wpm: metrics.wpm,
      accuracy: metrics.accuracy,
      errors: metrics.errors,
      timeTaken,
      textCompleted: metrics.progress,
      date: new Date().toISOString(),
      performanceRating: getPerformanceRating(metrics.wpm, metrics.accuracy)
    }

    saveToLeaderboard(result)
    addEntry(result)
    // Keep the completed result in app state so ResultsDashboard can read it
    dispatch({ type: 'SET_RESULT', payload: result })
    dispatch({ type: 'FINISH_EXAM' })
  }

  const timer = useTimer(handleCompleteTest)
  const typingEngine = useTypingEngine(timer.timeRemaining)

  // Update dark mode in DOM
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    document.documentElement.classList.toggle('dark', isDarkMode)
    document.body.classList.toggle('dark', isDarkMode)
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light'
  }, [isDarkMode])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemTheme = (event: MediaQueryListEvent) => {
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(event.matches)
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemTheme)
    } else {
      mediaQuery.addListener(handleSystemTheme)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemTheme)
      } else {
        mediaQuery.removeListener(handleSystemTheme)
      }
    }
  }, [])

  const handleStudentNameSubmit = (name: string) => {
    dispatch({ type: 'SET_STUDENT_NAME', payload: name })
    dispatch({ type: 'START_EXAM' })
  }

  const handleTypingStart = () => {
    if (!timer.hasStarted) {
      timer.startTimer()
    }
  }

  const handleFinishTest = () => {
    handleCompleteTest()
  }

  const handleTakeAgain = () => {
    timer.resetTimer()
    typingEngine.reset()
    dispatch({ type: 'RESET_TO_WELCOME' })
  }

  const metrics = typingEngine.getMetrics()

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(27,58,107,0.12),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(46,125,94,0.10),_transparent_20%),var(--primary-bg)] dark:bg-slate-950 text-text-primary dark:text-slate-100">
        <Header isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

        {showSplash && (
          <Splash onContinue={() => { setShowSplash(false); sessionStorage.setItem('hpa_splash_seen','1') }} />
        )}

        {!showSplash && state.currentScreen === 'welcome' && (
          <StudentForm onSubmit={handleStudentNameSubmit} />
        )}

        {state.currentScreen === 'exam' && (
          <div className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Timer timeDisplay={timer.timeDisplay} timeRemaining={timer.timeRemaining} />
              
              <div className="lg:col-span-2">
                <LiveMetrics metrics={metrics} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ReferenceText
                referenceText={typingEngine.referenceText}
                typedText={typingEngine.typedText}
                getCharacterStatus={typingEngine.getTypedCharacterStatus}
              />

              <div className="space-y-4">
                <TypingArea
                  value={typingEngine.typedText}
                  hasMistake={typingEngine.hasMistake()}
                  onChange={typingEngine.handleTyping}
                  disabled={timer.timeRemaining === 0}
                  onStart={handleTypingStart}
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleFinishTest}
                    disabled={!timer.hasStarted || timer.timeRemaining === 0}
                    className="flex-1 bg-primary-secondary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-input transition-all duration-200"
                  >
                    Finish Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {state.currentScreen === 'results' && state.currentResult && (
          <ResultsDashboard
            result={state.currentResult}
            onViewLeaderboard={() => dispatch({ type: 'GO_TO_LEADERBOARD' })}
            onTakeAgain={handleTakeAgain}
          />
        )}

        {state.currentScreen === 'leaderboard' && (
          <Leaderboard
            entries={leaderboard}
            onSort={sortLeaderboard}
            sortBy={sortBy}
            onClear={clearLeaderboard}
            onBack={handleTakeAgain}
          />
        )}
      </div>
    </div>
  )
}
