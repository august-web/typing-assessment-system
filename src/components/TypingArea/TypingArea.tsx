import React, { useEffect } from 'react'
import { Keyboard, AlertCircle, Lock } from 'lucide-react'

interface TypingAreaProps {
  value: string
  onChange: (text: string) => void
  disabled: boolean
  hasMistake: boolean
  onStart?: () => void
  maxLength?: number
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  value,
  onChange,
  disabled,
  hasMistake,
  onStart,
  maxLength = 10000
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Prevent cheating: disable copy, paste, cut, right-click
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
    const newValue = e.target.value
    
    // Trigger onStart callback on first keystroke
    if (onStart && value.length === 0 && newValue.length > 0) {
      onStart()
    }
    
    // Enforce character limit
    if (newValue.length <= maxLength) {
      onChange(newValue)
    }
  }

  const isFocused = textareaRef.current === document.activeElement

  return (
    <div className={`glass-dark rounded-3xl shadow-lg p-8 border transition-all duration-300 flex flex-col h-full ${
      isFocused ? 'border-teal-500/50 shadow-lg shadow-teal-500/20' : 'border-slate-700/50'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-teal-500/30 flex items-center justify-center">
            <Keyboard className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Typing Area</h3>
            <p className="text-xs text-slate-400">Type the letter exactly</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-400">{value.length}</div>
          <div className="text-xs text-slate-400">/ {maxLength}</div>
        </div>
      </div>

      {/* Textarea */}
      <div className="flex-1 flex flex-col">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Start typing the letter here. Your response will appear here character by character..."
          maxLength={maxLength}
          className={`flex-1 px-5 py-4 bg-slate-800/50 backdrop-blur-sm border-2 rounded-2xl focus:outline-none resize-none font-body text-base leading-relaxed transition-all duration-200 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'text-slate-100'
          } ${
            hasMistake 
              ? 'border-red-500/60 text-red-300' 
              : isFocused
              ? 'border-teal-500 text-slate-100' 
              : 'border-slate-700 text-slate-200'
          } placeholder:text-slate-500`}
        />
      </div>

      {/* Error/Warning Box */}
      {hasMistake && (
        <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-4 flex items-start gap-3 animate-slide-in">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-300">Mistake Detected</p>
            <p className="text-xs text-red-200/80 mt-1">
              You've made a typing error. You cannot delete it. Continue typing carefully to maintain accuracy.
            </p>
          </div>
        </div>
      )}

      {/* Security & Tips */}
      <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Lock className="w-4 h-4 text-teal-400" />
            <span>No copy/paste</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Keyboard className="w-4 h-4 text-purple-400" />
            <span>Keyboard only</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>No deletion</span>
          </div>
        </div>
      </div>
    </div>
  )
}
