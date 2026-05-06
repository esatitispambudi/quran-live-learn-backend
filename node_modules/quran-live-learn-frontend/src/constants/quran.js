// src/constants/quran.js - Quran Constants

export const SURAHS = Array.from({ length: 114 }, (_, i) => ({
  number: i + 1,
  name: `Surah ${i + 1}`,
  arabicName: getArabicSurahName(i + 1),
  revelation: 'Makka or Madina'
}));

export const QURAN_AUDIO_PROVIDERS = {
  ALAFASY: 'alafasy',
  SUDAIS: 'sudais',
  HUSARY: 'husary'
};

export const LEARNING_MODES = {
  LEARN: 'learn',
  ANALYZE: 'analyze',
  CHAT: 'chat'
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

export const API_ENDPOINTS = {
  QURAN_META: '/api/quran/meta',
  SURAH: (num) => `/api/quran/surah/${num}`,
  AYAH: (surah, ayah) => `/api/quran/ayah/${surah}/${ayah}`,
  AUDIO: (surah) => `/api/quran/audio/${surah}`,
  HEALTH: '/api/health'
};

export const COLORS = {
  PRIMARY: '#667eea',
  SECONDARY: '#764ba2',
  ACCENT: '#f093fb',
  SUCCESS: '#4ade80',
  ERROR: '#ef4444',
  WARNING: '#f59e0b',
  INFO: '#3b82f6'
};

function getArabicSurahName(number) {
  const names = [
    'الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة',
    'الأنعام', 'الأعراف', 'الأنفال', 'التوبة', 'يونس',
    'هود', 'يوسف', 'الرعد', 'إبراهيم', 'الحجر',
    'النحل', 'الإسراء', 'الكهف', 'مريم', 'طه'
  ];
  return names[number - 1] || `Surah ${number}`;
}

export default {
  SURAHS,
  QURAN_AUDIO_PROVIDERS,
  LEARNING_MODES,
  TOAST_TYPES,
  API_ENDPOINTS,
  COLORS
};
