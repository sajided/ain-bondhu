export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  intent?: string;
}

export interface ChatSession {
  sessionId: string;
  profileId: string;
  messages: Message[];
}

export interface NewSessionResponse {
  session_id: string;
  profile_id: string;
  greeting: string;
  timestamp: string;
}

export interface ChatResponse {
  session_id: string;
  profile_id: string;
  response: string;
  tools_used?: string[];
  intent?: string;
  tokens_used?: number;
  response_time_ms?: number;
  timestamp: string;
}

export interface EmergencyContact {
  name: string;
  nameBengali: string;
  number: string;
  category: 'emergency' | 'legal_aid';
}
