import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 p-3 z-30 max-w-3xl mx-auto"
    >
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="আপনার প্রশ্ন লিখুন..."
            disabled={disabled}
            rows={1}
            className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary max-h-[120px] bg-gray-50 text-textPrimary hide-scrollbar"
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="bg-primary text-white px-4 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all flex items-center gap-1.5"
        >
          <span className="text-sm font-medium">পাঠান</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
      <div className="text-xs text-center text-gray-400 mt-2">
        পারিবারিক আইন সহায়ক ভুল করতে পারে। গুরুত্বপূর্ণ তথ্যের জন্য যাচাই করুন।
      </div>
    </form>
  );
};
