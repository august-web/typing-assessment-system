import React, { useEffect } from 'react'

interface TypingAreaProps {
  value: string
  onChange: (text: string) => void
  disabled: boolean
  hasMistake: boolean
  onStart?: () => void
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  value,
  onChange,
  disabled,
  hasMistake,
  onStart
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Prevent cheating: disable copy, paste, cut
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+C, Ctrl+V, Ctrl+X
      if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x'].includes(e.key.toLowerCase())) {
        e.preventDefault()
      }
      if (hasMistake && ['Backspace', 'Delete'].includes(e.key)) {
        e.preventDefault()
      }
    }

    const handleBeforeInput = (e: InputEvent) => {
      const selectionActive = textarea.selectionStart !== textarea.selectionEnd
      if (hasMistake && (e.inputType?.startsWith('delete') || selectionActive || e.inputType === 'insertFromPaste')) {
        e.preventDefault()
      }
    }

    const handleContextMenu = (e: Event) => {
      e.preventDefault()
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
    }

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault()
    }

    const handleCut = (e: ClipboardEvent) => {
      if (hasMistake) {
        e.preventDefault()
      }
    }

    textarea.addEventListener('keydown', handleKeyDown)
  textarea.addEventListener('beforeinput', handleBeforeInput)
    textarea.addEventListener('contextmenu', handleContextMenu)
    textarea.addEventListener('drop', handleDrop)
    textarea.addEventListener('paste', handlePaste)
  textarea.addEventListener('cut', handleCut)

    return () => {
      textarea.removeEventListener('keydown', handleKeyDown)
      textarea.removeEventListener('beforeinput', handleBeforeInput)
      textarea.removeEventListener('contextmenu', handleContextMenu)
      textarea.removeEventListener('drop', handleDrop)
      textarea.removeEventListener('paste', handlePaste)
      textarea.removeEventListener('cut', handleCut)
    }
  }, [hasMistake])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onStart && value.length === 0 && e.target.value.length > 0) {
      onStart()
    }
    onChange(e.target.value)
  }

  return (
    <div className="bg-slate-950/95 dark:bg-slate-900/95 rounded-[28px] shadow-soft p-6 border border-white/10">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        Type Your Response
      </h3>
      
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Start typing the letter here. Your typing speed and accuracy will be measured..."
        className="w-full h-48 px-4 py-3 bg-slate-900 border border-white/10 rounded-[20px] focus:border-primary-accent focus:outline-none resize-none font-mono text-sm leading-relaxed text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      />
      {hasMistake && (
        <div className="mt-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-200">
          A mistake has been entered. Backspace/delete is locked so you can continue typing without removing the error.
        </div>
      )}
      
      <p className="text-xs text-text-muted mt-3">
        💡 Tip: Typing will start the timer automatically on your first keystroke.
      </p>
    </div>
  )
}
