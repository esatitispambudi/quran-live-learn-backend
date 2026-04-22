import express from 'express';
import axios from 'axios';
import { analyzeQuranRecitation } from '../services/aiService.js';

const router = express.Router();

// Get Quran metadata
router.get('/meta', async (req, res) => {
  try {
    console.log('📡 Fetching Quran data from external API...');
    const response = await axios.get('https://api.alquran.cloud/v1/quran/ar.alafasy', {
      timeout: 10000
    });
    console.log('✅ External API response received');
    
    // Ambil array surah lengkap
    const surahs = response.data.data.surahs.map(surah => ({
      number: surah.number,
      name: surah.englishName,
      arabicName: surah.name,
      ayahs: surah.ayahs.length
    }));
    console.log(`✅ Processed ${surahs.length} surahs`);
    res.json({
      success: true,
      surahs
    });
  } catch (error) {
    console.error('❌ Error fetching from external API:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get translations list
router.get('/translations', async (req, res) => {
  try {
    res.json({
      success: true,
      translations: [
        { code: 'id.indonesian', name: '🇮🇩 Bahasa Indonesia', lang: 'id' },
        { code: 'en.sahih', name: '🇬🇧 English (Sahih)', lang: 'en' }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get specific surah - sequential requests (more reliable)
router.get('/surah/:number', async (req, res) => {
  try {
    const { number } = req.params;
    const { translationCode = 'id.indonesian' } = req.query;
    
    console.log(`📖 Loading surah ${number} with translation: ${translationCode}`);
    
    // Load Arabic first
    console.log(`   ⏳ Fetching Arabic text...`);
    let arabicRes;
    try {
      arabicRes = await axios.get(
        `https://api.alquran.cloud/v1/surah/${number}`,
        { timeout: 6000 }
      );
      console.log(`   ✅ Arabic loaded`);
    } catch (error) {
      console.error(`   ❌ Arabic failed:`, error.message);
      throw error;
    }
    
    // Load translation
    console.log(`   ⏳ Fetching translation: ${translationCode}...`);
    let translationRes;
    try {
      translationRes = await axios.get(
        `https://api.alquran.cloud/v1/surah/${number}/editions/${translationCode}`,
        { timeout: 6000 }
      );
      console.log(`   ✅ Translation loaded: ${translationCode}`);
    } catch (translationError) {
      console.warn(`   ⚠️ Translation ${translationCode} failed, using fallback`);
      translationRes = await axios.get(
        `https://api.alquran.cloud/v1/surah/${number}/editions/en.sahih`,
        { timeout: 6000 }
      );
      console.log(`   ✅ Fallback translation loaded`);
    }
    
    console.log(`✅ Surah ${number} loaded successfully`);
    
    res.json({
      success: true,
      arabic: arabicRes.data.data.ayahs,
      translation: translationRes.data.data.ayahs,
      translationCode
    });
  } catch (error) {
    console.error(`❌ Error loading surah ${req.params.number}:`, error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to load surah'
    });
  }
});

// Get ayah with translation
router.get('/ayah/:surah/:ayah', async (req, res) => {
  try {
    const { surah, ayah } = req.params;
    const response = await axios.get(
      `https://api.alquran.cloud/v1/surah/${surah}/editions/ar.alafasy,en.sahih`
    );
    
    const ayahData = response.data.data.ayahs[ayah - 1];
    
    res.json({
      success: true,
      surah,
      ayah,
      data: ayahData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get audio for surah
router.get('/audio/:surah', async (req, res) => {
  try {
    const { surah } = req.params;
    // Fetch audio for the entire surah, using a reliable reciter like Mishary Alafasy
    const response = await axios.get(
      `https://api.alquran.cloud/v1/surah/${surah}/ar.alafasy`
    );

    const ayahsWithAudio = response.data.data.ayahs.map(ayah => ({
      number: ayah.numberInSurah,
      audio: ayah.audio // Each ayah has its own audio URL
    }));

    res.json({
      success: true,
      audioAyahs: ayahsWithAudio,
      surah
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

// Add these new endpoints before export:

// AI Analysis for Learning
router.post('/analyze', async (req, res) => {
  try {
    const { surah, ayah, text, translation, type } = req.body;
    
    console.log(`📚 Analyzing surah ${surah}, ayah ${ayah} (${type})`);
    
    // For now, return mock analysis (will integrate with Gemini later)
    const mockAnalysis = `
📖 **Analisis Ayat ${ayah}**

**Teks Arab:**
${text}

**Terjemahan:**
${translation}

**Penjelasan:**
Ayat ini berbicara tentang pentingnya ilmu dan iman. Setiap kata dalam ayat ini memiliki makna yang mendalam dan mengajarkan kita tentang kehidupan.

**Pelajaran Penting:**
1. Konsistensi dalam belajar Quran
2. Memahami makna setiap kata
3. Menerapkan dalam kehidupan sehari-hari

**Tips Untuk Menghafal:**
- Ulangi minimal 3-5 kali
- Pahami arti terlebih dahulu
- Hubungkan dengan ayat lain yang serupa
    `;
    
    res.json({
      success: true,
      analysis: mockAnalysis.trim()
    });
  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Practice - Recording Feedback
router.post('/practice', async (req, res) => {
  try {
    const { surah, ayah, text } = req.body;
    // In real implementation, would analyze audio file
    
    console.log(`🎤 Processing practice recording for surah ${surah}, ayah ${ayah}`);
    
    // Mock feedback
    const mockFeedback = `
✅ **Hasil Evaluasi Bacaan**

**Skor: 85%**

**Feedback:**
✓ Pengucapan Makhraj: Bagus
✓ Tajweed: Cukup (perhatikan ghunnah di akhir)
✗ Panjang harakat: Kurang akurat di beberapa tempat

**Saran:**
1. Perhatikan panjang mad secara konsisten
2. Praktikkan lagi untuk vokal yang tidak jelas
3. Dengarkan rekaman pembaca profesional

**Untuk Meningkatkan:**
- Latih 5 menit setiap hari
- Rekam diri sendiri dan dengarkan
- Bandingkan dengan pembaca profesional
    `;
    
    res.json({
      success: true,
      score: 85,
      feedback: mockFeedback.trim()
    });
  } catch (error) {
    console.error('❌ Practice error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});
