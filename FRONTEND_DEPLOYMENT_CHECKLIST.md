# 📋 Frontend Deployment Checklist

## ✅ Files Configuration Status

### Environment Files
- [x] `.env` - Development configuration
- [x] `.env.local` - Development local overrides
- [x] `.env.production` - Production configuration for Vercel
- [x] `.env.example` - Template for developers

### Configuration Files
- [x] `vercel.json` - Vercel deployment configuration
- [x] `package.json` - Build scripts dan dependencies
- [x] `.gitignore` - Git ignore rules

### Source Code
- [x] `src/config.js` - Uses environment variables
- [x] `src/services/api.js` - Uses environment variable API_URL
- [x] `src/services/websocket.js` - Uses environment variable WS_URL
- [x] No hardcoded localhost URLs in source code

---

## 🚀 Deployment Steps

### Step 1: Prepare Source Code
```bash
# Verify all files are ready
cd C:\xampp\htdocs\ai\quran-live-learn\frontend

# Install dependencies (if not done yet)
npm install

# Run local test
npm start
# Open http://localhost:3003
```

### Step 2: Build Production
```bash
# Build production bundle
npm run build

# Output akan di: ./build/
# Verify build successful (no errors)
```

### Step 3: Verify Production Build
```bash
# Install serve globally (optional)
npm install -g serve

# Test production build locally
serve -s build -l 3000

# Open http://localhost:3000
# Verify:
# - Page loads correctly
# - API calls work (check Network tab)
# - WebSocket connects (check Console)
```

### Step 4: Push to Git
```bash
# Navigate to root
cd C:\xampp\htdocs\ai\quran-live-learn

# Stage all changes
git add .

# Commit
git commit -m "Prepare frontend for Vercel deployment:
- Add vercel.json configuration
- Update .env.production with correct API endpoint
- Add .env.local for development
- Update .gitignore rules"

# Push to GitHub
git push origin main
```

### Step 5: Deploy Frontend to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel (first time only)
vercel login

# Deploy frontend
cd C:\xampp\htdocs\ai\quran-live-learn\frontend
vercel

# Follow prompts:
# - Link to existing project: No (new project)
# - Project name: quran-live-learn-frontend (or your choice)
# - Framework: React
# - Root: ./
# - Build: npm run build
# - Output: build
```

**Option B: Using Vercel Web Dashboard**
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import GitHub repository
4. Select `quran-live-learn` repository
5. Configure:
   - Framework: React
   - Root Directory: `frontend/`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Environment Variables:
     - `REACT_APP_API_URL` = `https://quran-live-learn-backend.vercel.app/api`
     - `REACT_APP_WS_URL` = `wss://quran-live-learn-backend.vercel.app/ws`
     - `REACT_APP_ENV` = `production`
6. Click "Deploy"

### Step 6: Verify Deployment

```bash
# After deployment, Vercel akan provide URL seperti:
# https://quran-live-learn-frontend.vercel.app

# Test endpoints:
curl https://quran-live-learn-backend.vercel.app/api/health
curl https://quran-live-learn-backend.vercel.app/api/quran/meta

# Verify WebSocket connection:
# Open browser console di production URL
# Check for "✅ WebSocket connected" message
```

---

## 📊 Environment Variables Configuration

### Development (.env)
```env
PORT=3003
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:5000/ws
REACT_APP_ENV=development
```

### Development Local (.env.local)
```env
# Override untuk local machine tertentu (opsional)
PORT=3003
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:5000/ws
REACT_APP_ENV=development
```

### Production (.env.production)
```env
REACT_APP_API_URL=https://quran-live-learn-backend.vercel.app/api
REACT_APP_WS_URL=wss://quran-live-learn-backend.vercel.app/ws
REACT_APP_ENV=production
```

---

## 🏗️ Build Output Structure

Setelah `npm run build`, struktur akan seperti:

```
build/
├── index.html (main HTML file)
├── manifest.json
├── favicon.ico
├── static/
│   ├── js/
│   │   ├── main.[hash].js (bundled app)
│   │   ├── main.[hash].js.map (source map)
│   │   └── ...
│   ├── css/
│   │   ├── main.[hash].css
│   │   └── main.[hash].css.map
│   └── media/
└── robots.txt
```

---

## 🔗 Production URLs

Setelah deployment berhasil:

| Service | URL | Type |
|---------|-----|------|
| Frontend | `https://quran-live-learn-frontend.vercel.app` | HTTP |
| Backend API | `https://quran-live-learn-backend.vercel.app/api` | REST API |
| WebSocket | `wss://quran-live-learn-backend.vercel.app/ws` | WebSocket |

---

## ✨ Features Deployed

- ✅ IQRO Learning Mode (Hurufi learning)
- ✅ Quran Learning Mode (Surah reading + AI chat)
- ✅ Live Chat dengan AI (Gemini integration)
- ✅ Audio playback (Qari Alafasy)
- ✅ Dark/Light mode
- ✅ Real-time WebSocket communication
- ✅ Responsive UI (mobile + desktop)

---

## 🐛 Troubleshooting

### Build Failed
```bash
# Clear cache
rm -rf build node_modules package-lock.json

# Reinstall and rebuild
npm install
npm run build
```

### CORS Error
- Verify backend is accessible from production URL
- Check backend CORS configuration
- Verify API URL in .env.production

### WebSocket Connection Failed
- Check WSS URL (must use `wss://` not `ws://`)
- Verify backend WebSocket is running on Vercel
- Check firewall/proxy settings

### Pages Show 404
- Check `vercel.json` has correct routes configuration
- Verify SPA fallback to index.html

### Slow Performance
- Check if source maps are enabled (disable in production)
- Use Vercel Analytics to monitor performance
- Check network requests in DevTools

---

## 📚 References

- [Vercel Docs](https://vercel.com/docs)
- [React Build Optimization](https://create-react-app.dev/docs/production-build/)
- [Environment Variables in Vercel](https://vercel.com/docs/projects/environment-variables)

---

## 📝 Post-Deployment

1. **Monitor Performance**
   - Check Vercel Analytics dashboard
   - Monitor error rates
   - Track user engagement

2. **Update DNS (if custom domain)**
   - Add CNAME record pointing to Vercel
   - Or use Vercel nameservers

3. **Enable Security Features**
   - HTTPS (automatic on Vercel)
   - CSP headers (if needed)
   - Rate limiting (if needed)

4. **Backup Configuration**
   - Export Vercel project settings
   - Keep .env.production safe
   - Document deployment process

---

## 🎯 Next Steps After Deployment

1. ✅ Test all features on production
2. ✅ Share production URL with users
3. ✅ Monitor error logs
4. ✅ Plan feature updates
5. ✅ Set up CI/CD for auto-deployments

---

**Status**: Frontend siap untuk deployment ke Vercel! 🚀
