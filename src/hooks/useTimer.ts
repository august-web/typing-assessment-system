import { useState, useEffect, useCallback } from 'react'
import { TimerState } from '../types'

const TOTAL_TIME = 1800 // 30 minutes in seconds

export const useTimer = (onComplete?: () => void) => {
  const [timerState, setTimerState] = useState<TimerState>({
    timeRemaining: TOTAL_TIME,
    isActive: false,
    hasStarted: false
  })

  const startTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isActive: true,
      hasStarted: true
    }))
  }, [])

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isActive: false
    }))
  }, [])

  const resetTimer = useCallback(() => {
    setTimerState({
      timeRemaining: TOTAL_TIME,
      isActive: false,
      hasStarted: false
    })
  }, [])

  useEffect(() => {
    if (!timerState.isActive) return

    const interval = setInterval(() => {
      setTimerState(prev => {
        const newTime = prev.timeRemaining - 1

        if (newTime <= 0) {
          if (onComplete) onComplete()
          return {
            ...prev,
            timeRemaining: 0,
            isActive: false
          }
        }

        return {
          ...prev,
          timeRemaining: newTime
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerState.isActive, onComplete])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTimerColor = (): string => {
    if (timerState.timeRemaining <= 60) return 'text-red-600'
    if (timerState.timeRemaining <= 300) return 'text-yellow-600'
    return 'text-primary-accent'
  }

  return {
    ...timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    formatTime,
    getTimerColor,
    timeDisplay: formatTime(timerState.timeRemaining)
  }
}
