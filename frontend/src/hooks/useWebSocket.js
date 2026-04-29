// src/hooks/useWebSocket.js - Custom WebSocket Hook

import { useEffect, useRef, useCallback, useState } from 'react';

export function useWebSocket(url, onMessage) {
  const ws = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return;
    
    setIsConnecting(true);
    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        setIsConnected(true);
        setIsConnecting(false);
        console.log('✅ WebSocket connected');
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage?.(data);
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnecting(false);
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
        console.log('WebSocket disconnected');
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setIsConnecting(false);
    }
  }, [url, onMessage]);

  const send = useCallback((data) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  const disconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
    }
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return {
    isConnected,
    isConnecting,
    send,
    ws: ws.current
  };
}
