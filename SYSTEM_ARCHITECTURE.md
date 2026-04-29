# 🏗️ System Architecture

## Local Development Setup

```
Localhost Development
├─ Frontend: http://localhost:3003
│  ├─ React App
│  ├─ Quran Display
│  ├─ Live Chat (WebSocket)
│  └─ Learn/Practice Interface
│
└─ Backend: http://localhost:5000
   ├─ Express Server
   ├─ Gemini AI Service
   ├─ Quran API Routes
   ├─ IQRO Learning Routes
   └─ WebSocket Server (ws://localhost:5000/ws)
```

## Production Deployment (Vercel)

```
Production Deployment
├─ Frontend: https://quran-live-learn-frontend.vercel.app
│  ├─ React Built App
│  ├─ Environment: .env.production
│  ├─ API URL: https://[backend].vercel.app/api
│  └─ WS URL: wss://[backend].vercel.app/api
│
└─ Backend: https://quran-live-learn-backend.vercel.app
   ├─ Node.js Runtime (Vercel)
   ├─ Environment Variables (Vercel Dashboard)
   ├─ AI Service (Gemini API)
   ├─ Quran Routes
   ├─ IQRO Routes
   └─ WebSocket Server (wss://[domain]/api)
```

## Data Flow

### 1. Load Surah Flow
```
Frontend (React)
    ↓
[Load Surah 1]
    ↓
Backend API: GET /api/quran/surah/1
    ↓
1. Fetch Arabic from external API
2. Fetch Translation (2 methods):
   - Method A: External API (fast)
   - Method B: Gemini AI (accurate)
3. Merge results
    ↓
Return: { arabic: [], translation: [] }
    ↓
Frontend Display
```

### 2. Translation Flow (Fixed!)
```
Backend receives: ["السلام عليكم ورحمة الله", ...]
    ↓
Gemini Model: gemini-2.5-flash
    ↓
Prompt:
"Translate each ayah to Indonesian.
Return ONLY complete translations, one per line.
No numbers, explanations, or formatting."
    ↓
AI Response:
"Semua puji bagi Allah, Tuhan seluruh alam
Segala rahmat dan berkah hanya milik Allah
..."
    ↓
Parse & Clean Response
    ↓
Return: ["Semua puji bagi Allah...", "Segala rahmat...", ...]
    ↓
Frontend Display ✓ (Complete sentences, not per-character!)
```

### 3. Audio Play Flow
```
Frontend: Play button clicked
    ↓
Backend API: GET /api/quran/audio/1
    ↓
1. Fetch audio metadata from external API
2. Return audio URL
    ↓
Frontend: Audio element plays URL
    ↓
Audio plays ✓
```

### 4. Learn Mode Flow
```
Frontend: Click "Learn" on Ayah
    ↓
Backend API: Generate learning content
    ↓
Gemini Model generates:
- Meaning & Explanation
- Pronunciation Tips
- Historical Context
- Life Application
    ↓
Return formatted content
    ↓
Frontend Display in Modal ✓
```

### 5. Practice Mode (Recording)
```
Frontend: Click "Practice" & Record
    ↓
User records audio
    ↓
Send to: POST /api/quran/analyze
Body: { ayahText, audioTranscription }
    ↓
Gemini AI Analysis:
- Accuracy percentage
- Pronunciation errors
- Improvement suggestions
- Motivation message
    ↓
Return JSON analysis
    ↓
Frontend: Display results ✓
```

## Deployment Architecture

### Backend Deployment (Vercel)
```
GitHub (main branch)
    ↓
Vercel Hook (auto-trigger on push)
    ↓
Build: npm install (backend)
       npm install (dependencies)
    ↓
Deploy: Node.js Runtime
    ↓
Environment Variables (from Vercel Dashboard):
├─ GEMINI_API_KEY
├─ GEMINI_MODEL
├─ GEMINI_API_VERSION
├─ FRONTEND_URL
├─ NODE_ENV=production
└─ PORT=5000
    ↓
Live: https://[backend-domain].vercel.app
```

