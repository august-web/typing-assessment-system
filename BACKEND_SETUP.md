# High Priest Academy - Backend System Setup Guide

## Overview

You now have a complete backend system for storing student typing assessment results. Students can take tests on different computers, and all results are automatically stored on a central server and ranked in a global leaderboard.

## Architecture

```
┌─────────────────┐         HTTP API         ┌──────────────────┐
│   React App     │◄──────────────────────►  │  Express Server  │
│  (Client)       │                          │   (API Backend)  │
└─────────────────┘                          └──────────────────┘
                                                      │
                                                      │ SQLite
                                                      ▼
                                              ┌──────────────────┐
                                              │  SQLite Database │
                                              │  (Results Data)  │
                                              └──────────────────┘
```

## Components

### 1. React Client (`src/`)
- **API Client** (`src/utils/api.ts`): Communicates with the backend
- **Storage** (`src/utils/storage.ts`): Handles localStorage + server sync
- **Leaderboard Hook** (`src/hooks/useLeaderboard.ts`): Real-time leaderboard updates
- **Environment**: `.env.local` for API URL configuration

### 2. Express Server (`server/`)
- **Database Service** (`server/src/db.ts`): SQLite database management
- **API Routes** (`server/src/routes/results.ts`): REST endpoints
- **Main Server** (`server/src/server.ts`): Express app setup

### 3. SQLite Database (`server/data/hpa_results.db`)
- Stores all student results
- Indexed for fast queries
- Auto-created on first run

## Installation

### Step 1: Install Dependencies

**Client Dependencies:**
```bash
cd c:\Users\Augustine\high-priest
npm install
```

**Server Dependencies:**
```bash
cd c:\Users\Augustine\high-priest\server
npm install
```

### Step 2: Configure Environment

**Client** (already created as `.env.local`):
```env
VITE_API_URL=http://localhost:3001
```

**Server** (create `.env` from `.env.example`):
```bash
cd server
cp .env.example .env
```

## Running the Application

### Option 1: Development Mode (Recommended)

**Terminal 1 - Start the Server:**
```bash
cd c:\Users\Augustine\high-priest\server
npm run dev
```

Server runs on: `http://localhost:3001`

**Terminal 2 - Start the Client:**
```bash
cd c:\Users\Augustine\high-priest
npm run dev
```

Client runs on: `http://localhost:5173`

### Option 2: Production Mode

**Build & Run Server:**
```bash
cd server
npm run build
npm start
```

**Build & Run Client:**
```bash
cd c:\Users\Augustine\high-priest
npm run build
npm run preview
```

## How Data Flows

### Saving a Result

1. **Student completes test** → Metrics calculated
2. **Result object created** → Sent to API
3. **Server validates** → Saves to SQLite database
4. **Client stores locally** → localStorage fallback
5. **Leaderboard updates** → Real-time sync (every 10 seconds)

### If Server is Offline

1. **Result saved to localStorage** ✓
2. **Added to pending queue** → waiting for server
3. **When server comes back online** → Auto-sync (every 30 seconds)
4. **Results transferred to database** ✓

### Fetching Leaderboard

1. **User views leaderboard** 
2. **Client requests from server** (with sorting)
3. **Server queries SQLite** (optimized with indexes)
4. **Top 50 returned** 
5. **If server down** → Uses local cache

## API Endpoints

All endpoints available at: `http://localhost:3001/api/`

### Results
- `POST /results` - Save new assessment result
- `GET /results/leaderboard` - Get global rankings
- `GET /results/student/:name` - Get student's all results
- `GET /results/student/:name/best` - Get student's best result
- `GET /results/stats` - Get global statistics
- `GET /health` - Server health check

See [SERVER.md](SERVER.md) for detailed endpoint documentation.

## Key Features

### 1. **Persistent Storage**
   - Results stored in SQLite database
   - Not dependent on single computer
   - Survives server restarts

### 2. **Global Leaderboard**
   - Real-time rankings by WPM
   - Sort by accuracy or WPM
   - Historical tracking
   - Student performance history

### 3. **Offline Support**
   - Works even if server is down
   - Stores results locally
   - Auto-syncs when online
   - No data loss

### 4. **Multi-Device Access**
   - Students can test on any computer
   - Results instantly available on leaderboard
   - All results tracked individually

### 5. **Performance Rankings**
   - Real-time ranking updates
   - Performance ratings (Excellent, Good, Fair, Needs Improvement)
   - Statistics (average WPM, accuracy)

## Important Notes

### Database

- **Location**: `server/data/hpa_results.db`
- **Backup**: Regularly backup this file!
- **Size**: Grows with number of results (~500 bytes per result)
- **Indexes**: Automatically created for performance

### API Communication

- Server listens on port **3001** (configurable via `PORT` env var)
- Client connects to `VITE_API_URL` (default: `http://localhost:3001`)
- CORS enabled for client origin
- All requests use JSON format

### Security Considerations

For production deployment:
1. Add authentication (optional student ID verification)
2. Use HTTPS instead of HTTP
3. Add rate limiting to prevent abuse
4. Validate input data more strictly
5. Use environment-based configuration

## Troubleshooting

### "Cannot connect to server"
```bash
# Check if server is running
curl http://localhost:3001/api/health

# If not, restart server
cd server && npm run dev
```

### "Server is not saving results"
```bash
# Check server logs for errors
# Check database file exists: server/data/hpa_results.db
# Try deleting and restarting (will recreate database)
```

### "Leaderboard not updating"
```bash
# Check browser console for errors (F12)
# Verify VITE_API_URL in .env.local
# Ensure server is running and healthy
# Wait 10 seconds for auto-refresh
```

### "Results lost when offline"
```bash
# Results should be in browser localStorage
# Check: Open DevTools (F12) → Application → Local Storage
# Look for 'hpa_leaderboard' and 'hpa_pending_results'
```

## Database Management

### Backup Database
```bash
# Copy the database file
cp server/data/hpa_results.db server/data/hpa_results.backup.db
```

### Reset Database (Remove All Data)
```bash
# Delete the database file (will be recreated on next server start)
rm server/data/hpa_results.db
```

### View Database Contents (SQLite CLI)
```bash
# If you have SQLite installed
sqlite3 server/data/hpa_results.db
sqlite> SELECT * FROM assessment_results;
sqlite> .quit
```

## Deployment

### Local Network Deployment

To make accessible from other computers on your network:

1. **Get your computer's IP address:**
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. **Update client `.env.local`:**
   ```env
   VITE_API_URL=http://<YOUR_IP>:3001
   ```

3. **Start server** (listens on all network interfaces)
4. **Students access** via: `http://<YOUR_IP>:5173`

### Cloud Deployment

For deploying to services like Heroku, Railway, or Render:

1. Follow platform's instructions
2. Set environment variables (PORT, NODE_ENV, etc.)
3. Use: `npm run build && npm start`
4. Database file persists in `/data` directory

## Next Steps

1. **Test the system**
   - Start both server and client
   - Take a test as a student
   - Verify result appears in leaderboard

2. **Configure for your environment**
   - Update `VITE_API_URL` if needed
   - Adjust `PORT` if 3001 is taken
   - Customize CORS origins

3. **Backup strategy**
   - Set up regular database backups
   - Monitor disk space
   - Archive old results periodically

4. **Analytics** (Optional)
   - Track which students improve most
   - Identify struggling areas
   - Monitor performance trends

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review server logs
3. Check browser console (F12)
4. Verify environment variables
5. Ensure both client and server are running

---

**Happy Typing! 🎉**
