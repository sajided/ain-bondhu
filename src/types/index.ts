export interface ToolCall {
  tool: string;
  args: Record<string, any>;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isUrgent?: boolean;
  hasSteps?: boolean;
  hasQuestions?: boolean;
  intent?: string; // Added top-level intent
  toolsUsed?: string[]; // Changed to string array
}

export interface ChatSession {
  sessionId: string;
  userId: string;
  messages: Message[];
}

export interface NewSessionResponse {
  session_id: string;
  greeting: string;
  timestamp: string;
}

export interface ChatResponse {
  session_id: string;
  response: string;
  tools_used?: string[]; // Changed to string array
  intent?: string; // Added intent
  tokens_used?: number;
  response_time_ms?: number;
  timestamp: string;
}

export interface EmergencyContact {
  name: string;
  nameBengali: string;
  number: string;
  category: 'emergency' | 'legal_aid' | 'medical';
}
