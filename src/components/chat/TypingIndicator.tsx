import React from 'react';
import { BotAvatar } from './BotAvatar';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-1.5 mb-1 animate-message-in">
      <div className="flex-shrink-0 mb-1">
        <BotAvatar size={28} />
      </div>
      <div className="flex items-center gap-1 p-2.5 px-4 bg-white rounded-lg rounded-tl-none bubble-tail-left w-fit shadow-sm">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};
