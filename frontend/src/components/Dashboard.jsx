import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { storageService } from '../services/storage';
import { analyticsService } from '../services/analytics';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalChatMessages: 0,
    totalRecordings: 0,
    totalAyahsStudied: 0,
    totalSurahsVisited: 0
  });

  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const learningStats = analyticsService.getLearningStats();
    setStats(learningStats);
    
    const learningHistory = storageService.getLearningHistory();
    setHistory(learningHistory.slice(-5)); // Last 5 sessions

    const savedBookmarks = storageService.getBookmarks();
    setBookmarks(savedBookmarks);
  }, []);

  return (
    <div className="dashboard">
      <h2>📊 Dashboard Pembelajaran</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalChatMessages}</div>
          <div className="stat-label">Pertanyaan Terjawab</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalRecordings}</div>
          <div className="stat-label">Bacaan Direkam</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalAyahsStudied}</div>
          <div className="stat-label">Ayat Dipelajari</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalSurahsVisited}</div>
          <div className="stat-label">Surah Dikunjungi</div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h3>📚 Riwayat Pembelajaran</h3>
          {history.length > 0 ? (
            <ul className="history-list">
              {history.map((item, idx) => (
                <li key={idx}>
                  <span className="time">
                    {new Date(item.timestamp).toLocaleDateString('id-ID')}
                  </span>
                  <span className="content">{item.content?.substring(0, 50)}...</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">Belum ada riwayat pembelajaran</p>
          )}
        </div>

        <div className="section">
          <h3>🔖 Bookmark Saya</h3>
          {bookmarks.length > 0 ? (
            <ul className="bookmarks-list">
              {bookmarks.map((bookmark, idx) => (
                <li key={idx}>
                  Surah {bookmark.surah} : {bookmark.ayah}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">Belum ada bookmark</p>
          )}
        </div>
      </div>
    </div>
  );
}
