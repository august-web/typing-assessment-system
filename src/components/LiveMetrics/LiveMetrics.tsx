import React from 'react'
import { TypingMetrics } from '../../types'
import { TrendingUp } from 'lucide-react'

interface LiveMetricsProps {
  metrics: TypingMetrics
}

const MetricCard: React.FC<{ 
  label: string
  value: string | number
  unit?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  color?: 'teal' | 'purple' | 'amber' | 'red'
}> = ({
  label,
  value,
  unit,
  icon,
  trend = 'neutral',
  color = 'teal'
}) => {
  const colorClasses = {
    teal: 'from-teal-500 to-teal-600 text-teal-400',
    purple: 'from-purple-500 to-purple-600 text-purple-400',
    amber: 'from-amber-500 to-amber-600 text-amber-400',
    red: 'from-red-500 to-red-600 text-red-400'
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 transition-all duration-300 hover:border-slate-600/80 hover:bg-slate-800/70">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
          {icon && <div className={`text-slate-500`}>{icon}</div>}
        </div>
        
        <div className="flex items-baseline gap-2">
          <p className={`text-3xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
            {value}
          </p>
          {unit && <p className="text-sm text-slate-400">{unit}</p>}
        </div>

        {trend && trend !== 'neutral' && (
          <div className="flex items-center gap-1 mt-2 text-xs">
            <TrendingUp className={`w-3 h-3 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
            <span className={trend === 'up' ? 'text-green-400' : 'text-red-400'}>
              {trend === 'up' ? 'Improving' : 'Needs focus'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export const LiveMetrics: React.FC<LiveMetricsProps> = ({ metrics }) => {
  const getAccuracyTrend = (): 'up' | 'down' | 'neutral' => {
    if (metrics.accuracy >= 90) return 'up'
    if (metrics.accuracy < 70) return 'down'
    return 'neutral'
  }

  return (
    <div className="glass-dark rounded-3xl p-8 border border-slate-700/50 shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-1">Live Metrics</h3>
        <p className="text-sm text-slate-400">Real-time typing analytics</p>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          label="Words Per Minute" 
          value={metrics.wpm}
          color="teal"
          trend={metrics.wpm > 40 ? 'up' : 'neutral'}
        />
        <MetricCard 
          label="Accuracy" 
          value={metrics.accuracy} 
          unit="%"
          color="purple"
          trend={getAccuracyTrend()}
        />
        <MetricCard 
          label="Errors" 
          value={metrics.errors}
          color={metrics.errors > 20 ? 'red' : 'amber'}
        />
        <MetricCard 
          label="Progress" 
          value={metrics.progress} 
          unit="%"
          color="teal"
        />
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-200">Test Completion</p>
          <p className="text-sm text-slate-400">{metrics.progress}%</p>
        </div>
        
        <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden border border-slate-600/50">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-teal-400 to-purple-500 transition-all duration-300 rounded-full shadow-lg shadow-teal-500/50"
            style={{ width: `${metrics.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-slate-700/50 grid grid-cols-2 gap-4">
        <div className="bg-slate-700/20 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Characters Typed</p>
          <p className="text-xl font-bold text-teal-400">{metrics.totalCharactersTyped}</p>
        </div>
        <div className="bg-slate-700/20 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Correct Characters</p>
          <p className="text-xl font-bold text-green-400">{metrics.correctCharacters}</p>
        </div>
      </div>
    </div>
  )
}
