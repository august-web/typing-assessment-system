import { Router, Request, Response } from 'express'
import { db, AssessmentResult } from '../db.js'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

/**
 * POST /api/results
 * Save a new assessment result
 */
router.post('/api/results', (req: Request, res: Response): void => {
  try {
    const { studentName, wpm, accuracy, errors, timeTaken, textCompleted, performanceRating } = req.body

    // Validation
    if (!studentName || typeof wpm !== 'number' || typeof accuracy !== 'number') {
      res.status(400).json({ error: 'Missing or invalid required fields' })
      return
    }

    const result: AssessmentResult = {
      id: uuidv4(),
      studentName: studentName.trim(),
      wpm: Math.round(wpm),
      accuracy: Math.round(accuracy),
      errors: Math.round(errors || 0),
      timeTaken: Math.round(timeTaken || 0),
      textCompleted: Math.round(textCompleted || 0),
      date: new Date().toISOString(),
      performanceRating: performanceRating || 'Needs Improvement',
      createdAt: new Date().toISOString()
    }

    db.saveResult(result)

    res.status(201).json({
      success: true,
      message: 'Result saved successfully',
      data: result
    })
  } catch (error) {
    console.error('Error saving result:', error)
    res.status(500).json({ error: 'Failed to save result' })
  }
})

/**
 * GET /api/results/leaderboard
 * Get global leaderboard (paginated)
 */
router.get('/api/results/leaderboard', (req: Request, res: Response): void => {
  try {
    const sortBy = (req.query.sortBy as string) || 'wpm'
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100)

    let leaderboard: AssessmentResult[]

    if (sortBy === 'accuracy') {
      leaderboard = db.getLeaderboardByAccuracy(limit)
    } else {
      leaderboard = db.getLeaderboard(limit)
    }

    res.json({
      success: true,
      data: leaderboard,
      count: leaderboard.length,
      sortBy
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

/**
 * GET /api/results/student/:studentName
 * Get all results for a specific student
 */
router.get('/api/results/student/:studentName', (req: Request, res: Response): void => {
  try {
    const studentName = decodeURIComponent(req.params.studentName)
    const results = db.getStudentResults(studentName)

    res.json({
      success: true,
      data: results,
      count: results.length
    })
  } catch (error) {
    console.error('Error fetching student results:', error)
    res.status(500).json({ error: 'Failed to fetch student results' })
  }
})

/**
 * GET /api/results/student/:studentName/best
 * Get a student's best result
 */
router.get('/api/results/student/:studentName/best', (req: Request, res: Response): void => {
  try {
    const studentName = decodeURIComponent(req.params.studentName)
    const bestResult = db.getStudentBestResult(studentName)

    if (!bestResult) {
      res.status(404).json({ error: 'No results found for this student' })
      return
    }

    res.json({
      success: true,
      data: bestResult
    })
  } catch (error) {
    console.error('Error fetching best result:', error)
    res.status(500).json({ error: 'Failed to fetch best result' })
  }
})

/**
 * GET /api/results/stats
 * Get global statistics
 */
router.get('/api/results/stats', (req: Request, res: Response): void => {
  try {
    const totalAssessments = db.getTotalAssessments()
    const uniqueStudents = db.getUniqueStudentsCount()
    const avgStats = db.getAverageStats()

    res.json({
      success: true,
      data: {
        totalAssessments,
        uniqueStudents,
        averageWpm: avgStats.avgWpm,
        averageAccuracy: avgStats.avgAccuracy
      }
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({ error: 'Failed to fetch statistics' })
  }
})

export default router
