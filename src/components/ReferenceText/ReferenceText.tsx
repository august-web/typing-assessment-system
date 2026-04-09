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
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
        Reference Text
      </h3>

      <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/90 rounded-3xl p-6 ring-1 ring-white/10 shadow-inner">
        <div
          ref={containerRef}
          role="article"
          aria-label="Reference letter"
          className="max-h-96 overflow-y-auto font-display text-base leading-relaxed text-text-primary"
        >
          <p className="whitespace-pre-wrap break-words">
          {referenceText.split('').map((char, index) => {
            const status = getCharacterStatus(index)
            let colorClass = 'text-slate-400'
            
            if (status === 'correct') {
              colorClass = 'text-primary-secondary font-semibold'
            } else if (status === 'incorrect') {
              colorClass = 'text-primary-error font-semibold bg-red-100/80 dark:bg-red-950'
            } else if (index < typedText.length) {
              colorClass = 'text-primary-error'
            }

            return (
              <span
                key={index}
                data-char-index={index}
                className={`transition-colors duration-100 ${colorClass}`}
              >
                {char}
              </span>
            )
          })}
          </p>
        </div>
      </div>

  <div className="mt-4 pt-4 border-t border-white/10 text-xs text-text-muted">
        <p>
          <span className="inline-block w-3 h-3 rounded mr-2 bg-primary-secondary"></span>
          Correct characters
        </p>
        <p className="mt-2">
          <span className="inline-block w-3 h-3 rounded mr-2 bg-primary-error"></span>
          Incorrect characters
        </p>
      </div>
    </div>
  )
}
