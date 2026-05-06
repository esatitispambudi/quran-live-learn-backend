# API DOCUMENTATION

## Base URL
```
http://localhost:5000/api
```

## REST Endpoints

### Health Check
```
GET /health
```
Check server status

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-04-15T10:30:00Z"
}
```

---

### Get Quran Metadata
```
GET /quran/meta
```
Get Quran metadata and statistics

**Response:**
```json
{
  "success": true,
  "surahs": 114,
  "meta": {
    "totalAyahs": 6236,
    "...": "..."
  }
}
```

---

### Get Specific Surah
```
GET /quran/surah/:number
```

**Parameters:**
- `number` (integer): Surah number (1-114)

**Response:**
```json
{
  "success": true,
  "arabic": [
    {
      "number": 1,
      "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "numberInSurah": 1,
      "...": "..."
    }
  ],
  "translation": [
    {
      "number": 1,
      "text": "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang",
      "...": "..."
    }
  ]
}
```

---

### Get Specific Ayah
```
GET /quran/ayah/:surah/:ayah
```

**Parameters:**
- `surah` (integer): Surah number
- `ayah` (integer): Ayah number

**Response:**
```json
{
  "success": true,
  "surah": 1,
  "ayah": 1,
  "data": {
    "number": 1,
    "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    "numberInSurah": 1,
    "...": "..."
  }
}
```

---

### Get Audio for Surah
```
GET /quran/audio/:surah
```

**Parameters:**
- `surah` (integer): Surah number

**Response:**
```json
{
  "success": true,
  "audioUrl": "https://cdn.alquran.cloud/...",
  "surah": 1
}
```

---

## WebSocket Connection

### Connection
```
ws://localhost:5000/ws
```

### Message Format

All messages should be JSON:
```json
{
  "type": "message_type",
  "data": {}
}
```

---

### Chat Message
Send a question to AI Guru

**Client → Server:**
```json
{
  "type": "chat",
  "userMessage": "Apa makna Surah Al-Fatihah?",
  "context": "Surah 1"
}
```

**Server → Client (Streaming):**
```json
{"type": "chat:start"}
{"type": "chat:chunk", "data": "Surah Al-Fatihah adalah..."}
{"type": "chat:chunk", "data": " pembukaan Alquran yang..."}
{"type": "chat:end"}
```

---

### Audio Analysis
Send audio for recitation analysis

**Client → Server:**
```json
{
  "type": "analyze",
  "textCorrect": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
  "userText": "الحمد لله رب العالمين",
  "audioTranscription": "al-hamdu lillahi rabbi al-alamin"
}
```

**Server → Client (Streaming):**
```json
{"type": "analysis:start"}
{"type": "analysis:chunk", "data": "Analisis bacaan Anda:"}
{"type": "analysis:end", "data": {"accuracy": 95, "...": "..."}}
```

---

### Learning Content
Get detailed learning material

**Client → Server:**
```json
{
  "type": "learn",
  "surahName": "Al-Fatihah",
  "ayahNumber": 1,
  "topic": "Makna dan Tafsir"
}
```

**Server → Client (Streaming):**
```json
{"type": "learning:start"}
{"type": "learning:chunk", "data": "Pembahasan mendalam..."}
{"type": "learning:end"}
```

---

### Error Response
```json
{
  "type": "error",
  "message": "Failed to process request"
}
```

---

## Rate Limiting
- No rate limiting configured for development
- Production should implement rate limiting

---

## Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Bad Request | Check request format |
| 401 | Unauthorized | Check API key |
| 404 | Not Found | Check resource exists |
| 500 | Server Error | Check server logs |

---

## Authentication
Currently no authentication. For production, implement JWT.

---

## Examples

### Using cURL

```bash
# Get Surah Al-Fatihah
curl http://localhost:5000/api/quran/surah/1

# Get specific Ayah
curl http://localhost:5000/api/quran/ayah/1/1

# Get audio
curl http://localhost:5000/api/quran/audio/1
```

### Using JavaScript/Fetch

```javascript
// Get Surah
const response = await fetch('http://localhost:5000/api/quran/surah/1');
const data = await response.json();
console.log(data);

// WebSocket Chat
const ws = new WebSocket('ws://localhost:5000/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'chat',
    userMessage: 'Apa itu Surah Al-Fatihah?',
    context: 'Surah 1'
  }));
};

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.type === 'chat:chunk') {
    console.log(msg.data);
  }
};
```

### Using Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Get Surah
const surah = await api.get('/quran/surah/1');

// Get Ayah
const ayah = await api.get('/quran/ayah/1/1');

// Get Audio
const audio = await api.get('/quran/audio/1');
```

---

## Performance Tips

1. **Caching**: Cache Surah data on frontend
2. **Pagination**: Load ayahs in chunks
3. **Audio**: Preload audio URLs
4. **WebSocket**: Reuse single connection

---

## Testing

### Manual Testing with Postman
1. Import API endpoints
2. Test each route
3. Verify JSON responses
4. Check error handling

### Automated Testing
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## Troubleshooting

### CORS Error
```
Check FRONTEND_URL in backend/.env
```

### Connection Refused
```
Make sure backend is running on port 5000
```

### Invalid API Response
```
Check Gemini API key is valid
```

---

## Version History

**v1.0.0** (2026-04-15)
- Initial release
- Basic Quran API
- WebSocket streaming
- AI integration

---

**For more help, see [README.md](./README.md)**
