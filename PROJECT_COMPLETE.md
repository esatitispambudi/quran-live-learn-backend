# 🕌 Alquran Live - Project Complete Guide

## Project Overview

**Alquran Live** adalah platform web modern untuk belajar membaca Alquran dengan bantuan AI. Aplikasi ini menggabungkan teknologi streaming real-time (seperti Gemini Live) dengan pembelajaran Alquran interaktif.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Modern CSS, WebSocket |
| Backend | Node.js, Express, WebSocket |
| AI | Google Gemini API |
| Data | Al-Quran.cloud API |
| Deployment | Docker (optional) |

---

## 📁 Complete File Structure

```
quran-live-learn/
│
├── 📄 PROJECT FILES
├── README.md                      # Main documentation
├── QUICKSTART.md                 # Quick setup guide
├── INSTALLATION.md               # Detailed installation
├── API_DOCUMENTATION.md          # API reference
├── FEATURES_GUIDE.md             # Features overview
├── package.json                  # Root package config
├── docker-compose.yml            # Docker setup
├── setup.bat                     # Windows setup script
├── setup.sh                      # Unix setup script
│
├── 📁 BACKEND (Node.js + Express)
├── backend/
│   ├── package.json              # Dependencies
│   ├── .env                      # Environment (edit with your API key)
│   ├── .env.example              # Template
│   ├── .gitignore                # Git ignore
│   ├── Dockerfile                # Docker config
│   │
│   └── src/
│       ├── server.js             # Express server + WebSocket setup
│       │
│       ├── routes/
│       │   └── quran.js          # Quran API endpoints
│       │
│       └── services/
│           ├── aiService.js      # Gemini API integration
│           └── wsService.js      # WebSocket handlers
│
├── 📁 FRONTEND (React)
├── frontend/
│   ├── package.json              # Dependencies
│   ├── .env.example              # Template
│   ├── .gitignore                # Git ignore
│   ├── Dockerfile                # Docker config
│   │
│   ├── public/
│   │   └── index.html            # HTML template
│   │
│   └── src/
│       ├── App.jsx               # Main app component
│       ├── App.css               # Global styles
│       ├── index.jsx             # React entry point
│       ├── config.js             # App configuration
│       │
│       ├── components/
│       │   ├── LiveChat.jsx       # Chat interface
│       │   ├── LiveChat.css       # Chat styles
│       │   ├── QuranDisplay.jsx   # Quran viewer
│       │   ├── QuranDisplay.css   # Quran styles
│       │   ├── Navbar.jsx         # Navigation
│       │   ├── Navbar.css         # Nav styles
│       │   ├── Dashboard.jsx      # Stats dashboard
│       │   └── Dashboard.css      # Dashboard styles
│       │
│       ├── services/
│       │   ├── api.js            # REST API client
│       │   ├── websocket.js      # WebSocket client
│       │   ├── storage.js        # Local storage service
│       │   └── analytics.js      # Analytics tracking
│       │
│       ├── hooks/
│       │   ├── useWebSocket.js   # WebSocket hook
│       │   └── useLocalStorage.js # Storage hook
│       │
│       ├── utils/
│       │   ├── textProcessor.js  # Text utilities
│       │   └── audioProcessor.js # Audio utilities
│       │
│       └── constants/
│           └── quran.js          # Constants & config
```

---

## 🚀 Quick Start

### Windows
```bash
# Run setup script
setup.bat

# Start backend (Terminal 1)
cd backend && npm start

# Start frontend (Terminal 2)
cd frontend && npm start

# Visit http://localhost:3000
```

### macOS/Linux
```bash
# Run setup script
chmod +x setup.sh && ./setup.sh

# Start backend (Terminal 1)
cd backend && npm start

# Start frontend (Terminal 2)
cd frontend && npm start

# Visit http://localhost:3000
```

### Docker
```bash
# Start both services
docker-compose up -d

# Access at http://localhost:3000
```

---

## 🔑 Configuration

### Backend (.env)
```
PORT=5000
GEMINI_API_KEY=your_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:5000/ws
```

---

## 📚 File Descriptions

### Backend Files

#### server.js
- Express server setup
- CORS configuration
- WebSocket server initialization
- Route mounting

#### routes/quran.js
- GET /quran/meta - Quran metadata
- GET /quran/surah/:number - Get Surah
- GET /quran/ayah/:surah/:ayah - Get Ayah
- GET /quran/audio/:surah - Get audio URL

#### services/aiService.js
- streamAIResponse() - Stream Gemini responses
- analyzeQuranRecitation() - Analyze audio
- generateLearningContent() - Generate lessons

#### services/wsService.js
- handleWebSocket() - Connection handler
- handleChatStream() - Chat streaming
- handleAnalysis() - Audio analysis
- handleLearning() - Learning content

### Frontend Files

#### App.jsx
- Main application component
- Layout structure
- Mode management

#### components/LiveChat.jsx
- Real-time chat interface
- Message streaming
- Audio recording
- WebSocket integration

#### components/QuranDisplay.jsx
- Surah/Ayah browser
- Audio player
- Selection handling

#### components/Navbar.jsx
- Navigation bar
- Mode switching
- Theme toggle

#### components/Dashboard.jsx
- Learning statistics
- History tracking
- Bookmarks display

#### services/api.js
- REST client functions
- Quran API methods
- Health checks

