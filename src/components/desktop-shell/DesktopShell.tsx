// Desktop Shell V2 - Main Container
// BATCH-DESKTOP-00: Foundation Layer

import React, { useEffect } from 'react';
import { useDesktopStore } from '../../stores/desktopStore';
import { WindowManager } from './WindowManager';
import { SessionManager } from './SessionManager';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { Monitor } from 'lucide-react';
import { Window } from './Window';

interface DesktopShellProps {
  mode?: 'standalone' | 'god-mode-embedded';
}

export const DesktopShell: React.FC<DesktopShellProps> = ({ mode: _mode = 'standalone' }) => {
  const { openWindow, toggleNexus } = useDesktopStore();

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K - Open Nexus Bar
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleNexus();
      }

      // ⌘N or Ctrl+N - New Window
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        openWindow('browser');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleNexus, openWindow]);

  return (
    <div className="relative w-full h-screen">
      {/* Session Manager (invisible, handles restore/save) */}
      <SessionManager />

      {/* BATCH-100: Top Bar */}
      <TopBar
        appName="ArmadaOS"
        hasUnreadNotifications={false}
        onNotificationsClick={() => console.log('Notifications clicked')}
        onProfileClick={() => console.log('Profile clicked')}
      />

      {/* Desktop Canvas */}
      <div className="absolute inset-0" style={{ paddingTop: '48px' }}>
        {/* Window Manager */}
        <WindowManager />

        {/* Sample Window for BATCH-102 */}
        <Window window={{
          id: 'sample-window-1',
          title: 'Sample Window',
          appId: 'sample-app',
          size: { width: 800, height: 600 },
          position: { x: 200, y: 100 },
          isMaximized: false,
          isMinimized: false,
          isFocused: true,
          zIndex: 100,
          spaceId: 'default',
          tabs: [],
          activeTabId: null,
        }} />

        {/* Empty State */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-[#6E6E6E]">
            <Monitor className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-sm">Press ⌘N to open a new window</p>
            <p className="text-xs mt-2">Press ⌘K to open Nexus</p>
          </div>
        </div>
      </div>

      {/* BATCH-101: Dock */}
      <Dock
        onAppLaunch={(appId) => {
          console.log('App launched:', appId);
          // TODO: Implement app launch logic
          if (appId === 'browser') {
            openWindow('browser');
          }
        }}
      />
    </div>
  );
};
