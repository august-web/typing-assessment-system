import { TypingMetrics } from '../types'

/**
 * Generates the reference text with the student's name dynamically inserted.
 * The student must type their own name where indicated.
 */
export const getReferenceText = (studentName: string = ''): string => {
  if (!studentName) {
    studentName = '(Student Enters Name Here)'
  }

  return `High Priest Academy School,
Post Office Box KN 2012,
Kaneshie-Accra.

14th April, 2026

Dear Pastor Amponsah,

I am very happy to write this letter to you. You have been a blessing to me and my family. I want to use this opportunity to thank you and All World Share Organization for your massive support.

Thank you Pastor Andrews and your team for sponsoring us with these computers. They are really helping us in learning. May God Almighty bless you and give you long life.

Thank you Pastor Amponsah and your team. Thank you High Priest Academy.

Your Student,
${studentName}...`
}

/**
 * Normalizes text by replacing multiple consecutive spaces with a single space
 * and trimming leading/trailing whitespace. Preserves line breaks.
 */
export const normalizeText = (text: string): string => {
  return text
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trim())
    .join('\n')
}

export const calculateWPM = (
  totalCharactersTyped: number,
  timeElapsedMinutes: number
): number => {
  if (timeElapsedMinutes === 0) return 0
  return Math.round((totalCharactersTyped / 5) / timeElapsedMinutes)
}

export const calculateAccuracy = (
  correctCharacters: number,
  totalCharactersTyped: number
): number => {
  if (totalCharactersTyped === 0) return 100
  return Math.round((correctCharacters / totalCharactersTyped) * 100)
}

export const calculateErrors = (
  totalCharactersTyped: number,
  correctCharacters: number
): number => {
  return totalCharactersTyped - correctCharacters
}

export const calculateProgress = (
  totalCharactersTyped: number,
  referenceTextLength: number
): number => {
  if (referenceTextLength === 0) return 0
  return Math.round((totalCharactersTyped / referenceTextLength) * 100)
}

export const getPerformanceRating = (
  wpm: number,
  accuracy: number
): 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement' => {
  if (wpm >= 50 && accuracy >= 95) return 'Excellent'
  if (wpm >= 35 && accuracy >= 85) return 'Good'
  if (wpm >= 20 && accuracy >= 70) return 'Fair'
  return 'Needs Improvement'
}

export const compareTexts = (
  typedText: string,
  referenceText: string
): { correctCharacters: number; characterComparison: boolean[] } => {
  const characterComparison: boolean[] = []
  let correctCharacters = 0

  for (let i = 0; i < typedText.length; i++) {
    // Character-by-character comparison - user must type exactly as shown
    const isCorrect = typedText[i] === referenceText[i]
    characterComparison.push(isCorrect)
    if (isCorrect) correctCharacters++
  }

  return { correctCharacters, characterComparison }
}

export const calculateMetrics = (
  typedText: string,
  timeRemaining: number,
  studentName: string = ''
): TypingMetrics => {
  const referenceText = getReferenceText(studentName)
  const totalCharactersTyped = typedText.length
  const timeElapsed = (1800 - timeRemaining) / 60 // Convert seconds to minutes
  const timeElapsedMinutes = Math.max(timeElapsed, 0.016667) // Minimum 1 second

  const { correctCharacters } = compareTexts(typedText, referenceText)
  const wpm = calculateWPM(totalCharactersTyped, timeElapsedMinutes)
  const accuracy = calculateAccuracy(correctCharacters, totalCharactersTyped)
  const errors = calculateErrors(totalCharactersTyped, correctCharacters)
  const progress = calculateProgress(totalCharactersTyped, referenceText.length)

  return {
    wpm,
    accuracy,
    errors,
    progress,
    totalCharactersTyped,
    correctCharacters
  }
}
