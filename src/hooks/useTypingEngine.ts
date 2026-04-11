import { useState, useCallback } from 'react'
import { TypingMetrics } from '../types'
import { calculateMetrics, getReferenceText } from '../utils/calculations'
import { textComparison } from '../utils/textComparison'

export const useTypingEngine = (timeRemaining: number, studentName: string = '') => {
  const [typedText, setTypedText] = useState<string>('')
  const referenceText = getReferenceText(studentName)

  const handleTyping = useCallback((newText: string) => {
    // Allow only the first referenceText.length characters
    const limitedText = newText.slice(0, referenceText.length)
    setTypedText(limitedText)
  }, [referenceText.length])

  const getMetrics = useCallback((): TypingMetrics => {
    return calculateMetrics(typedText, timeRemaining, studentName)
  }, [typedText, timeRemaining, studentName])

  const getCharacterComparisons = useCallback(
    (): ('correct' | 'incorrect' | 'pending')[] => {
      return textComparison.getCharacterComparisons(typedText, referenceText)
    },
    [typedText, referenceText]
  )

  const hasMistake = useCallback((): boolean => {
    return typedText.split('').some((char, index) => char !== referenceText[index])
  }, [typedText, referenceText])

  const reset = useCallback(() => {
    setTypedText('')
  }, [])

  const getTypedCharacterStatus = useCallback(
    (index: number): 'correct' | 'incorrect' | 'pending' => {
      if (index >= typedText.length) return 'pending'
      return typedText[index] === referenceText[index] ? 'correct' : 'incorrect'
    },
    [typedText, referenceText]
  )

  return {
    typedText,
    handleTyping,
    getMetrics,
    getCharacterComparisons,
    getTypedCharacterStatus,
    hasMistake,
    reset,
    referenceText
  }
}
