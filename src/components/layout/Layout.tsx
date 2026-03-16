import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  onQuickExit: () => void;
  onNavigateHome: () => void;
  onNewSession: () => void;
  onToggleSidebar?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onQuickExit,
  onNavigateHome,
  onNewSession,
  onToggleSidebar
}) => {
  return (
    <div className="min-h-screen flex flex-col font-bengali">
      <Header
        onQuickExit={onQuickExit}
        onNavigateHome={onNavigateHome}
        onNewSession={onNewSession}
        onToggleSidebar={onToggleSidebar}
      />
      <main className="flex-1 max-w-3xl mx-auto w-full px-2 sm:px-4 pt-2 pb-24 flex flex-col">
        {children}
      </main>
    </div>
  );
};
