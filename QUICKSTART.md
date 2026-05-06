# QUICK START GUIDE

## Installation Cepat

### Windows
```bash
setup.bat
```

### macOS/Linux
```bash
chmod +x setup.sh
./setup.sh
```

## Manual Setup

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env dengan Gemini API Key Anda
npm start
```

### 2. Frontend Setup (Terminal baru)
```bash
cd frontend
npm install
npm start
```

## Dapatkan Gemini API Key

1. Kunjungi [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Login dengan akun Google Anda
3. Klik "Create API Key"
4. Copy key dan paste di `backend/.env`

## Struktur Aplikasi

### Backend (Node.js + Express)
- REST API untuk data Alquran
- WebSocket untuk real-time streaming
- Integrasi Gemini API untuk AI responses
- Al-Quran.cloud API untuk data

### Frontend (React)
- UI seperti Gemini Live
- Real-time chat dengan streaming
- Quran display dengan audio
- Recording audio untuk analisis

## Fitur Utama

✨ **Live Chat**
- Tanya jawab dengan AI Guru Alquran
- Streaming responses seperti Gemini Live
- Context-aware dari Surah yang dipilih

📚 **Quran Browser**
- Tampilkan 114 Surah dan semua Ayat
- Terjemahan Indonesia
- Audio playback berkualitas tinggi

🎤 **Analisis Bacaan**
- Record bacaan Alquran Anda
- Dapatkan feedback akurasi
- Saran perbaikan dari AI

📊 **Multiple Modes**
- Learn: Pelajari dengan penjelasan mendalam
- Analyze: Cek akurasi bacaan Anda
- Chat: Tanyakan apa saja tentang Alquran

## Troubleshooting

### WebSocket Connection Error
```
Backend harus running di port 5000
Frontend akan koneksi ke ws://localhost:5000/ws
```

### API Error
```
Pastikan Gemini API Key valid di backend/.env
```

### Port Already in Use
```bash
# Backend (port 5000)
# Frontend (port 3000)
Jika sudah digunakan, ubah di .env atau kill process lama
```

## Development

### Struktur Folder
```
quran-live-learn/
├── backend/          # Node.js + Express server
├── frontend/         # React app
├── docker-compose.yml
├── setup.bat / setup.sh
└── README.md
```

### Technologies
- **Backend**: Node.js, Express, WebSocket, Gemini API
- **Frontend**: React 18, Modern CSS, WebSocket
- **Data**: Al-Quran.cloud API

## Deployment

### Docker
```bash
docker-compose up -d
```

### Manual
```bash
# Terminal 1
cd backend && npm start

# Terminal 2
cd frontend && npm run build && npm install -g serve
serve -s frontend/build -l 3000
```

## API Documentation

Lihat [README.md](./README.md) untuk dokumentasi lengkap

## Support

Ada pertanyaan? Buat issue di repository

## License

MIT License - Silakan gunakan dan modifikasi

---

**Happy Learning! 📖🌙**
