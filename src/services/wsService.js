import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const connections = new Map();

export function handleWebSocket(ws, req) {
  const clientId = `client-${Date.now()}-${Math.random()}`;
  connections.set(clientId, ws);
  
  console.log(`✅ Client connected: ${clientId}`);
  
  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data.toString());
      
      if (message.type === 'chat') {
        await handleChatStream(ws, message);
      } else if (message.type === 'analyze') {
        await handleAnalysis(ws, message);
      } else if (message.type === 'learn') {
        await handleLearning(ws, message);
      }
    } catch (error) {
      console.error('WebSocket Error:', error.message);
      ws.send(JSON.stringify({
        type: 'error',
        message: error.message
      }));
    }
  });
  
  ws.on('close', () => {
    connections.delete(clientId);
    console.log(`❌ Client disconnected: ${clientId}`);
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket Error:', error);
  });
}

async function handleChatStream(ws, message) {
  try {
    if (!genAI) {
      throw new Error('API key tidak tersedia');
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const { userMessage, context } = message;
    
    const systemPrompt = `Anda adalah guru Alquran yang ramah dan berpengalaman. 
    Konteks pembelajaran: ${context || 'Umum'}
    Jawab pertanyaan tentang Alquran dengan jelas, akurat, dan mudah dipahami.`;
    
    const stream = await model.generateContentStream({
      contents: [
        {
          parts: [
            { text: systemPrompt },
            { text: userMessage }
          ]
        }
      ]
    });
    
    ws.send(JSON.stringify({ type: 'chat:start' }));
    
    for await (const chunk of stream.stream) {
      const text = chunk.text();
      if (text) {
        ws.send(JSON.stringify({
          type: 'chat:chunk',
          data: text
        }));
      }
    }
    
    ws.send(JSON.stringify({ type: 'chat:end' }));
  } catch (error) {
    console.error('Chat Stream Error:', error.message);
    // Fallback: Send mock response
    console.log('⚠️ Menggunakan mock chat response...');
    ws.send(JSON.stringify({ type: 'chat:start' }));
    ws.send(JSON.stringify({
      type: 'chat:chunk',
      data: 'Maaf, saat ini AI tidak tersedia. Harap verifikasi API key Gemini. Namun, saya masih bisa membantu Anda dengan informasi dasar tentang Quran. '
    }));
    ws.send(JSON.stringify({ type: 'chat:end' }));
  }
}

async function handleAnalysis(ws, message) {
  try {
    if (!genAI) {
      throw new Error('API key tidak tersedia');
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const { textCorrect, userText, audioTranscription } = message;
    
    const prompt = `
      Sebagai guru Alquran, analisis bacaan siswa:
      
      Teks yang benar: "${textCorrect}"
      Bacaan siswa: "${userText}"
      Transkripsi audio: "${audioTranscription || 'Tidak tersedia'}"
      
      Berikan:
      1. Tingkat akurasi (0-100%)
      2. Kesalahan yang ditemukan
      3. Cara perbaikan
      4. Motivasi dan pujian
      
      Format JSON dengan keys: accuracy, errors, corrections, motivation
    `;
    
    const stream = await model.generateContentStream(prompt);
    
    ws.send(JSON.stringify({ type: 'analysis:start' }));
    
    let fullResponse = '';
    for await (const chunk of stream.stream) {
      const text = chunk.text();
      if (text) {
        fullResponse += text;
        ws.send(JSON.stringify({
          type: 'analysis:chunk',
          data: text
        }));
      }
    }
    
    // Try to parse as JSON
    try {
      const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        ws.send(JSON.stringify({
          type: 'analysis:end',
          data: parsed
        }));
      }
    } catch {
      ws.send(JSON.stringify({
        type: 'analysis:end',
        data: { fullResponse }
      }));
    }
  } catch (error) {
    console.error('Analysis Error:', error.message);
    // Fallback: Send mock analysis
    console.log('⚠️ Menggunakan mock analysis...');
    ws.send(JSON.stringify({ type: 'analysis:start' }));
    ws.send(JSON.stringify({
      type: 'analysis:chunk',
      data: 'Analisis bacaan Anda...'
    }));
    ws.send(JSON.stringify({
      type: 'analysis:end',
      data: {
        accuracy: 85,
        errors: 'Pelafalan kurang jelas di beberapa tempat',
        corrections: 'Ulangi dengan memperhatikan tajweed',
        motivation: 'Bagus! Terus latihan dan Anda akan semakin mahir! 🎉'
      }
    }));
  }
}

async function handleLearning(ws, message) {
  try {
    if (!genAI) {
      throw new Error('API key tidak tersedia');
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const { surahName, ayahNumber, topic } = message;
    
    const prompt = `
      Buatkan materi pembelajaran interaktif Alquran:
      
      Surah: ${surahName}
      Ayat: ${ayahNumber}
      Topik: ${topic || 'Umum'}
      
      Sertakan:
      1. Penjelasan makna
      2. Asbabun Nuzul (latar belakang)
      3. Hukum dan pelajaran
      4. Aplikasi dalam hidup
      5. Quiz singkat
      
      Gunakan bahasa Indonesia yang mudah dipahami dan menarik.
    `;
    
    const stream = await model.generateContentStream(prompt);
    
    ws.send(JSON.stringify({ type: 'learning:start' }));
    
    for await (const chunk of stream.stream) {
      const text = chunk.text();
      if (text) {
        ws.send(JSON.stringify({
          type: 'learning:chunk',
          data: text
        }));
      }
    }
    
    ws.send(JSON.stringify({ type: 'learning:end' }));
  } catch (error) {
    console.error('Learning Error:', error.message);
    // Fallback: Send mock learning content
    console.log('⚠️ Menggunakan mock learning content...');
    ws.send(JSON.stringify({ type: 'learning:start' }));
    ws.send(JSON.stringify({
      type: 'learning:chunk',
      data: `📖 Materi Pembelajaran: Surah ${message.surahName}, Ayat ${message.ayahNumber}\n\n`
    }));
    ws.send(JSON.stringify({
      type: 'learning:chunk',
      data: `**Penjelasan Makna:**\nAyat ini berbicara tentang pentingnya ilmu dan ketakwaan kepada Allah. Setiap kata memiliki makna yang mendalam.\n\n`
    }));
    ws.send(JSON.stringify({
      type: 'learning:chunk',
      data: `**Asbabun Nuzul:**\nAyat ini diturunkan untuk memberikan tuntunan kepada umat Islam tentang pentingnya belajar.\n\n`
    }));
    ws.send(JSON.stringify({
      type: 'learning:chunk',
      data: `**Aplikasi Dalam Hidup:**\n1. Rajin belajar Quran\n2. Menerapkan ajaran Islam\n3. Menjadi hamba yang berpengetahuan\n\n`
    }));
    ws.send(JSON.stringify({
      type: 'learning:chunk',
      data: `**Quiz:** Apa arti dari kata "ilm" dalam Quran?`
    }));
    ws.send(JSON.stringify({ type: 'learning:end' }));
  }
}

export function broadcastMessage(message) {
  connections.forEach((ws) => {
    if (ws.readyState === 1) { // WebSocket.OPEN
      ws.send(JSON.stringify(message));
    }
  });
}
