# ⚡ BACKEND DEPLOYMENT CHEATSHEET

**Copy-paste commands. Done in 20 minutes!**

---

## 🚀 COPY THESE COMMANDS

### STEP 1: Git Setup (5 min)

```bash
cd c:\xampp\htdocs\ai\quran-live-learn

git init
git add .
git commit -m "Backend: Production Ready for Vercel"
git remote add origin https://github.com/YOUR_USERNAME/quran-live-learn-backend.git
git branch -M main
git push -u origin main
```

Done! Backend code is on GitHub ✅

---

### STEP 2: Vercel Dashboard (10 min)

```
1. Go to: https://vercel.com
2. Login / Sign up

3. Click: "Add New" → "Project"
4. Click: "Import Git Repository"
5. Paste URL: https://github.com/YOUR_USERNAME/quran-live-learn-backend.git
6. Click: "Import"

7. Configure:
   Framework: Other (Node.js)
   Root Directory: backend/

8. Add Environment Variables:

   PORT = 5000
   NODE_ENV = production
   GEMINI_API_KEY = AIzaSyBWVDzn5w-6Yjo_F_PpkZnBxBuYcfkoE3g
   GEMINI_API_VERSION = v1beta
   GEMINI_MODEL = gemini-2.5-flash
   FRONTEND_URL = (leave empty for now)

9. Click: "Deploy"
10. Wait 2-3 minutes...
11. ✅ DONE! Copy your URL
```

---

### STEP 3: Test Backend (2 min)

```bash
# Replace with your Vercel URL
curl https://quran-live-learn-backend.vercel.app/api/health

# Should return:
# {"status":"ok","timestamp":"2026-04-29T..."}
```

---

## 🎯 YOUR BACKEND URL

**After deployment, you'll get:**
```
https://quran-live-learn-backend.vercel.app
```

**Use this for:**
- Frontend API URL
- Frontend WS URL
- Frontend .env variables

---

## 📌 IMPORTANT NOTES

✅ GitHub username = Replace `YOUR_USERNAME` in commands
✅ API Key = Already in .env, just paste to Vercel
✅ Auto-redeploy = Push to GitHub → Vercel auto-deploys
✅ Logs = Dashboard → Deployments → Logs

---

## 🔄 UPDATE BACKEND LATER

```bash
# Make changes
# Commit
git add backend/
git commit -m "Fix: description"

# Push
git push origin main

# Vercel automatically redeploys! 🎉
```

---

**That's it! 20 minutes to production! 🚀**
