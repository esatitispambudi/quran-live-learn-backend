import { GoogleGenerativeAI } from '@google/generative-ai';

const connections = new Map();

// Lazy initialization - gets API key when actually needed, not at import time
function getGenAI() {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

function getModelName() {
  return process.env.GEMINI_MODEL || 'gemini-2.5-flash';
}

// Fallback models to try in order if primary fails
const FALLBACK_MODELS = ['gemini-1.5-pro', 'gemini-pro'];

async function tryGenerateContentStream(genAI, models, prompt) {
  let lastError;
  
  for (const modelName of models) {
    try {
      console.log(`🤖 Mencoba streaming model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const stream = await model.generateContentStream(prompt);
      return { stream, modelUsed: modelName };
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Streaming model ${modelName} gagal:`, error.message);
    }
  }
  throw lastError;
}

async function tryGenerateContent(genAI, models, prompt) {
  let lastError;
  
  for (const modelName of models) {
    try {
      console.log(`🤖 Mencoba model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return { text: result.response.text(), modelUsed: modelName };
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Model ${modelName} gagal:`, error.message);
    }
  }
  throw lastError;
}

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
    const genAI = getGenAI();
    if (!genAI) {
      console.error('❌ GEMINI_API_KEY tidak ditemukan di environment');
      ws.send(JSON.stringify({ 
        type: 'error',
        message: 'API Key Gemini tidak dikonfigurasi. Silakan hubungi administrator.',
        severity: 'critical'
      }));
      return;
    }
    
    const modelName = getModelName();
    const models = [modelName, ...FALLBACK_MODELS.filter(m => m !== modelName)];
    
    const { userMessage, context } = message;
    
    const systemPrompt = `Anda adalah guru Alquran yang ramah dan berpengalaman. 
    Konteks pembelajaran: ${context || 'Umum'}
    Jawab pertanyaan tentang Alquran dengan jelas, akurat, dan mudah dipahami.`;
    
    const result = await tryGenerateContentStream(genAI, models, {
      contents: [
        {
          parts: [
            { text: systemPrompt },
            { text: userMessage }
          ]
        }
      ]
    });
    
    console.log('✅ AI Model initialized successfully with model:', result.modelUsed);
    
    ws.send(JSON.stringify({ type: 'chat:start' }));
    
    for await (const chunk of result.stream.stream) {
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
    console.error('❌ Chat Stream Error:', error.message);
    console.error('Stack:', error.stack);
    ws.send(JSON.stringify({ 
      type: 'error',
      message: `Gagal terhubung ke AI: ${error.message}`,
      severity: 'error',
      details: error.message
    }));
  }
}

async function handleAnalysis(ws, message) {
  try {
    const genAI = getGenAI();
    if (!genAI) {
      console.error('❌ GEMINI_API_KEY tidak ditemukan di environment');
      ws.send(JSON.stringify({ 
        type: 'error',
        message: 'API Key Gemini tidak dikonfigurasi. Silakan hubungi administrator.',
        severity: 'critical'
      }));
      return;
    }
    
    const modelName = getModelName();
    const models = [modelName, ...FALLBACK_MODELS.filter(m => m !== modelName)];
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
    
    const result = await tryGenerateContentStream(genAI, models, prompt);
    
    console.log('✅ Analysis streaming dengan model:', result.modelUsed);
    ws.send(JSON.stringify({ type: 'analysis:start' }));
    
    let fullResponse = '';
    for await (const chunk of result.stream.stream) {
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
    console.error('❌ Analysis Error:', error.message);
    console.error('Stack:', error.stack);
    ws.send(JSON.stringify({ 
      type: 'error',
      message: `Gagal menganalisis: ${error.message}`,
      severity: 'error',
      details: error.message
    }));
  }
}

async function handleLearning(ws, message) {
  try {
    const genAI = getGenAI();
    if (!genAI) {
      console.error('❌ GEMINI_API_KEY tidak ditemukan di environment');
      ws.send(JSON.stringify({ 
        type: 'error',
        message: 'API Key Gemini tidak dikonfigurasi. Silakan hubungi administrator.',
        severity: 'critical'
      }));
      return;
    }
    
    const modelName = getModelName();
    const models = [modelName, ...FALLBACK_MODELS.filter(m => m !== modelName)];
    
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
    
    const result = await tryGenerateContentStream(genAI, models, prompt);
    
    console.log('✅ Learning material dengan model:', result.modelUsed);
    ws.send(JSON.stringify({ type: 'learning:start' }));
    
    for await (const chunk of result.stream.stream) {
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
    console.error('❌ Learning Error:', error.message);
    console.error('Stack:', error.stack);
    ws.send(JSON.stringify({ 
      type: 'error',
      message: `Gagal memuat materi pembelajaran: ${error.message}`,
      severity: 'error',
      details: error.message
    }));
  }
}

export function broadcastMessage(message) {
  connections.forEach((ws) => {
    if (ws.readyState === 1) { // WebSocket.OPEN
      ws.send(JSON.stringify(message));
    }
  });
}
