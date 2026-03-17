import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { storage } from '../services/storage';
import type { Message, ChatSession } from '../types';

function loadSavedSessions(): ChatSession[] {
  try {
    const saved = localStorage.getItem('pas_sessions');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load sessions from storage', e);
  }
  return [];
}

export const useChatSession = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(loadSavedSessions);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    const saved = loadSavedSessions();
    return saved.length > 0 ? saved[saved.length - 1].sessionId : '';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(() => loadSavedSessions().length === 0);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  // Initialize a new session if none were saved
  useEffect(() => {
    if (sessions.length === 0) {
      initSession();
    }
  }, []);

  // Save to local storage whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('pas_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const currentSession = sessions.find(s => s.sessionId === currentSessionId) || {
    sessionId: '',
    profileId: '',
    messages: []
  };

  const initSession = useCallback(async (existingProfileId?: string) => {
    try {
      setError(null);
      
      try {
        await api.checkHealth();
      } catch {
        setError('সার্ভারের সাথে সংযোগ করা যাচ্ছে না। অনুগ্রহ করে নিশ্চিত করুন যে সার্ভার চালু আছে।');
        return;
      }

      const profileId = existingProfileId || storage.getProfileId() || undefined;
      const data = await api.createNewSession(profileId);
      
      storage.setProfileId(data.profile_id);

      const greetingMessage: Message = {
        id: `greeting_${Date.now()}`,
        role: 'assistant',
        content: data.greeting,
        timestamp: new Date()
      };

      const newSession: ChatSession = {
        sessionId: data.session_id,
        profileId: data.profile_id,
        messages: [greetingMessage]
      };

      setSessions(prev => [...prev, newSession]);
      setCurrentSessionId(data.session_id);
      
    } catch (err) {
      console.error('Failed to initialize session:', err);
      setError('সংযোগ স্থাপন করা যাচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !currentSession.sessionId) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content,
      timestamp: new Date()
    };

    setSessions(prev => prev.map(s => 
      s.sessionId === currentSessionId ? { ...s, messages: [...s.messages, userMessage] } : s
    ));
    
    setIsLoading(true);
    setError(null);
    setLastFailedMessage(null);

    try {
      const response = await api.sendMessage(currentSession.profileId, currentSession.sessionId, content);
      
      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        intent: response.intent
      };

      setSessions(prev => prev.map(s => 
        s.sessionId === currentSessionId ? { ...s, messages: [...s.messages, botMessage] } : s
      ));
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      setLastFailedMessage(content);
    } finally {
      setIsLoading(false);
    }
  }, [currentSessionId, currentSession.profileId, currentSession.sessionId]);

  const startNewSession = useCallback(async () => {
    setIsInitializing(true);
    setLastFailedMessage(null);
    // Use the latest profileId we have
    const lastProfileId = sessions.length > 0 ? sessions[sessions.length - 1].profileId : undefined;
    await initSession(lastProfileId);
  }, [initSession, sessions]);

  const selectSession = useCallback((sessionId: string) => {
    if (sessions.some(s => s.sessionId === sessionId)) {
      setCurrentSessionId(sessionId);
      setError(null);
      setLastFailedMessage(null);
    }
  }, [sessions]);

  const retryLastMessage = useCallback(async () => {
    if (lastFailedMessage) {
      setSessions(prev => prev.map(s => {
        if (s.sessionId === currentSessionId) {
          return { ...s, messages: s.messages.slice(0, -1) };
        }
        return s;
      }));
      setError(null);
      await sendMessage(lastFailedMessage);
    }
  }, [lastFailedMessage, sendMessage, currentSessionId]);

  return {
    sessions,
    currentSessionId,
    messages: currentSession.messages,
    isLoading,
    isInitializing,
    error,
    sendMessage,
    startNewSession,
    selectSession,
    retryLastMessage,
    hasFailedMessage: !!lastFailedMessage
  };
};
