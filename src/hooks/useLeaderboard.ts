import { useState, useCallback, useEffect } from 'react'
import { AssessmentResult } from '../types'
import {
  getLeaderboard,
  getTopLeaderboard,
  saveToLeaderboard,
  clearLeaderboard as clearLeaderboardStorage,
  sortLeaderboard as sortLeaderboardUtil,
  syncPendingResults
} from '../utils/storage'

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<AssessmentResult[]>([])
  const [sortBy, setSortBy] = useState<'wpm' | 'accuracy' | 'name'>('wpm')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSyncing, setIsSyncing] = useState<boolean>(false)

  // Load leaderboard on mount and periodically refresh
  useEffect(() => {
    loadLeaderboard()

    // Refresh leaderboard every 10 seconds to see real-time updates
    const interval = setInterval(() => {
      loadLeaderboard()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Try to sync pending results on mount and periodically
  useEffect(() => {
    syncPendingChanges()

    const interval = setInterval(() => {
      syncPendingChanges()
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const syncPendingChanges = async () => {
    try {
      setIsSyncing(true)
      const count = await syncPendingResults()
      if (count > 0) {
        // Reload leaderboard after sync
        await loadLeaderboard()
      }
    } catch (error) {
      console.error('Failed to sync pending results:', error)
    } finally {
      setIsSyncing(false)
    }
  }

  const loadLeaderboard = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getTopLeaderboard(10)
      setLeaderboard(data)
    } catch (error) {
      console.error('Error loading leaderboard:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const addEntry = useCallback(async (result: AssessmentResult) => {
    try {
      await saveToLeaderboard(result)
      await loadLeaderboard()
    } catch (error) {
      console.error('Error adding entry:', error)
    }
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

  const getAllLeaderboard = useCallback(async (): Promise<AssessmentResult[]> => {
    return await getLeaderboard('wpm')
  }, [])

  return {
    leaderboard,
    sortBy,
    addEntry,
    sortLeaderboard,
    clearLeaderboard,
    loadLeaderboard,
    getAllLeaderboard,
    isLoading,
    isSyncing
  }
}
