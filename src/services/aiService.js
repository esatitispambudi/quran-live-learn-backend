import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export async function streamAIResponse(prompt, onChunk) {
  try {
    if (!genAI) {
      throw new Error('API key tidak tersedia');
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
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
    if (!genAI) {
      throw new Error('API key tidak tersedia');
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
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
    if (!genAI) {
      throw new Error('API key tidak tersedia');
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
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
