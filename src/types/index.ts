export interface AssessmentResult {
  id: string
  studentName: string
  wpm: number
  accuracy: number
  errors: number
  timeTaken: number
  timeTakenSeconds?: number
  textCompleted: number
  date: string
  performanceRating: 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement'
}

export interface AppState {
  currentScreen: 'welcome' | 'exam' | 'results' | 'leaderboard'
  studentName: string
  timeRemaining: number
  typedText: string
  currentResult: AssessmentResult | null
}

export interface TimerState {
  timeRemaining: number
  isActive: boolean
  hasStarted: boolean
}

export interface TypingMetrics {
  wpm: number
  accuracy: number
  errors: number
  progress: number
  totalCharactersTyped: number
  correctCharacters: number
}
