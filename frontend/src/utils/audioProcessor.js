// src/utils/audioProcessor.js - Audio Processing Utilities

export const audioProcessor = {
  // Play audio from URL
  playAudio: async (url) => {
    try {
      const audio = new Audio(url);
      audio.play();
      return audio;
    } catch (error) {
      console.error('Error playing audio:', error);
      throw error;
    }
  },

  // Convert audio blob to base64
  blobToBase64: (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  },

  // Get audio duration
  getAudioDuration: (blob) => {
    return new Promise((resolve) => {
      const audio = new Audio(URL.createObjectURL(blob));
      audio.onloadedmetadata = () => {
        resolve(Math.round(audio.duration));
      };
    });
  },

  // Format duration in MM:SS
  formatDuration: (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  },

  // Check microphone access
  checkMicrophoneAccess: async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch {
      return false;
    }
  }
};

export default audioProcessor;
