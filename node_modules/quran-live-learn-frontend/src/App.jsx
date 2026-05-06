import React, { useState, useEffect } from 'react';
import './App.css';
import LiveChat from './components/LiveChat';
import QuranDisplay from './components/QuranDisplay';
import IqroLearning from './components/IqroLearning';
import Navbar from './components/Navbar';

export default function App() {
  const [currentSurah, setCurrentSurah] = useState(1);
  const [learningMode, setLearningMode] = useState('iqro'); // iqro (huruf), quran (Quran), chat
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        learningMode={learningMode}
        setLearningMode={setLearningMode}
      />
      
      <div className="app-container">
        {/* Mode: Iqro Learning */}
        {learningMode === 'iqro' && (
          <IqroLearning />
        )}

        {/* Mode: Quran Learning */}
        {learningMode === 'quran' && (
          <>
            <div className="main-panel">
              <QuranDisplay 
                currentSurah={currentSurah}
                setCurrentSurah={setCurrentSurah}
              />
            </div>

            <div className="chat-panel">
              <LiveChat 
                learningMode={learningMode}
                currentSurah={currentSurah}
                darkMode={darkMode}
              />
            </div>
          </>
        )}

        {/* Mode: Chat Only */}
        {learningMode === 'chat' && (
          <div style={{ width: '100%' }}>
            <LiveChat 
              learningMode={learningMode}
              currentSurah={currentSurah}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
}
