import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import './QuranDisplay.css';
import config from '../config';

export default function QuranDisplay({ currentSurah, setCurrentSurah }) {
  const [surahs, setSurahs] = useState([]);
  const [currentAyahs, setCurrentAyahs] = useState([]);
  const [surahInfo, setSurahInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAyah, setSelectedAyah] = useState(null);
  const [translations, setTranslations] = useState([]);
  const [audioUrls, setAudioUrls] = useState({});
  const [availableTranslations, setAvailableTranslations] = useState([]);
  const selectedTranslation = 'id.indonesian'; // 🇮🇩 Locked to Indonesian only
  const lastLoadRef = useRef(null);
  
  // Learn & Practice states
  const [learnMode, setLearnMode] = useState(null); // null, 'learn', 'practice'
  const [learningAyah, setLearningAyah] = useState(null);
  const [learnContent, setLearnContent] = useState('');
  const [learnLoading, setLearnLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [practiceLoading, setPracticeLoading] = useState(false);
  const [useGeminiTranslation, setUseGeminiTranslation] = useState(true); // Always use Gemini for Indonesian
  const [translationMethod, setTranslationMethod] = useState('gemini'); // Force Gemini for better Indonesian

  // Define loadSurah BEFORE useEffect - ALWAYS Indonesian with Gemini
  const loadSurah = async (surahNumber) => {
    const key = `${surahNumber}-id`;
    if (lastLoadRef.current === key && loading) {
      return; // Skip if already loading same surah
    }
    
    lastLoadRef.current = key;
    setLoading(true);
    console.log(`📖 Loading surah ${surahNumber} - 🇮🇩 Indonesian (Gemini AI)...`);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);
      
      const url = `${config.api.baseUrl}/quran/surah/${surahNumber}?translationCode=id.indonesian&useGemini=true`;
      
      let response;
      try {
        response = await fetch(url, { signal: controller.signal });
      } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          throw new Error('Timeout - API terlalu lambat');
        }
        throw error;
      }
      
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Failed');
      
      console.log(`✅ Surah ${surahNumber} loaded - Indonesian 🇮🇩`);
      setUseGeminiTranslation(true); // Always true for Indonesian
      setCurrentAyahs(data.arabic || []);
      setTranslations(data.translation || []);
      
      const surahData = surahs.find(s => s.number === surahNumber);
      setSurahInfo({
        number: surahNumber,
        name: surahData?.name || `Surah ${surahNumber}`
      });

      // Load audio async
      fetch(`${config.api.baseUrl}/quran/audio/${surahNumber}`)
        .then(r => r.json())
        .then(d => {
          if (d.success) {
            const map = {};
            d.audioAyahs.forEach(a => { map[a.number] = a.audio; });
            setAudioUrls(map);
          }
        })
        .catch(e => console.warn('Audio:', e.message));
        
    } catch (error) {
      console.error('❌ Error:', error.message);
      if (error.message.includes('Timeout')) {
        alert('⏱️ Timeout - API response lambat. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSurahs();
    loadAvailableTranslations();
  }, []);

  // useEffect to load on mount and when surah changes - Indonesian only
  useEffect(() => {
    loadSurah(currentSurah);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSurah]);

  const loadAvailableTranslations = async () => {
    try {
      console.log('📚 Fetching available translations...');
      // Only show Indonesian - locked to this language
      setAvailableTranslations([
        { code: 'id.indonesian', name: '🇮🇩 Bahasa Indonesia', lang: 'id' }
      ]);
      console.log('✅ Indonesian language locked');
    } catch (error) {
      console.error('❌ Error loading translations:', error);
    }
  };

  const loadSurahs = async () => {
    try {
      console.log('📡 Fetching surahs from backend...');
      const response = await fetch(`${config.api.baseUrl}/quran/meta`);
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (data.success && Array.isArray(data.surahs)) {
        console.log(`✅ Loaded ${data.surahs.length} surahs`);
        setSurahs(data.surahs);
      } else {
        console.error('❌ Invalid response format:', data);
        setSurahs([]);
      }
    } catch (error) {
      console.error('❌ Error loading surahs:', error);
      setSurahs([]);
    }
  };

  const handlePlayAudio = (ayahNumber) => {
    const url = audioUrls[ayahNumber];
    if (url) {
      const audio = new Audio(url);
      audio.play();
    } else {
      alert('Audio tidak tersedia');
    }
  };

  const handleLearn = async (ayah) => {
    setLearningAyah(ayah);
    setLearnMode('learn');
    setLearnLoading(true);
    setLearnContent('');
    
    try {
      console.log(`📚 Fetching learning material for ayah ${ayah.numberInSurah}...`);
      
      const response = await fetch(`${config.api.baseUrl}/quran/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surah: currentSurah,
          ayah: ayah.numberInSurah,
          text: ayah.text,
          translation: translations[currentAyahs.indexOf(ayah)]?.text || '',
          type: 'learn'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setLearnContent(data.analysis || 'Tidak ada analisis');
      } else {
        setLearnContent('❌ Gagal mendapatkan analisis');
      }
    } catch (error) {
      console.error('Learn error:', error);
      setLearnContent('❌ Error: ' + error.message);
    } finally {
      setLearnLoading(false);
    }
  };

  const handlePractice = async (ayah) => {
    setLearningAyah(ayah);
    setLearnMode('practice');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = async (e) => {
        const audioBlob = new Blob([e.data], { type: 'audio/wav' });
        console.log('📤 Uploading recording...');
        
        const formData = new FormData();
        formData.append('audio', audioBlob);
        formData.append('surah', currentSurah);
        formData.append('ayah', ayah.numberInSurah);
        formData.append('text', ayah.text);
        // Add translation so AI can analyze properly
        const ayahIndex = currentAyahs.indexOf(ayah);
        const translation = translations[ayahIndex]?.text || 'Terjemahan tidak tersedia';
        formData.append('translation', translation);
        
        try {
          const response = await fetch(`${config.api.baseUrl}/quran/practice`, {
            method: 'POST',
            body: formData
          });
          
          const result = await response.json();
          if (result.success) {
            const feedback = result.feedback || `
✅ **Hasil Evaluasi Bacaan**

**Skor: ${result.score}%**

**Hasil:** ${result.hasil || 'Bacaan cukup baik'}

**Evaluasi:**
• Pengucapan: ${result.makhraj || 'Baik'}
• Tajweed: ${result.tajweed || 'Cukup'}
• Durasi: ${result.durasi || 'Cukup Baik'}

**Saran:**
${(result.saran || []).map((s, i) => `${i + 1}. ${s}`).join('\n')}

**Motivasi:** ${result.motivasi || 'Terus semangat!'}
            `;
            setLearnContent(`✅ Score: ${result.score}%\n\n${feedback}`);
          } else {
            setLearnContent('❌ ' + result.error);
          }
        } catch (err) {
          setLearnContent('❌ Error uploading: ' + err.message);
        }
      };
      
      setMediaRecorder(recorder);
      recorder.start();
      setRecording(true);
      setLearnContent('🎤 Recording... Click Stop to end');
    } catch (error) {
      alert('❌ Microphone access denied: ' + error.message);
      setLearnMode(null);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
      setLearnContent('📤 Processing your recording...');
    }
  };

  const closeLearningPanel = () => {
    setLearnMode(null);
    setLearningAyah(null);
    setLearnContent('');
    if (recording) {
      mediaRecorder?.stop();
      setRecording(false);
    }
  };

  const handleAyahSelect = (idx) => {
    setSelectedAyah(selectedAyah === idx ? null : idx);
  };

  return (
    <div className="quran-display">
      <div className="translation-controls">
        <div className="translation-selector">
          <label>🇮🇩 Terjemahan: Bahasa Indonesia (Terkunci)</label>
          <p className="language-locked-info">✅ UI dan terjemahan dalam Bahasa Indonesia saja</p>
        </div>
        
        {useGeminiTranslation && (
          <div className="gemini-badge">✨ Menggunakan Gemini AI untuk terjemahan terbaik</div>
        )}
      </div>

      <div className="surah-selector">
        <h2>Pilih Surah</h2>
        <div className="surah-buttons">
          {surahs.map((surah) => (
            <button
              key={surah.number}
              className={`surah-btn ${currentSurah === surah.number ? 'active' : ''}`}
              onClick={() => setCurrentSurah(surah.number)}
            >
              {surah.number}. {surah.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">Memuat Alquran...</div>
      ) : (
        <div className="quran-content">
          {surahInfo && <h1>{surahInfo.name}</h1>}
          
          <div className="ayahs-list">
            {currentAyahs.map((ayah, idx) => (
              <div
                key={idx}
                className={`ayah-item ${selectedAyah === idx ? 'selected' : ''}`}
                onClick={() => handleAyahSelect(idx)}
              >
                <div className="ayah-number">{ayah.numberInSurah}</div>
                <div className="ayah-text-arabic">{ayah.text}</div>
                {selectedAyah === idx && (
                  <div className="ayah-details">
                    <div className="translation-container">
                      <div className="translation-label">
                        🌐 Terjemahan: 
                        <span className="translation-lang">
                          {availableTranslations.find(t => t.code === selectedTranslation)?.name}
                        </span>
                      </div>
                      <p className="ayah-translation">
                        {translations[idx]?.text || '⏳ Terjemahan sedang dimuat...'}
                      </p>
                    </div>
                    <div className="ayah-actions">
                      <button 
                        className="btn-play" 
                        onClick={(e) => { e.stopPropagation(); handlePlayAudio(ayah.numberInSurah); }}
                      >
                        ▶️ Dengarkan
                      </button>
                      <button 
                        className="btn-learn" 
                        onClick={(e) => { e.stopPropagation(); handleLearn(ayah); }}
                      >
                        📚 Pelajari
                      </button>
                      <button 
                        className="btn-practice" 
                        onClick={(e) => { e.stopPropagation(); handlePractice(ayah); }}
                      >
                        🎤 Latihan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Panel Modal */}
      {learnMode && (
        <div className="learning-modal-overlay" onClick={closeLearningPanel}>
          <div className="learning-modal" onClick={(e) => e.stopPropagation()}>
            <div className="learning-modal-header">
              <h3>
                {learnMode === 'learn' ? '📚 Pelajari' : '🎤 Latihan'} - 
                Ayat {learningAyah?.numberInSurah}
              </h3>
              <button className="btn-close" onClick={closeLearningPanel}>✕</button>
            </div>

            <div className="learning-modal-body">
              <div className="ayah-preview">
                <p className="preview-text">{learningAyah?.text}</p>
                <p className="preview-translation">
                  {translations[currentAyahs.indexOf(learningAyah)]?.text}
                </p>
              </div>

              {learnMode === 'learn' ? (
                // Learn Mode
                <div className="learn-content">
                  {learnLoading ? (
                    <div className="loading-spinner">
                      <p>🤖 AI sedang menganalisis...</p>
                    </div>
                  ) : (
                    <div className="analysis-content">
                      {learnContent.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Practice Mode
                <div className="practice-content">
                  <div className="recording-status">
                    {recording ? (
                      <>
                        <div className="recording-indicator">🔴 REC</div>
                        <p>🎤 Sedang merekam...</p>
                      </>
                    ) : learnContent ? (
                      <div className="feedback-content">
                        {learnContent.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    ) : (
                      <p>Klik tombol Mulai untuk merekam bacaan Anda</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="learning-modal-footer">
              {learnMode === 'practice' && (
                <>
                  {!recording ? (
                    <button 
                      className="btn-primary" 
                      onClick={() => handlePractice(learningAyah)}
                      disabled={learnContent && learnContent.includes('Score')}
                    >
                      🎤 Mulai Merekam
                    </button>
                  ) : (
                    <button 
                      className="btn-danger" 
                      onClick={stopRecording}
                    >
                      ⏹️ Selesai
                    </button>
                  )}
                </>
              )}
              <button className="btn-secondary" onClick={closeLearningPanel}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
