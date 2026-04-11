import React, { useEffect } from 'react'

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

  return (
    <div className="bg-slate-950/95 dark:bg-slate-900/95 rounded-[28px] shadow-soft p-8 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
          Reference Text
        </h3>
        <div className="text-xs text-text-muted">
          {typedText.length} / {referenceText.length}
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/90 rounded-3xl p-6 ring-1 ring-white/10 shadow-inner">
        <div
          ref={containerRef}
          role="article"
          aria-label="Reference letter"
          className="max-h-96 overflow-y-auto font-mono text-sm leading-relaxed text-text-primary space-y-0"
        >
          <div className="whitespace-pre-wrap break-words">
            {referenceText.split('').map((char, index) => {
              const status = getCharacterStatus(index)
              let colorClass = 'text-slate-400'
              let bgClass = ''
              
              if (status === 'correct') {
                colorClass = 'text-green-400 font-semibold'
                bgClass = 'bg-green-950/40'
              } else if (status === 'incorrect') {
                colorClass = 'text-red-400 font-semibold'
                bgClass = 'bg-red-950/50'
              } else if (index < typedText.length) {
                colorClass = 'text-red-400'
                bgClass = 'bg-red-950/30'
              }

              return (
                <span
                  key={index}
                  data-char-index={index}
                  className={`transition-all duration-100 ${colorClass} ${bgClass} ${
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

      <div className="mt-4 pt-4 border-t border-white/10 text-xs text-text-muted space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded bg-green-400"></span>
          <span>Correct characters</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded bg-red-400"></span>
          <span>Incorrect characters</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded bg-slate-400"></span>
          <span>Pending</span>
        </div>
      </div>
    </div>
  )
}
