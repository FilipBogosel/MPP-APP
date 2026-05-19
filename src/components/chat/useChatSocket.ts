import { useEffect, useRef, useState } from 'react';
import { getWsUrl, API_URL } from '@/api/services/apiClient';
import { getStoredUser } from '@/api/services/authApi';

const HISTORY_URL = `${API_URL}/chat/global/history`;
const RECONNECT_DELAY_MS = 3000;

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
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close(1000, 'chat closed');
      wsRef.current = null;
      return;
    }

    fetch(HISTORY_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch history');
        return res.json();
      })
      .then((history) => {
        if (Array.isArray(history)) setMessages(history);
      })
      .catch((err) => console.error('Chat history error:', err));

    function connect() {
      const token = getStoredUser()?.token ?? '';
      const ws = new WebSocket(
        `${getWsUrl()}/ws/chat/global?token=${encodeURIComponent(token)}`,
      );
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data as string) as ChatMessage;
          setMessages((prev) => [...prev, msg]);
        } catch {
          // ignore malformed frames
        }
      };

      ws.onclose = (ev) => {
        // Reconnect on unexpected close (not normal close or policy violation)
        if (isMountedRef.current && isOpen && ev.code !== 1000 && ev.code !== 1008) {
          reconnectTimer.current = setTimeout(connect, RECONNECT_DELAY_MS);
        }
      };
    }

    connect();

    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close(1000, 'component unmounted');
      wsRef.current = null;
    };
  }, [isOpen]);

  function sendMessage(content: string) {
    if (!content || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    const user = getStoredUser();
    const msg: ChatMessage = {
      senderId: user?.userId ?? '',
      senderName: user?.username ?? 'Unknown',
      roomId: 'global',
      content,
    };
    wsRef.current.send(JSON.stringify(msg));
  }

  return { messages, sendMessage };
}