#### services/websocket.js
- WebSocket client class
- Connection management
- Message handling

#### services/storage.js
- localStorage wrapper
- History management
- Bookmark handling

#### services/analytics.js
- Event tracking
- Statistics calculation
- Analytics storage

#### hooks/useWebSocket.js
- Custom WebSocket hook
- Connection state
- Auto-reconnect

#### hooks/useLocalStorage.js
- localStorage hook
- Type-safe storage

#### utils/textProcessor.js
- Arabic text handling
- Text formatting
- Islamic term extraction

#### utils/audioProcessor.js
- Audio playback
- Recording handling
- Duration formatting

#### constants/quran.js
- Surah constants
- API endpoints
- UI colors

---

## 🎯 Features Implemented

### ✅ Core Features
- [x] Live Quran display (all 114 Surahs)
- [x] AI-powered chat (like Gemini Live)
- [x] Real-time streaming responses
- [x] Audio recitation playback
- [x] Audio recording functionality
- [x] Quran analysis & feedback
- [x] Dark/Light mode toggle
- [x] Responsive design

### ✅ Technical Features
- [x] WebSocket streaming
- [x] REST API integration
- [x] Local storage management
- [x] Analytics tracking
- [x] Error handling
- [x] Component structure
- [x] Service architecture
- [x] Utility functions

### ⏳ Future Features
- [ ] User authentication
- [ ] Progress tracking
- [ ] Memorization mode
- [ ] Tajweed rules
- [ ] Multiple languages
- [ ] Mobile app
- [ ] Certificate generation
- [ ] Community features

---

## 🔌 API Endpoints

### REST API (Backend)

```
GET /api/health                    # Health check
GET /api/quran/meta                # Metadata
GET /api/quran/surah/:number       # Get Surah
GET /api/quran/ayah/:surah/:ayah   # Get Ayah
GET /api/quran/audio/:surah        # Get audio
```

### WebSocket (WS Protocol)

```
ws://localhost:5000/ws

Messages:
- chat: Send question
- analyze: Analyze audio
- learn: Get learning content
```

---

## 🛠️ Development Commands

### Backend
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Test
npm test
```

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| Total Files | 30+ |
| Backend Files | 6 |
| Frontend Components | 4 |
| Services | 6 |
| Utility Files | 3 |
| Hook Files | 2 |
| CSS Files | 5 |
| Documentation Files | 6 |

---

## 🎓 Learning Path

1. **Setup** → Setup project (5 min)
2. **Explore** → Browse Surahs (10 min)
3. **Learn** → Ask questions (15 min)
4. **Practice** → Record audio (20 min)
5. **Improve** → Get feedback (15 min)
6. **Master** → Repeat regularly

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <pid> /F

# Unix
lsof -ti:5000 | xargs kill -9
```

**WebSocket connection error**
- Check backend is running
- Verify correct port
- Check firewall settings

**Gemini API error**
- Verify API key in .env
- Check internet connection
- Confirm API key is active

**Blank screen**
- Clear browser cache
- Check browser console for errors
- Verify frontend is running

---

## 📞 Support

### Resources
- 📖 README.md - Main documentation
- ⚡ QUICKSTART.md - Quick setup
- 🔧 INSTALLATION.md - Detailed setup
- 📡 API_DOCUMENTATION.md - API reference
- ✨ FEATURES_GUIDE.md - Feature details

### Getting Help
1. Check documentation
2. Review error messages
3. Check browser console
4. Review backend logs
5. Check GitHub issues

---

## 📈 Performance Tips

1. **Caching** - Browser caches Surah data
2. **Streaming** - Use WebSocket for real-time
3. **Lazy Loading** - Load Ayahs as needed
4. **Compression** - Gzip responses

---

## 🔐 Security Considerations

### Current
- CORS enabled for localhost
- Environment variables for secrets

### For Production
- [ ] Add authentication
- [ ] Implement rate limiting
- [ ] Use HTTPS/WSS
- [ ] Validate all inputs
- [ ] Add logging
- [ ] Set up monitoring

---

## 🚀 Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### Manual Deployment
```bash
# Backend
cd backend && npm install && npm start

# Frontend
cd frontend && npm install && npm run build
serve -s build -l 3000
```

### Cloud Deployment
- Heroku, Vercel, Railway, etc.
- See deployment guides in documentation

---

## 📝 License

MIT License - Use and modify freely

---

## 🙏 Acknowledgments

- Al-Quran.cloud for Quran data
- Google Gemini for AI capabilities
- React community for tools
- Islamic knowledge contributors

---

## 📢 Contributing

Contributions welcome! 

1. Fork repository
2. Create feature branch
3. Make changes
4. Submit pull request

---

## 🎉 Conclusion

Alquran Live adalah platform pembelajaran Alquran modern dengan teknologi AI terdepan. Platform ini dirancang untuk membuat pembelajaran Alquran menjadi interaktif, engaging, dan efektif.

**Happy Learning! 📖✨**

May Allah bless your journey in learning the Quran.

*Allahumma inna nas'aluka fiqhan fin din wa afiyatan min kulli balaa'*

---

**Project Version**: 1.0.0  
**Last Updated**: April 15, 2026  
**Status**: ✅ Complete & Ready to Use

For questions or support, refer to the documentation files included in the project.
