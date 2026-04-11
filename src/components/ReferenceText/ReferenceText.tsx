import React, { useEffect } from 'react'
import { BookOpen, CheckCircle2, AlertCircle } from 'lucide-react'

interface ReferenceTextProps {
  referenceText: string
  typedText: string
  getCharacterStatus: (index: number) => 'correct' | 'incorrect' | 'pending'
}

export const ReferenceText: React.FC<ReferenceTextProps> = ({
  referenceText,
  typedText,
  getCharacterStatus
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to follow current typing position
  useEffect(() => {
    if (containerRef.current && typedText.length > 0) {
      const currentCharIndex = typedText.length - 1
      const charElements = containerRef.current.querySelectorAll('[data-char-index]')
      
      if (charElements[currentCharIndex]) {
        const element = charElements[currentCharIndex] as HTMLElement
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [typedText.length])

  const accuracy = typedText.length > 0 
    ? Math.round((Array.from(typedText).filter((_, i) => getCharacterStatus(i) === 'correct').length / typedText.length) * 100)
    : 0

  return (
    <div className="glass-dark rounded-3xl shadow-lg p-8 border border-slate-700/50 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/30 to-purple-500/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Reference Letter</h3>
            <p className="text-xs text-slate-400">Type this exactly</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-teal-400">{typedText.length}</div>
          <div className="text-xs text-slate-400">of {referenceText.length}</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 ring-1 ring-slate-700/50 shadow-inner flex-1 overflow-hidden flex flex-col">
          <div
            ref={containerRef}
            role="article"
            aria-label="Reference letter"
            className="overflow-y-auto flex-1 font-body text-base leading-relaxed text-slate-200 space-y-0 pr-2"
          >
            <div className="whitespace-pre-wrap break-words">
              {referenceText.split('').map((char, index) => {
                const status = getCharacterStatus(index)
                let colorClass = 'text-slate-400'
                let bgClass = ''
                
                if (status === 'correct') {
                  colorClass = 'text-green-300 font-medium'
                  bgClass = 'bg-green-500/20 rounded px-0.5'
                } else if (status === 'incorrect') {
                  colorClass = 'text-red-400 font-medium'
                  bgClass = 'bg-red-500/30 rounded px-0.5'
                } else if (index < typedText.length) {
                  colorClass = 'text-red-400'
                  bgClass = 'bg-red-500/20 rounded px-0.5'
                }

                return (
                  <span
                    key={index}
                    data-char-index={index}
                    className={`transition-all duration-75 ${colorClass} ${bgClass} ${
                      char === '\n' ? 'block' : ''
                    }`}
                  >
                    {char === '\n' ? <br /> : char}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-slate-300">Correct</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-slate-300">Wrong</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded bg-slate-500/40"></div>
            <span className="text-slate-300">Pending</span>
          </div>
        </div>

        {typedText.length > 0 && (
          <div className="bg-slate-800/50 rounded-lg p-3 mt-3">
            <p className="text-xs text-slate-400 mb-1">Current Accuracy</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-teal-500 to-teal-400 h-full transition-all duration-300"
                  style={{ width: `${accuracy}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-teal-400 min-w-fit">{accuracy}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
