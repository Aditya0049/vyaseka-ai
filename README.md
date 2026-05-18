# Vyaseka AI – Monorepo

## Structure
```
vyaseka-ai/
├─ vyaseka-web/   # Next.js 14 frontend  → http://localhost:3000
└─ vyaseka-api/   # Express backend       → http://localhost:3001
```

## Quick Start (no API keys needed)

```powershell
# Terminal 1 – Frontend
cd vyaseka-web
npm install
npm run dev

# Terminal 2 – Backend
cd vyaseka-api
npm install
npm run dev
```

Open http://localhost:3000

## Key Pages
| URL | Description |
|-----|-------------|
| `/` | Cinematic homepage |
| `/sign-in` | Login (demo: any email + password) |
| `/sign-up` | Register (demo: any credentials) |
| `/upload` | Drag-and-drop transcription workspace |
| `/dashboard` | Transcript history + usage stats |
| `/pricing` | Pricing plans |

## Demo Mode
- Auth uses `localStorage` (no Clerk keys required)
- Transcription returns a mock result (no OpenAI key required)
- Paywall triggers when freeMinutesLeft = 0

## Environment Variables (for production)
Copy `.env.example` files and fill in real values when you have API keys.
