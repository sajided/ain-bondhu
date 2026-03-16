import { useEffect, useRef, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { ChatInput } from './components/chat/ChatInput';
import { ChatMessage } from './components/chat/ChatMessage';
import { TypingIndicator } from './components/chat/TypingIndicator';
import { Sidebar } from './components/layout/Sidebar';
import { HomeLanding } from './components/landing/HomeLanding';
import { useChatSession } from './hooks/useChatSession';

function App() {
  const { 
    sessions, currentSessionId, messages, isLoading, isInitializing, error, 
    sendMessage, startNewSession, selectSession, retryLastMessage, hasFailedMessage 
  } = useChatSession();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasEnteredChat, setHasEnteredChat] = useState(false);
  const [forceLanding, setForceLanding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const shouldShowLanding = forceLanding || !hasEnteredChat;
    if (shouldShowLanding) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [forceLanding, hasEnteredChat]);

  const handleLandingSubmit = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    
    setHasEnteredChat(true);
    setForceLanding(false);
    await sendMessage(trimmed);
  };

  const handleNavigateHome = () => {
    setForceLanding(true);
  };

  const handleReturnToChat = () => {
    setForceLanding(false);
  };

  const handleNewSession = async () => {
    await startNewSession();
    setHasEnteredChat(true);
    setForceLanding(false);
  };

  const handleQuickExit = () => {
    localStorage.clear();
    window.location.href = 'https://www.weather.com';
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-100 font-bengali">
        <div className="text-primary animate-pulse text-xl">লোড হচ্ছে...</div>
      </div>
    );
  }

  const shouldShowLanding = forceLanding || !hasEnteredChat;

  const landingClasses = shouldShowLanding 
    ? 'opacity-100 translate-y-0 pointer-events-auto relative' 
    : 'opacity-0 -translate-y-6 pointer-events-none absolute inset-0';
    
  const chatClasses = shouldShowLanding 
    ? 'opacity-0 translate-y-6 pointer-events-none absolute inset-0' 
    : 'opacity-100 translate-y-0 pointer-events-auto relative';

  return (
    <div className="relative min-h-screen transition-colors duration-300">
      <div className={`transition-all duration-500 ease-[cubic-bezier(0.4,0.0,0.2,1)] ${landingClasses}`}>
        <HomeLanding 
          isSubmitting={isLoading} 
          onSubmit={handleLandingSubmit} 
          canContinue={hasEnteredChat}
          onContinue={hasEnteredChat ? handleReturnToChat : undefined}
          error={error} 
        />
      </div>

      <div className={`transition-all duration-500 ease-[cubic-bezier(0.4,0.0,0.2,1)] ${chatClasses}`}>
        <Layout 
          onQuickExit={handleQuickExit} 
          onToggleSidebar={handleToggleSidebar} 
          onNavigateHome={handleNavigateHome}
          onNewSession={handleNewSession}
        >
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            sessions={sessions}
            currentSessionId={currentSessionId}
            onSelectSession={selectSession}
            onNewSession={handleNewSession}
          />

          <div className="flex-1">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            
            {isLoading && <TypingIndicator />}
            
            {error && (
              <div className="text-center text-sm p-3 mb-4 bg-red-50 rounded-lg">
                <p className="text-red-500 mb-2">{error}</p>
                {hasFailedMessage && (
                  <button 
                    onClick={retryLastMessage}
                    className="bg-primary text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-opacity-90 transition-colors"
                  >
                    আবার চেষ্টা করুন
                  </button>
                )}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </Layout>
      </div>
    </div>
  );
}

export default App;
