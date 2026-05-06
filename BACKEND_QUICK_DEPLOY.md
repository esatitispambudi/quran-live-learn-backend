# ⚡ BACKEND DEPLOYMENT QUICK COMMANDS

**Skenario**: Backend ke Vercel, Frontend di-handle sendiri nanti

---

## 📝 STEP 1: Git Setup (5 menit)

```bash
# 1. Masuk project
cd c:\xampp\htdocs\ai\quran-live-learn

# 2. Initialize Git
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "Backend: Production Ready for Vercel"

# 5. Add remote (ganti YOUR_USERNAME dengan GitHub username Anda)
git remote add origin https://github.com/YOUR_USERNAME/quran-live-learn-backend.git

# 6. Rename branch
git branch -M main

# 7. Push ke GitHub
git push -u origin main
```

**Output yang diharapkan:**
```
Enumerating objects: XXX, done.
...
* [new branch]      main -> main
Branch 'main' set up to track remote tracking branch 'main' from 'origin'.
```

---

## 🚀 STEP 2: Deploy ke Vercel (10 menit)

### Via Vercel Web Dashboard (Recommended)

```
1. Login: https://vercel.com
2. Click "Add New" → "Project"
3. Click "Import Git Repository"
4. Paste: https://github.com/YOUR_USERNAME/quran-live-learn-backend.git
5. Click "Import"

CONFIGURE:
- Framework: Other (Node.js)
- Root Directory: backend/

ADD ENVIRONMENT VARIABLES:
PORT                  = 5000
NODE_ENV              = production
GEMINI_API_KEY        = AIzaSyBWVDzn5w-6Yjo_F_PpkZnBxBuYcfkoE3g
GEMINI_API_VERSION    = v1beta
GEMINI_MODEL          = gemini-2.5-flash
FRONTEND_URL          = (kosongkan, nanti update)

7. Click "Deploy"
8. Tunggu 2-3 menit
9. Copy URL: https://quran-live-learn-backend.vercel.app
```

---

## ✅ STEP 3: Verifikasi (2 menit)

```bash
# Test Health Check
curl https://quran-live-learn-backend.vercel.app/api/health

# Expected output:
# {"status":"ok","timestamp":"2026-04-29T..."}

# Test Quran Metadata
curl https://quran-live-learn-backend.vercel.app/api/quran/meta

# Test Load Surah 1
curl "https://quran-live-learn-backend.vercel.app/api/surah/1?translationCode=id.indonesian"
```

---

## 📊 Backend URLs untuk Frontend Nanti

Setelah deploy, gunakan URL ini untuk frontend Anda:

```
API Base URL:  https://quran-live-learn-backend.vercel.app/api
WebSocket URL: wss://quran-live-learn-backend.vercel.app/api
Health Check:  https://quran-live-learn-backend.vercel.app/api/health
```

---

## 🔄 Update Backend (Auto-Deploy)

```bash
# 1. Make changes
nano backend/src/services/aiService.js

# 2. Commit
git add backend/
git commit -m "Fix: [description]"

# 3. Push
git push origin main

# Vercel automatically re-deploys! ✅
```

---

## 🐛 Troubleshooting

```bash
# Check Logs di Vercel:
# Dashboard → Deployments → Latest → Logs

# Common Errors:
# Error: GEMINI_API_KEY not found
  → Set env var di Vercel dashboard

# Error: Model not found
  → Check GEMINI_MODEL = gemini-2.5-flash

# Error: 502 Bad Gateway
  → Check server logs, try redeploy

# Redeploy:
# Dashboard → Deployments → Latest → Redeploy
```

---

## 📝 Important Notes

⚠️ **API Key Security**
- JANGAN push .env ke GitHub
- Gunakan Vercel environment variables
- Jika exposed, regenerate di Google Cloud

⚠️ **Frontend Update**
- Nanti update frontend dengan backend URL
- Frontend URL akan di-set di FRONTEND_URL env var
- Untuk CORS whitelist

⚠️ **Testing**
- Test health endpoint setelah deploy
- Monitor logs untuk errors
- Test dari device/browser berbeda

---

## ✨ Summary

```
✅ Backend code ready
✅ Git repository created
✅ Vercel account ready
✅ Environment variables configured
✅ Deployment complete!

URL: https://quran-live-learn-backend.vercel.app
```

---

**Backend Status**: ✅ PRODUCTION LIVE
**Frontend**: Nanti di-update ke domain niaga Anda
**Maintenance**: Automatic redeploy on git push
