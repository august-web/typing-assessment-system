import React, { useState } from 'react'
import { ArrowRight, Sparkles, ShieldCheck, Clock, Award, Zap } from 'lucide-react'

interface StudentFormProps {
  onSubmit: (name: string) => void
}

export const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedName = name.trim()
    
    if (!trimmedName) {
      setError('Please enter your full name')
      return
    }
    
    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters long')
      return
    }

    onSubmit(trimmedName)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

      <div className="w-full max-w-lg relative z-10">
        <div className="glass-dark rounded-3xl border border-slate-700/50 p-10 animate-fade-in overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-purple-500/5"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-teal-500 via-teal-600 to-purple-600 flex items-center justify-center shadow-lg shadow-teal-500/30 animate-float">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                Typing Assessment
              </h1>
              <p className="text-sm text-slate-400">High Priest Academy</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="student-name"
                  className="block text-sm font-semibold text-slate-200 mb-3"
                >
                  Your Full Name
                </label>
                <div className="relative">
                  <input
                    id="student-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setError('')
                    }}
                    placeholder="Enter your full name"
                    className="w-full px-5 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 text-white rounded-xl focus:border-teal-500 focus:outline-none transition-all placeholder:text-slate-500 font-body"
                    autoFocus
                  />
                  {!error && name && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-400">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
                {error && (
                  <p className="text-red-400 text-sm mt-2 font-medium flex items-center gap-2">
                    <span>•</span>
                    {error}
                  </p>
                )}
              </div>

              {/* Instructions Box */}
              <div className="bg-gradient-to-br from-teal-500/10 via-transparent to-purple-500/10 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  <h3 className="font-semibold text-white">Test Guidelines</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-300">30 minutes to complete the assessment</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-300">Type the letter with maximum accuracy</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-300">Your score will be ranked on the leaderboard</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-300">Real-time metrics show WPM and accuracy</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50 flex items-center justify-center gap-3 group"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-8 uppercase tracking-wide">
              © High Priest Academy Assessment System
            </p>
          </div>
        </div>

        {/* Footer stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 px-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-teal-400">500+</p>
            <p className="text-xs text-slate-400">Students</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-400">98%</p>
            <p className="text-xs text-slate-400">Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-teal-400">60+</p>
            <p className="text-xs text-slate-400">WPM Avg</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Check icon component
const Check = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

