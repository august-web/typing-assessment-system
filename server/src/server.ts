import express from 'express'
import cors from 'cors'
import resultsRouter from './routes/results.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Routes
app.use(resultsRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'High Priest Academy Typing Server' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 High Priest Academy Typing Server running on http://localhost:${PORT}`)
  console.log(`📝 API docs available at http://localhost:${PORT}/api`)
})
