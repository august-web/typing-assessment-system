import React from 'react'
import { Clock } from 'lucide-react'

interface TimerProps {
  timeDisplay: string
  timeRemaining: number
}

export const Timer: React.FC<TimerProps> = ({ timeDisplay, timeRemaining }) => {
  const isLowTime = timeRemaining <= 60
  const isWarning = timeRemaining <= 300
  
  const getBorderColor = (): string => {
    if (isLowTime) return 'border-red-500/50'
    if (isWarning) return 'border-amber-500/50'
    return 'border-teal-500/30'
  }

  const getGlowEffect = (): string => {
    if (isLowTime) return 'shadow-lg shadow-red-500/20'
    if (isWarning) return 'shadow-lg shadow-amber-500/20'
    return 'shadow-lg shadow-teal-500/20'
  }

  const getTextColor = (): string => {
    if (isLowTime) return 'text-red-300'
    if (isWarning) return 'text-amber-300'
    return 'text-teal-300'
  }

  const getAnimationClass = (): string => {
    if (isLowTime) return 'animate-pulse-glow'
    return ''
  }

  return (
    <div className={`glass-dark rounded-2xl p-6 flex flex-col items-center border-2 ${getBorderColor()} ${getGlowEffect()} ${getAnimationClass()} transition-all duration-300`}>
      <div className="flex items-center gap-2 mb-3">
        <Clock className={`w-5 h-5 ${getTextColor()}`} />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time Remaining</p>
      </div>
      <p className={`${getTextColor()} font-mono text-5xl font-bold tabular-nums transition-colors duration-300`}>
        {timeDisplay}
      </p>
      {isLowTime && (
        <p className="text-xs text-red-400 font-semibold mt-3 animate-bounce-soft">Hurry up!</p>
      )}
    </div>
  )
}
