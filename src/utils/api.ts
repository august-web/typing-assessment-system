import { AssessmentResult } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

class ResultsAPI {
  /**
   * Save an assessment result to the server
   */
  async saveResult(result: Omit<AssessmentResult, 'id'>): Promise<AssessmentResult | null> {
    try {
      const response = await fetch(`${API_URL}/api/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
      })

      if (!response.ok) {
        console.error('Failed to save result:', response.statusText)
        return null
      }

      const data: ApiResponse<AssessmentResult> = await response.json()
      return data.data || null
    } catch (error) {
      console.error('Error saving result:', error)
      return null
    }
  }

  /**
   * Fetch global leaderboard
   */
  async getLeaderboard(
    sortBy: 'wpm' | 'accuracy' = 'wpm',
    limit: number = 50
  ): Promise<AssessmentResult[]> {
    try {
      const params = new URLSearchParams({
        sortBy,
        limit: limit.toString()
      })

      const response = await fetch(`${API_URL}/api/results/leaderboard?${params}`)

      if (!response.ok) {
        console.error('Failed to fetch leaderboard:', response.statusText)
        return []
      }

      const data: ApiResponse<AssessmentResult[]> = await response.json()
      return data.data || []
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      return []
    }
  }

  /**
   * Get all results for a specific student
   */
  async getStudentResults(studentName: string): Promise<AssessmentResult[]> {
    try {
      const encodedName = encodeURIComponent(studentName)
      const response = await fetch(`${API_URL}/api/results/student/${encodedName}`)

      if (!response.ok) {
        console.error('Failed to fetch student results:', response.statusText)
        return []
      }

      const data: ApiResponse<AssessmentResult[]> = await response.json()
      return data.data || []
    } catch (error) {
      console.error('Error fetching student results:', error)
      return []
    }
  }

  /**
   * Get a student's best result
   */
  async getStudentBestResult(studentName: string): Promise<AssessmentResult | null> {
    try {
      const encodedName = encodeURIComponent(studentName)
      const response = await fetch(`${API_URL}/api/results/student/${encodedName}/best`)

      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        console.error('Failed to fetch best result:', response.statusText)
        return null
      }

      const data: ApiResponse<AssessmentResult> = await response.json()
      return data.data || null
    } catch (error) {
      console.error('Error fetching best result:', error)
      return null
    }
  }

  /**
   * Get global statistics
   */
  async getStats(): Promise<{
    totalAssessments: number
    uniqueStudents: number
    averageWpm: number
    averageAccuracy: number
  } | null> {
    try {
      const response = await fetch(`${API_URL}/api/results/stats`)

      if (!response.ok) {
        console.error('Failed to fetch stats:', response.statusText)
        return null
      }

      const data = await response.json()
      return data.data || null
    } catch (error) {
      console.error('Error fetching stats:', error)
      return null
    }
  }

  /**
   * Check if server is available
   */
  async isServerAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/health`, {
        method: 'GET'
      })
      return response.ok
    } catch {
      return false
    }
  }
}

export const resultsAPI = new ResultsAPI()
