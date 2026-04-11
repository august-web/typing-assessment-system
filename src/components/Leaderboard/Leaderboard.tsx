import React, { useState } from 'react'
import { Trash2, Trophy, Zap, Target } from 'lucide-react'
import { AssessmentResult } from '../../types'

interface LeaderboardProps {
  entries: AssessmentResult[]
  onSort: (sortBy: 'wpm' | 'accuracy' | 'name') => void
  sortBy: 'wpm' | 'accuracy' | 'name'
  onClear: () => void
  onBack: () => void
}

type SortBy = 'wpm' | 'accuracy' | 'name'

export const Leaderboard: React.FC<LeaderboardProps> = ({
  entries,
  onSort,
  sortBy,
  onClear,
  onBack
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleClear = () => {
    onClear()
    setShowClearConfirm(false)
  }

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 0: return <Trophy className="w-5 h-5 text-yellow-400" />
      case 1: return <Trophy className="w-5 h-5 text-slate-300" />
      case 2: return <Trophy className="w-5 h-5 text-orange-400" />
      default: return null
    }
  }

  const SortButton: React.FC<{ label: string; value: SortBy; icon: React.ReactNode }> = ({ label, value, icon }) => {
    const isActive = sortBy === value
    return (
      <button
        onClick={() => onSort(value)}
        className={`px-5 py-2.5 rounded-xl transition-all font-semibold flex items-center gap-2 ${
          isActive
            ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30'
            : 'bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-300'
        }`}
      >
        {icon}
        {label}
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto animate-fade-in relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white">
              Leaderboard
            </h1>
            <Zap className="w-10 h-10 text-teal-400" />
          </div>
          <p className="text-slate-400 text-lg">Global rankings - Top performers</p>
        </div>

        {/* Sort Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <SortButton label="By WPM" value="wpm" icon={<Zap className="w-4 h-4" />} />
          <SortButton label="By Accuracy" value="accuracy" icon={<Target className="w-4 h-4" />} />
          <SortButton label="By Name" value="name" icon={<Trophy className="w-4 h-4" />} />
        </div>

        {/* Leaderboard Table */}
        <div className="glass-dark rounded-3xl border border-slate-700/50 shadow-lg overflow-hidden">
          {entries.length === 0 ? (
            <div className="text-center py-16 px-6">
              <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-300 text-lg font-semibold mb-2">No entries yet</p>
              <p className="text-slate-500">Take the typing assessment to appear on the leaderboard!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
                    <th className="text-left py-4 px-6 font-bold text-teal-400 uppercase tracking-wider text-sm">Rank</th>
                    <th className="text-left py-4 px-6 font-bold text-teal-400 uppercase tracking-wider text-sm">Student</th>
                    <th className="text-center py-4 px-6 font-bold text-teal-400 uppercase tracking-wider text-sm">WPM</th>
                    <th className="text-center py-4 px-6 font-bold text-teal-400 uppercase tracking-wider text-sm">Accuracy</th>
                    <th className="text-center py-4 px-6 font-bold text-teal-400 uppercase tracking-wider text-sm">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className="border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors duration-200 group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {getMedalIcon(index)}
                          {index < 3 ? null : (
                            <span className="text-lg font-bold text-slate-400">#{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-white group-hover:text-teal-300 transition-colors">{entry.studentName}</p>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center justify-center w-14 h-8 bg-gradient-to-r from-teal-500/20 to-teal-600/20 border border-teal-500/40 rounded-lg font-bold text-teal-300">
                          {entry.wpm}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold text-sm ${
                          entry.accuracy >= 90 ? 'bg-green-500/20 text-green-300' :
                          entry.accuracy >= 70 ? 'bg-blue-500/20 text-blue-300' :
                          'bg-amber-500/20 text-amber-300'
                        }`}>
                          {entry.accuracy}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-sm text-slate-400">
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={onBack}
            className="flex-1 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 text-teal-400 font-bold py-3 px-6 rounded-xl border-2 border-teal-500/30 hover:border-teal-500/60 transition-all"
          >
            Back to Welcome
          </button>
          
          {entries.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold py-3 px-6 rounded-xl border border-red-500/40 transition-all flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Clear Leaderboard
            </button>
          )}
        </div>

        {/* Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="glass-dark rounded-2xl border border-slate-700 p-8 max-w-md mx-4 animate-fade-in">
              <h3 className="text-2xl font-bold text-white mb-4">Clear Leaderboard?</h3>
              <p className="text-slate-300 mb-6">
                This action cannot be undone. All leaderboard entries will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
