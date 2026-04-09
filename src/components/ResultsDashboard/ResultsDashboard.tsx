import React from 'react'
import { Download, Share2 } from 'lucide-react'
import { AssessmentResult } from '../../types'

interface ResultsDashboardProps {
  result: AssessmentResult
  onViewLeaderboard: () => void
  onTakeAgain: () => void
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  onViewLeaderboard,
  onTakeAgain
}) => {
  const getRatingColor = (
    rating: 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement'
  ): string => {
    switch (rating) {
      case 'Excellent':
        return 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700'
      case 'Good':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700'
      case 'Fair':
        return 'bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700'
      default:
        return 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700'
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    const text = `I scored ${result.wpm} WPM with ${result.accuracy}% accuracy on the High Priest Academy Typing Assessment!`
    if (navigator.share) {
      navigator.share({
        title: 'My Typing Assessment Result',
        text
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('Result copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(27,58,107,0.12),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(46,125,94,0.10),_transparent_20%),var(--primary-bg)] dark:bg-none dark:bg-slate-950 pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-primary-accent mb-2">
            Assessment Complete!
          </h1>
          <p className="text-text-muted">
            Great effort, <span className="font-semibold text-text-primary">{result.studentName}</span>
          </p>
        </div>

        <div className="bg-slate-950/95 dark:bg-slate-900/95 rounded-[28px] shadow-soft p-8 mb-8 border border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-text-muted uppercase">Words Per Minute</p>
              <p className="text-4xl font-bold text-primary-accent mt-2">{result.wpm}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-text-muted uppercase">Accuracy</p>
              <div className="relative w-24 h-24 mx-auto mt-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-gray-200 dark:text-slate-700"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${(result.accuracy / 100) * 276.4} 276.4`}
                    className="text-primary-secondary transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-accent">{result.accuracy}%</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-text-muted uppercase">Errors</p>
              <p className="text-4xl font-bold text-primary-error mt-2">{result.errors}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-text-muted uppercase">Time Taken</p>
              <p className="text-4xl font-bold text-primary-accent mt-2">{result.timeTaken}m</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-primary-bg dark:bg-slate-700 rounded-lg p-4">
                <p className="text-xs font-semibold text-text-muted uppercase">Text Completed</p>
                <p className="text-3xl font-bold text-primary-accent mt-2">{result.textCompleted}%</p>
              </div>
              <div className="bg-primary-bg dark:bg-slate-700 rounded-lg p-4">
                <p className="text-xs font-semibold text-text-muted uppercase">Assessed On</p>
                <p className="text-lg font-semibold text-text-primary mt-2">
                  {new Date(result.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg border-2 text-center ${getRatingColor(result.performanceRating)}`}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2">Performance Rating</p>
            <p className="text-3xl font-bold">{result.performanceRating}</p>
          </div>
        </div>

        <div className="bg-slate-950/95 dark:bg-slate-900/95 rounded-[28px] shadow-soft p-6 mb-8 border border-white/10">
          <h3 className="font-semibold text-text-primary mb-4">Share Your Results</h3>
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 bg-blue-50 hover:bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-primary-accent font-semibold py-3 px-4 rounded-input transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 bg-green-50 hover:bg-green-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-primary-secondary font-semibold py-3 px-4 rounded-input transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onViewLeaderboard}
            className="bg-primary-accent hover:shadow-lg text-white font-semibold py-3 px-6 rounded-input transition-all duration-200"
          >
            View Leaderboard
          </button>
          <button
            onClick={onTakeAgain}
            className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-primary-accent font-semibold py-3 px-6 rounded-input border-2 border-primary-accent transition-colors"
          >
            Take Test Again
          </button>
        </div>
      </div>
    </div>
  )
}
