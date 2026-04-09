import { useState, useCallback } from 'react'
import { AssessmentResult } from '../types'
import {
  getLeaderboard,
  getTopLeaderboard,
  saveToLeaderboard,
  clearLeaderboard as clearLeaderboardStorage,
  sortLeaderboard as sortLeaderboardUtil
} from '../utils/storage'

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<AssessmentResult[]>(() =>
    getTopLeaderboard(10)
  )
  const [sortBy, setSortBy] = useState<'wpm' | 'accuracy' | 'name'>('wpm')

  const loadLeaderboard = useCallback(() => {
    const data = getTopLeaderboard(10)
    setLeaderboard(data)
  }, [])

  const addEntry = useCallback((result: AssessmentResult) => {
    saveToLeaderboard(result)
    loadLeaderboard()
  }, [loadLeaderboard])

  const sortLeaderboard = useCallback(
    (sortKey: 'wpm' | 'accuracy' | 'name') => {
      setSortBy(sortKey)
      const sorted = sortLeaderboardUtil(leaderboard, sortKey)
      setLeaderboard(sorted)
    },
    [leaderboard]
  )

  const clearLeaderboard = useCallback(() => {
    clearLeaderboardStorage()
    setLeaderboard([])
  }, [])

  const getAllLeaderboard = useCallback((): AssessmentResult[] => {
    return getLeaderboard()
  }, [])

  return {
    leaderboard,
    sortBy,
    addEntry,
    sortLeaderboard,
    clearLeaderboard,
    loadLeaderboard,
    getAllLeaderboard
  }
}
