import React from 'react';
import { ToastProvider } from '../ToastProvider';
import AgentChat from '../AgentChat';
import FloatingCTA from './FloatingCTA';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <ToastProvider>
      <div className={`min-h-screen bg-white ${className}`}>
        {/* Main content */}
        <main className="relative">{children}</main>

        {/* Floating AI Chat Assistant - available on all pages */}
        <AgentChat />
        
        {/* Floating Call-to-Action buttons */}
        <FloatingCTA />
      </div>
    </ToastProvider>
  );
};

export default Layout;
