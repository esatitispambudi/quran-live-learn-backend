# 🎯 GETTING STARTED GUIDE

## Alquran Live - Step-by-Step Setup

This guide will get you up and running in **5 minutes**.

---

## ⏱️ Quick Setup (5 Minutes)

### 1️⃣ Get Your API Key (2 min)
```
1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key (it's free!)
```

### 2️⃣ Run Setup Script (2 min)
```
Windows: Run setup.bat
macOS/Linux: Run setup.sh

Or manually:
cd backend && npm install
cd ../frontend && npm install
```

### 3️⃣ Configure API Key (1 min)
```
Open: backend/.env
Find: GEMINI_API_KEY=your_key_here
Replace with your API key
```

---

## 🚀 Start the Application

### Terminal 1: Start Backend
```bash
cd backend
npm start
```
Expected output:
```
✓ Module dependencies loaded
✓ WebSocket server listening on port 5000
🚀 Server running on port 5000
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm start
```
Expected output:
```
✓ Compiled successfully!
You can now view the app in the browser.
  Local: http://localhost:3000
```

### Terminal 3: Open Browser
```
Navigate to: http://localhost:3000
```

---

## 🎓 Using the Application

### First Time Setup
1. **Select a Surah** (right panel)
   - Click any number 1-114
   
2. **Choose an Ayah** (left panel)
   - Click on Arabic text to expand
   
3. **Explore Features**
   - 📚 Listen to audio
   - 💬 Ask AI questions
   - 🎤 Try recording

### Main Features

**📚 Belajar (Learn)**
- Browse Surahs
- Read with translation
- Listen to audio
- Ask questions

**🎤 Analisis (Analyze)**
- Record yourself
- Get feedback
- Check accuracy
- Practice tips

**💬 Chat (Ask AI)**
- Ask anything
- Get streaming responses
- Like Gemini Live
- Context-aware

---

## 💻 System Requirements

### Minimum
- Node.js 16+
- 4GB RAM
- Modern browser (Chrome/Firefox/Edge)
- Internet connection

### Recommended
- Node.js 18+
- 8GB RAM
- Chrome/Edge browser
- Stable broadband

---

## 🔍 Troubleshooting

### Issue: "npm not found"
```
Solution:
1. Download Node.js from nodejs.org
2. Install it
3. Restart terminal
4. Try again
```

### Issue: "Port 5000 already in use"
```
Solution:
Windows:
  netstat -ano | findstr :5000
  taskkill /PID <pid> /F

macOS/Linux:
  lsof -ti:5000 | xargs kill -9
```

### Issue: "WebSocket connection failed"
```
Solution:
1. Make sure backend is running
2. Check URL: ws://localhost:5000/ws
3. Refresh browser
4. Check firewall
```

### Issue: "API Error"
```
Solution:
1. Verify API key in backend/.env
2. Check API key is valid at aistudio.google.com
3. Restart backend server
4. Try again
```

### Issue: "Blank page"
```
Solution:
1. Check browser console (F12 → Console)
2. Look for errors
3. Clear browser cache
4. Restart frontend
```

---

## 📁 Project Structure

```
quran-live-learn/
├── backend/        (Node.js server)
├── frontend/       (React app)
└── Documentation files
```

---

## 🔑 Important Files

### Edit These
```
backend/.env       ← Add your Gemini API key
```

### Start These
```
backend/package.json   → npm start
frontend/package.json  → npm start
```

### Read These
```
START_HERE.md       ← Overview
QUICKSTART.md       ← Quick reference
README.md           ← Full documentation
API_DOCUMENTATION.md ← API details
```

---

## ✅ Setup Checklist

Before you start, make sure:
- [ ] Node.js installed
- [ ] npm working
- [ ] Gemini API key obtained
- [ ] Port 5000 available
- [ ] Port 3000 available
- [ ] Have internet

After setup:
- [ ] Backend running on 5000
- [ ] Frontend running on 3000
- [ ] Browser showing app
- [ ] Can select Surah
- [ ] Can listen to audio

---

## 🎯 First Steps

### Step 1: Explore the UI
- Look at the layout
- Check the buttons
- Read the labels

### Step 2: Select a Surah
- Click a number on right (1-114)
- Wait for Ayahs to load
- You should see Arabic text

### Step 3: Pick an Ayah
- Click Arabic text
- Should expand with details
- Read translation
- See buttons appear