### Frontend Deployment (Vercel)
```
GitHub (main branch)
    ↓
Vercel Hook (auto-trigger on push)
    ↓
Build: npm run build
       Output: build/ directory
    ↓
Deploy: Static hosting
    ↓
Environment Variables (from Vercel Dashboard):
├─ REACT_APP_API_URL=[backend-domain]
├─ REACT_APP_WS_URL=wss://[backend-domain]
└─ REACT_APP_ENV=production
    ↓
Live: https://[frontend-domain].vercel.app
```

## Environment Variables Map

### Local Development (.env files)

**Backend** (`backend/.env`):
```
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=AIzaSyBWVDzn5w-6Yjo_F_PpkZnBxBuYcfkoE3g
GEMINI_API_VERSION=v1beta
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=http://localhost:3003
```

**Frontend** (`frontend/.env`):
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:5000/api
REACT_APP_ENV=development
```

### Production (Vercel Environment Variables)

**Backend** (Vercel Dashboard → Settings → Environment Variables):
```
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=AIzaSyBWVDzn5w-6Yjo_F_PpkZnBxBuYcfkoE3g
GEMINI_API_VERSION=v1beta
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=https://quran-live-learn-frontend.vercel.app
```

**Frontend** (Vercel Dashboard → Settings → Environment Variables):
```
REACT_APP_API_URL=https://quran-live-learn-backend.vercel.app/api
REACT_APP_WS_URL=wss://quran-live-learn-backend.vercel.app/api
REACT_APP_ENV=production
```

## API Endpoints

### Health Check
```
GET /api/health
Response: { status: "ok", timestamp: "..." }
```

### Quran Routes
```
GET  /api/quran/meta                      → List all surahs
GET  /api/quran/surah/:number             → Load surah + translation
GET  /api/quran/audio/:number             → Get audio metadata
GET  /api/quran/translations              → Available translations
POST /api/quran/translate                 → Translate single ayah
```

### IQRO Routes
```
GET  /api/iqro/lessons                    → List IQRO lessons
GET  /api/iqro/lesson/:id                 → Get lesson details
POST /api/iqro/progress                   → Update progress
```

### WebSocket
```
ws://localhost:5000/ws  (local)
wss://[domain]/api      (production)

Events:
- connection: Client connected
- message: New message (Live Chat)
- error: Connection error
- close: Connection closed
```

## External APIs Used

1. **Gemini API** (Google)
   ```
   Endpoint: https://generativelanguage.googleapis.com/v1beta/...
   Model: gemini-2.5-flash
   Uses: Translation, Learning Content, Analysis
   ```

2. **Quran Cloud API** (External)
   ```
   Endpoint: https://api.alquran.cloud/v1/...
   Uses: Arabic text, Audio URLs, Alternative translations
   ```

## Error Handling Flow

```
API Request
    ↓
Try: Fetch data
    ↓
If Error:
├─ Network Error → Return mock data with warning
├─ API Error → Try fallback method
├─ Gemini Error → Use external API fallback
└─ Parse Error → Return structured error response
    ↓
Frontend: Display appropriate message to user
```

## Performance Optimization

1. **Caching**
   - Frontend caches surah data in localStorage
   - Audio URLs cached in memory

2. **API Calls**
   - Lazy loading translations
   - Sequential requests (more reliable than parallel)
   - Fallback mechanisms for robustness

3. **WebSocket**
   - Connection pooling
   - Auto-reconnect on disconnect
   - Message queuing

## Security Features

1. **CORS**
   - Only whitelisted origins allowed
   - Backend validates FRONTEND_URL

2. **API Key**
   - Stored in environment variables
   - Never exposed in logs (except first 10 chars for debug)
   - Separate keys for dev/prod

3. **Data Validation**
   - Input sanitization
   - Response validation
   - Error messages don't leak sensitive info

---

**Architecture Version**: 1.0.0
**Last Updated**: 29 April 2026
