import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { useChatSocket } from './useChatSocket';
import { ChatMessage } from './ChatMessage';
import { getStoredUser } from '@/api/services/authApi';

export function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage } = useChatSocket(isOpen);
  const currentUserId = getStoredUser()?.userId ?? '';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const content = inputValue.trim();
    if (!content) return;
    sendMessage(content);
    setInputValue('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

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
            {messages.map((msg, index) => (
              <ChatMessage key={index} msg={msg} isMine={msg.senderId === currentUserId} />
            ))}
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
              onClick={handleSend}
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
