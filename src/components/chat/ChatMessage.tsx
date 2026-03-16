import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../../types';
import { INTENT_TO_LAW_MAPPING } from '../../constants/lawMapping';
import { BotAvatar } from './BotAvatar';

interface ChatMessageProps {
  message: Message;
}

function formatBengaliTime(timestamp?: Date | string | number): string {
  if (!timestamp) return '';
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  try {
    return date.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch {
    return date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true });
  }
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const sources: string[] = [];
  if (message.intent) {
    const lawName = INTENT_TO_LAW_MAPPING[message.intent];
    if (lawName) {
      sources.push(lawName);
    }
  }

  const timeStr = formatBengaliTime(message.timestamp);

  return (
    <div className={`flex w-full mb-1 animate-message-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 mr-1.5 mt-auto mb-1">
          <BotAvatar size={28} />
        </div>
      )}
      <div
        className={`
          max-w-[85%] sm:max-w-[70%] rounded-lg p-2.5 px-3 shadow-sm relative
          ${isUser
            ? 'bg-bubbleUser text-textPrimary rounded-tr-none bubble-tail-right'
            : 'bg-bubbleBot text-textPrimary rounded-tl-none bubble-tail-left shadow-md'}
        `}
      >
        <div className="max-w-none font-bengali break-words leading-relaxed text-[15px] sm:text-base tracking-normal">
          <ReactMarkdown
            components={{
              strong: ({node, ...props}) => <span className="font-bold text-primary" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1" {...props} />,
              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-start gap-1 text-[11px] text-gray-500 font-medium">
              <span className="mt-0.5">📚</span>
              <div>
                <span className="mr-1">তথ্যসূত্র:</span>
                {sources.map((source, idx) => (
                  <span key={idx} className="bg-gray-50 px-1 py-0.5 rounded border border-gray-200 inline-block mr-1 mb-0.5 text-gray-600">
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {timeStr && (
          <div className={`text-[10px] mt-1 text-right ${isUser ? 'text-gray-500' : 'text-gray-400'}`}>
            {timeStr}
          </div>
        )}
      </div>
    </div>
  );
};
