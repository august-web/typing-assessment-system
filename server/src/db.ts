import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'data', 'hpa_results.db')

export interface AssessmentResult {
  id: string
  studentName: string
  wpm: number
  accuracy: number
  errors: number
  timeTaken: number
  textCompleted: number
  date: string
  performanceRating: 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement'
  createdAt: string
}

class DatabaseService {
  private db: Database.Database

  constructor() {
    this.db = new Database(dbPath)
    this.db.pragma('journal_mode = WAL')
    this.initializeSchema()
  }

  private initializeSchema(): void {
    const schema = `
      CREATE TABLE IF NOT EXISTS assessment_results (
        id TEXT PRIMARY KEY,
        studentName TEXT NOT NULL,
        wpm INTEGER NOT NULL,
        accuracy INTEGER NOT NULL,
        errors INTEGER NOT NULL,
        timeTaken INTEGER NOT NULL,
        textCompleted INTEGER NOT NULL,
        date TEXT NOT NULL,
        performanceRating TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_wpm ON assessment_results(wpm DESC);
      CREATE INDEX IF NOT EXISTS idx_accuracy ON assessment_results(accuracy DESC);
      CREATE INDEX IF NOT EXISTS idx_createdAt ON assessment_results(createdAt DESC);
      CREATE INDEX IF NOT EXISTS idx_studentName ON assessment_results(studentName);
    `

    schema.split(';').forEach(statement => {
      if (statement.trim()) {
        this.db.exec(statement)
      }
    })
  }

  /**
   * Save a new assessment result to the database
   */
  saveResult(result: AssessmentResult): void {
    const stmt = this.db.prepare(`
      INSERT INTO assessment_results (
        id, studentName, wpm, accuracy, errors, timeTaken, 
        textCompleted, date, performanceRating, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      result.id,
      result.studentName,
      result.wpm,
      result.accuracy,
      result.errors,
      result.timeTaken,
      result.textCompleted,
      result.date,
      result.performanceRating,
      result.createdAt
    )
  }

  /**
   * Get leaderboard by WPM (default sorting)
   */
  getLeaderboard(limit: number = 50): AssessmentResult[] {
    const stmt = this.db.prepare(`
      SELECT * FROM assessment_results
      ORDER BY wpm DESC, accuracy DESC, createdAt ASC
      LIMIT ?
    `)

    return stmt.all(limit) as AssessmentResult[]
  }

  /**
   * Get leaderboard by accuracy
   */
  getLeaderboardByAccuracy(limit: number = 50): AssessmentResult[] {
    const stmt = this.db.prepare(`
      SELECT * FROM assessment_results
      ORDER BY accuracy DESC, wpm DESC, createdAt ASC
      LIMIT ?
    `)

    return stmt.all(limit) as AssessmentResult[]
  }

  /**
   * Get all results for a specific student
   */
  getStudentResults(studentName: string): AssessmentResult[] {
    const stmt = this.db.prepare(`
      SELECT * FROM assessment_results
      WHERE studentName = ?
      ORDER BY createdAt DESC
    `)

    return stmt.all(studentName) as AssessmentResult[]
  }

  /**
   * Get a student's best result
   */
  getStudentBestResult(studentName: string): AssessmentResult | undefined {
    const stmt = this.db.prepare(`
      SELECT * FROM assessment_results
      WHERE studentName = ?
      ORDER BY wpm DESC, accuracy DESC
      LIMIT 1
    `)

    return stmt.get(studentName) as AssessmentResult | undefined
  }

  /**
   * Get total number of completed assessments
   */
  getTotalAssessments(): number {
    const stmt = this.db.prepare(`SELECT COUNT(*) as count FROM assessment_results`)
    const result = stmt.get() as { count: number }
    return result.count
  }

  /**
   * Get unique students count
   */
  getUniqueStudentsCount(): number {
    const stmt = this.db.prepare(`SELECT COUNT(DISTINCT studentName) as count FROM assessment_results`)
    const result = stmt.get() as { count: number }
    return result.count
  }

  /**
   * Get average stats
   */
  getAverageStats(): { avgWpm: number; avgAccuracy: number } {
    const stmt = this.db.prepare(`
      SELECT AVG(wpm) as avgWpm, AVG(accuracy) as avgAccuracy 
      FROM assessment_results
    `)

    const result = stmt.get() as { avgWpm: number; avgAccuracy: number }
    return {
      avgWpm: Math.round(result.avgWpm || 0),
      avgAccuracy: Math.round(result.avgAccuracy || 0)
    }
  }

  /**
   * Clear all data (for testing/reset only)
   */
  clearAll(): void {
    this.db.prepare('DELETE FROM assessment_results').run()
  }

  close(): void {
    this.db.close()
  }
}

export const db = new DatabaseService()
