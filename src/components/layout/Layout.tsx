import React from 'react';
import { EmergencyBar } from './EmergencyBar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  onQuickExit: () => void;
  onToggleSupport: () => void;
  onNavigateHome: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onQuickExit,
  onToggleSupport,
  onNavigateHome
}) => {
  return (
    <div className="min-h-screen flex flex-col font-bengali">
      <EmergencyBar />
      <Header
        onQuickExit={onQuickExit}
        onToggleSupport={onToggleSupport}
        onNavigateHome={onNavigateHome}
      />
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 pb-20 flex flex-col">
        {children}
      </main>
    </div>
  );
};

