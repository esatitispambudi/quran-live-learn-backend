import { GoogleGenerativeAI } from '@google/generative-ai';

// Lazy initialization - gets API key when actually needed, not at import time
function getGenAI() {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// Get the model name from environment or use default
function getModelName() {
  return process.env.GEMINI_MODEL || 'gemini-2.5-flash';
}

export async function streamAIResponse(prompt, onChunk) {
  try {
    const genAI = getGenAI();
    if (!genAI) {
      throw new Error('API key tidak tersedia');
    }
    const model = genAI.getGenerativeModel({ model: getModelName() });
    
    const stream = await model.generateContentStream(prompt);
    
    for await (const chunk of stream.stream) {
      const text = chunk.text();
      if (text) {
        onChunk(text);
      }
    }
    
    return true;
  } catch (error) {
    console.error('AI Service Error:', error.message);
    // Fallback to mock response if API fails
    console.log('⚠️ Menggunakan mock response...');
    onChunk('Ini adalah respons simulasi. Harap verifikasi API key Gemini Anda di Google Cloud Console.');
    return true;
  }
}

export async function analyzeQuranRecitation(textInput, audioTranscription) {
  try {
    const genAI = getGenAI();
    if (!genAI) {
      throw new Error('API key tidak tersedia');
    }
    const model = genAI.getGenerativeModel({ model: getModelName() });
    
    const prompt = `
      Anda adalah guru Alquran profesional. Analisis bacaan user berikut:
      
      Teks seharusnya: ${textInput}
      Transkripsi audio: ${audioTranscription}
      
      Berikan:
      1. Akurasi bacaan (%)
      2. Kesalahan pengucapan jika ada
      3. Saran perbaikan
      4. Nilai dan motivasi
      
      Format JSON.
    `;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Analysis Error:', error.message);
    // Mock fallback response
    console.log('⚠️ Menggunakan mock analysis...');
    return JSON.stringify({
      akurasi: 85,
      kesalahan: 'Pelafalan "Al-Hamdulillah" kurang jelas',
      saran: 'Ulangi dengan menekanankan setiap huruf',
      nilai: 'Bagus! Terus latihan.',
      motivasi: 'Anda sudah membuat kemajuan yang baik!'
    });
  }
}

export async function generateLearningContent(surahName, ayahNumber) {
  try {
    const genAI = getGenAI();
    if (!genAI) {
      throw new Error('API key tidak tersedia');
    }
    const model = genAI.getGenerativeModel({ model: getModelName() });
    
    const prompt = `
      Buatkan konten pembelajaran interaktif untuk:
      Surah: ${surahName}
      Ayat: ${ayahNumber}
      
      Sertakan:
      1. Arti dan penjelasan
      2. Tips pengucapan
      3. Konteks historis
      4. Aplikasi dalam kehidupan
      
      Gunakan bahasa Indonesia yang mudah dipahami.
    `;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Content Generation Error:', error.message);
    // Mock fallback response
    console.log('⚠️ Menggunakan mock content...');
    return `
    📖 Konten Pembelajaran: ${surahName} - Ayat ${ayahNumber}
    
    **Arti & Penjelasan:**
    Ayat ini membahas tentang ketauhidan dan kebesaran Allah SWT.
    
    **Tips Pengucapan:**
    - Dengarkan dengan seksama dari pembaca berpengalaman
    - Ulangi setiap kata perlahan-lahan
    - Perhatikan tajweed (hukum bacaan Quran)
    
    **Konteks Historis:**
    Ayat ini diturunkan pada awal periode Mekkah.
    
    **Aplikasi Kehidupan:**
    Tingkatkan kesadaran spiritual dan kekhusyukan dalam ibadah.
    `;
  }
}

export async function translateAyah(arabicText, targetLang = 'id') {
  try {
    const genAI = getGenAI();
    if (!genAI) {
      throw new Error('API key tidak tersedia');
    }
    const model = genAI.getGenerativeModel({ model: getModelName() });
    
    let prompt = '';
    if (targetLang === 'id') {
      prompt = `TASK: Terjemahkan ayat Al-Quran berikut TEPAT KE BAHASA INDONESIA.
PENTING: Respons HARUS dalam Bahasa Indonesia, BUKAN bahasa lain.

Ayat Arab: "${arabicText}"

INSTRUKSI KETAT:
- Kembalikan HANYA terjemahan dalam Bahasa Indonesia
- Jangan tambahkan penjelasan, nomor, atau keterangan apapun
- Jangan gunakan bahasa Arab, Inggris, atau bahasa lain
- Terjemahan harus akurat dan mudah dipahami

RESPONS:`;
    } else {
      prompt = `Translate the following Quranic verse to English accurately and completely:

"${arabicText}"

Return ONLY the pure translation, without numbers, explanations, or any additional information.`;
    }
    
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error('Translation Error:', error.message);
    console.log('⚠️ Menggunakan mock translation...');
    return `Terjemahan: ${arabicText.substring(0, 100)}...`;
  }
}

export async function translateMultipleAyahs(ayahs, targetLang = 'id') {
  try {
    const genAI = getGenAI();
    if (!genAI) {
      throw new Error('API key tidak tersedia');
    }
    const model = genAI.getGenerativeModel({ model: getModelName() });
    
    const ayahsList = Array.isArray(ayahs) ? ayahs : [ayahs];
    
    // Create numbered list for clear translation mapping
    const numberedAyahs = ayahsList.map((a, idx) => `${idx + 1}. ${a}`).join('\n');
    
    let prompt = '';
    if (targetLang === 'id') {
      prompt = `TASK: Terjemahkan setiap ayat Al-Quran berikut KE BAHASA INDONESIA.
PENTING: SEMUA respons HARUS dalam Bahasa Indonesia, BUKAN bahasa lain atau Arab.

Ayat-ayat Arab:\n${numberedAyahs}

INSTRUKSI KETAT:
- Terjemahkan SETIAP ayat ke Bahasa Indonesia
- Kembalikan terjemahan satu per baris, dalam urutan yang sama
- JANGAN tambahkan nomor atau penjelasan
- JANGAN gunakan bahasa Arab, Inggris, atau bahasa lain
- Setiap baris adalah terjemahan Bahasa Indonesia murni dari satu ayat

RESPONS (hanya terjemahan Bahasa Indonesia):`;
    } else {
      prompt = `Translate each Quranic verse below to English. 
IMPORTANT: Return translations one per line in the same order.
Do not add numbers, explanations, or any additional information.
Only pure translation of each verse.

Verses:\n${numberedAyahs}`;
    }
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Split by newlines and clean up
    const translations = responseText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      // Remove numbering if AI added it
      .map(line => line.replace(/^[\d]+\.\s*/, '').trim());
    
    // Return array of translations matching input count
    return translations.length === ayahsList.length 
      ? translations 
      : ayahsList.map((_, idx) => translations[idx] || 'Terjemahan tidak tersedia');
  } catch (error) {
    console.error('Multiple Translation Error:', error.message);
    console.log('⚠️ Menggunakan mock translations...');
    const ayahsList = Array.isArray(ayahs) ? ayahs : [ayahs];
    return ayahsList.map(a => `Terjemahan untuk: ${a.substring(0, 50)}...`);
  }
}
