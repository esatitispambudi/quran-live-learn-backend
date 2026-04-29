// src/services/storage.js - Local Storage Management
export const storageService = {
  // Learning History
  saveLearningHistory: (lesson) => {
    const history = JSON.parse(localStorage.getItem('learningHistory') || '[]');
    history.push({
      ...lesson,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('learningHistory', JSON.stringify(history.slice(-100))); // Keep last 100
  },

  getLearningHistory: () => {
    return JSON.parse(localStorage.getItem('learningHistory') || '[]');
  },

  clearLearningHistory: () => {
    localStorage.removeItem('learningHistory');
  },

  // User Preferences
  savePreferences: (prefs) => {
    localStorage.setItem('userPreferences', JSON.stringify(prefs));
  },

  getPreferences: () => {
    return JSON.parse(localStorage.getItem('userPreferences') || '{}');
  },

  // Bookmarks
  addBookmark: (surahNumber, ayahNumber) => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    bookmarks.push({ surah: surahNumber, ayah: ayahNumber, addedAt: new Date() });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  },

  getBookmarks: () => {
    return JSON.parse(localStorage.getItem('bookmarks') || '[]');
  },

  removeBookmark: (surahNumber, ayahNumber) => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const filtered = bookmarks.filter(b => !(b.surah === surahNumber && b.ayah === ayahNumber));
    localStorage.setItem('bookmarks', JSON.stringify(filtered));
  },

  // Recorded Sessions
  saveSession: (sessionData) => {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    sessions.push({
      ...sessionData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('sessions', JSON.stringify(sessions.slice(-50))); // Keep last 50
  },

  getSessions: () => {
    return JSON.parse(localStorage.getItem('sessions') || '[]');
  }
};

export default storageService;