### Step 4: Listen to Audio
- Click "▶️ Dengarkan"
- Audio should play
- Adjust volume

### Step 5: Ask AI
- Go to Chat tab
- Type a question
- Get streaming response

### Step 6: Try Recording
- Go to Analyze tab
- Click "🎤 Rekam"
- Allow microphone
- Recite an Ayah
- Click stop
- Get feedback

---

## 🎓 Learning Tips

### Beginner
1. Start with short Surahs
2. Listen first
3. Read translation
4. Ask questions
5. Practice daily

### Intermediate
1. Focus on Tajweed
2. Record frequently
3. Ask complex questions
4. Practice harder Surahs
5. Track progress

### Advanced
1. Memorize Ayahs
2. Compare interpretations
3. Study history
4. Help others
5. Set goals

---

## 🆘 Getting Help

### Documentation
1. Read START_HERE.md
2. Check QUICKSTART.md
3. Review README.md
4. See API_DOCUMENTATION.md
5. Check FEATURES_GUIDE.md

### Common Issues
- See INSTALLATION.md
- Check troubleshooting section
- Review error messages
- Check browser console

### More Help
- Check browser console (F12)
- Review backend logs
- Check .env files
- Verify API key

---

## 🌟 Features You Have

✅ All 114 Surahs
✅ Professional audio
✅ AI-powered chat
✅ Recitation analysis
✅ Learning dashboard
✅ Dark mode
✅ Real-time streaming
✅ Mobile responsive

---

## 🔐 Keep in Mind

- ✓ Your API key is private (in .env)
- ✓ Data saved locally in browser
- ✓ No registration needed
- ✓ Free Gemini API
- ✓ Works offline (partially)

---

## 📈 What Happens When You

**Select a Surah:**
- Frontend requests data from backend
- Backend fetches from Al-Quran.cloud API
- Data displayed with translations

**Click an Ayah:**
- Shows details and audio button
- Displays translation
- Shows learning buttons

**Ask a Question:**
- Message sent via WebSocket
- Backend sends to Gemini API
- Response streams back in real-time
- You see it appear character by character

**Record Your Recitation:**
- Browser records your microphone
- Audio sent to backend
- Analyzed by Gemini AI
- Feedback returned

---

## 🚀 Performance Notes

- First load: May take 5-10 seconds
- Surah loading: Usually instant (cached)
- AI response: Depends on internet (2-5 sec)
- Audio: Should start immediately

---

## 💡 Pro Tips

1. **Cache Surahs**: Visit them once, they load fast next time
2. **Bookmarks**: Use browser bookmarks for favorites
3. **DevTools**: Open F12 to debug
4. **Logs**: Check browser console for errors
5. **Clear Cache**: If issues, clear browser cache

---

## 📱 Browser Compatibility

### Works Best On
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

### May Have Issues On
- ⚠️ Internet Explorer (don't use)
- ⚠️ Very old browsers
- ⚠️ Mobile (limited testing)

---

## ⚙️ System Details

### Ports Used
- Backend: 5000
- Frontend: 3000
- WebSocket: 5000

### APIs Used
- Gemini API (Google)
- Al-Quran.cloud API (Free)

### Browser Storage
- LocalStorage: ~5MB per domain
- SessionStorage: Tab-specific
- Cookies: Minimal

---

## 🎉 Ready to Go!

You're all set! Here's what to do:

1. ✅ Setup complete
2. ✅ Backend running
3. ✅ Frontend running
4. 👉 Open http://localhost:3000
5. 📖 Start learning Alquran!

---

## 🙏 Final Words

May Allah bless your learning journey. This application is designed to make learning Quran accessible, engaging, and rewarding.

**Allahumma inna nas'aluka ilman naafi'an wa amalan mutaqabbalan**

---

## 📞 Quick Reference

| Want to | Do This |
|---------|---------|
| Quick setup | Run setup.bat/sh |
| Get API key | Visit aistudio.google.com/app/apikey |
| Start backend | cd backend && npm start |
| Start frontend | cd frontend && npm start |
| Access app | Open http://localhost:3000 |
| Read docs | Start with START_HERE.md |
| Troubleshoot | Check INSTALLATION.md |
| Learn about APIs | Read API_DOCUMENTATION.md |
| See features | Check FEATURES_GUIDE.md |

---

**Version**: 1.0.0
**Date**: April 15, 2026
**Status**: ✅ Ready

**Happy Learning! 📖✨**
