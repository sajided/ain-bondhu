import React, { useEffect, useRef, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { ChatInput } from './components/chat/ChatInput';
import { ChatMessage } from './components/chat/ChatMessage';
import { TypingIndicator } from './components/chat/TypingIndicator';
import { SupportPanel } from './components/layout/SupportPanel';
import { useChatSession } from './hooks/useChatSession';

function App() {
  const { messages, isLoading, isInitializing, error, sendMessage } = useChatSession();
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleQuickExit = () => {
    localStorage.clear();
    window.location.href = 'https://www.weather.com';
  };

  const handleToggleSupport = () => {
    setIsSupportOpen(!isSupportOpen);
  };

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg font-bengali">
        <div className="text-primary animate-pulse text-xl">লোড হচ্ছে...</div>
      </div>
    );
  }

  return (
    <Layout onQuickExit={handleQuickExit} onToggleSupport={handleToggleSupport}>
      <SupportPanel isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
      
      <div className="flex-1">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        
        {isLoading && <TypingIndicator />}
        
        {error && (
          <div className="text-center text-red-500 text-sm p-2 mb-4 bg-red-50 rounded">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </Layout>
  );
}

export default App;
