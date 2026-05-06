// INSTALLATION & SETUP GUIDE

## Prerequisites
- Node.js 16+ 
- npm atau yarn
- Gemini API Key (gratis dari Google AI Studio)
- Modern web browser

## Step-by-Step Installation

### 1. Get Gemini API Key
```
1. Visit: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
```

### 2. Clone & Setup (Windows)
```bash
# Buka folder proyek
cd c:\xampp\htdocs\ai\quran-live-learn

# Jalankan setup
setup.bat

# Atau manual:
cd backend
npm install
cd ..\frontend
npm install
```

### 3. Clone & Setup (macOS/Linux)
```bash
cd /path/to/quran-live-learn
chmod +x setup.sh
./setup.sh

# Atau manual:
cd backend
npm install
cd ../frontend
npm install
```

### 4. Configure Environment Variables

**Backend (.env)**
```
PORT=5000
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:5000/ws
```

### 5. Start Application

**Terminal 1 - Backend**
```bash
cd backend
npm start
# Expected output:
# 🚀 Server running on port 5000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm start
# Expected output:
# Compiled successfully!
# You can now view quran-live-learn in the browser at http://localhost:3000
```

### 6. Access Application
Open browser and go to: `http://localhost:3000`

## Features Overview

### 📚 Belajar Mode
- Select Surah
- Baca Ayat dengan terjemahan
- Dengarkan audio profesional
- Tanya AI tentang ayat

### 🎤 Analisis Mode
- Record your Quran recitation
- Get instant feedback
- Lihat akurasi pengucapan
- Saran perbaikan dari AI

### 💬 Chat Mode
- Ask anything about Quran
- Real-time streaming responses
- Context-aware dari Surah pilihan
- Like Gemini Live!

## Troubleshooting

### Connection Error
```
Error: Can't connect to backend

Solution:
- Check backend is running: npm start in backend folder
- Verify port 5000 is available
- Check firewall settings
```

### API Key Error
```
Error: GEMINI_API_KEY not found

Solution:
- Update backend/.env with valid key
- Restart backend server
```

### WebSocket Error
```
Error: WebSocket connection failed

Solution:
- Make sure backend running on 5000
- Check frontend .env has correct WS_URL
- Reload browser
```

### Slow Performance
```
Solution:
- Close unnecessary browser tabs
- Clear browser cache
- Restart backend and frontend
- Check internet connection
```

## Performance Tips

1. **Browser**: Use Chrome/Edge for best performance
2. **Internet**: Stable connection recommended for streaming
3. **Storage**: Clear browser cache if issues persist
4. **Memory**: Close other apps if sluggish

## Advanced Configuration

### Custom Port
Backend (backend/.env):
```
PORT=3001  # Change from 5000
```

Frontend (frontend/.env):
```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001/ws
```

### Production Deployment

**Using Docker**
```bash
docker-compose up -d
```

**Manual**
```bash
# Backend
cd backend && npm install && npm start

# Frontend (new terminal)
cd frontend && npm install && npm run build
npx serve -s build -l 3000
```

## File Structure
```
backend/
├── src/
│   ├── server.js              # Express server
│   ├── routes/
│   │   └── quran.js           # Quran API routes
│   └── services/
│       ├── aiService.js       # Gemini integration
│       └── wsService.js       # WebSocket handler
├── package.json
└── .env

frontend/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── LiveChat.jsx       # Chat interface
│   │   ├── QuranDisplay.jsx   # Quran viewer
│   │   ├── Navbar.jsx
│   │   └── Dashboard.jsx
│   └── services/
│       ├── api.js             # REST client
│       ├── websocket.js       # WS client
│       ├── storage.js         # Local storage
│       └── analytics.js       # Analytics
├── package.json
└── .env
```

## Development Workflow

1. **Start Backend**
   ```bash
   cd backend && npm start
   ```

2. **Start Frontend** (new terminal)
   ```bash
   cd frontend && npm start
   ```

3. **Make changes** in code
4. **Hot reload** happens automatically
5. **Test changes** in browser

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env or kill process |
| Module not found | Run `npm install` in folder |
| API 401 error | Check Gemini API key in .env |
| Audio not working | Check browser permissions |
| Can't record | Allow microphone access in browser |

## Next Steps

1. ✓ Setup complete
2. Explore the interface
3. Try different Surahs
4. Practice recording
5. Ask AI questions
6. Customize your preferences

## Support & Help

- Check QUICKSTART.md for quick reference
- Read README.md for full documentation
- Check API endpoints in README
- Review component files for code examples

## Tips for Best Experience

- Use Arabic font for better display
- Headphones recommended for audio
- Stable internet for streaming
- Desktop better than mobile for now
- Chrome/Edge browsers recommended

---

**Happy Learning Quran! 📖✨**

Made with ❤️ for Islamic education
