import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { Message, ChatSession } from '../types';

export const useChatSession = () => {
  const [session, setSession] = useState<ChatSession>({
    sessionId: '',
    userId: '',
    messages: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      try {
        let sessionId = storage.getSessionId();
        let userId = storage.getUserId();
        let savedMessages = storage.getMessages();

        if (sessionId && userId) {
          // Hydrate dates from JSON
          const hydratedMessages = savedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setSession({ sessionId, userId, messages: hydratedMessages });
        } else {
          // Create new session
          userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const data = await api.createNewSession(userId);
          
          const initialMessage: Message = {
            id: 'init',
            role: 'assistant',
            content: data.greeting,
            timestamp: new Date(data.timestamp)
          };

          sessionId = data.session_id;
          const newMessages = [initialMessage];

          // Save to storage
          storage.setSessionId(sessionId);
          storage.setUserId(userId);
          storage.setMessages(newMessages);

          setSession({ sessionId, userId, messages: newMessages });
        }
      } catch (err) {
        console.error('Failed to initialize session:', err);
        setError('সংযোগ স্থাপন করা যাচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।');
      } finally {
        setIsInitializing(false);
      }
    };

    initSession();
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !session.sessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content,
      timestamp: new Date()
    };

    // Optimistic update
    const updatedMessages = [...session.messages, userMessage];
    setSession(prev => ({ ...prev, messages: updatedMessages }));
    storage.setMessages(updatedMessages);
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.sendMessage(session.sessionId, content);
      
      const botMessage: Message = {
        id: Date.now().toString() + '_bot',
        role: 'assistant',
        content: response.response,
        timestamp: new Date(response.timestamp),
        toolsUsed: response.tools_used,
        intent: response.intent // Capture intent
      };

      const finalMessages = [...updatedMessages, botMessage];
      setSession(prev => ({ ...prev, messages: finalMessages }));
      storage.setMessages(finalMessages);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  }, [session.sessionId, session.messages]);

  const clearSession = useCallback(() => {
    storage.clearAll();
    window.location.reload(); 
  }, []);

  return {
    messages: session.messages,
    isLoading,
    isInitializing,
    error,
    sendMessage,
    clearSession
  };
};
