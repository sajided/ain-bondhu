import React from 'react';

interface HeaderProps {
  onQuickExit: () => void;
  onNavigateHome: () => void;
  onNewSession: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onQuickExit, onNavigateHome, onNewSession, onToggleSidebar }) => {
  return (
    <header className="bg-white text-primary p-4 flex justify-between items-center shadow-sm sticky top-[36px] z-40">
      <div className="flex items-center gap-2">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        )}
        <button
          type="button"
          onClick={onNavigateHome}
          className="text-xl font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
        >
          পারিবারিক আইন সহায়ক
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onNewSession}
          className="bg-primary px-3 py-1.5 rounded text-white text-sm font-medium hover:bg-opacity-90 transition-colors"
        >
          নতুন কথোপকথন
        </button>
        <button
          onClick={onQuickExit}
          className="bg-white text-urgent border border-urgent px-3 py-1.5 rounded text-sm font-bold hover:bg-gray-100 transition-colors"
        >
          দ্রুত বন্ধ করুন
        </button>
      </div>
    </header>
  );
};
