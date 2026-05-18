import type { ChatMessage as ChatMessageType } from './useChatSocket';

function formatTime(timestamp?: string): string {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

type Props = {
  msg: ChatMessageType;
  isMine: boolean;
};

export function ChatMessage({ msg, isMine }: Props) {
  return (
    <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
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
          <p className={`mt-0.5 text-right text-[10px] ${isMine ? 'text-white/60' : 'text-gray-400'}`}>
            {formatTime(msg.timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}
