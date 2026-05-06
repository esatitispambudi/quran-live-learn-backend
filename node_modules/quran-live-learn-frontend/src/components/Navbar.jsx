import React from 'react';
import './Navbar.css';

export default function Navbar({ darkMode, setDarkMode, learningMode, setLearningMode }) {
  return (
    <nav className={`navbar ${darkMode ? 'dark' : 'light'}`}>
      <div className="navbar-brand">
        <h1>🕌 Alquran Live</h1>
        <p>Belajar Baca Alquran dengan AI</p>
      </div>

      <div className="navbar-modes">
        <button
          className={`mode-btn ${learningMode === 'iqro' ? 'active' : ''}`}
          onClick={() => setLearningMode('iqro')}
          title="Belajar huruf Arab (Iqro) - Mulai dari sini!"
        >
          🔤 Iqro
        </button>
        <button
          className={`mode-btn ${learningMode === 'quran' ? 'active' : ''}`}
          onClick={() => setLearningMode('quran')}
          title="Belajar membaca Quran"
        >
          📖 Quran
        </button>
        <button
          className={`mode-btn ${learningMode === 'chat' ? 'active' : ''}`}
          onClick={() => setLearningMode('chat')}
          title="Tanya jawab tentang Quran"
        >
          💬 Chat
        </button>
      </div>

      <div className="navbar-actions">
        <button
          className={`theme-btn ${darkMode ? 'dark' : 'light'}`}
          onClick={() => setDarkMode(!darkMode)}
          title="Ubah tema"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
