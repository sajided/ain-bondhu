import React from 'react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNewSession: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome, onNewSession, onToggleSidebar }) => {
  return (
    <header className="bg-primary text-white px-3 py-2 flex justify-between items-center shadow-md sticky top-0 z-40">
      <div className="flex items-center gap-2">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
            aria-label="Toggle Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        )}
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          আ
        </div>
        <button
          type="button"
          onClick={onNavigateHome}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
        >
          <div className="text-base font-bold leading-tight">পারিবারিক আইন সহায়ক</div>
          <div className="text-[11px] text-white/70 leading-tight">আপনার আইনি সহায়ক</div>
        </button>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={onNewSession}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="নতুন কথোপকথন"
          title="নতুন কথোপকথন"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </button>
        <a
          href="tel:999"
          className="w-8 h-8 rounded-full bg-urgent flex items-center justify-center text-white text-xs font-bold"
          title="জরুরি: ৯৯৯"
        >
          999
        </a>
      </div>
    </header>
  );
};
