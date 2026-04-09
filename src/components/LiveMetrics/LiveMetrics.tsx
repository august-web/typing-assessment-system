import React from 'react'
import { TypingMetrics } from '../../types'

interface LiveMetricsProps {
  metrics: TypingMetrics
}

const MetricCard: React.FC<{ label: string; value: string | number; unit?: string }> = ({
  label,
  value,
  unit
}) => (
  <div className="bg-white/5 dark:bg-slate-800/90 rounded-[22px] p-4 border border-white/10 shadow-sm">
    <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
      {label}
    </p>
    <div className="flex items-baseline gap-1">
      <p className="text-2xl font-bold text-primary-accent">{value}</p>
      {unit && <p className="text-sm text-text-muted">{unit}</p>}
    </div>
  </div>
)

export const LiveMetrics: React.FC<LiveMetricsProps> = ({ metrics }) => {
  return (
    <div className="rounded-[28px] p-6 border border-white/10 shadow-soft bg-slate-950/95 dark:bg-slate-900/95">
      <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-4">
        Live Metrics
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricCard label="WPM" value={metrics.wpm} />
        <MetricCard label="Accuracy" value={metrics.accuracy} unit="%" />
        <MetricCard label="Errors" value={metrics.errors} />
        <MetricCard label="Progress" value={metrics.progress} unit="%" />
      </div>

      <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-secondary to-primary-accent h-full transition-all duration-300"
          style={{ width: `${metrics.progress}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-text-muted mt-2">
        {metrics.totalCharactersTyped} characters typed
      </p>
    </div>
  )
}
