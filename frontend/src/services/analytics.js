// src/services/analytics.js - Learning Analytics
export const analyticsService = {
  trackEvent: (eventName, eventData = {}) => {
    const events = JSON.parse(localStorage.getItem('analytics') || '[]');
    events.push({
      name: eventName,
      data: eventData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('analytics', JSON.stringify(events.slice(-1000))); // Keep last 1000 events
  },

  trackChatMessage: (role, messageLength) => {
    analyticsService.trackEvent('chat_message', {
      role,
      length: messageLength
    });
  },

  trackAudioRecord: (duration, accuracy) => {
    analyticsService.trackEvent('audio_record', {
      duration,
      accuracy: accuracy || 'pending'
    });
  },

  trackSurahSelected: (surahNumber) => {
    analyticsService.trackEvent('surah_selected', {
      surah: surahNumber
    });
  },

  trackAyahSelected: (surahNumber, ayahNumber) => {
    analyticsService.trackEvent('ayah_selected', {
      surah: surahNumber,
      ayah: ayahNumber
    });
  },

  trackModeChange: (mode) => {
    analyticsService.trackEvent('mode_changed', {
      mode
    });
  },

  getLearningStats: () => {
    const events = JSON.parse(localStorage.getItem('analytics') || '[]');
    const stats = {
      totalChatMessages: 0,
      totalRecordings: 0,
      totalAyahsStudied: 0,
      totalSurahsVisited: 0,
      averageAccuracy: 0,
      sessionDuration: 0
    };

    events.forEach(event => {
      if (event.name === 'chat_message') stats.totalChatMessages++;
      if (event.name === 'audio_record') stats.totalRecordings++;
      if (event.name === 'ayah_selected') stats.totalAyahsStudied++;
      if (event.name === 'surah_selected') stats.totalSurahsVisited++;
    });

    return stats;
  },

  getEventsByType: (eventName) => {
    const events = JSON.parse(localStorage.getItem('analytics') || '[]');
    return events.filter(e => e.name === eventName);
  },

  clearAnalytics: () => {
    localStorage.removeItem('analytics');
  }
};

export default analyticsService;
