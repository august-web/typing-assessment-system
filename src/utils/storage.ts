import { AssessmentResult } from '../types'

const LEADERBOARD_KEY = 'hpa_leaderboard'

export const saveToLeaderboard = (result: AssessmentResult): void => {
  const leaderboard = getLeaderboard()
  leaderboard.push(result)
  leaderboard.sort((a, b) => b.wpm - a.wpm)
  
  // Keep only top 100 entries
  const topEntries = leaderboard.slice(0, 100)
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(topEntries))
}

export const getLeaderboard = (): AssessmentResult[] => {
  const stored = localStorage.getItem(LEADERBOARD_KEY)
  return stored ? JSON.parse(stored) : []
}

export const getTopLeaderboard = (limit: number = 10): AssessmentResult[] => {
  const leaderboard = getLeaderboard()
  return leaderboard.slice(0, limit)
}

export const clearLeaderboard = (): void => {
  localStorage.removeItem(LEADERBOARD_KEY)
}

export const sortLeaderboard = (
  leaderboard: AssessmentResult[],
  sortBy: 'wpm' | 'accuracy' | 'name'
): AssessmentResult[] => {
  const sorted = [...leaderboard]
  
  switch (sortBy) {
    case 'wpm':
      return sorted.sort((a, b) => b.wpm - a.wpm)
    case 'accuracy':
      return sorted.sort((a, b) => b.accuracy - a.accuracy)
    case 'name':
      return sorted.sort((a, b) => a.studentName.localeCompare(b.studentName))
    default:
      return sorted
  }
}
