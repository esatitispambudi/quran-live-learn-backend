// src/utils/textProcessor.js - Text Processing Utilities

export const textProcessor = {
  // Normalize Arabic text
  normalizeArabic: (text) => {
    if (!text) return '';
    
    // Remove diacritics
    return text
      .replace(/ً/g, '') // Fathatan
      .replace(/ٌ/g, '') // Dammatan
      .replace(/ٍ/g, '') // Kasratan
      .replace(/َ/g, '') // Fatha
      .replace(/ُ/g, '') // Damma
      .replace(/ِ/g, '') // Kasra
      .replace(/ّ/g, '') // Shadda
      .replace(/ْ/g, '') // Sukun
      .replace(/ـ/g, ''); // Tatweel
  },

  // Format text for display
  formatForDisplay: (text) => {
    return text
      .split('\n')
      .filter(line => line.trim())
      .join('\n');
  },

  // Extract Islamic terms
  extractIslamicTerms: (text) => {
    const islamicTerms = {
      'surah': 'Surah',
      'ayat': 'Ayat',
      'hadith': 'Hadith',
      'quran': 'Alquran',
      'mosque': 'Masjid',
      'prophet': 'Nabi'
    };

    let result = text.toLowerCase();
    Object.entries(islamicTerms).forEach(([term, arabic]) => {
      result = result.replace(new RegExp(term, 'g'), arabic);
    });

    return result;
  },

  // Highlight Quranic verses in text
  highlightVerses: (text) => {
    const versePattern = /\[(\d+):(\d+)\]/g;
    return text.replace(versePattern, '<span class="verse-ref">[$1:$2]</span>');
  },

  // Count words in text
  countWords: (text) => {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  },

  // Get text summary
  getSummary: (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
};

export default textProcessor;
