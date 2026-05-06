# �배포 Panduan Deployment

## ✅ Checklist Pre-Deployment

Sebelum deploy, pastikan:
- [x] Backend sudah test di localhost:5000
- [x] Frontend sudah test di localhost:3003
- [x] GEMINI_API_KEY valid dan working
- [x] Model: `gemini-2.5-flash` (sudah dikonfig di .env)
- [x] Semua dependencies sudah terinstall

---

## 🚀 OPSI 1: Deploy Backend ke Vercel

### Step 1: Persiapan Git
```bash
cd c:\xampp\htdocs\ai\quran-live-learn
git init
git add .
git commit -m "Initial commit: Quran Live Learn Backend"
```

### Step 2: Buat Repository di GitHub
1. Buka https://github.com/new
2. Buat repository baru dengan nama: `quran-live-learn-backend`
3. Jangan initialize dengan README
4. Copy HTTPS URL-nya

### Step 3: Push ke GitHub
```bash
git remote add origin https://github.com/USERNAME/quran-live-learn-backend.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy ke Vercel
1. Login di https://vercel.com
2. Click "Add New" → "Project"
3. Import repository GitHub `quran-live-learn-backend`
4. Select "Next.js" atau "Node.js" (Other)
5. **IMPORTANT: Add Environment Variables:**
   - `GEMINI_API_KEY`: `AIzaSyBWVDzn5w-6Yjo_F_PpkZnBxBuYcfkoE3g`
   - `GEMINI_API_VERSION`: `v1beta`
   - `GEMINI_MODEL`: `gemini-2.5-flash`
   - `FRONTEND_URL`: `https://your-frontend-domain.vercel.app`
   - `PORT`: `5000`
   - `NODE_ENV`: `production`

6. Click "Deploy"
7. Tunggu deployment selesai
8. Copy domain yang di-generate (contoh: `quran-live-learn-backend.vercel.app`)

---

## 🎨 OPSI 2: Deploy Frontend ke Vercel

### Step 1: Update Environment Variables (Frontend)
Edit `frontend/.env.production`:
```env
REACT_APP_API_URL=https://quran-live-learn-backend.vercel.app/api
REACT_APP_WS_URL=wss://quran-live-learn-backend.vercel.app/api
REACT_APP_ENV=production
```

### Step 2: Test Build
```bash
cd frontend
npm run build
```

### Step 3: Push ke GitHub
```bash
git add .
git commit -m "Update: Frontend environment for production"
git push origin main
```

### Step 4: Deploy Frontend ke Vercel
1. Di Vercel dashboard, click "Add New" → "Project"
2. Import `frontend` repository atau push ke repo baru
3. **Build Settings:**
   - Framework: React
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Add Environment Variables:** (sama seperti .env.production)
5. Click "Deploy"

---

## 🔧 OPSI 3: Deploy Keduanya (Backend + Frontend) Bersama

### Setup Monorepo di Vercel
1. Deploy backend dulu (OPSI 1)
2. Setelah berhasil, deploy frontend (OPSI 2)
3. Update `REACT_APP_API_URL` di frontend untuk point ke backend domain

---

## ✅ Testing After Deployment

### Test Backend Health
```bash
curl https://quran-live-learn-backend.vercel.app/api/health
```
**Expected Response:**
```json
{"status":"ok","timestamp":"2026-04-29T..."}
```

### Test Frontend
Buka: `https://quran-live-learn-frontend.vercel.app`

### Test API Integration
1. Load Surah 1 dari dashboard
2. Cek apakah terjemahan loading dengan benar
3. Cek apakah audio bisa diputar
4. Test Learn/Practice features

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
cd backend
npm install
npm run build
```

### Error: "GEMINI_API_KEY not found"
- Pastikan environment variable di Vercel sudah di-set
- Vercel dashboard → Project Settings → Environment Variables

### Error: "CORS policy: Origin not allowed"
- Update `FRONTEND_URL` di backend environment variables
- Example: `https://quran-live-learn-frontend.vercel.app`

### Error: "Model not found"
- Pastikan `GEMINI_MODEL` = `gemini-2.5-flash`
- Pastikan `GEMINI_API_VERSION` = `v1beta`

---

## 📊 Environment Summary

| Variable | Value | Where |
|----------|-------|-------|
| GEMINI_API_KEY | AIzaSyBWVDzn5w-6Yjo_F_PpkZnBxBuYcfkoE3g | Backend Vercel |
| GEMINI_MODEL | gemini-2.5-flash | Backend .env |
| REACT_APP_API_URL | https://quran-live-learn-backend.vercel.app/api | Frontend .env |
| NODE_ENV | production | Backend |

---

## 🎉 Selesai!
Setelah berhasil deploy, share URL ke pengguna:
- **Frontend**: `https://quran-live-learn-frontend.vercel.app`
- **Backend API**: `https://quran-live-learn-backend.vercel.app/api`
- **Health Check**: `https://quran-live-learn-backend.vercel.app/api/health`
