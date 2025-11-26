const KEYS = {
  SESSION_ID: 'ain_bandhu_session_id',
  USER_ID: 'ain_bandhu_user_id',
  MESSAGES: 'ain_bandhu_messages'
};

export const storage = {
  getSessionId: () => localStorage.getItem(KEYS.SESSION_ID),
  setSessionId: (id: string) => localStorage.setItem(KEYS.SESSION_ID, id),
  
  getUserId: () => localStorage.getItem(KEYS.USER_ID),
  setUserId: (id: string) => localStorage.setItem(KEYS.USER_ID, id),
  
  getMessages: () => {
    const msgs = localStorage.getItem(KEYS.MESSAGES);
    return msgs ? JSON.parse(msgs) : [];
  },
  setMessages: (messages: any[]) => localStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages)),
  
  clearAll: () => {
    localStorage.removeItem(KEYS.SESSION_ID);
    localStorage.removeItem(KEYS.USER_ID);
    localStorage.removeItem(KEYS.MESSAGES);
  }
};

