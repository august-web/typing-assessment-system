import { AssessmentResult } from '../types'
import { resultsAPI } from './api'

const LEADERBOARD_KEY = 'hpa_leaderboard'
const PENDING_RESULTS_KEY = 'hpa_pending_results'

/**
 * Save result to server (async) with localStorage fallback
 * Returns true if saved to server, false if only saved locally
 */
export const saveToLeaderboard = async (result: AssessmentResult): Promise<boolean> => {
  try {
    // Try to save to server
    const serverResult = await resultsAPI.saveResult({
      studentName: result.studentName,
      wpm: result.wpm,
      accuracy: result.accuracy,
      errors: result.errors,
      timeTaken: result.timeTaken,
      textCompleted: result.textCompleted,
      date: result.date,
      performanceRating: result.performanceRating
    })

    if (serverResult) {
      // Successfully saved to server
      // Still save to localStorage for offline support
      saveToLocalStorage(result)
      return true
    }
  } catch (error) {
    console.warn('Failed to save to server, using localStorage fallback:', error)
  }

  // Fallback: save to localStorage and queue for later sync
  saveToLocalStorage(result)
  queuePendingResult(result)
  return false
}

/**
 * Save result to localStorage (local-only)
 */
const saveToLocalStorage = (result: AssessmentResult): void => {
  const leaderboard = getLeaderboardLocal()
  leaderboard.push(result)
  leaderboard.sort((a, b) => b.wpm - a.wpm)

  // Keep only top 100 entries locally
  const topEntries = leaderboard.slice(0, 100)
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(topEntries))
}

/**
 * Queue a result for later sync when server becomes available
 */
const queuePendingResult = (result: AssessmentResult): void => {
  const pending = getPendingResults()
  pending.push(result)
  localStorage.setItem(PENDING_RESULTS_KEY, JSON.stringify(pending))
}

/**
 * Get pending results waiting to be synced
 */
export const getPendingResults = (): AssessmentResult[] => {
  const stored = localStorage.getItem(PENDING_RESULTS_KEY)
  return stored ? JSON.parse(stored) : []
}

/**
 * Sync pending results to server
 */
export const syncPendingResults = async (): Promise<number> => {
  const pending = getPendingResults()
  let syncedCount = 0

  for (const result of pending) {
    try {
      const serverResult = await resultsAPI.saveResult({
        studentName: result.studentName,
        wpm: result.wpm,
        accuracy: result.accuracy,
        errors: result.errors,
        timeTaken: result.timeTaken,
        textCompleted: result.textCompleted,
        date: result.date,
        performanceRating: result.performanceRating
      })

      if (serverResult) {
        syncedCount++
      }
    } catch (error) {
      console.error('Failed to sync result:', error)
    }
  }

  if (syncedCount > 0) {
    // Remove synced results from pending
    const remaining = pending.slice(syncedCount)
    if (remaining.length === 0) {
      localStorage.removeItem(PENDING_RESULTS_KEY)
    } else {
      localStorage.setItem(PENDING_RESULTS_KEY, JSON.stringify(remaining))
    }
  }

  return syncedCount
}

/**
 * Get local leaderboard (from localStorage only)
 */
export const getLeaderboardLocal = (): AssessmentResult[] => {
  const stored = localStorage.getItem(LEADERBOARD_KEY)
  return stored ? JSON.parse(stored) : []
}

/**
 * Fetch leaderboard from server with localStorage fallback
 */
export const getLeaderboard = async (sortBy: 'wpm' | 'accuracy' = 'wpm'): Promise<AssessmentResult[]> => {
  try {
    // Try to fetch from server
    const serverLeaderboard = await resultsAPI.getLeaderboard(sortBy, 50)
    if (serverLeaderboard.length > 0) {
      return serverLeaderboard
    }
  } catch (error) {
    console.warn('Failed to fetch leaderboard from server, using localStorage fallback:', error)
  }

  // Fallback to localStorage
  return getLeaderboardLocal()
}

export const getTopLeaderboard = async (limit: number = 10): Promise<AssessmentResult[]> => {
  const leaderboard = await getLeaderboard('wpm')
  return leaderboard.slice(0, limit)
}

export const clearLeaderboard = (): void => {
  localStorage.removeItem(LEADERBOARD_KEY)
  localStorage.removeItem(PENDING_RESULTS_KEY)
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
