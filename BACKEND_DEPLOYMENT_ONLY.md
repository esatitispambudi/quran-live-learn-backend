# 🚀 BACKEND DEPLOYMENT ONLY - Vercel

**Status**: Backend akan deploy ke Vercel
**Frontend**: Nanti di-handle sendiri ke domain niaga

---

## 📋 Preparation Checklist

- [x] Backend code fixed (gemini-2.5-flash)
- [x] AI service tested
- [x] Environment variables ready
- [x] Vercel config prepared

---

## 🎯 TAHAP 1: Git Setup

### 1.1 Initialize Git Repository

```bash
cd c:\xampp\htdocs\ai\quran-live-learn

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Backend: Production Ready for Vercel Deployment"
```

### 1.2 Create GitHub Repository

1. Buka: https://github.com/new
2. Repository name: `quran-live-learn-backend`
3. Description: "AI Backend untuk belajar Quran"
4. Jangan initialize dengan README
5. Click "Create repository"
6. Copy HTTPS URL

### 1.3 Connect Local ke GitHub

```bash
# Ganti YOUR_USERNAME dengan username GitHub Anda
git remote add origin https://github.com/YOUR_USERNAME/quran-live-learn-backend.git

# Rename branch ke main
git branch -M main

# Push ke GitHub
git push -u origin main
```

**Done!** Backend code sudah di GitHub ✓

---

## 🚀 TAHAP 2: Deploy ke Vercel

### 2.1 Login ke Vercel

1. Buka: https://vercel.com
2. Sign in / Sign up (bisa pakai GitHub account)

### 2.2 Create New Project

1. Di dashboard, click **"Add New"** → **"Project"**
2. Click **"Import Git Repository"**
3. Paste GitHub repository URL:
   ```
   https://github.com/YOUR_USERNAME/quran-live-learn-backend.git
   ```
4. Click **"Import"**

### 2.3 Configure Project

**Framework & Settings:**
```
Framework: Other (Node.js)
Root Directory: backend/
Build Command: npm install
Output Directory: (leave empty)
```

**Environment Variables:**

Click "Add Environment Variable" dan tambahkan:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `GEMINI_API_KEY` | `AIzaSyBWVDzn5w-6Yjo_F_PpkZnBxBuYcfkoE3g` |
| `GEMINI_API_VERSION` | `v1beta` |
| `GEMINI_MODEL` | `gemini-2.5-flash` |
| `FRONTEND_URL` | (Kosongkan dulu, nanti update setelah frontend done) |

### 2.4 Deploy!

1. Click **"Deploy"**
2. Tunggu proses deployment (2-3 menit)
3. ✅ Done! Akan ada URL seperti:
   ```
   https://quran-live-learn-backend.vercel.app
   ```

**Catat URL ini untuk frontend nanti!**

---

## ✅ TAHAP 3: Verifikasi Backend

### 3.1 Test Health Endpoint

```bash
# Ganti dengan URL Vercel Anda
curl https://quran-live-learn-backend.vercel.app/api/health
```

**Expected Response:**
```json
{"status":"ok","timestamp":"2026-04-29T..."}
```

### 3.2 Test Quran Metadata

```bash
curl https://quran-live-learn-backend.vercel.app/api/quran/meta
```

**Expected Response:**
```json
{
  "success": true,
  "surahs": [
    {
      "number": 1,
      "name": "Al-Fatiha",
      "arabicName": "الفاتحة",
      "ayahs": 7
    },
    ...
  ]
}
```

### 3.3 Test Load Surah with Translation

```bash
curl "https://quran-live-learn-backend.vercel.app/api/quran/surah/1?translationCode=id.indonesian"
```

Verify:
- ✓ Arabic text ada
- ✓ Translation lengkap (bukan per-huruf)
- ✓ Audio URLs ada

---

## 📊 Monitoring Backend

### Check Logs

1. Di Vercel Dashboard → Project → "Deployments"
2. Click latest deployment
3. View logs untuk troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "GEMINI_API_KEY not found" | Check env vars di Vercel dashboard |
| "Model not found" | Verify `GEMINI_MODEL=gemini-2.5-flash` |
| 502 Bad Gateway | Check server logs di Vercel |
| Timeout | Backend taking too long, check Gemini API |

---

## 🔄 Update Backend Later

Jika perlu update backend code:

```bash
# 1. Make changes di backend
# 2. Commit
git add backend/
git commit -m "Update: [description]"

# 3. Push
git push origin main

# 4. Vercel auto-redeploy! ✓
```

---

## 📝 Backend URL Reference

**Untuk Frontend Update Nanti:**

Backend API URL: `https://quran-live-learn-backend.vercel.app/api`
Backend WS URL: `wss://quran-live-learn-backend.vercel.app/api`

**Gunakan URL ini untuk:**
- Frontend REACT_APP_API_URL
- Frontend REACT_APP_WS_URL
- Domain niaga Anda

---

## 🎯 Next Steps (Frontend)

Setelah backend sudah live di Vercel:

1. Frontend akan di-build Anda sendiri
2. Update frontend dengan API URL backend Vercel
3. Deploy ke domain niaga

Backend sudah siap! ✅

---

**Backend Status**: ✅ READY FOR VERCEL
**Last Updated**: 29 April 2026
