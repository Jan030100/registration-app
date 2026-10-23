# Registration App

Full-stack user registration & authentication system.

## Stack
- Frontend: React + Vite + TypeScript
- Backend: Express + TypeScript
- Database: SQLite + Prisma (added in Stage 3)
- Auth: JWT + bcrypt (added in later stages)

## Structure
- `client/` — React frontend (port 5173)
- `server/` — Express backend (port 3001)

## Local Development
```bash
# Terminal 1 — backend
cd server
npm run dev

# Terminal 2 — frontend
cd client
npm run dev