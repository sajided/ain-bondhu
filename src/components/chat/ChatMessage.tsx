import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../types';
import { detectUrgency } from '../../utils/detectUrgency';
import { EmergencyAlert } from './EmergencyAlert';
import { INTENT_TO_LAW_MAPPING } from '../../constants/lawMapping';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isUrgent = !isUser && detectUrgency(message.content);
  
  // Logic: If intent exists, show the mapped law.
  // If no intent but toolsUsed has 'get_legal_knowledge', we might want to show a generic source if intent is missing.
  // But based on backend response, 'intent' field is the reliable one for the specific law.
  
  const sources: string[] = [];
  if (message.intent) {
    const lawName = INTENT_TO_LAW_MAPPING[message.intent];
    if (lawName) {
      sources.push(lawName);
    }
  }

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`
          max-w-[90%] md:max-w-[85%] rounded-2xl p-5 shadow-sm relative
          ${isUser 
            ? 'bg-userMsg text-textPrimary rounded-tr-none' 
            : 'bg-white text-textPrimary rounded-tl-none border border-gray-100 shadow-md'}
        `}
      >
        {isUrgent && <EmergencyAlert />}
        
        <div className="prose prose-sm max-w-none font-bengali break-words prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 leading-loose text-[17px] tracking-wide">
          <ReactMarkdown
            components={{
              strong: ({node, ...props}) => <span className="font-bold text-primary" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-2" {...props} />,
              p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {sources.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-start gap-1.5 text-xs text-gray-500 font-medium">
              <span className="mt-0.5">📚</span>
              <div>
                <span className="mr-1">তথ্যসূত্র:</span>
                {sources.map((source, idx) => (
                  <span key={idx} className="bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200 inline-block mr-1 mb-1 text-gray-600">
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={`text-[10px] mt-2 ${isUser ? 'text-right text-green-800/60' : 'text-left text-gray-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
