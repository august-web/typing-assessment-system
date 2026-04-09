import React, { useState } from 'react'
import { ArrowRight, Sparkles, ShieldCheck, Clock, Award } from 'lucide-react'

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(27,58,107,0.15),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(46,125,94,0.12),_transparent_20%),#08101f] flex items-center justify-center px-6 pt-20 pb-6">
      <div className="w-full max-w-lg">
        <div className="bg-slate-950/95 dark:bg-slate-900/95 rounded-[28px] shadow-soft border border-white/10 p-8 animate-fade-in backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-primary-accent to-primary-secondary flex items-center justify-center shadow-xl">
              <span className="text-white font-display font-bold text-3xl">HP</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">
              Typing Assessment
            </h1>
            <p className="text-sm text-slate-400">High Priest Academy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="student-name"
                className="block text-sm font-semibold text-white/90 mb-2"
              >
                Full Name
              </label>
              <input
                id="student-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:border-primary-accent focus:outline-none transition-colors"
                autoFocus
              />
              {error && (
                <p className="text-primary-error text-sm mt-2 font-medium">{error}</p>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[22px] p-5">
              <h3 className="font-semibold text-white mb-4">Instructions:</h3>
              <ul className="text-sm text-slate-300 space-y-3">
                <li className="flex items-start gap-2"><Sparkles className="mt-1 h-4 w-4 text-primary-secondary" /> You will have 30 minutes to complete the test</li>
                <li className="flex items-start gap-2"><ShieldCheck className="mt-1 h-4 w-4 text-primary-accent" /> Type the letter as accurately as possible</li>
                <li className="flex items-start gap-2"><Clock className="mt-1 h-4 w-4 text-amber-400" /> Your WPM and accuracy will be measured</li>
                <li className="flex items-start gap-2"><Award className="mt-1 h-4 w-4 text-secondary" /> Results will be saved to the leaderboard</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-accent to-primary-secondary hover:shadow-xl text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-3"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            © High Priest Academy Typing Assessment System
          </p>
        </div>
      </div>
    </div>
  )
}
