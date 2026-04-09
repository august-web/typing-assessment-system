import React from 'react'
import { ArrowRight } from 'lucide-react'

interface SplashProps {
  onContinue: () => void
}

export const Splash: React.FC<SplashProps> = ({ onContinue }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-primary-accent/60 to-[#0b1720] backdrop-blur-sm">
      <div className="max-w-xl w-full mx-4 p-8 bg-white/6 dark:bg-slate-900/50 rounded-2xl shadow-soft border border-white/10 text-center">
        <div className="mx-auto w-24 h-24 rounded-lg bg-gradient-to-br from-primary-accent to-primary-secondary flex items-center justify-center mb-6 animate-float">
          <span className="text-white font-display font-bold text-3xl">HP</span>
        </div>
        <p className="text-sm uppercase tracking-[0.32em] text-white/60 mb-4">Welcome to</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">High Priest Academy</h2>
        <p className="max-w-xl mx-auto text-sm text-white/70 leading-7 mb-8">
          Experience a modern, polished typing assessment designed for the next generation of learners. Press continue to begin your exam journey.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 bg-white text-primary-accent py-3 px-6 rounded-full font-semibold shadow-xl shadow-primary-accent/15 hover:-translate-y-0.5 transition-all"
          >
            Enter Academy
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
