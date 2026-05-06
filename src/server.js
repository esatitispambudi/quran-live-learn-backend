import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import http from 'http';
import quranRoutes from './routes/quran.js';
import iqroRoutes from './routes/iqro.js';
import { handleWebSocket } from './services/wsService.js';

dotenv.config();

// Debug: Verify API key is loaded
console.log('🔑 GEMINI_API_KEY loaded:', !!process.env.GEMINI_API_KEY);
console.log('📝 API Key first 10 chars:', process.env.GEMINI_API_KEY?.substring(0, 10) || 'NOT FOUND');
if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  WARNING: GEMINI_API_KEY not found in environment!');
  console.warn('   Please check your .env file and ensure it contains GEMINI_API_KEY');
}

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

// Middleware - CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://belajarngaji.royalwebarabia.com',
  'https://aingaji.royalwebarabia.com',
  'http://belajarngaji.royalwebarabia.com',
  'http://aingaji.royalwebarabia.com',
  'http://localhost:3000',
  'http://localhost:3003',
  'http://localhost:5000',
  'https://quran-live-learn-frontend.vercel.app'
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl requests)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Log rejected origin for debugging
    console.warn(`⚠️  CORS rejected origin: ${origin}`);
    return callback(new Error('CORS policy: Origin not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/quran', quranRoutes);
app.use('/api/iqro', iqroRoutes);

// Fallback routes for common requests
app.get('/api/levels', (req, res) => {
  res.redirect('/api/iqro/levels');
});

app.get('/api/learning-path', (req, res) => {
  res.redirect('/api/iqro/learning-path');
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// WebSocket handling
wss.on('connection', handleWebSocket);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
