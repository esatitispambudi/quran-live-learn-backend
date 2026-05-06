import React, { useState, useRef, useEffect } from 'react';
import './LiveChat.css';

export default function LiveChat({ learningMode, currentSurah, darkMode }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [recordingAudio, setRecordingAudio] = useState(false);
  const mediaRecorderRef = useRef(null);
  
  // Live features
  const [liveMode, setLiveMode] = useState(false); // false, 'audio', 'video'
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    const wsUrl = process.env.REACT_APP_WS_URL || 'wss://quran-live-learn-backend.vercel.app/ws';
    
    try {
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        setIsConnected(true);
        console.log('✅ Connected to server');
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleServerMessage(data);
      };

      wsRef.current.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        setIsConnected(false);
      };

      wsRef.current.onclose = () => {
        setIsConnected(false);
        console.log('❌ Disconnected from server');
      };
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const handleServerMessage = (data) => {
    switch (data.type) {
      case 'chat:start':
        setMessages(prev => [...prev, { role: 'assistant', content: '', isStreaming: true }]);
        break;
      case 'chat:chunk':
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content += data.data;
          return updated;
        });
        break;
      case 'chat:end':
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].isStreaming = false;
          return updated;
        });
        setIsLoading(false);
        break;
      case 'analysis:chunk':
        setMessages(prev => {
          const updated = [...prev];
          if (!updated[updated.length - 1].content) {
            updated[updated.length - 1].content = '';
          }
          updated[updated.length - 1].content += data.data;
          return updated;
        });
        break;
      case 'error':
        setMessages(prev => [...prev, { role: 'assistant', content: `❌ Error: ${data.message}`, isError: true }]);
        setIsLoading(false);
        break;
      default:
        break;
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim() || !isConnected) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'chat',
        userMessage,
        context: `Surah ${currentSurah}`
      }));
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks = [];
      mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        await sendAudio(audioBlob);
      };

      mediaRecorder.start();
      setRecordingAudio(true);
    } catch (error) {
      console.error('Microphone error:', error);
      alert('Tidak dapat mengakses microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setRecordingAudio(false);
    }
  };

  // Live Audio/Video Functions
  const startLiveAudio = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false
        } 
      });
      
      // Setup audio level monitoring
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(audioStream);
      source.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(Math.round((avg / 255) * 100));
        if (liveMode === 'audio') requestAnimationFrame(updateLevel);
      };
      updateLevel();
      
      setStream(audioStream);
      setLiveMode('audio');
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: '🎤 Live Audio dimulai - Berbicara untuk berkomunikasi dengan AI' 
      }]);
    } catch (error) {
      console.error('Microphone error:', error);
      alert('❌ Tidak dapat mengakses microphone: ' + error.message);
    }
  };

  const startLiveVideo = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
      
      setStream(videoStream);
      setLiveMode('video');
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: '📹 Live Video dimulai - AI dapat melihat Anda' 
      }]);
    } catch (error) {
      console.error('Camera error:', error);
      alert('❌ Tidak dapat mengakses kamera: ' + error.message);
    }
  };

  const stopLive = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setLiveMode(false);
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: '✅ Live session berakhir' 
      }]);
    }
  };

  const sendAudio = async (audioBlob) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: '🎤 Merekam audio...', isAudio: true }]);
    
    // In real implementation, send to backend for transcription
    // For now, simulate with placeholder
    setTimeout(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'analyze',
          textCorrect: 'النص الصحيح',
          userText: 'محاولة قراءة المستخدم',
          audioTranscription: 'Transkripsi audio dari server'
        }));
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`live-chat ${darkMode ? 'dark' : 'light'}`}>
      <div className="chat-header">
        <div className="status-indicator">
          <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h2>Assalamu Alaikum! 👋</h2>
            <p>Selamat datang di AI Live - Belajar Baca Alquran</p>
            <p>Mulai dengan bertanya atau merekam bacaan Anda</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="message-avatar">
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              {msg.isStreaming && <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>}
              <p className={msg.isError ? 'error-text' : ''}>{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <div className="input-controls">
          {/* Live Features Panel */}
          {liveMode && (
            <div className="live-features-panel">
              {liveMode === 'audio' && (
                <div className="live-audio">
                  <div className="audio-level">
                    <span>🎤 Audio Level: </span>
                    <div className="level-bar">
                      <div className="level-fill" style={{width: `${audioLevel}%`}}></div>
                    </div>
                    <span>{audioLevel}%</span>
                  </div>
                </div>
              )}
              
              {liveMode === 'video' && (
                <div className="live-video-container">
                  <video ref={videoRef} autoPlay playsInline muted style={{width: '100%', maxHeight: '200px', borderRadius: '8px'}} />
                </div>
              )}
              
              <button 
                className="btn btn-stop-live" 
                onClick={stopLive}
                title="Hentikan live session"
              >
                ⏹️ Hentikan Live
              </button>
            </div>
          )}
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={liveMode ? `Live Mode: ${liveMode === 'audio' ? '🎤 Berbicara untuk berkomunikasi...' : '📹 Kamera aktif...'}` : 'Ketik pertanyaan atau feedback Anda...'}
            disabled={!isConnected || isLoading}
            rows="3"
          />
          <div className="action-buttons">
            {!liveMode ? (
              <>
                <button
                  className={`btn btn-mic ${recordingAudio ? 'recording' : ''}`}
                  onClick={recordingAudio ? stopRecording : startRecording}
                  disabled={isLoading}
                  title="Rekam audio satu kali"
                >
                  {recordingAudio ? '⏹️ Stop' : '🎤 Rekam'}
                </button>
                <button
                  className="btn btn-live-audio"
                  onClick={startLiveAudio}
                  disabled={isLoading}
                  title="Mulai live audio session (seperti Gemini Live)"
                >
                  🎙️ Live Audio
                </button>
                <button
                  className="btn btn-live-video"
                  onClick={startLiveVideo}
                  disabled={isLoading}
                  title="Mulai live video session"
                >
                  📹 Live Video
                </button>
              </>
            ) : null}
            <button
              className="btn btn-send"
              onClick={sendMessage}
              disabled={!inputValue.trim() || !isConnected || isLoading}
              title="Kirim pesan"
            >
              {isLoading ? '...' : '📤 Kirim'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
