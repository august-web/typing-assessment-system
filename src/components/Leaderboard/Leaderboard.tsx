import React, { useState } from 'react'
import { Trash2, ArrowDown } from 'lucide-react'
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

  const SortButton: React.FC<{ label: string; value: SortBy }> = ({ label, value }) => {
    const isActive = sortBy === value
    return (
      <button
        onClick={() => onSort(value)}
        className={`px-4 py-2 rounded-lg transition-colors font-semibold flex items-center gap-2 ${
          isActive
            ? 'bg-primary-accent text-white'
            : 'bg-gray-200 dark:bg-slate-700 text-text-primary hover:bg-gray-300 dark:hover:bg-slate-600'
        }`}
      >
        {label}
        {isActive && <ArrowDown className="w-4 h-4" />}
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(27,58,107,0.12),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(46,125,94,0.10),_transparent_20%),var(--primary-bg)] dark:bg-none dark:bg-slate-950 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-primary-accent mb-2">
            Leaderboard
          </h1>
          <p className="text-text-muted">Top performers on the typing assessment</p>
        </div>

        <div className="bg-slate-950/95 dark:bg-slate-900/95 rounded-[28px] shadow-soft p-6 mb-6 border border-white/10">
          <div className="flex flex-wrap gap-2 mb-6">
            <SortButton label="Sort by WPM" value="wpm" />
            <SortButton label="Sort by Accuracy" value="accuracy" />
            <SortButton label="Sort by Name" value="name" />
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted text-lg mb-4">No entries yet</p>
              <p className="text-text-muted">Take the typing assessment to appear on the leaderboard!</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-[24px] border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-text-muted">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-muted">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-muted">WPM</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-muted">Accuracy</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-muted">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="w-8 h-8 bg-primary-accent text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-text-primary">{entry.studentName}</td>
                      <td className="py-4 px-4 text-primary-accent font-bold">{entry.wpm}</td>
                      <td className="py-4 px-4">
                        <span className="inline-block bg-blue-50 dark:bg-blue-950 text-primary-accent px-3 py-1 rounded-full text-sm font-semibold">
                          {entry.accuracy}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-text-muted text-sm">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onBack}
            className="flex-1 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-primary-accent font-semibold py-3 px-6 rounded-input border-2 border-primary-accent transition-colors"
          >
            Back to Welcome
          </button>
          
          {entries.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="bg-red-100 dark:bg-red-950 hover:bg-red-200 dark:hover:bg-red-900 text-primary-error font-semibold py-3 px-6 rounded-input transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-bold text-text-primary mb-4">Clear Leaderboard?</h3>
              <p className="text-text-muted mb-6">
                This action cannot be undone. All leaderboard entries will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-200 dark:bg-slate-700 text-text-primary font-semibold py-2 px-4 rounded-input hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 bg-primary-error text-white font-semibold py-2 px-4 rounded-input hover:opacity-90 transition-opacity"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
