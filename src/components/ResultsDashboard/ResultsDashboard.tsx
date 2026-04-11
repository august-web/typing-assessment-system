import React from 'react'
import { Download, Share2, Crown, Zap, Award, Clock } from 'lucide-react'
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
  ): { bg: string; text: string; border: string; gradient: string } => {
    switch (rating) {
      case 'Excellent':
        return {
          bg: 'bg-green-500/10',
          text: 'text-green-300',
          border: 'border-green-500/30',
          gradient: 'from-green-500/20 to-transparent'
        }
      case 'Good':
        return {
          bg: 'bg-blue-500/10',
          text: 'text-blue-300',
          border: 'border-blue-500/30',
          gradient: 'from-blue-500/20 to-transparent'
        }
      case 'Fair':
        return {
          bg: 'bg-amber-500/10',
          text: 'text-amber-300',
          border: 'border-amber-500/30',
          gradient: 'from-amber-500/20 to-transparent'
        }
      default:
        return {
          bg: 'bg-red-500/10',
          text: 'text-red-300',
          border: 'border-red-500/30',
          gradient: 'from-red-500/20 to-transparent'
        }
    }
  }

  const ratingColor = getRatingColor(result.performanceRating)

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-3xl mx-auto animate-fade-in relative z-10">
        {/* Celebration Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 animate-bounce-soft">
            <Crown className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-teal-300 via-purple-300 to-teal-300 bg-clip-text text-transparent mb-3">
            Excellent Work!
          </h1>
          <p className="text-slate-300 text-xl">
            Assessment complete, <span className="font-bold text-teal-300">{result.studentName}</span>
          </p>
        </div>

        {/* Main Results Card */}
        <div className="glass-dark rounded-3xl border border-slate-700/50 shadow-lg p-8 mb-8">
          {/* Accuracy Circle */}
          <div className="flex items-center justify-between mb-12 gap-8">
            <div className="flex-1">
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-700"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#accuracyGradient)"
                    strokeWidth="8"
                    strokeDasharray={`${(result.accuracy / 100) * 565.5} 565.5`}
                    className="transition-all duration-1000 animate-pulse-glow"
                  />
                  <defs>
                    <linearGradient id="accuracyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-teal-300">{result.accuracy}%</span>
                  <span className="text-sm text-slate-400 mt-2">Accuracy</span>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="flex-1 space-y-6">
              <div className="bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-teal-400" />
                  <span className="text-slate-400 text-sm font-semibold uppercase">Speed</span>
                </div>
                <p className="text-4xl font-bold text-teal-300">{result.wpm} <span className="text-lg text-slate-400">WPM</span></p>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-slate-400 text-sm font-semibold uppercase">Errors</span>
                </div>
                <p className="text-4xl font-bold text-amber-300">{result.errors}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-400 text-sm font-semibold uppercase">Duration</span>
                </div>
                <p className="text-4xl font-bold text-purple-300">{result.timeTaken} <span className="text-lg text-slate-400">min</span></p>
              </div>
            </div>
          </div>

          {/* Additional Stats Grid */}
          <div className="border-t border-slate-700/50 pt-8">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-slate-400 text-xs font-semibold uppercase mb-2">Text Completed</p>
                <p className="text-3xl font-bold text-teal-300">{result.textCompleted}%</p>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-slate-400 text-xs font-semibold uppercase mb-2">Date</p>
                <p className="text-lg font-semibold text-slate-300">
                  {new Date(result.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Performance Rating */}
          <div className={`bg-gradient-to-r ${ratingColor.gradient} border-2 ${ratingColor.border} rounded-2xl p-8 text-center`}>
            <p className="text-xs font-bold ${ratingColor.text} uppercase tracking-widest mb-3">Performance Rating</p>
            <p className={`text-5xl font-bold ${ratingColor.text}`}>{result.performanceRating}</p>
          </div>
        </div>

        {/* Share Options */}
        <div className="glass-dark rounded-2xl border border-slate-700/50 p-6 mb-8">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-teal-400" />
            Share Your Achievement
          </h3>
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-teal-500/20 to-teal-600/20 hover:from-teal-500/30 hover:to-teal-600/30 text-teal-300 font-bold py-3 px-4 rounded-xl border border-teal-500/40 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share Result
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 text-purple-300 font-bold py-3 px-4 rounded-xl border border-purple-500/40 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Print Certificate
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onViewLeaderboard}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2"
          >
            <Crown className="w-5 h-5" />
            View Leaderboard
          </button>
          <button
            onClick={onTakeAgain}
            className="bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 text-teal-400 font-bold py-4 px-6 rounded-xl border-2 border-teal-500/30 hover:border-teal-500/60 transition-all"
          >
            Test Again
          </button>
        </div>
      </div>
    </div>
  )
}
