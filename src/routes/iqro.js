import express from 'express';
import { iqroLevels, iqroQuiz } from '../data/iqro.js';

const router = express.Router();

// Get all Iqro levels overview
router.get('/levels', (req, res) => {
  try {
    const levels = iqroLevels.map(level => ({
      level: level.level,
      title: level.title,
      description: level.description,
      estimated_days: level.estimated_days,
      lessons_count: level.lessons.length
    }));
    
    res.json({
      success: true,
      levels,
      total_levels: iqroLevels.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get specific Iqro level with all lessons
router.get('/level/:levelNumber', (req, res) => {
  try {
    const { levelNumber } = req.params;
    const level = iqroLevels.find(l => l.level === parseInt(levelNumber));
    
    if (!level) {
      return res.status(404).json({ 
        success: false, 
        error: `Level ${levelNumber} tidak ditemukan` 
      });
    }
    
    res.json({
      success: true,
      level: {
        level: level.level,
        title: level.title,
        description: level.description,
        estimated_days: level.estimated_days,
        lessons: level.lessons,
        total_lessons: level.lessons.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get specific lesson detail
router.get('/lesson/:levelNumber/:lessonId', (req, res) => {
  try {
    const { levelNumber, lessonId } = req.params;
    const level = iqroLevels.find(l => l.level === parseInt(levelNumber));
    
    if (!level) {
      return res.status(404).json({ 
        success: false, 
        error: `Level ${levelNumber} tidak ditemukan` 
      });
    }
    
    const lesson = level.lessons.find(l => l.id === parseInt(lessonId));
    
    if (!lesson) {
      return res.status(404).json({ 
        success: false, 
        error: `Lesson ${lessonId} tidak ditemukan di level ${levelNumber}` 
      });
    }
    
    res.json({
      success: true,
      level: level.level,
      levelTitle: level.title,
      lesson: lesson,
      nextLessonId: level.lessons[level.lessons.findIndex(l => l.id === parseInt(lessonId)) + 1]?.id || null
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get quiz for a level
router.get('/quiz/:levelNumber', (req, res) => {
  try {
    const { levelNumber } = req.params;
    const quizKey = `level_${levelNumber}`;
    
    if (!iqroQuiz[quizKey]) {
      // Generate default quiz if not found
      const level = iqroLevels.find(l => l.level === parseInt(levelNumber));
      if (!level) {
        return res.status(404).json({ 
          success: false, 
          error: `Level ${levelNumber} tidak ditemukan` 
        });
      }
      
      return res.json({
        success: true,
        level: levelNumber,
        questions: level.lessons.slice(0, 3).map((lesson, idx) => ({
          id: idx + 1,
          question: `Bacalah huruf ini: ${lesson.arabic}`,
          answer: lesson.name || lesson.symbol || lesson.sound,
          tips: lesson.tips
        }))
      });
    }
    
    res.json({
      success: true,
      level: levelNumber,
      questions: iqroQuiz[quizKey].questions
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Submit quiz answer
router.post('/quiz/submit', (req, res) => {
  try {
    const { levelNumber, questionIndex, selectedAnswer } = req.body;
    
    if (!iqroQuiz[`level_${levelNumber}`]) {
      return res.status(404).json({ 
        success: false, 
        error: 'Quiz tidak ditemukan' 
      });
    }
    
    const question = iqroQuiz[`level_${levelNumber}`].questions[questionIndex];
    const isCorrect = question.correct === selectedAnswer;
    
    res.json({
      success: true,
      isCorrect,
      correctAnswer: question.options[question.correct],
      explanation: isCorrect ? '✅ Benar! Lanjut ke soal berikutnya.' : '❌ Salah. Coba lagi atau lihat tips di atas.'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get learning path (recommended progression)
router.get('/learning-path', (req, res) => {
  try {
    const path = {
      phase1: {
        name: 'Fondasi (Level 1-3)',
        duration: '2-3 minggu',
        goals: ['Mengenal 29 huruf hijaiyah', 'Memahami harakat', 'Membaca kombinasi huruf dasar'],
        levels: [1, 2, 3]
      },
      phase2: {
        name: 'Iqro Dasar (Level 4-5)',
        duration: '1-2 minggu',
        goals: ['Membaca kata-kata Quran sederhana', 'Mengenal alif lam'],
        levels: [4, 5]
      },
      phase3: {
        name: 'Iqro Menengah (Level 6-8)',
        duration: '1.5 bulan',
        goals: ['Meningkatkan kecepatan membaca', 'Mengenal syaddah dan tanda lainnya', 'Melatih tajweed dasar'],
        levels: [6, 7, 8]
      },
      phase4: {
        name: 'Iqro Lanjut (Level 9-10)',
        duration: '1 bulan',
        goals: ['Menyelesaikan Iqro 30', 'Siap membaca Quran dengan lancar'],
        levels: [9, 10]
      },
      afterIqro: {
        name: 'Baca Quran!',
        duration: 'Terus menerus',
        goals: ['Membaca Quran dari awal sampai akhir', 'Mendalami hukum tajweed', 'Menghafal dengan pemahaman']
      }
    };
    
    res.json({
      success: true,
      learningPath: path,
      estimatedTotalTime: '3-4 bulan untuk menyelesaikan Iqro + persiapan Quran'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Analytics - Get progress tracking
router.get('/progress/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    // Mock progress - nanti bisa connect ke database
    const progress = {
      userId,
      currentLevel: 1,
      completedLevels: [],
      lessonsCompleted: 0,
      totalLessons: iqroLevels.reduce((sum, level) => sum + level.lessons.length, 0),
      progressPercent: 0,
      totalHours: 0,
      accuracy: 0,
      lastStudied: new Date(),
      streak: 0
    };
    
    res.json({
      success: true,
      progress
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
