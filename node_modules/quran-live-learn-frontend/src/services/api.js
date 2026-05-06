// Frontend API Service
const API_URL = process.env.REACT_APP_API_URL || 'https://quran-live-learn-backend.vercel.app/api';

export const quranAPI = {
  // Get Quran metadata
  getMeta: async () => {
    const response = await fetch(`${API_URL}/quran/meta`);
    return response.json();
  },

  // Get specific Surah
  getSurah: async (number) => {
    const response = await fetch(`${API_URL}/quran/surah/${number}`);
    return response.json();
  },

  // Get specific Ayah
  getAyah: async (surah, ayah) => {
    const response = await fetch(`${API_URL}/quran/ayah/${surah}/${ayah}`);
    return response.json();
  },

  // Get audio for Surah
  getAudio: async (surah) => {
    const response = await fetch(`${API_URL}/quran/audio/${surah}`);
    return response.json();
  },

  // Health check
  healthCheck: async () => {
    const response = await fetch(`${API_URL.replace('/api', '')}/api/health`);
    return response.json();
  }
};

export default quranAPI;
