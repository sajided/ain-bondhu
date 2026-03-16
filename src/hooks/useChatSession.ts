import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { storage } from '../services/storage';
import type { Message, ChatSession } from '../types';

export const useChatSession = () => {
  const [session, setSession] = useState<ChatSession>({
    sessionId: '',
    profileId: '',
    messages: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const initSession = useCallback(async (existingProfileId?: string) => {
    try {
      setError(null);

      // Health check first
      try {
        await api.checkHealth();
      } catch {
        setError('সার্ভারের সাথে সংযোগ করা যাচ্ছে না। অনুগ্রহ করে নিশ্চিত করুন যে সার্ভার চালু আছে।');
        return;
      }

      const profileId = existingProfileId || storage.getProfileId() || undefined;
      const data = await api.createNewSession(profileId);

      // Persist profile_id
      storage.setProfileId(data.profile_id);

      const greetingMessage: Message = {
        id: `greeting_${Date.now()}`,
        role: 'assistant',
        content: data.greeting,
        timestamp: new Date(data.timestamp)
      };

      setSession({
        sessionId: data.session_id,
        profileId: data.profile_id,
        messages: [greetingMessage]
      });
    } catch (err) {
      console.error('Failed to initialize session:', err);
      setError('সংযোগ স্থাপন করা যাচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsInitializing(false);
    }
  }, []);

  useEffect(() => {
    initSession();
  }, [initSession]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !session.sessionId) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content,
      timestamp: new Date()
    };

    setSession(prev => ({ ...prev, messages: [...prev.messages, userMessage] }));
    setIsLoading(true);
    setError(null);
    setLastFailedMessage(null);

    try {
      const response = await api.sendMessage(session.profileId, session.sessionId, content);

      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date(response.timestamp),
        intent: response.intent
      };

      setSession(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      setLastFailedMessage(content);
    } finally {
      setIsLoading(false);
    }
  }, [session.sessionId, session.profileId]);

  const startNewSession = useCallback(async () => {
    setIsInitializing(true);
    setLastFailedMessage(null);
    await initSession(session.profileId);
  }, [initSession, session.profileId]);

  const retryLastMessage = useCallback(async () => {
    if (lastFailedMessage) {
      // Remove the failed user message from the end before resending
      setSession(prev => ({
        ...prev,
        messages: prev.messages.slice(0, -1)
      }));
      setError(null);
      await sendMessage(lastFailedMessage);
    }
  }, [lastFailedMessage, sendMessage]);

  return {
    messages: session.messages,
    isLoading,
    isInitializing,
    error,
    sendMessage,
    startNewSession,
    retryLastMessage,
    hasFailedMessage: !!lastFailedMessage
  };
};
