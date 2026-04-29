# Quran Live Learn

AI-powered Quran learning platform dengan fitur live streaming seperti Gemini Live.

## Fitur Utama

✨ **Live Chat dengan AI**
- Percakapan real-time dengan AI untuk pembelajaran Alquran
- Streaming response seperti Gemini Live
- Dukungan bahasa Indonesia

📚 **Display Alquran Interaktif**
- Tampilkan semua Surah dan Ayat
- Terjemahan Indonesia
- Audio playback untuk setiap Ayat

🎤 **Analisis Bacaan**
- Rekam dan kirim audio bacaan
- Analisis akurasi pengucapan
- Feedback dan saran perbaikan

📊 **Mode Pembelajaran**
- Mode Belajar: Pelajari ayat dengan penjelasan AI
- Mode Analisis: Dapatkan feedback untuk bacaan
- Mode Chat: Tanyakan apapun tentang Alquran

## Tech Stack

### Backend
- **Node.js** + Express
- **WebSocket** untuk real-time streaming
- **Gemini API** untuk AI responses
- **Al-Quran.cloud API** untuk data Alquran

### Frontend
- **React 18**
- **Modern CSS** dengan gradients dan animations
- **WebSocket** client untuk streaming
- **Responsive Design** untuk semua devices

## Setup & Installation

### Prerequisites
- Node.js 16+
- npm atau yarn
- Gemini API Key (dari Google AI Studio)

### Backend Setup

```bash
cd backend
npm install

# Update .env file
# Set GEMINI_API_KEY=your_key_here

npm start
# Server running on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install

# Update .env file (optional)
# REACT_APP_WS_URL=ws://localhost:5000/ws
# REACT_APP_API_URL=http://localhost:5000/api

npm start
# App running on http://localhost:3000
```

## API Endpoints

### REST API
- `GET /api/health` - Server health check
- `GET /api/quran/meta` - Metadata Alquran
- `GET /api/quran/surah/:number` - Get specific Surah
- `GET /api/quran/ayah/:surah/:ayah` - Get specific Ayat
- `GET /api/quran/audio/:surah` - Get audio URL

### WebSocket Events

#### Client to Server
```json
{
  "type": "chat",
  "userMessage": "string",
  "context": "string"
}
```

```json
{
  "type": "analyze",
  "textCorrect": "النص الصحيح",
  "userText": "محاولة القراءة",
  "audioTranscription": "string"
}
```

```json
{
  "type": "learn",
  "surahName": "string",
  "ayahNumber": "number",
  "topic": "string"
}
```

#### Server to Client
```json
{
  "type": "chat:start"
}
```

```json
{
  "type": "chat:chunk",
  "data": "string"
}
```

```json
{
  "type": "chat:end"
}
```

## Struktur Project

```
quran-live-learn/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   │   └── quran.js
│   │   └── services/
│   │       ├── aiService.js
│   │       └── wsService.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.jsx
│   │   ├── components/
│   │   │   ├── LiveChat.jsx
│   │   │   ├── LiveChat.css
│   │   │   ├── QuranDisplay.jsx
│   │   │   ├── QuranDisplay.css
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   └── services/
│   ├── package.json
│   └── .env
└── README.md
```

## Environment Variables

### Backend (.env)
```
PORT=5000
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_WS_URL=ws://localhost:5000/ws
REACT_APP_API_URL=http://localhost:5000/api
```

## Fitur yang Dapat Ditambahkan

- [ ] Saving learning history
- [ ] User profiles dan progress tracking
- [ ] Multiple language support
- [ ] Tajweed rules explanation
- [ ] Certificate generation
- [ ] Mobile app (React Native)
- [ ] Verse explanations dari Islamic scholars
- [ ] Hadith correlations
- [ ] Sirah Nabawiyah content

## License

MIT

## Support

Untuk bantuan atau pertanyaan, silakan buat issue di repository.

---

**Made with ❤️ for learning Quran**
