import type { NewSessionResponse, ChatResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.warn('VITE_API_BASE_URL is not defined in .env file');
}

export const api = {
  async checkHealth(): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  },

  async createNewSession(profileId?: string): Promise<NewSessionResponse> {
    const body: Record<string, string> = {};
    if (profileId) {
      body.profile_id = profileId;
    }

    const response = await fetch(`${API_BASE_URL}/chat/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  },

  async sendMessage(
    profileId: string,
    sessionId: string,
    message: string
  ): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile_id: profileId, session_id: sessionId, message })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }
};
