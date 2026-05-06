// Environment Configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 30000
  },

  // WebSocket Configuration
  websocket: {
    url: process.env.REACT_APP_WS_URL || 'ws://localhost:5000/ws',
    reconnectAttempts: 5,
    reconnectDelay: 3000
  },

  // AI Configuration
  ai: {
    streamChunkSize: 50,
    maxContextLength: 2000
  },

  // Quran Configuration
  quran: {
    totalSurahs: 114,
    defaultSurah: 1,
    audioProvider: 'alafasy' // Recommended Qari
  },

  // UI Configuration
  ui: {
    darkMode: true,
    animationDuration: 300,
    messagePageSize: 50
  },

  // Feature Flags
  features: {
    recordingEnabled: true,
    analysisEnabled: true,
    historyEnabled: false,
    profileEnabled: false,
    certificationEnabled: false
  }
};

export default config;
