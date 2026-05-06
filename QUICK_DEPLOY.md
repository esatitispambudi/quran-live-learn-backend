# 🚀 Quick Deployment Commands

## Persiapan (Local)

```bash
# 1. Masuk ke project directory
cd c:\xampp\htdocs\ai\quran-live-learn

# 2. Initialize Git (jika belum)
git init

# 3. Add semua files
git add .

# 4. Commit initial
git commit -m "Initial: Quran Live Learn - Ready for production"

# 5. Verify dependencies
npm install

# 6. Test backend locally
npm run dev:backend

# 7. Test frontend locally (di terminal baru)
npm run dev:frontend
```

## Deployment ke GitHub

```bash
# 1. Buat repository di https://github.com/new
# Nama: quran-live-learn

# 2. Add remote
git remote add origin https://github.com/YOUR_USERNAME/quran-live-learn.git

# 3. Push
git branch -M main
git push -u origin main

# Sekarang kode ada di GitHub!
```

## Deployment ke Vercel

### Backend

```bash
# Option A: Via Vercel CLI
npm install -g vercel
cd backend
vercel

# Option B: Via Web Dashboard (Recommended)
# 1. Login ke https://vercel.com
# 2. New Project
# 3. Import Repository: quran-live-learn
# 4. Root Directory: backend
# 5. Add Environment Variables (lihat di bawah)
# 6. Deploy!
```

### Environment Variables untuk Backend (di Vercel)

```
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=AIzaSyBWVDzn5w-6Yjo_F_PpkZnBxBuYcfkoE3g
GEMINI_API_VERSION=v1beta
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend

```bash
# 1. Update .env.production dengan backend URL dari Vercel
# Edit: frontend/.env.production
REACT_APP_API_URL=https://your-backend-domain.vercel.app/api
REACT_APP_WS_URL=wss://your-backend-domain.vercel.app/api

# 2. Commit changes
git add frontend/.env.production
git commit -m "Update: Frontend points to production backend"
git push

# 3. Deploy ke Vercel
# 1. Di Vercel Dashboard
# 2. New Project
# 3. Import Repository: quran-live-learn
# 4. Root Directory: frontend
# 5. Framework: Create React App
# 6. Build Command: npm run build
# 7. Output Directory: build
# 8. Add Environment Variables (sama seperti .env.production)
# 9. Deploy!
```

## Testing Deployment

```bash
# 1. Backend Health Check
curl https://your-backend.vercel.app/api/health

# Expected:
# {"status":"ok","timestamp":"2026-04-29T..."}

# 2. Get Surah Metadata
curl https://your-backend.vercel.app/api/quran/meta

# 3. Load Surah 1
curl "https://your-backend.vercel.app/api/quran/surah/1?translationCode=id.indonesian"

# 4. Open Frontend
# https://your-frontend.vercel.app
# Test: Load surah, play audio, check translation
```

## Troubleshooting Deployment

```bash
# 1. Check Backend Logs
# Vercel Dashboard → your-backend → Deployments → Logs

# 2. Check Frontend Build Logs
# Vercel Dashboard → your-frontend → Deployments → Logs

# 3. Test API locally before deploy
npm run dev:backend

# 4. If translation still wrong, redeploy backend
git add backend/src/services/aiService.js
git commit -m "Fix: Improved translation prompts"
git push
# (Vercel auto-redeploy)

# 5. Clear browser cache
# Ctrl+Shift+Delete → Clear all
```

## Important Notes

⚠️ **API Key Security**
- JANGAN commit .env ke GitHub
- Gunakan Vercel environment variables dashboard
- Jika API key exposed, regenerate di Google Cloud Console

⚠️ **Model Availability**
- Saat ini: `gemini-2.5-flash`
- Alternative: `gemini-pro`, `gemini-1.5-pro`
- Jika error "not found", coba model lain

⚠️ **CORS Configuration**
- Backend must know frontend URL
- Set `FRONTEND_URL` di backend env variables
- Format: `https://domain.vercel.app` (tanpa trailing slash)

---

## Summary Domains

Setelah deployment:
- **Frontend**: `https://quran-live-learn-frontend.vercel.app` (example)
- **Backend**: `https://quran-live-learn-backend.vercel.app` (example)
- **Health**: `https://quran-live-learn-backend.vercel.app/api/health`

Share domain-domain ini ke users untuk akses aplikasi!
