# High Priest Academy - Backend Server

Express.js API server for the typing assessment system.

## Quick Start

```bash
npm install
npm run dev
```

Server runs on `http://localhost:3001`

## Scripts

- `npm run dev` - Development mode with auto-reload
- `npm start` - Production mode
- `npm run build` - Compile TypeScript

## Environment Variables

See `.env.example` for all available options.

```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## API Endpoints

- `POST /api/results` - Save assessment result
- `GET /api/results/leaderboard` - Get rankings
- `GET /api/results/student/:name` - Get student results
- `GET /api/results/stats` - Get statistics
- `GET /api/health` - Server health check

## Database

SQLite database automatically created in `data/hpa_results.db`

## Documentation

See [../SERVER.md](../SERVER.md) for complete API documentation.

See [../BACKEND_SETUP.md](../BACKEND_SETUP.md) for detailed setup guide.
