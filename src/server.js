import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import http from 'http';
import quranRoutes from './routes/quran.js';
import iqroRoutes from './routes/iqro.js';
import { handleWebSocket } from './services/wsService.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://belajarngaji.royalwebarabia.com',
  'http://localhost:3000',
  'http://localhost:3003'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Origin not allowed'));
  },
  credentials: true
}));
app.options('*', cors());
app.use(express.json());

// Routes
app.use('/api/quran', quranRoutes);
app.use('/api/iqro', iqroRoutes);

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
