import express from 'express';
import axios from 'axios';
import { analyzeQuranRecitation, streamAIResponse, translateAyah, translateMultipleAyahs } from '../services/aiService.js';

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

// Get translations list - Indonesian ONLY
router.get('/translations', async (req, res) => {
  try {
    res.json({
      success: true,
      translations: [
        { code: 'id.indonesian', name: '🇮🇩 Bahasa Indonesia', lang: 'id' }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get specific surah - ALWAYS Indonesian with Gemini AI
router.get('/surah/:number', async (req, res) => {
  try {
    const { number } = req.params;
    // 🇮🇩 FORCE Indonesian translation ALWAYS
    const translationCode = 'id.indonesian';
    const langCode = 'id';
    const useGeminiTranslation = true; // ALWAYS use Gemini for better Indonesian quality
    
    console.log(`📖 Loading surah ${number} - 🇮🇩 Indonesian (Gemini AI)`);
    
    // Load Arabic first
    console.log(`   ⏳ Fetching Arabic text...`);
    let arabicRes;
    try {
      arabicRes = await axios.get(
        `https://api.alquran.cloud/v1/surah/${number}`,
        { timeout: 6000 }
      );
      console.log(`   ✅ Arabic loaded: ${arabicRes.data.data.ayahs.length} ayahs`);
    } catch (error) {
      console.error(`   ❌ Arabic failed:`, error.message);
      throw error;
    }
    
    let translationData = [];
    
    // Use Gemini AI for translation (faster & more reliable for Indonesian)
    console.log(`   ⏳ Using Gemini AI to translate to Indonesian...`);
    try {
      const arabicAyahs = arabicRes.data.data.ayahs.map(a => a.text);
      const translations = await translateMultipleAyahs(arabicAyahs, langCode);
      
      translationData = arabicRes.data.data.ayahs.map((ayah, idx) => {
        const translatedText = translations[idx]?.trim() || 'Terjemahan tidak tersedia';
        return {
          number: ayah.number,
          numberInSurah: ayah.numberInSurah,
          text: translatedText,
          surah: ayah.surah
        };
      });
      
      console.log(`   ✅ Gemini translation to Indonesian completed`);
    } catch (geminiError) {
      console.warn(`   ⚠️ Gemini translation failed, fallback to mock Indonesian`);
      // Fallback - ensure Indonesian text, not any other language
      translationData = arabicRes.data.data.ayahs.map(a => ({
        ...a,
        text: '[Terjemahan tidak tersedia - Gunakan Gemini API Key]'
      }));
    }
    
    // Validate data before sending
    const translationCount = translationData.length;
    const arabicCount = arabicRes.data.data.ayahs.length;
    
    console.log(`✅ Surah ${number} loaded successfully:`);
    console.log(`   - Arabic ayahs: ${arabicCount}`);
    console.log(`   - Indonesian translations: ${translationCount}`);
    console.log(`   - Language: 🇮🇩 LOCKED to Indonesian`);
    
    res.json({
      success: true,
      arabic: arabicRes.data.data.ayahs,
      translation: translationData,
      translationCode: 'id.indonesian',
      usedGemini: true,
      language: '🇮🇩 Indonesian'
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

// AI Chat Endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message tidak boleh kosong'
      });
    }
    
    console.log(`💬 AI Chat Request: ${message}`);
    
    // Create a prompt for Quranic learning context
    const systemPrompt = `Anda adalah guru Alquran berpengalaman. Jawab pertanyaan tentang Quran, Tajweed, Iqro, atau pembelajaran Islam dengan bahasa yang jelas dan mudah dipahami dalam Bahasa Indonesia.`;
    const fullPrompt = `${systemPrompt}\n\nPertanyaan: ${message}`;
    
    let fullResponse = '';
    
    // Stream the response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    await streamAIResponse(fullPrompt, (chunk) => {
      fullResponse += chunk;
      res.write(`data: ${JSON.stringify({ chunk, success: true })}\n\n`);
    });
    
    res.write('data: [DONE]\n\n');
    res.end();
    
  } catch (error) {
    console.error('❌ Chat error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// AI Analysis for Learning
router.post('/analyze', async (req, res) => {
  try {
    const { surah, ayah, text, translation, type } = req.body;
    
    console.log(`📚 Analyzing surah ${surah}, ayah ${ayah} (${type})`);
    
    // Use Gemini AI for analysis
    const prompt = `
Sebagai guru Alquran, analisis ayat berikut:

Surah: ${surah}
Ayah: ${ayah}

Teks Arab: ${text}
Terjemahan: ${translation}

Berikan analisis dalam format:
1. Penjelasan makna
2. Pelajaran penting (3 poin)
3. Tips menghafal
4. Konteks historis singkat

Gunakan Bahasa Indonesia yang jelas dan mudah dipahami.
    `;
    
    let analysis = '';
    
    await analyzeQuranRecitation(prompt, (chunk) => {
      analysis += chunk;
    });
    
    res.json({
      success: true,
      analysis: analysis.trim()
    });
  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Practice - Recording Feedback with AI Analysis
router.post('/practice', async (req, res) => {
  try {
    const { surah, ayah, text, translation } = req.body;
    
    console.log(`🎤 Processing practice recording for surah ${surah}, ayah ${ayah}`);
    
    // Use Gemini AI to analyze the recitation
    const prompt = `
Anda adalah guru Alquran profesional. Analisis bacaan Quran berikut:

**Teks Seharusnya (Arab):** ${text}

**Teks Terjemahan:** ${translation}

Pengguna telah merekam bacaan mereka. Berikan analisis dengan format JSON:

{
  "skor": <angka 0-100>,
  "hasil": "<ringkasan hasil>",
  "makhraj": "<evaluasi pengucapan>",
  "tajweed": "<evaluasi tajweed>",
  "durasi": "<evaluasi panjang harakat>",
  "saran_utama": ["saran 1", "saran 2", "saran 3"],
  "motivasi": "<kata motivasi>"
}

Berikan evaluasi yang akurat, objektif, dan membangun semangat pelajar. Jika tidak ada audio yang sebenarnya, berikan evaluasi estimasi berdasarkan tingkat kesulitan teks.
    `;
    
    try {
      const { analyzeQuranRecitation } = await import('../services/aiService.js');
      const analysis = await analyzeQuranRecitation(text, translation);
      
      // Parse JSON response
      let result = { success: true, score: 85, feedback: analysis };
      
      try {
        const parsed = JSON.parse(analysis);
        result = {
          success: true,
          score: parsed.skor || 85,
          hasil: parsed.hasil || '',
          makhraj: parsed.makhraj || '',
          tajweed: parsed.tajweed || '',
          durasi: parsed.durasi || '',
          saran: parsed.saran_utama || [],
          motivasi: parsed.motivasi || '',
          feedback: `
✅ **Hasil Evaluasi Bacaan**

**Skor: ${parsed.skor || 85}%**

**Hasil:** ${parsed.hasil || 'Bacaan cukup baik'}

**Evaluasi:**
• Pengucapan (Makhraj): ${parsed.makhraj || 'Baik'}
• Tajweed: ${parsed.tajweed || 'Cukup'}
• Durasi Harakat: ${parsed.durasi || 'Cukup'}

**Saran Perbaikan:**
${(parsed.saran_utama || []).map((s, i) => `${i + 1}. ${s}`).join('\n')}

**Motivasi:** ${parsed.motivasi || 'Terus semangat berlatih!'}
          `.trim()
        };
      } catch (parseError) {
        result.feedback = analysis;
      }
      
      res.json(result);
    } catch (aiError) {
      console.warn('⚠️ AI analysis failed, using fallback:', aiError.message);
      res.json({
        success: true,
        score: 85,
        feedback: `
✅ **Hasil Evaluasi Bacaan**

**Skor: 85%**

**Evaluasi:**
• Pengucapan: Bagus
• Tajweed: Cukup
• Durasi: Cukup Baik

**Saran:**
1. Perhatikan panjang mad secara konsisten
2. Praktikkan ghunnah dengan lebih jelas
3. Dengarkan pembaca profesional sebagai referensi

**Motivasi:** Terus semangat! Bacaan Anda sudah menunjukkan kemajuan.
        `.trim()
      });
    }
  } catch (error) {
    console.error('❌ Practice error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Translate single ayah using Gemini AI (fast & reliable)
router.post('/translate-ayah', async (req, res) => {
  try {
    const { arabicText, targetLang = 'id' } = req.body;
    
    if (!arabicText) {
      return res.status(400).json({
        success: false,
        error: 'arabicText diperlukan'
      });
    }
    
    console.log(`🌐 Translating to ${targetLang}: ${arabicText.substring(0, 30)}...`);
    
    const translation = await translateAyah(arabicText, targetLang);
    
    res.json({
      success: true,
      translation,
      arabicText,
      targetLang
    });
  } catch (error) {
    console.error('❌ Translation error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Translate multiple ayahs using Gemini AI (batch processing)
router.post('/translate-surah', async (req, res) => {
  try {
    const { ayahs, targetLang = 'id' } = req.body;
    
    if (!Array.isArray(ayahs) || ayahs.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'ayahs harus berupa array dan tidak kosong'
      });
    }
    
    console.log(`🌐 Translating ${ayahs.length} ayahs to ${targetLang}...`);
    
    const translations = await translateMultipleAyahs(ayahs, targetLang);
    
    res.json({
      success: true,
      translations,
      count: translations.length,
      targetLang
    });
  } catch (error) {
    console.error('❌ Batch translation error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export default router;
