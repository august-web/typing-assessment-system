# High Priest Academy Typing Server

Backend API server for storing and retrieving student typing assessment results.

## Features

- **Persistent Storage**: SQLite database for storing all student results
- **Global Leaderboard**: Real-time rankings across all students
- **Student History**: Track individual student performance over time
- **Statistics**: Global performance metrics
- **Offline Support**: LocalStorage fallback when server is unavailable
- **Auto-Sync**: Pending results sync when connection is restored

## Setup

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file in the server directory:

```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Running the Server

### Development

```bash
npm run dev
```

The server will start on `http://localhost:3001`

### Production

```bash
npm run build
npm start
```

## API Endpoints

### Save Result
```
POST /api/results

Body:
{
  "studentName": "John Doe",
  "wpm": 65,
  "accuracy": 95,
  "errors": 3,
  "timeTaken": 900,
  "textCompleted": 95,
  "performanceRating": "Excellent"
}

Response:
{
  "success": true,
  "message": "Result saved successfully",
  "data": {
    "id": "uuid",
    "studentName": "John Doe",
    ...
  }
}
```

### Get Leaderboard
```
GET /api/results/leaderboard?sortBy=wpm&limit=50

Query Parameters:
- sortBy: 'wpm' | 'accuracy' (default: 'wpm')
- limit: 1-100 (default: 50)

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "studentName": "John Doe",
      "wpm": 65,
      "accuracy": 95,
      ...
    }
  ],
  "count": 50,
  "sortBy": "wpm"
}
```

### Get Student Results
```
GET /api/results/student/:studentName

Response:
{
  "success": true,
  "data": [
    { ... },
    { ... }
  ],
  "count": 5
}
```

### Get Student Best Result
```
GET /api/results/student/:studentName/best

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "studentName": "John Doe",
    "wpm": 65,
    "accuracy": 95,
    ...
  }
}
```

### Get Statistics
```
GET /api/results/stats

Response:
{
  "success": true,
  "data": {
    "totalAssessments": 150,
    "uniqueStudents": 45,
    "averageWpm": 42,
    "averageAccuracy": 88
  }
}
```

### Health Check
```
GET /api/health

Response:
{
  "status": "ok",
  "message": "High Priest Academy Typing Server"
}
```

## Database

The server uses SQLite with WAL (Write-Ahead Logging) for better concurrent access.

- **Location**: `server/data/hpa_results.db`
- **Auto-created** on first run
- **Indexes** on frequently queried fields for performance

### Schema

```sql
CREATE TABLE assessment_results (
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
```

## Deployment

### Local Network

1. Update the client's `.env.local`:
   ```env
   VITE_API_URL=http://<SERVER_IP>:3001
   ```

2. Start server with network binding:
   ```bash
   PORT=3001 npm start
   ```

### Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY src ./src
COPY tsconfig.json ./

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t hpa-typing-server .
docker run -p 3001:3001 -v $(pwd)/data:/app/data hpa-typing-server
```

### Cloud Deployment (Heroku, Railway, etc.)

1. Build the project: `npm run build`
2. Set environment variables on the platform
3. Use `npm start` as the start command

### Performance Tips

- **Database Backups**: Regularly backup `data/hpa_results.db`
- **Connection Pooling**: The server handles connection pooling automatically
- **Indexing**: Queries are optimized with indexes on frequently used fields
- **Caching**: Consider adding Redis for leaderboard caching if needed

## Troubleshooting

### Server not connecting

1. Check if server is running: `GET http://localhost:3001/api/health`
2. Check client `.env.local` for correct `VITE_API_URL`
3. Check CORS settings in `server.ts`

### Database locked

- SQLite with WAL should handle concurrent access
- If issues persist, rebuild database: delete `server/data/hpa_results.db`

### Results not syncing

- Check browser console for errors
- Verify server is accessible from client
- Check for pending results in browser localStorage

## Development

### Project Structure

```
server/
├── src/
│   ├── db.ts           # Database service
│   ├── server.ts       # Express server setup
│   └── routes/
│       └── results.ts  # API endpoints
├── data/               # Database storage
├── dist/               # Compiled output
├── package.json
├── tsconfig.json
└── .env
```

### Adding New Endpoints

1. Add route in `src/routes/results.ts`
2. Add database method in `src/db.ts`
3. Test with curl or Postman
4. Update this README

## License

This project is part of High Priest Academy.
