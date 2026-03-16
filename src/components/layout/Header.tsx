import React from 'react';

interface HeaderProps {
  onQuickExit: () => void;
  onToggleSupport: () => void;
  onNavigateHome: () => void;
  onNewSession: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onQuickExit, onToggleSupport, onNavigateHome, onNewSession }) => {
  return (
    <header className="bg-white text-primary p-4 flex justify-between items-center shadow-sm sticky top-[36px] z-40">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onNavigateHome}
          className="text-xl font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
        >
          আইন বন্ধু
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
          onClick={onToggleSupport}
          className="bg-secondary px-3 py-1.5 rounded text-white text-sm font-medium hover:bg-opacity-90 transition-colors"
        >
          📞 সহায়ক সংস্থা
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
