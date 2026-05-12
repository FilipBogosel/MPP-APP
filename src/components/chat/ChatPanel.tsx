import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { API_URL } from '@/api/services/apiClient';

// Dynamically build the WebSocket URL from the HTTP URL
const WS_URL = API_URL.replace('http', 'ws').replace('/api', '') + '/ws/chat/global';
const HISTORY_URL = `${API_URL}/chat/global/history`;

type ChatMessage = {
  senderId: string;
  senderName: string;
  roomId: string;
  content: string;
  timestamp?: string;
};

function formatTime(timestamp?: string): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [inputValue, setInputValue] = useState('');
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        // Defensive check: Only spread if the backend actually returned an array
        if (Array.isArray(history)) {
          setMessages((prev) => [...history, ...prev]);
        } else {
          console.error("Expected an array of messages, but got:", history);
        }
      })
      .catch((err) => console.error("Chat history error:", err));

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const content = inputValue.trim();
    if (!content || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const msg: ChatMessage = {
      senderId: localStorage.getItem('userId') ?? '',
      senderName: localStorage.getItem('username') ?? 'Unknown',
      roomId: 'global',
      content,
    };

    wsRef.current.send(JSON.stringify(msg));
    setInputValue('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const currentUserId = localStorage.getItem('userId') ?? '';

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-100 bg-indigo-600 px-4 py-3">
            <span className="text-sm font-semibold text-white">Global Chat</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {messages.map((msg, index) => {
              const isMine = msg.senderId === currentUserId;
              return (
                <div key={index} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm ${
                      isMine ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {!isMine && (
                      <p className="mb-0.5 text-xs font-semibold text-indigo-600">{msg.senderName}</p>
                    )}
                    <p className="break-words">{msg.content}</p>
                    {msg.timestamp && (
                      <p
                        className={`mt-0.5 text-right text-[10px] ${
                          isMine ? 'text-white/60' : 'text-gray-400'
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-gray-100 p-3">
            <input
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              placeholder="Type a message…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition-colors hover:bg-indigo-700"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-colors hover:bg-indigo-700"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}
