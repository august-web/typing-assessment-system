import React from 'react'
import { ArrowRight, Zap } from 'lucide-react'

interface SplashProps {
  onContinue: () => void
}

export const Splash: React.FC<SplashProps> = ({ onContinue }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-teal-900/20 to-slate-900 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-purple-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-2xl w-full mx-4 p-12 glass-dark rounded-3xl border border-slate-700/50 text-center animate-fade-in overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-purple-500/5 -z-10"></div>

        <div className="relative z-10">
          <div className="mx-auto w-28 h-28 mb-8 animated-float">
            <div className="relative w-full h-full">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-400 to-teal-600 animate-pulse-glow"></div>
              
              {/* Inner card */}
              <div className="absolute inset-1 rounded-3xl bg-gradient-to-br from-teal-500 via-teal-600 to-purple-600 flex items-center justify-center shadow-2xl">
                <Zap className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <p className="text-sm uppercase tracking-widest text-teal-400/80 font-semibold mb-4">Welcome to</p>
          
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">
            High Priest<br />Academy
          </h2>

          <p className="max-w-lg mx-auto text-base text-slate-300/90 leading-relaxed mb-10 font-body">
            Master the art of typing with our professional assessment system. Compete globally and track your progress in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={onContinue}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span>Enter Academy</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-slate-500 uppercase tracking-wider">
            Professional Typing Assessment System
          </p>
        </div>
      </div>
    </div>
  )
}

