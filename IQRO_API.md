# 📚 Iqro Learning API Documentation

Iqro adalah metode pembelajaran membaca Alquran yang terstruktur dari huruf dasar. API ini menyediakan semua data dan endpoint untuk pembelajaran Iqro level 1-30.

## Endpoints

### 1. Get All Iqro Levels
```
GET /api/iqro/levels
```

**Response:**
```json
{
  "success": true,
  "levels": [
    {
      "level": 1,
      "title": "Huruf Hijaiyah (Alif - Ya)",
      "description": "Mengenal 29 huruf Arab dasar dan cara melafalkannya",
      "estimated_days": 15,
      "lessons_count": 29
    },
    ...
  ],
  "total_levels": 10
}
```

---

### 2. Get Specific Level with Lessons
```
GET /api/iqro/level/:levelNumber
```

**Parameters:**
- `levelNumber` (integer): 1-10

**Response:**
```json
{
  "success": true,
  "level": {
    "level": 1,
    "title": "Huruf Hijaiyah (Alif - Ya)",
    "description": "Mengenal 29 huruf Arab dasar dan cara melafalkannya",
    "estimated_days": 15,
    "lessons": [
      {
        "id": 1,
        "arabic": "ا",
        "name": "Alif",
        "sound": "A",
        "tips": "Mulut terbuka, suara natural"
      },
      ...
    ],
    "total_lessons": 29
  }
}
```

---

### 3. Get Specific Lesson Detail
```
GET /api/iqro/lesson/:levelNumber/:lessonId
```

**Parameters:**
- `levelNumber` (integer): 1-10
- `lessonId` (integer): Lesson ID

**Response:**
```json
{
  "success": true,
  "level": 1,
  "levelTitle": "Huruf Hijaiyah (Alif - Ya)",
  "lesson": {
    "id": 1,
    "arabic": "ا",
    "name": "Alif",
    "sound": "A",
    "tips": "Mulut terbuka, suara natural"
  },
  "nextLessonId": 2
}
```

---

### 4. Get Quiz for Level
```
GET /api/iqro/quiz/:levelNumber
```

**Parameters:**
- `levelNumber` (integer): 1-10

**Response:**
```json
{
  "success": true,
  "level": 1,
  "questions": [
    {
      "id": 1,
      "question": "Bacalah huruf ini: ا",
      "answer": "Alif",
      "tips": "Mulut terbuka, suara natural"
    },
    ...
  ]
}
```

---

### 5. Submit Quiz Answer
```
POST /api/iqro/quiz/submit
```

**Body:**
```json
{
  "levelNumber": 1,
  "questionIndex": 0,
  "selectedAnswer": 0
}
```

**Response:**
```json
{
  "success": true,
  "isCorrect": true,
  "correctAnswer": "Alif",
  "explanation": "✅ Benar! Lanjut ke soal berikutnya."
}
```

---

### 6. Get Learning Path (Structured Progression)
```
GET /api/iqro/learning-path
```

**Response:**
```json
{
  "success": true,
  "learningPath": {
    "phase1": {
      "name": "Fondasi (Level 1-3)",
      "duration": "2-3 minggu",
      "goals": [
        "Mengenal 29 huruf hijaiyah",
        "Memahami harakat",
        "Membaca kombinasi huruf dasar"
      ],
      "levels": [1, 2, 3]
    },
    "phase2": {
      "name": "Iqro Dasar (Level 4-5)",
      "duration": "1-2 minggu",
      "goals": [
        "Membaca kata-kata Quran sederhana",
        "Mengenal alif lam"
      ],
      "levels": [4, 5]
    },
    ...
  },
  "estimatedTotalTime": "3-4 bulan untuk menyelesaikan Iqro + persiapan Quran"
}
```

---

### 7. Get User Progress (Mock - Future: Connect to DB)
```
GET /api/iqro/progress/:userId
```

**Parameters:**
- `userId` (string): User identifier

**Response:**
```json
{
  "success": true,
  "progress": {
    "userId": "user123",
    "currentLevel": 1,
    "completedLevels": [],
    "lessonsCompleted": 0,
    "totalLessons": 142,
    "progressPercent": 0,
    "totalHours": 0,
    "accuracy": 0,
    "lastStudied": "2024-01-15T10:30:00Z",
    "streak": 0
  }
}
```

---

## Iqro Structure (30 Levels)

### Level 1-3: Fondasi (2-3 minggu)
- **Level 1**: 29 Huruf Hijaiyah (ا ب ت ث ج ... ي ء)
- **Level 2**: 6 Harakat (Fatha, Kasra, Damma, Sukun, Tanwin)
- **Level 3**: Kombinasi Huruf Dasar

### Level 4-5: Iqro Dasar (1-2 minggu)
- **Level 4**: Iqro Juz 1 (Kata-kata Quran sederhana)
- **Level 5**: Iqro Juz 2 (Melanjutkan kata-kata Quran)

### Level 6-8: Iqro Menengah (1.5 bulan)
- **Level 6-8**: Iqro Juz 3-10 (Tingkat kesulitan meningkat)

### Level 9-10: Iqro Lanjut (1 bulan)
- **Level 9-10**: Iqro Juz 11-30 & Tamatnya (Persiapan Baca Quran)

**Total: 3-4 bulan untuk menyelesaikan Iqro + persiapan Quran**

---

## Frontend Implementation

### Mode Selection
User dapat memilih mode pembelajaran di navbar:
- 🔤 **Iqro**: Belajar huruf Arab (MULAI DARI SINI!)
- 📖 **Quran**: Belajar membaca Quran
- 💬 **Chat**: Tanya jawab tentang Quran

### Iqro Learning Component
```jsx
import IqroLearning from './components/IqroLearning';

// Menampilkan Iqro Learning
<IqroLearning />
```

**Fitur:**
1. **Levels Overview**: Grid semua 10 level Iqro
2. **Learning Path**: Panduan terstruktur 4 fase pembelajaran
3. **Lesson Display**: 
   - Tampilkan huruf/kata Arab besar
   - Info lengkap (nama, pelafalan, tips)
   - Navigasi lesson sebelum/sesudah
   - Sidebar daftar pelajaran

---

## User Learning Journey

```
Start Here ➜ Iqro Level 1-3 (Huruf & Harakat)
              ↓
           Iqro Level 4-5 (Kata-kata sederhana)
              ↓
           Iqro Level 6-8 (Kecepatan & Tajweed)
              ↓
           Iqro Level 9-10 (Persiapan Quran)
              ↓
           🎉 Siap Baca Quran Full! ➜ Quran Mode
              ↓
           💬 Chat untuk pertanyaan lebih dalam
```

---

## Database Schema (Future)

```sql
CREATE TABLE iqro_progress (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  current_level INT DEFAULT 1,
  completed_levels JSON,
  lessons_completed JSON,
  total_hours INT DEFAULT 0,
  accuracy INT DEFAULT 0,
  last_studied TIMESTAMP,
  achievements JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE iqro_quiz_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  level INT NOT NULL,
  question_index INT NOT NULL,
  selected_answer INT,
  is_correct BOOLEAN,
  attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Notes
- Semua endpoint mengembalikan respons JSON
- Untuk pembacaan suara, gunakan Text-to-Speech API atau simpan audio files
- User progress saat ini menggunakan mock data - untuk production perlu database
- Quiz system sudah ready untuk scoring dan analytics

🎉 **Selamat belajar membaca Quran!**
