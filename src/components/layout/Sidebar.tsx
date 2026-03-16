import React from 'react';
import type { ChatSession } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ChatSession[];
  currentSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onNewSession: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  sessions,
  currentSessionId,
  onSelectSession,
  onNewSession
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl flex flex-col font-bengali`}
      >
        <div className="px-4 py-3 flex justify-between items-center bg-primary text-white">
          <h2 className="text-lg font-bold">কথোপকথন</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={() => {
              onNewSession();
              onClose();
            }}
            className="w-full bg-primary/10 text-primary border border-primary/20 py-2.5 rounded-lg font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <span>+</span> নতুন কথোপকথন
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {sessions.length === 0 ? (
            <div className="text-center text-gray-400 mt-10 text-sm">
              কোনো পূর্বের কথোপকথন নেই
            </div>
          ) : (
            <div className="space-y-1">
              {sessions.map(session => (
                <button
                  key={session.sessionId}
                  onClick={() => {
                    onSelectSession(session.sessionId);
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors group flex items-center gap-2.5
                    ${currentSessionId === session.sessionId
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                    }`}
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs font-bold flex-shrink-0">
                    আ
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="text-sm line-clamp-1">
                      {session.messages?.[1]?.content || 'নতুন কথোপকথন'}
                    </div>
                    <div className={`text-xs ${currentSessionId === session.sessionId ? 'text-primary/70' : 'text-gray-400'}`}>
                      {session.messages?.[0]?.timestamp ? new Date(session.messages[0].timestamp).toLocaleDateString() : 'আজ'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
