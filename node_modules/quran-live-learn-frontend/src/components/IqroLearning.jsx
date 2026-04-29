import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IqroLearning.css';
import config from '../config';

export default function IqroLearning() {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('levels');
  const [learningPath, setLearningPath] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);

  // Initialize Speech Synthesis for Arabic
  const synth = window.speechSynthesis;

  useEffect(() => {
    loadIqroData();
  }, []);

  // Function to play pronunciation audio
  const playPronunciation = (text, speed = 1) => {
    if (!synth) {
      console.error('❌ Speech Synthesis tidak didukung');
      return;
    }

    // Cancel any ongoing speech and reset state
    synth.cancel();
    
    // Small timeout to ensure cancel is processed by the browser
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA'; // Arabic (Saudi Arabia)
      utterance.rate = speed;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Mark as playing with a specific key to handle multiple buttons
      const playKey = speed === 0.5 ? `slow-${text}` : `normal-${text}`;
      setPlayingAudio(playKey);

      utterance.onend = () => {
        setPlayingAudio(null);
      };

      utterance.onerror = (event) => {
        if (event.error !== 'interrupted') {
          console.error('❌ Audio error:', event.error);
        }
        setPlayingAudio(null);
      };

      synth.speak(utterance);
    }, 50);
  };

  const loadIqroData = async () => {
    try {
      setLoading(true);
      const [levelsRes, pathRes] = await Promise.all([
        axios.get(`${config.api.baseUrl}/iqro/levels`),
        axios.get(`${config.api.baseUrl}/iqro/learning-path`)
      ]);

      setLevels(levelsRes.data.levels || []);
      setLearningPath(pathRes.data.learningPath);
      setLoading(false);
    } catch (error) {
      console.error('❌ Gagal memuat data Iqro:', error);
      setLoading(false);
    }
  };

  const loadLevel = async (levelNumber) => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.api.baseUrl}/iqro/level/${levelNumber}`);
      setSelectedLevel(res.data.level);
      if (res.data.level.lessons.length > 0) {
        setCurrentLesson(res.data.level.lessons[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('❌ Gagal memuat level:', error);
      setLoading(false);
    }
  };

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
  };

  if (loading) {
    return <div className="iqro-loading">⏳ Sedang memuat Iqro...</div>;
  }

  return (
    <div className="iqro-learning">
      {/* Tabs */}
      <div className="iqro-tabs">
        <button
          className={`tab-btn ${activeTab === 'levels' ? 'active' : ''}`}
          onClick={() => setActiveTab('levels')}
        >
          📚 Semua Level
        </button>
        <button
          className={`tab-btn ${activeTab === 'path' ? 'active' : ''}`}
          onClick={() => setActiveTab('path')}
        >
          🗺️ Panduan Belajar
        </button>
        <button
          className={`tab-btn ${activeTab === 'lesson' ? 'active' : ''}`}
          onClick={() => setActiveTab('lesson')}
          disabled={!selectedLevel}
        >
          ✏️ Pelajaran
        </button>
      </div>

      {/* Levels Overview */}
      {activeTab === 'levels' && (
        <div className="iqro-levels">
          <h2>📖 Pilih Level Pembelajaran Iqro</h2>
          <p className="info-text">
            Iqro adalah metode pembelajaran membaca Quran dari huruf dasar. 
            Setelah menyelesaikan 30 level, Anda siap membaca Quran!
          </p>
          
          <div className="levels-grid">
            {levels.map((level) => (
              <div
                key={level.level}
                className="level-card"
                onClick={() => {
                  loadLevel(level.level);
                  setActiveTab('lesson');
                }}
              >
                <div className="level-number">Level {level.level}</div>
                <div className="level-title">{level.title}</div>
                <div className="level-desc">{level.description}</div>
                <div className="level-meta">
                  <span>📚 {level.lessons_count} pelajaran</span>
                  <span>📅 {level.estimated_days} hari</span>
                </div>
                <button className="btn-start">Mulai Belajar →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Path */}
      {activeTab === 'path' && learningPath && (
        <div className="iqro-path">
          <h2>🗺️ Panduan Pembelajaran Terstruktur</h2>
          
          <div className="path-container">
            {Object.entries(learningPath).map(([key, phase], idx) => (
              <div key={key} className="path-phase">
                <div className="phase-header">
                  <div className="phase-number">{idx + 1}</div>
                  <div className="phase-info">
                    <h3>{phase.name}</h3>
                    <p className="phase-duration">⏱️ {phase.duration}</p>
                  </div>
                </div>
                
                {phase.goals && (
                  <div className="phase-goals">
                    <h4>Tujuan:</h4>
                    <ul>
                      {phase.goals.map((goal, i) => (
                        <li key={i}>✓ {goal}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {phase.levels && (
                  <div className="phase-levels">
                    <h4>Level:</h4>
                    <div className="levels-list">
                      {phase.levels.map((levelNum) => (
                        <button
                          key={levelNum}
                          className="level-link"
                          onClick={() => {
                            loadLevel(levelNum);
                            setActiveTab('lesson');
                          }}
                        >
                          Level {levelNum}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="total-time">
            ⏱️ Waktu Total: {learningPath.estimatedTotalTime}
          </div>
        </div>
      )}

      {/* Lesson Content */}
      {activeTab === 'lesson' && selectedLevel && currentLesson && (
        <div className="iqro-lesson">
          <div className="lesson-header">
            <h2>{selectedLevel.levelTitle}</h2>
            <p>{selectedLevel.level > 0 && `Level ${selectedLevel.level}`}</p>
          </div>

          <div className="lesson-container">
            {/* Main Lesson Display */}
            <div className="lesson-main">
              <div className="lesson-card">
                {/* Arabic Text */}
                <div className="arabic-display">
                  <div className="arabic-text-container">
                    <div className="arabic-text">{currentLesson.arabic}</div>
                    <button 
                      className="btn-play-large"
                      onClick={() => playPronunciation(currentLesson.arabic, 1)}
                      title="Mainkan pelafalan"
                    >
                      {playingAudio?.includes(currentLesson.arabic) ? '⏸️' : '▶️'}
                    </button>
                  </div>
                  {currentLesson.name && (
                    <div className="lesson-name">{currentLesson.name}</div>
                  )}
                </div>

                {/* Lesson Info */}
                <div className="lesson-info">
                  {currentLesson.translation && (
                    <div className="info-item">
                      <span className="label">Terjemahan:</span>
                      <span className="value">{currentLesson.translation}</span>
                    </div>
                  )}
                  {currentLesson.sound && (
                    <div className="info-item">
                      <span className="label">Pelafalan:</span>
                      <span className="value">{currentLesson.sound}</span>
                    </div>
                  )}
                  {currentLesson.symbol && (
                    <div className="info-item">
                      <span className="label">Simbol:</span>
                      <span className="value">{currentLesson.symbol}</span>
                    </div>
                  )}
                  {currentLesson.example && (
                    <div className="info-item">
                      <span className="label">Contoh:</span>
                      <span className="value">{currentLesson.example}</span>
                    </div>
                  )}
                </div>

                {/* Tips */}
                {currentLesson.tips && (
                  <div className="tips-box">
                    <h4>💡 Tips Pengucapan:</h4>
                    <p>{currentLesson.tips}</p>
                  </div>
                )}

                {/* Pronunciation Examples */}
                {currentLesson.pronunciationExamples && (
                  <div className="pronunciation-box">
                    <h4>🔊 Contoh Pengucapan:</h4>
                    <div className="pronunciation-content">
                      <div className="pronunciation-item">
                        <span className="label">Pelafalan Lambat:</span>
                        <span className="value">{currentLesson.pronunciationExamples.slow}</span>
                        <button 
                          className={`btn-audio ${playingAudio === `slow-${currentLesson.arabic}` ? 'playing' : ''}`}
                          onClick={() => playPronunciation(currentLesson.arabic, 0.5)}
                          disabled={playingAudio !== null && playingAudio !== `slow-${currentLesson.arabic}`}
                        >
                          {playingAudio === `slow-${currentLesson.arabic}` ? '⏸️ Sedang Diputar...' : '🔊 Dengarkan'}
                        </button>
                      </div>
                      <div className="pronunciation-item">
                        <span className="label">Pelafalan Normal:</span>
                        <span className="value">{currentLesson.pronunciationExamples.normal}</span>
                        <button 
                          className={`btn-audio ${playingAudio === `normal-${currentLesson.arabic}` ? 'playing' : ''}`}
                          onClick={() => playPronunciation(currentLesson.arabic, 1)}
                          disabled={playingAudio !== null && playingAudio !== `normal-${currentLesson.arabic}`}
                        >
                          {playingAudio === `normal-${currentLesson.arabic}` ? '⏸️ Sedang Diputar...' : '🔊 Dengarkan'}
                        </button>
                      </div>
                      <div className="pronunciation-item">
                        <span className="label">Perbandingan:</span>
                        <span className="value">{currentLesson.pronunciationExamples.comparison}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Practice Instructions */}
                {currentLesson.practice && (
                  <div className="practice-box">
                    <h4>🎤 Praktik:</h4>
                    <p>{currentLesson.practice}</p>
                    <button className="btn-record">🎤 Mulai Praktik</button>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="lesson-nav">
                <button
                  className="nav-btn prev"
                  onClick={() => {
                    const currentIdx = selectedLevel.lessons.findIndex(
                      (l) => l.id === currentLesson.id
                    );
                    if (currentIdx > 0) {
                      setCurrentLesson(selectedLevel.lessons[currentIdx - 1]);
                    }
                  }}
                  disabled={
                    selectedLevel.lessons.findIndex((l) => l.id === currentLesson.id) ===
                    0
                  }
                >
                  ← Sebelumnya
                </button>

                <span className="progress-text">
                  {selectedLevel.lessons.findIndex((l) => l.id === currentLesson.id) +
                    1}{' '}
                  / {selectedLevel.lessons.length}
                </span>

                <button
                  className="nav-btn next"
                  onClick={() => {
                    const currentIdx = selectedLevel.lessons.findIndex(
                      (l) => l.id === currentLesson.id
                    );
                    if (currentIdx < selectedLevel.lessons.length - 1) {
                      setCurrentLesson(selectedLevel.lessons[currentIdx + 1]);
                    }
                  }}
                  disabled={
                    selectedLevel.lessons.findIndex((l) => l.id === currentLesson.id) ===
                    selectedLevel.lessons.length - 1
                  }
                >
                  Selanjutnya →
                </button>
              </div>
            </div>

            {/* Lessons List Sidebar */}
            <div className="lessons-sidebar">
              <h3>📋 Daftar Pelajaran</h3>
              <div className="lessons-list">
                {selectedLevel.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    className={`lesson-item ${
                      currentLesson.id === lesson.id ? 'active' : ''
                    }`}
                    onClick={() => handleLessonClick(lesson)}
                  >
                    <span className="lesson-num">{idx + 1}</span>
                    <span className="lesson-text">
                      {lesson.arabic} {lesson.name && `- ${lesson.name}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
