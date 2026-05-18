import { useEffect, useRef, useState } from 'react';
import { API_URL } from '@/api/services/apiClient';

const WS_URL = API_URL.replace('http', 'ws').replace('/api', '') + '/ws/chat/global';
const HISTORY_URL = `${API_URL}/chat/global/history`;

export type ChatMessage = {
  senderId: string;
  senderName: string;
  roomId: string;
  content: string;
  timestamp?: string;
};

export function useChatSocket(isOpen: boolean) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!isOpen) {
      wsRef.current?.close();
      wsRef.current = null;
      return;
    }

    fetch(HISTORY_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch history');
        return res.json();
      })
      .then((history) => {
        if (Array.isArray(history)) {
          setMessages(history);
        } else {
          console.error('Expected an array of messages, but got:', history);
        }
      })
      .catch((err) => console.error('Chat history error:', err));

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data as string) as ChatMessage;
        setMessages((prev) => [...prev, msg]);
      } catch {
        // ignore malformed frames
      }
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [isOpen]);

  function sendMessage(content: string) {
    if (!content || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const msg: ChatMessage = {
      senderId: localStorage.getItem('userId') ?? '',
      senderName: localStorage.getItem('username') ?? 'Unknown',
      roomId: 'global',
      content,
    };

    wsRef.current.send(JSON.stringify(msg));
  }

  return { messages, sendMessage };
}
