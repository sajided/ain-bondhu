import type { NewSessionResponse, ChatResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.warn('VITE_API_BASE_URL is not defined in .env file');
}

export const api = {
  async createNewSession(userId: string): Promise<NewSessionResponse> {
    const response = await fetch(`${API_BASE_URL}/chat/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  },

  async sendMessage(
    sessionId: string,
    message: string
  ): Promise<ChatResponse> {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, message })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
  }
};
