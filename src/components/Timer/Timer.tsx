import React from 'react'

interface TimerProps {
  timeDisplay: string
  timeRemaining: number
}

export const Timer: React.FC<TimerProps> = ({ timeDisplay, timeRemaining }) => {
  const getTimerColor = (): string => {
    if (timeRemaining <= 60) return 'text-primary-error'
    if (timeRemaining <= 300) return 'text-primary-warning'
    return 'text-primary-accent'
  }

  return (
    <div className={`rounded-[28px] p-5 flex flex-col items-center border border-white/10 shadow-soft bg-slate-950/95 dark:bg-slate-900/95 ${
      timeRemaining <= 60 ? 'ring-1 ring-red-500/20' :
      timeRemaining <= 300 ? 'ring-1 ring-amber-400/20' :
      'ring-1 ring-primary-secondary/20'
    }`}>
      <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Time Remaining</p>
      <p className={`${getTimerColor()} font-mono text-4xl font-bold mt-3 tabular-nums`}>
        {timeDisplay}
      </p>
    </div>
  )
}
